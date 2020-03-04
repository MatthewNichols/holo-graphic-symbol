import { HaloRenderer } from "./halo-renderer";
import { Circle } from "./circle";

class CircleWithPolarData extends Circle {
    constructor(centerX: number, centerY: number, radius: number, color: ColorSpec | string = "", public distanceFromCenter: number, public angle: number) {
        super(centerX, centerY, radius, color);
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
    }
}

export class BurstRenderer extends HaloRenderer { 

    calculateAnimationFrame(): boolean {
        this.circles = this.circles.filter((c) => ! c.markedForRemoval);

        this.circles.forEach((c) => {
            const circle = (c as CircleWithPolarData);
            circle.moveOutFromCenter(2);
            if (this.drawingMechanics.areCoordinatesOutOfBounds(circle.centerX, circle.centerY)) {
                circle.markedForRemoval = true;
            }
        });

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
}