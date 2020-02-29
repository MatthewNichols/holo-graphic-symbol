
export class CanvasDrawingMechanics implements IDrawingMechanics {
    constructor(private context: CanvasRenderingContext2D) {
    }

    drawCircleObject(circle: ICircle) {
        this.context.beginPath();
        this.context.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = circle.color;
        this.context.fill();
    }
}
