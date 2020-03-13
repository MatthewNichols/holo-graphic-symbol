export class SvgDrawingMechanics implements IDrawingMechanics {
    clear(colorCode: string): void {
        throw new Error("Method not implemented.");
    }

    drawCircleObject(circle: ICircle): void {
        throw new Error("Method not implemented.");
    }

    drawSvgPath(pathString: string, color: string): void {
        throw new Error("Method not implemented.");
    }
    
    areCoordinatesOutOfBounds(x: number, y: number): boolean {
        throw new Error("Method not implemented.");
    }


}