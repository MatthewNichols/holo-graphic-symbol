
export class CanvasDrawingMechanics implements IDrawingMechanics {
    constructor(private context: CanvasRenderingContext2D) {
    }

    drawCircleObject(circle: ICircle) {
        this.context.beginPath();
        this.context.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = circle.color;
        this.context.fill();
    }

    drawSvgPath(pathString: string, color: string) {
        this.context.fillStyle = color;
        const pathObj = new Path2D(pathString);
        console.log(pathObj)
        this.context.fill(pathObj);
    }

    //drawSvgPath(pathString: string, color: string) {
        // this.context.fillStyle = color;
        // this.context.fill(new Path2D(pathString));
        // const svgSrc = document.getElementById("mark-src") as CanvasImageSource;
        // console.log(svgSrc)
        // this.context.drawImage(svgSrc, 500, 500)
    //}
}
