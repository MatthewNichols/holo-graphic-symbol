import { CircleConstrainedRender } from '../drawing/main-circle-renderer';
import { HaloRenderer } from "../drawing/halo-renderer";
import { BurstRenderer } from "../drawing/burst-renderer";
import { MarkRender } from "../drawing/mark-renderer";
import { CanvasDrawingMechanics } from "../drawing/canvas-drawing-mechanics";

type HoloDesignRendererConfig = {
    center: XYCoordinates,
    circleRadius: number,
    gapToHalo: number,
    haloThickness: number,
    burstThickness: number,
    mainCircleSizes: SizeChoice[], 
    haloCircleSizes: SizeChoice[], 
    circleColors: string[]
}

class HoloDesignRenderer {
    constructor(context: CanvasRenderingContext2D, config: HoloDesignRendererConfig) {
        const { center, circleRadius, gapToHalo, haloThickness, burstThickness, mainCircleSizes, haloCircleSizes, circleColors } = config;
        this.drawingMechanics = new CanvasDrawingMechanics(context);
        this.mainCircle = new CircleConstrainedRender(center.x, center.y, mainCircleSizes, circleColors, this.drawingMechanics, circleRadius);
        this.halo = new HaloRenderer(center.x, center.y, haloCircleSizes, circleColors, this.drawingMechanics, circleRadius + gapToHalo, haloThickness);
        this.burst = new BurstRenderer(center.x, center.y, haloCircleSizes, circleColors, this.drawingMechanics, circleRadius + gapToHalo, burstThickness);
        this.mark = new MarkRender(center.x, center.y, this.drawingMechanics, 200);
    }

    drawingMechanics: CanvasDrawingMechanics;
    mainCircle: CircleConstrainedRender;
    halo: HaloRenderer;
    burst: BurstRenderer;
    mark: MarkRender;

    render() {
        this.drawingMechanics.clear();
        this.mainCircle.render();
        this.halo.render();
        this.burst.render();
        this.mark.render();    
    }

    calculateInitialFrame() : void {
        this.mainCircle.calculateInitial();
        this.halo.calculateInitial();
        this.burst.calculateInitial();
    }

    animate() {
        let lastTimestamp: DOMHighResTimeStamp = 0;
        let tickCountdown = 20;
        let burstContinue = true;
        let haloContinue = true;
        const animationLoop = (timestamp: DOMHighResTimeStamp) => {
            const timeSinceLastCall = timestamp - lastTimestamp;
            let continueAnimation = true;
            
            tickCountdown = tickCountdown - timeSinceLastCall;
            if (tickCountdown < 0) {
                tickCountdown = 20 + tickCountdown;

                if (burstContinue) {
                    burstContinue = this.burst.calculateAnimationFrame();
                } else {
                    haloContinue = this.halo.calculateAnimationFrame();
                }
                continueAnimation = burstContinue || haloContinue;
                
                this.render();
            }

            lastTimestamp = timestamp;
            if (continueAnimation) {
                window.requestAnimationFrame(animationLoop);
            } else {
                console.log("animation complete");
            }
        }

        window.requestAnimationFrame(animationLoop);
    }

    injectDebug() {
        //@ts-ignore
        window.renderers = { mainCircle: this.mainCircle, halo: this.halo, burst: this.burst, mark: this.mark };
    }
}

var canvas1 = document.getElementById("holo-burst") as HTMLCanvasElement;
const palletteSize = 1000;
// Set Canvas dimensions
canvas1.width = palletteSize;
canvas1.height = palletteSize;
// Get drawing context
var context1 = canvas1.getContext('2d', { alpha: false });

if (context1) {
    const scalingFactor = 400 / 912; 
    const mainCircleSizes: SizeChoice[] = [
        { size: 17, weight: 1 },
        { size: 12, weight: 1 },
        { size: 8, weight: 1.25 },
        { size: 5, weight: 1.25 },
    ].map((s) => ({ size: s.size * scalingFactor, weight: s.weight }));
    
    const haloCircleSizes: SizeChoice[] = [
        { size: 10, weight: 0.6 },
        { size: 8, weight: 1.5 },
        { size: 5, weight: 2.5 },
        { size: 3, weight: 2.5 }
    ].map((s) => ({ size: s.size * scalingFactor, weight: s.weight }));
        
    const config: HoloDesignRendererConfig = {
        center: { x: 500, y: 500},
        circleRadius: 200,
        gapToHalo: 15,
        haloThickness: 75,
        burstThickness: 75,
        mainCircleSizes,
        haloCircleSizes,
        circleColors: ["#1497A2", "#4A3B8E", "#1577B2"]
    }

    const holoDesign = new HoloDesignRenderer(context1, config);

    console.time("calculateInitial")
    holoDesign.calculateInitialFrame();
    console.timeEnd("calculateInitial");

    console.time("Render");
    holoDesign.render();
    console.timeEnd("Render");
    console.log(`${holoDesign.mainCircle.circles.length} Total`);

    holoDesign.animate();

} else {
    console.error("No Canvas context found");
}