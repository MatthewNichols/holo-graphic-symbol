import { ICircle, IPositionSector } from "../types";

export class CircleContainer {
    constructor(public containerWidthHeight: number, public centerX: number, public centerY: number) {
        this.sectorWidth = Math.floor(this.containerWidthHeight / this.numberOfSectorDivisions);
        this.sectorHeight = Math.floor(this.containerWidthHeight / this.numberOfSectorDivisions);
    }

    readonly numberOfSectorDivisions = 10;
    private items = new Array<ICircle>();
    private sectorWidth: number;
    private sectorHeight: number;

    calculateSector(x: number, y: number): IPositionSector {
        return {
            row: Math.floor(y / this.sectorHeight),
            column:Math.floor(x / this.sectorWidth)
        }
    }

    push(...items: ICircle[]): number {
        items.forEach((c: ICircle) =>{
            let sector = this.calculateSector(c.centerX, c.centerY);
            c.sectorRow = sector.row;
            c.sectorColumn = sector.column;
            this.items.push(c);
        });

        return this.items.length;
    }

    forEach(callbackfn: (value: ICircle, index: number, array: ICircle[]) => void): void {
        this.items.forEach(callbackfn);
    }

    some(callbackfn: (value: ICircle, index: number, array: ICircle[]) => unknown): boolean {
        return this.items.some(callbackfn);
    }

    map<U>(callbackfn: (value: ICircle, index: number, array: ICircle[]) => U): U[] {
        return this.items.map(callbackfn);
    }

    clear() {
        this.items = [];
    }

    filter(callbackfn: (value: ICircle, index: number, array: ICircle[]) => unknown): ICircle[] {
        return this.items.filter(callbackfn);
    }

    removeItemsMarkedForRemoval() {
        this.items = this.items.filter((c) => ! c.markedForRemoval);
    }
    
    public get length() : number {
        return this.items.length;
    }
    
    getCirclesInNearSectors(x: number, y: number): ICircle[] {
        const coordinatesSector = this.calculateSector(x, y);
        const circles = this.items
            .filter((c) => c.sectorColumn >= coordinatesSector.column - 1 
                        && c.sectorColumn <= coordinatesSector.column + 1
                        && c.sectorRow >= coordinatesSector.row - 1
                        && c.sectorRow <= coordinatesSector.row + 1
        );

        //console.log(coordinatesSector, circles.length);
        return circles;
    }

    getNearestCircleToCoordinates(x: number, y: number): ICircle | null {
        const distanceCalc = (otherCircle: ICircle) => {
            const xDiff = x - otherCircle.centerX;
            const yDiff = y - otherCircle.centerY;
            return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        };

        const closestCircle = this.getCirclesInNearSectors(x, y)
            .map((c) => ({ distance: distanceCalc(c), circle: c }))
            .sort((a, b) => (a.distance > b.distance) ? 1 : -1);
        if (closestCircle.length) {
            return closestCircle[0].circle;
        }

        return null;
    }
}
