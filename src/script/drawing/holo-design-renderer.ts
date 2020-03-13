import { CircleConstrainedRender } from './main-circle-renderer';
import { HaloRenderer } from "./halo-renderer";
import { BurstRenderer } from "./burst-renderer";
import { MarkRender } from "./mark-renderer";
import { CanvasDrawingMechanics } from "./canvas-drawing-mechanics";

export class HoloDesignRenderer {
    constructor(drawingMechanics: IDrawingMechanics, private config: HoloDesignRendererConfig) {
        const { center, circleRadius, gapToHalo, haloThickness, burstThickness, mainCircleSizes, haloCircleSizes, 
            circleColors, mainCircleNumberOfAttempts, haloNumberOfAttempts, burstNumberOfAttempts, logoColor, burstNumberPixelsMovePerFrame } = config;
        
        this.drawingMechanics = drawingMechanics;
        this.mainCircle = new CircleConstrainedRender(center.x, center.y, mainCircleSizes, circleColors, this.drawingMechanics, circleRadius, mainCircleNumberOfAttempts);
        this.halo = new HaloRenderer(center.x, center.y, haloCircleSizes, circleColors, this.drawingMechanics, circleRadius + gapToHalo, haloThickness, haloNumberOfAttempts);
        this.burst = new BurstRenderer(center.x, center.y, haloCircleSizes, circleColors, this.drawingMechanics, circleRadius + gapToHalo, burstThickness, burstNumberOfAttempts, burstNumberPixelsMovePerFrame);
        this.mark = new MarkRender(center.x, center.y, this.drawingMechanics, 200, logoColor);
    }

    drawingMechanics: IDrawingMechanics;
    mainCircle: CircleConstrainedRender;
    halo: HaloRenderer;
    burst: BurstRenderer;
    mark: MarkRender;

    private animationFrameRequestId: number = 0;

    render() {
        this.cancelRunningAnimation();
        this.drawingMechanics.clear(this.config.canvasBackgroundColor);
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

    clearData() : void {
        this.mainCircle.clearData();
        this.halo.clearData();
        this.burst.clearData();
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
                tickCountdown = this.config.animationLoopFrameLength + tickCountdown;

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
                this.animationFrameRequestId = window.requestAnimationFrame(animationLoop);
            } else {
                console.log("animation complete");
            }
        }

        this.animationFrameRequestId = window.requestAnimationFrame(animationLoop);
    }

    cancelRunningAnimation() {
        if (this.animationFrameRequestId) {
            window.cancelAnimationFrame(this.animationFrameRequestId);
        }
    }

    injectDebug() {
        //@ts-ignore
        window.renderers = { mainCircle: this.mainCircle, halo: this.halo, burst: this.burst, mark: this.mark };
    }
}