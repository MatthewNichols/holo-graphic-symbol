import { Circle } from "./circle";

export class CircleConstrainedRender {
    constructor(public radius: number, public centerX: number, public centerY: number, 
        public circleRadii: Array<number>, public colors: Array<string>, private drawingMechanics: IDrawingMechanics) {

        this.diameter = radius * 2;
        this.circles = [];
    }

    diameter: number;
    circles: Array<ICircle>;

    render() {
        // Iterate to draw a lot of circles
        for (var i = 0; i < 4000; i++) {
            const newCoordinates = this.getNewCoordinatesInsideCircle();
            if (!newCoordinates) {
                break;
            }

            const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y);
            if (circleSize) {
                const randomColor = this.pickCircleColor(newCoordinates.x, newCoordinates.y);
                const circle = new Circle(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
                this.add(circle);
            }
        }
    }

    pickNewCircleSize(x: number, y: number) {
        return this.circleRadii.find((size: number) => !this.willCollideWithAny(new Circle(x, y, size)))
    }

    pickCircleColor(circleX: number, circleY: number) {
        const closestColor = this.getNearestCircleCircleToCoordinates(circleX, circleY);
        const weightedPalette = [...this.colors, closestColor, closestColor, closestColor];
        return weightedPalette[Math.floor(Math.random() * weightedPalette.length)];
    }

    getNearestCircleCircleToCoordinates(x: number, y: number, howMany = 1) {
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

        return this.colors[0];
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

    getNewCoordinatesInsideCircle() {
        //test that the candidate falls inside a circle centered on (radius, radius) of radius radius
        const withinRadius = (coordinates: XYCoordinates) => {
            return this.measureCoordinatesDistanceFromCenter(coordinates) < this.radius
        };

        return this.getNewCoordinates(withinRadius);
    }

    getNewCoordinates(testFunction: CoordinatesTestFunction): XYCoordinates | null {
        //generate coordinate half between 0 and the diameter of circle 
        const genCandidateHalf = () => Math.random() * this.diameter;

        var candidateCoodinates; 

        let n = 0;
        while (n < 1.5) {
            candidateCoodinates = { x: genCandidateHalf(), y: genCandidateHalf() };
            if (testFunction(candidateCoodinates)) {
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