import { HoloDesignRenderer } from "./holo-design-renderer";

var holoDesign: HoloDesignRenderer;

export const getConfig = (): HoloDesignRendererConfig => {
        const scalingFactor = 400 / 912; 
        const mainCircleSizes: SizeChoice[] = [
            { size: 17, weight: 10 },
            { size: 12, weight: 10 },
            { size: 8, weight: 12 },
            { size: 5, weight: 12 },
        ];
        
        const haloCircleSizes: SizeChoice[] = [
            { size: 10, weight: 6 },
            { size: 8, weight: 15 },
            { size: 5, weight: 25 },
            { size: 3, weight: 25 }
        ];
            
        const config: HoloDesignRendererConfig = {
            center: { x: 500, y: 500},
            circleRadius: 200,
            gapToHalo: 15,
            haloThickness: 75,
            burstThickness: 75,
            mainCircleSizes,
            haloCircleSizes,
            circleColors: ["#1497A2", "#4A3B8E", "#1577B2"],
            mainCircleNumberOfAttempts: 5000,
            haloNumberOfAttempts: 1600,
            burstNumberOfAttempts: 1600,
            canvasBackgroundColor: "#000",
            logoColor: "#000"
        };

        return config;
}
;
export const createDesignRenderer = (config: HoloDesignRendererConfig) => {

    var canvas1 = document.getElementById("holo-burst") as HTMLCanvasElement;
    const palletteSize = 1000;
    // Set Canvas dimensions
    canvas1.width = palletteSize;
    canvas1.height = palletteSize;
    // Get drawing context
    var context1 = canvas1.getContext('2d', { alpha: false });

    if (context1) {
        const scalingFactor = 400 / 912; 
        const scalingFunction = (s: { size: number; weight: number; }): { size: number; weight: number; } => ({ size: s.size * scalingFactor, weight: s.weight });
            
        const scaledConfig: HoloDesignRendererConfig = {
            ...config,
            mainCircleSizes: config.mainCircleSizes.map(scalingFunction),
            haloCircleSizes: config.haloCircleSizes.map(scalingFunction)
        }

        holoDesign = new HoloDesignRenderer(context1, scaledConfig);

        console.log("created")

    } else {
        console.error("No Canvas context found");
    }
};

export const render = () => {
    console.time("calculateInitial")
    holoDesign.calculateInitialFrame();
    console.timeEnd("calculateInitial");

    console.time("Render");
    holoDesign.render();
    console.timeEnd("Render");
    console.log(`${holoDesign.mainCircle.circles.length} Total`);

    holoDesign.animate();
};

export const clearData = () => {
    holoDesign.clearData();
}