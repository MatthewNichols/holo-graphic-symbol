
type XYCoordinates = {x: number, y: number };
type CoordinatesTestFunction = (coordinates: XYCoordinates) => boolean;
type SizeChoice = { size: number, weight: number };
type ColorSpec = { r: number, g: number, b: number, alpha?: number };

type HoloDesignRendererConfig = {
    center: XYCoordinates,
    circleRadius: number,
    gapToHalo: number,
    haloThickness: number,
    burstThickness: number,
    mainCircleSizes: SizeChoice[], 
    haloCircleSizes: SizeChoice[], 
    circleColors: string[]
}

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