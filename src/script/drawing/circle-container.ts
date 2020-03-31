import { ICircle } from "../types";

export class CircleContainer {
    private items = new Array<ICircle>();

    push(...items: ICircle[]): number {
        return this.items.push(...items);
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
}
