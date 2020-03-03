
type XYCoordinates = {x: number, y: number };
type CoordinatesTestFunction = (coordinates: XYCoordinates) => boolean;
type SizeChoice = { size: number, weight: number };
type ColorSpec = string | { r: number, g: number, b: number, alpha?: number };

interface IDrawingMechanics {
    drawCircleObject(circle: ICircle): void;
    drawSvgPath(pathString: string, color: string): void;
}

interface ICircle {
    centerX: number;
    centerY: number;
    radius: number;
    color: ColorSpec;

    willCollideWith(otherCircle: ICircle): boolean;
    distanceBetweenEdges(otherCircle: ICircle): number;
    distanceBetweenCenters(otherCircle: ICircle): number;
}
