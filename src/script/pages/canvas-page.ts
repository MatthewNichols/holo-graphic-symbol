import { CircleConstrainedRender } from '../drawing/main-circle-renderer';
import { HaloRenderer } from "../drawing/halo-renderer";
import { MarkRender } from "../drawing/mark-renderer";
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
    const drawingMechanics = new CanvasDrawingMechanics(context1);
    const mainCircle = new CircleConstrainedRender(500, 500, circleRadii, circleColors, drawingMechanics, 200);
    const halo = new HaloRenderer(500, 500, circleRadii.slice(1), circleColors, drawingMechanics, 250, 150);
    const mark = new MarkRender(500, 500, drawingMechanics, 200);
    console.time("Loop")

    mainCircle.render();
    halo.render();
    mark.render();

    console.timeEnd("Loop");
    console.log(`${mainCircle.circles.length} Total`)
} else {
    console.error("No Canvas context found");
}