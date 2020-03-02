import { BaseConstrainedRenderer } from "./base-constrained-renderer";
export class HaloRenderer extends BaseConstrainedRenderer {
    constructor(centerX: number, centerY: number, circleRadii: number[], circleColors: string[], drawingMechanics: IDrawingMechanics, radius: number, public haloThickness: number) {
        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);
    }
    render() {
        // Iterate to draw a lot of circles
        for (var i = 0; i < 600; i++) {
            this.renderACircle(this.circleRadii);
        }
    }
    getNewCoordinates() {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistanceFromCenter = ((Math.log(1 - Math.random()) / -4.5) * this.haloThickness) + this.radius;
        
        const candidateCoodinates = {
            x: (Math.cos(randomAngle) * randomDistanceFromCenter),
            y: (Math.sin(randomAngle) * randomDistanceFromCenter)
        };
        
        return {
            x: candidateCoodinates.x + this.centerX,
            y: candidateCoodinates.y + this.centerY
        };
    }
}
