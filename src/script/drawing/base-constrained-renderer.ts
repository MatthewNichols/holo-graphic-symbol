import { Circle } from "./circle";
export abstract class BaseConstrainedRenderer {
    constructor(public centerX: number, public centerY: number, public circleRadii: SizeChoice[], public circleColors: string[], 
        protected drawingMechanics: IDrawingMechanics, public radius: number) {
        
        this.circles = [];
    }

    circles: ICircle[];
    
    abstract calculateInitial(): void;

    calculateAnimationFrame(): void {}

    render(): void {
        this.circles.forEach((c) => this.drawingMechanics.drawCircleObject(c));
    }
    
    protected calculateACircle(sizeChoices: SizeChoice[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }
        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, sizeChoices);
        if (circleSize) {
            const randomColor = this.pickCircleColor(newCoordinates.x, newCoordinates.y);
            const circle = new Circle(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
            this.addCircle(circle);
        }
    }

    pickNewCircleSize(x: number, y: number, sizeChoices: SizeChoice[]): number | undefined {
        return this.sizeChoicesRandomSorted(sizeChoices).find((size: SizeChoice) => !this.willCollideWithAny(new Circle(x, y, size.size)))?.size;
    }

    sizeChoicesRandomSorted(sizeChoices: SizeChoice[]) {
        return sizeChoices.sort((a, b) => (a.weight * Math.random()) < (b.weight * Math.random()) ? 1 : -1 )
    }

    pickCircleColor(circleX: number, circleY: number) {
        const closestColor = this.getNearestCircleToCoordinates(circleX, circleY);
        const weightedPalette = [...this.circleColors, closestColor, closestColor, closestColor, closestColor, closestColor, closestColor];
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
            .sort((a, b) => (a.distance > b.distance) ? 1 : -1);
        if (closestColor.length) {
            return closestColor[0].color;
        }
        return this.circleColors[0];
    }

    addCircle(circle: ICircle) {
        this.circles.push(circle);
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
