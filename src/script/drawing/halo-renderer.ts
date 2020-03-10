import { BaseConstrainedRenderer } from "./base-constrained-renderer";
import { Circle } from "./circle";

class CircleWithColorAnimationData extends Circle {
    constructor(centerX: number, centerY: number, radius: number, color: ColorSpec | string = "") {
        super(centerX, centerY, radius, color);

        if (typeof color !== "string") {
            this.colorTarget = color;
            this.color = { ...color, alpha: 0 }
        }

    }

    colorTarget: ColorSpec | null = null;
    animationComplete: boolean = false;
}

export class HaloRenderer extends BaseConstrainedRenderer {
    constructor(centerX: number, centerY: number, circleRadii: SizeChoice[], circleColors: string[], 
            drawingMechanics: IDrawingMechanics, radius: number, public haloThickness: number, private numberOfCircleAttempts: number) {
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
        for (var i = 0; i < this.numberOfCircleAttempts; i++) {
            this.calculateACircle(this.circleRadii);
        }
    }
    
    calculateAnimationFrame(): boolean {
        const circlesWithAnimationData = this.circles as CircleWithColorAnimationData[];
        circlesWithAnimationData
            .filter((c) => !c.animationComplete)
            .forEach((c) => {
                var cSpec = c.color as ColorSpec;
                const currentAlpha = cSpec.alpha || 0;
                //@ts-ignore
                if (currentAlpha < c.colorTarget?.alpha) {
                    c.color = { ...cSpec, alpha: currentAlpha + .02 }
                } else {
                    c.animationComplete = true;
                }
        });

        return circlesWithAnimationData.some((c) => !c.animationComplete);
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
        } : { r: 0, g: 0, b: 0, alpha: 0};
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

    protected calculateACircle(sizeChoices: SizeChoice[]) {
        const newCoordinates = this.getNewCoordinates();
        if (!newCoordinates) {
            return;
        }
        
        const circleSize = this.pickNewCircleSize(newCoordinates.x, newCoordinates.y, sizeChoices);
        if (circleSize) {
            let randomColor = this.circleColorSpecs[this.pickCircleColor(newCoordinates.x, newCoordinates.y) as string] as any; 
            randomColor = { ...randomColor, alpha: this.calculateAlpha(newCoordinates.distanceFromCenter) };
            const circle = new CircleWithColorAnimationData(newCoordinates.x, newCoordinates.y, circleSize, randomColor);
            this.addCircle(circle);
        }
    }
}