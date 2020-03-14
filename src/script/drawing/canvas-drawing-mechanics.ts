import { IDrawingMechanics, ICircle, ColorSpec } from "../types";
import { resolveColorExpression } from "./drawing-utils";

export class CanvasDrawingMechanics implements IDrawingMechanics {
    constructor(private context: CanvasRenderingContext2D) {
        this.canvasWidth = context.canvas.width;
        this.canvasHeight = context.canvas.height;
    }

    readonly canvasWidth: number;
    readonly canvasHeight: number;

    clear(colorCode: string = "#000") {
        this.context.fillStyle = colorCode;
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawCircleObject(circle: ICircle) {
        this.context.beginPath();
        this.context.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = resolveColorExpression(circle.color);
        this.context.fill();
    }

    drawSvgPath(pathString: string, color: string) {
        this.context.fillStyle = color;
        const pathObj = new Path2D(pathString);
        //console.log(pathObj)
        this.context.fill(pathObj);
    }

    areCoordinatesOutOfBounds(x: number, y: number): boolean {
        return (x < 0 || y < 0 || x > this.canvasWidth || y > this.canvasHeight);
    }

    //drawSvgPath(pathString: string, color: string) {
        // this.context.fillStyle = color;
        // this.context.fill(new Path2D(pathString));
        // const svgSrc = document.getElementById("mark-src") as CanvasImageSource;
        // console.log(svgSrc)
        // this.context.drawImage(svgSrc, 500, 500)
    //}
}
