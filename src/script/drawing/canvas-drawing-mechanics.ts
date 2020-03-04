
export class CanvasDrawingMechanics implements IDrawingMechanics {
    constructor(private context: CanvasRenderingContext2D) {
        this.canvasWidth = context.canvas.width;
        this.canvasHeight = context.canvas.height;
    }

    readonly canvasWidth: number;
    readonly canvasHeight: number;

    clear() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawCircleObject(circle: ICircle) {
        this.context.beginPath();
        this.context.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = this.resolveColorExpression(circle.color);
        this.context.fill();
    }

    resolveColorExpression(color: ColorSpec | string): string {
        if (typeof color === "string") {
            return color;
        }
        if (color.b !== undefined) {
            return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha != null ? color.alpha : 1})`;
        }

        return "";
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
