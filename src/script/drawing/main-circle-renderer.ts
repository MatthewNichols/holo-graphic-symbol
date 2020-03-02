import { Circle } from "./circle";

abstract class BaseConstrainedRender {
    constructor(public centerX: number, public centerY: number, public circleRadii: number[], public circleColors: string[], 
        private drawingMechanics: IDrawingMechanics, public radius: number) {

        this.circles = [];
    }

    circles: ICircle[];

    abstract render(): void;

    protected renderACircle(sizeChoices: number[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }

        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, sizeChoices);
        if (circleSize) {
            const randomColor = this.pickCircleColor(newCoordinates.x, newCoordinates.y);
            const circle = new Circle(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
            this.add(circle);
        }
    }

    pickNewCircleSize(x: number, y: number, sizeChoices: number[]) {
        return sizeChoices.find((size: number) => !this.willCollideWithAny(new Circle(x, y, size)))
    }

    pickCircleColor(circleX: number, circleY: number) {
        const closestColor = this.getNearestCircleToCoordinates(circleX, circleY);
        const weightedPalette = [...this.circleColors, closestColor, closestColor, closestColor];
        return weightedPalette[Math.floor(Math.random() * weightedPalette.length)];
    }

    getNearestCircleToCoordinates(x: number, y: number, howMany = 1) {
        const distanceCalc = (otherCircle: ICircle) => {
            const xDiff = x - otherCircle.centerX;
            const yDiff = y - otherCircle.centerY;
            return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        };

        const closestColor = this.circles
            .map((c) => ({ distance: distanceCalc(c), color: c.color }))
            .sort((a, b) => (a.distance > b.distance) ? 1 : -1)
            
        if (closestColor.length) {
            return closestColor[0].color
        }

        return this.circleColors[0];
    }

    add(circle: ICircle) {
        this.circles.push(circle);
        this.drawingMechanics.drawCircleObject(circle);
    }

    willCollideWithAny(testCircle: ICircle) {
        return this.circles.some((c) => c.willCollideWith(testCircle));
    }
    
    measureCoordinatesDistanceFromCenter = (coordinates: XYCoordinates) => {
        const xDiff = coordinates.x - this.radius;
        const yDiff = coordinates.y - this.radius;
        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    };

    abstract getNewCoordinates(): XYCoordinates | null;
}

export class CircleConstrainedRender extends BaseConstrainedRender {
    constructor(centerX: number, centerY: number, circleRadii: number[], circleColors: string[], 
        drawingMechanics: IDrawingMechanics, radius: number) {

        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);
        this.diameter = radius * 2;
    }

    diameter: number;

    render() {
        // Iterate to draw a lot of circles, first without the largest size circle
        const allSizesButLargest = this.circleRadii.slice(1);
        for (var i = 0; i < 300; i++) {
            this.renderACircle(allSizesButLargest);
        }

        // then with all the sizes
        for (var i = 0; i < 3000; i++) {
            this.renderACircle(this.circleRadii);
        }
    }

    getNewCoordinates() {
        const genCandidateHalf = () => Math.random() * this.diameter;

        var candidateCoodinates; 
        let n = 0;
        while (n < 2) {
            candidateCoodinates = { x: genCandidateHalf(), y: genCandidateHalf() };
            //test that the candidate falls inside a circle centered on (radius, radius) of radius radius
            if (this.measureCoordinatesDistanceFromCenter(candidateCoodinates) < this.radius) {
                break;
            }
            n =+ 1;
        }

        if (candidateCoodinates) {    
            return { 
                x: candidateCoodinates.x + (this.centerX - this.radius),
                y: candidateCoodinates.y + (this.centerY - this.radius)
            };
        }

        return null;
    }
}

export class HaloRender extends BaseConstrainedRender {
    constructor(centerX: number, centerY: number, circleRadii: number[], circleColors: string[], 
        drawingMechanics: IDrawingMechanics, radius: number, public haloThickness: number) {
        
        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);
    }

    render() {
        // Iterate to draw a lot of circles
        for (var i = 0; i < 1000; i++) {
            this.renderACircle(this.circleRadii);
        }
    }

    getNewCoordinates() {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistanceFromCenter = (Math.random() * this.haloThickness) + this.radius;

        //console.log(`angle: ${randomAngle}, distance: ${randomDistanceFromCenter}`);
        const candidateCoodinates = { 
            x: (Math.cos(randomAngle) * randomDistanceFromCenter), 
            y: (Math.sin(randomAngle) * randomDistanceFromCenter) };
            
        return { 
            x: candidateCoodinates.x + this.centerX,
            y: candidateCoodinates.y + this.centerY
        };
    }
}
