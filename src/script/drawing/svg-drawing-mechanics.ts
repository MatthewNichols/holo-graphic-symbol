import { SVG, Svg } from '@svgdotjs/svg.js';
import { IDrawingMechanics, ICircle } from "../types";
import { resolveColorExpression } from './drawing-utils';

export class SvgDrawingMechanics implements IDrawingMechanics {
    constructor(containerSelector: string, public palletteSize: number) {
        //@ts-ignore
        this.draw = SVG(containerSelector);
        this.draw.size(palletteSize, palletteSize);
    }

    draw: Svg;

    clear(colorCode: string): void {
        this.draw.rect(this.palletteSize, this.palletteSize).fill(colorCode);
    }

    drawCircleObject(circle: ICircle): void {
        this.draw.circle(circle.radius).center(circle.centerX, circle.centerY).fill(resolveColorExpression(circle.color))
    }

    drawSvgPath(pathString: string, color: string): void {
        this.draw.path(pathString).fill(color);
    }
    
    areCoordinatesOutOfBounds(x: number, y: number): boolean {
        //return (x < 0 || y < 0 || x > this.palletteSize || y > this.palletteSize);
        return true;
    }


}