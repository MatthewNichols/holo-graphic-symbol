import { HoloDesignRenderer } from "../drawing/holo-design-renderer";

var holoDesign: HoloDesignRenderer;

export const createDesignRenderer = () => {

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

        holoDesign = new HoloDesignRenderer(context1, config);

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
