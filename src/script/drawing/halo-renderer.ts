import { BaseConstrainedRenderer } from "./base-constrained-renderer";
import { Circle } from "./circle";

export class HaloRenderer extends BaseConstrainedRenderer {
    constructor(centerX: number, centerY: number, circleRadii: SizeChoice[], circleColors: string[], 
            drawingMechanics: IDrawingMechanics, radius: number, public haloThickness: number) {
        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);
    }

    readonly greatestDistanceFromCenter = this.radius + this.haloThickness;

    render() {
        // Iterate to draw a lot of circles
        for (var i = 0; i < 1600; i++) {
            this.renderACircle(this.circleRadii);
        }
    }
    
    protected renderACircle(sizeChoices: SizeChoice[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }
        
        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, sizeChoices);
        if (circleSize) {
            let randomColor =  this.hexToRgbColorSpec(this.pickCircleColor(newCoordinates.x, newCoordinates.y) as string, 
                this.calculateAlpha(newCoordinates.distanceFromCenter));
            const circle = new Circle(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
            this.add(circle);
        }
    }

    calculateAlpha(distanceFromCenter: number): number {
        return Math.pow((this.greatestDistanceFromCenter - distanceFromCenter) / this.haloThickness, 2);
    }

    hexToRgbColorSpec(hexColorCode: string, alpha: number = 1): ColorSpec {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColorCode);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            alpha
        } : "";
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
            y: candidateCoodinates.y + this.centerY,
            distanceFromCenter: randomDistanceFromCenter
        };
    }
}
