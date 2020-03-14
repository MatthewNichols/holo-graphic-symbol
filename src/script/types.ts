
export type XYCoordinates = {x: number, y: number };
export type CoordinatesTestFunction = (coordinates: XYCoordinates) => boolean;
export type SizeChoice = { size: number, weight: number };
export type ColorSpec = { r: number, g: number, b: number, alpha?: number };

export type HoloDesignRendererConfig = {
    center: XYCoordinates,
    circleRadius: number,
    gapToHalo: number,
    haloThickness: number,
    burstThickness: number,
    mainCircleSizes: SizeChoice[], 
    haloCircleSizes: SizeChoice[], 
    circleColors: string[],
    mainCircleNumberOfAttempts: number,
    haloNumberOfAttempts: number,
    burstNumberOfAttempts: number,
    canvasBackgroundColor: string,
    logoColor: string,

    /**
     * Number of milliseconds between animation frames 
     */
    animationLoopFrameLength: number,
    burstNumberPixelsMovePerFrame: number,
    renderType: RenderTypes 
}

export enum RenderTypes {
    Canvas = "canvas",
    SVG = "svg"
}

export interface IDrawingMechanics {
    clear(colorCode: string): void;
    drawCircleObject(circle: ICircle): void;
    drawSvgPath(pathString: string, color: string): void;
    areCoordinatesOutOfBounds(x: number, y: number): boolean;
}

export interface ICircle {
    centerX: number;
    centerY: number;
    radius: number;
    color: ColorSpec | string;
    markedForRemoval: boolean;

    willCollideWith(otherCircle: ICircle): boolean;
    distanceBetweenEdges(otherCircle: ICircle): number;
    distanceBetweenCenters(otherCircle: ICircle): number;
}
