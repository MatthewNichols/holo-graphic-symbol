import { CircleConstrainedRender, HaloRender } from '../drawing/main-circle-renderer';
import { CanvasDrawingMechanics } from "../drawing/canvas-drawing-mechanics";

const circleRadii = [ 17, 10, 8, 5 ];
const circleColors = ["#1497A2", "#4A3B8E", "#1577B2"];

var canvas1 = document.getElementById("circles-1") as HTMLCanvasElement;
const palletteSize = 1000;
// Set Canvas dimensions
canvas1.width = palletteSize;
canvas1.height = palletteSize;
// Get drawing context
var context1 = canvas1.getContext('2d');

if (context1) {
    const circlesInCircleRender = 
        new CircleConstrainedRender(500, 500, circleRadii, circleColors, new CanvasDrawingMechanics(context1), 200);
    
    const haloRender = 
        new HaloRender(500, 500, circleRadii.slice(1), circleColors, new CanvasDrawingMechanics(context1), 250, 150);

    console.time("Loop")

    circlesInCircleRender.render();
    haloRender.render();

    console.timeEnd("Loop");
    console.log(`${circlesInCircleRender.circles.length} Total`)
} else {
    console.error("No Canvas context found");
}