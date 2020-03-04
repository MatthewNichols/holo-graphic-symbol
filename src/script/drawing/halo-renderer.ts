import { BaseConstrainedRenderer } from "./base-constrained-renderer";

export class HaloRenderer extends BaseConstrainedRenderer {
    constructor(centerX: number, centerY: number, circleRadii: SizeChoice[], circleColors: string[], 
            drawingMechanics: IDrawingMechanics, radius: number, public haloThickness: number) {
        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);

        let circleColorSpecs: {[key: string]: ColorSpec} = {};
        circleColors.forEach((c) => {
            circleColorSpecs[c] = this.hexToRgbColorSpec(c);
        });
        this.circleColorSpecs = circleColorSpecs;
         
    }

    readonly greatestDistanceFromCenter = this.radius + this.haloThickness;
    readonly circleColorSpecs: {[key: string]: ColorSpec};

    calculateInitial() {
        // Iterate to draw a lot of circles
        for (var i = 0; i < 1600; i++) {
            this.calculateACircle(this.circleRadii);
        }
    }
    
    calculateAnimationFrame(): boolean {
        return false;
    }

    calculateAlpha(distanceFromCenter: number): number {
        return Math.pow((this.greatestDistanceFromCenter - distanceFromCenter) / this.haloThickness, 2);
    }

    hexToRgbColorSpec(hexColorCode: string): ColorSpec {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColorCode);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
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
            distanceFromCenter: randomDistanceFromCenter,
            angle: randomAngle
        };
    }
}