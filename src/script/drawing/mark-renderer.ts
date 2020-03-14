import { IDrawingMechanics } from "../types";

export class MarkRender {
    constructor(public centerX: number, public centerY: number, private drawingMechanics: IDrawingMechanics, public radius: number, public color: string) {    }
    
    private markPath = "m165.164,91.794c9.968,-53.764 60.884,-98.804 135.076,-90.594c-1.853,4.343 -10.778,25.551 -13.56,30.24c-40.15,0 -74.459,22.23 -82.718,60.442c7.803,0.01 14.596,0.009 19.836,-0.009c7.124,0.32 11.493,2.269 11.493,2.269c0,0 -9.972,23.157 -12.201,28.269c-0.47,1.077 -0.869,2.426 -2.614,2.406c-0.621,-0.007 -6.695,-0.005 -16.089,0c8.783,33.139 41.907,59.91 81.093,58.063c1.33,3.423 12.277,28.558 13.2,30.96c-67.1,8.445 -123.012,-36.372 -133.483,-88.999l-11.405,0.007c-4.259,0.002 -8.518,0.004 -12.777,0.005l-5.928,0.002c-10.354,52.724 -66.331,97.682 -133.527,89.225c0.923,-2.402 11.87,-27.537 13.2,-30.96c39.268,1.851 72.45,-25.037 81.147,-58.269c-10.846,-0.008 -19.476,-0.024 -24.147,-0.051c-7.919,-0.377 -12.708,-2.083 -12.708,-2.083c0,0 9.618,-22.306 11.83,-27.722c1.186,-2.906 1.257,-3.079 4.983,-3.149c4.401,-0.082 11.503,-0.127 20.321,-0.146c-8.415,-37.951 -42.621,-60.02 -82.626,-60.02c-2.782,-4.689 -11.707,-25.897 -13.56,-30.24c74.046,-8.194 124.907,36.652 135.017,90.279c9.888,0.02 20.143,0.048 30.147,0.075Z";
         
    render() {
        const xOffset = (this.centerX - this.radius / 2) - 50; //- the fudge factor. Fix later
        const yOffset = (this.centerY - this.radius / 2) - 10; //- the fudge factor. Fix later
        const initialMoveCommand = `M${xOffset},${yOffset}`;
        this.drawingMechanics.drawSvgPath(initialMoveCommand + this.markPath, this.color);
    }
}