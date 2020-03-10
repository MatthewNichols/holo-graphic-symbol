import { BaseConstrainedRenderer } from "./base-constrained-renderer";

export class CircleConstrainedRender extends BaseConstrainedRenderer {
    constructor(centerX: number, centerY: number, circleRadii: SizeChoice[], circleColors: string[], 
        drawingMechanics: IDrawingMechanics, radius: number, private numberOfCircleAttempts: number) {

        super(centerX, centerY, circleRadii, circleColors, drawingMechanics, radius);
        this.diameter = radius * 2;
    }

    diameter: number;

    calculateInitial() {
        for (var i = 0; i < this.numberOfCircleAttempts; i++) {
            this.calculateACircle(this.circleRadii);
        }
    }

    getNewCoordinates() {
        const genCandidateHalf = () => Math.random() * this.diameter;

        var candidateCoodinates; 
        let n = 0;
        while (n < 2) {
            candidateCoodinates = { x: genCandidateHalf(), y: genCandidateHalf() };
            //test that the candidate falls inside a circle centered on (radius, radius) of radius radius
            if (this.measureCoordinatesDistanceFromCenter(candidateCoodinates) < this.radius) {
                break;
            }
            n =+ 1;
        }

        if (candidateCoodinates) {    
            return { 
                x: candidateCoodinates.x + (this.centerX - this.radius),
                y: candidateCoodinates.y + (this.centerY - this.radius)
            };
        }

        return null;
    }
}