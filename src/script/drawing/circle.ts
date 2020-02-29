export class Circle implements ICircle {
    constructor(public centerX: number, public centerY: number, public radius: number, public color: string = "") {
    }
    willCollideWith = (otherCircle: ICircle) => {
        return this.distanceBetweenEdges(otherCircle) < 0;
    };
    distanceBetweenEdges(otherCircle: ICircle) {
        return this.distanceBetweenCenters(otherCircle) - (this.radius + otherCircle.radius);
    }
    distanceBetweenCenters(otherCircle: ICircle) {
        const xDiff = this.centerX - otherCircle.centerX;
        const yDiff = this.centerY - otherCircle.centerY;
        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }
}
