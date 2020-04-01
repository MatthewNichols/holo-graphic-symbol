import { Circle } from "./circle";
import { SizeChoice, IDrawingMechanics, ICircle, XYCoordinates } from "../types";
import { CircleContainer } from "./circle-container";

export abstract class BaseConstrainedRenderer {
    constructor(public centerX: number, public centerY: number, public circleRadii: SizeChoice[], public circleColors: string[], 
        protected drawingMechanics: IDrawingMechanics, public radius: number) {
    }

    circles = new CircleContainer(this.radius);
    
    abstract calculateInitial(): void;

    clearData() {
        this.circles.clear();
    }
    /**
     * Calulates the next set of animation changes.
     * @returns (boolean) true if the animation is still running (i.e. this method should be called again), 
     * false if all done.
     */ 
    calculateAnimationFrame(): boolean {
        return true;
    }

    render(): void {
        this.circles.forEach((c: ICircle) => this.drawingMechanics.drawCircleObject(c));
    }
    
    protected calculateACircle(sizeChoices: SizeChoice[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }

        const nearestNeighbor: ICircle | null = this.circles.getNearestCircleToCoordinates(newCoordinates.x, newCoordinates.y);

        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, nearestNeighbor, sizeChoices);
        if (circleSize) {
            const randomColor = this.pickCircleColor(newCoordinates.x, newCoordinates.y, nearestNeighbor);
            const circle = new Circle(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
            this.addCircle(circle);
        }
    }

    pickNewCircleSize(x: number, y: number, nearestNeighbor: ICircle | null, sizeChoices: SizeChoice[]): number | undefined {
        nearestNeighbor = nearestNeighbor || new Circle(0 , 0, 0);
        
        //@ts-ignore
        return this.sizeChoicesRandomSorted(sizeChoices).find((size: SizeChoice) => !nearestNeighbor.willCollideWith(new Circle(x, y, size.size)))?.size;
    }

    sizeChoicesRandomSorted(sizeChoices: SizeChoice[]) {
        return sizeChoices.sort((a, b) => (a.weight * Math.random()) < (b.weight * Math.random()) ? 1 : -1 )
    }

    pickCircleColor(circleX: number, circleY: number, nearestNeighbor: ICircle | null) {
        const closestColor = nearestNeighbor ? nearestNeighbor.color : this.circleColors[0];
        const weightedPalette = [...this.circleColors, closestColor, closestColor, closestColor, closestColor, closestColor, closestColor];
        return weightedPalette[Math.floor(Math.random() * weightedPalette.length)];
    }

    addCircle(circle: ICircle) {
        this.circles.push(circle);
    }

    willCollideWithAny(testCircle: ICircle) {
        return this.circles.some((c: ICircle) => c.willCollideWith(testCircle));
    }

    measureCoordinatesDistanceFromCenter = (coordinates: XYCoordinates) => {
        const xDiff = coordinates.x - this.radius;
        const yDiff = coordinates.y - this.radius;
        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    };

    abstract getNewCoordinates(): XYCoordinates | null;
}
