import { CircleConstrainedRender } from './main-circle-renderer';
import { HaloRenderer } from "./halo-renderer";
import { BurstRenderer } from "./burst-renderer";
import { MarkRender } from "./mark-renderer";
import { CanvasDrawingMechanics } from "./canvas-drawing-mechanics";

export class HoloDesignRenderer {
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