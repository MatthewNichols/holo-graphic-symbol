import { CircleConstrainedRender } from '../drawing/main-circle-renderer';
import { HaloRenderer } from "../drawing/halo-renderer";
import { BurstRenderer } from "../drawing/burst-renderer";
import { MarkRender } from "../drawing/mark-renderer";
import { CanvasDrawingMechanics } from "../drawing/canvas-drawing-mechanics";

const scalingFactor = 400 / 912; 
const mainCircleSizes: SizeChoice[] = [
    { size: 17, weight: 1 },
    { size: 12, weight: 1 },
    { size: 8, weight: 1.25 },
    { size: 5, weight: 1.25 },
    //{ size: 3, weight: 2.5 }
].map((s) => ({ size: s.size * scalingFactor, weight: s.weight }));

const haloCircleSizes: SizeChoice[] = [
    { size: 10, weight: 0.6 },
    { size: 8, weight: 1.5 },
    { size: 5, weight: 2.5 },
    { size: 3, weight: 2.5 }
].map((s) => ({ size: s.size * scalingFactor, weight: s.weight }));

const circleColors = ["#1497A2", "#4A3B8E", "#1577B2"];

var canvas1 = document.getElementById("holo-burst") as HTMLCanvasElement;
const palletteSize = 1000;
// Set Canvas dimensions
canvas1.width = palletteSize;
canvas1.height = palletteSize;
// Get drawing context
var context1 = canvas1.getContext('2d', { alpha: false });

if (context1) {
    const drawingMechanics = new CanvasDrawingMechanics(context1);
    const mainCircle = new CircleConstrainedRender(500, 500, mainCircleSizes, circleColors, drawingMechanics, 200);
    const halo = new HaloRenderer(500, 500, haloCircleSizes, circleColors, drawingMechanics, 215, 75);
    const burst = new BurstRenderer(500, 500, haloCircleSizes, circleColors, drawingMechanics, 215, 75);
    const mark = new MarkRender(500, 500, drawingMechanics, 200);

    //window.renderers = { mainCircle, halo, burst, mark }

    function renderAll() {
        drawingMechanics.clear();
        mainCircle.render();
        halo.render();
        burst.render();
        mark.render();    
    }

    console.time("calculateInitial")

    mainCircle.calculateInitial();
    halo.calculateInitial();
    burst.calculateInitial();

    console.timeEnd("calculateInitial");
    console.time("Render");
    
    renderAll();

    console.timeEnd("Render");
    console.log(`${mainCircle.circles.length} Total`);

    let lastTimestamp: DOMHighResTimeStamp = 0;
    let tickCountdown = 20;
    let burstContinue = true;
    let haloContinue = true;
    const animationLoop = (timestamp: DOMHighResTimeStamp) => {
        const timeSinceLastCall = timestamp - lastTimestamp;
        let continueAnimation = true;
        
        tickCountdown = tickCountdown - timeSinceLastCall;
        if (tickCountdown < 0) {
            //console.log("tick", tickCountdown);
            tickCountdown = 20 + tickCountdown;
            // do work

            if (burstContinue) {
                burstContinue = burst.calculateAnimationFrame();
            } else {
                haloContinue = halo.calculateAnimationFrame();
            }
            continueAnimation = burstContinue || haloContinue;
            
            renderAll();
        }

        lastTimestamp = timestamp;
        if (continueAnimation) {
            window.requestAnimationFrame(animationLoop);
        } else {
            console.log("animation complete");
        }
    }

    window.requestAnimationFrame(animationLoop);

} else {
    console.error("No Canvas context found");
}