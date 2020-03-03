import { BaseConstrainedRenderer } from "./base-constrained-renderer";
import { Circle } from "./circle";

class CircleWithPolarData extends Circle {
    constructor(centerX: number, centerY: number, radius: number, color: ColorSpec = "", public distanceFromCenter: number, public angle: number) {
        super(centerX, centerY, radius, color);
        //console.log("CircleWithPolarData", centerX, centerY)
    }

    moveOutFromCenter(pixelsIncrease: number): void {
        const originalCoodinates = {
            x: (Math.cos(this.angle) * this.distanceFromCenter),
            y: (Math.sin(this.angle) * this.distanceFromCenter)
        };

        this.distanceFromCenter = this.distanceFromCenter + pixelsIncrease;

        const newCoodinates = {
            x: (Math.cos(this.angle) * this.distanceFromCenter),
            y: (Math.sin(this.angle) * this.distanceFromCenter)
        };

        this.centerX = this.centerX + (newCoodinates.x - originalCoodinates.x );
        this.centerY = this.centerY + (newCoodinates.y - originalCoodinates.y );

        //console.log(this.distanceFromCenter, this.centerX, this.centerY, newCoodinates)
    }
}

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
        this.circles = this.circles.filter((c) => ! c.markedForRemoval);

        this.circles.forEach((c) => {
            const circle = (c as CircleWithPolarData);
            circle.moveOutFromCenter(1);
            if (this.drawingMechanics.areCoordinatesOutOfBounds(circle.centerX, circle.centerY)) {
                circle.markedForRemoval = true;
            }
        });

        //console.log("calculateAnimationFrame", this.circles.length);
        return this.circles.length > 0;
    }

    protected calculateACircle(sizeChoices: SizeChoice[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }
        
        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, sizeChoices);
        if (circleSize) {
            let randomColor = this.circleColorSpecs[this.pickCircleColor(newCoordinates.x, newCoordinates.y) as string] as any; 
            randomColor = { ...randomColor, alpha: this.calculateAlpha(newCoordinates.distanceFromCenter) };
            const circle = new CircleWithPolarData(newCoordinates.x, newCoordinates.y, circleSize, randomColor, newCoordinates.distanceFromCenter, newCoordinates.angle);
            this.addCircle(circle);
        }
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
