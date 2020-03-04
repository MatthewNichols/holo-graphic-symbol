
type XYCoordinates = {x: number, y: number };
type CoordinatesTestFunction = (coordinates: XYCoordinates) => boolean;
type SizeChoice = { size: number, weight: number };
type ColorSpec = { r: number, g: number, b: number, alpha?: number };

interface IDrawingMechanics {
    clear(): void;
    drawCircleObject(circle: ICircle): void;
    drawSvgPath(pathString: string, color: string): void;
    areCoordinatesOutOfBounds(x: number, y: number): boolean;
}

interface ICircle {
    centerX: number;
    centerY: number;
    radius: number;
    color: ColorSpec | string;
    markedForRemoval: boolean;

    willCollideWith(otherCircle: ICircle): boolean;
    distanceBetweenEdges(otherCircle: ICircle): number;
    distanceBetweenCenters(otherCircle: ICircle): number;
}
