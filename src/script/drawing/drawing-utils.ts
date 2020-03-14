import { ColorSpec } from "../types";

export const resolveColorExpression = (color: ColorSpec | string): string => {
    if (typeof color === "string") {
        return color;
    }
    if (color.b !== undefined) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha != null ? color.alpha : 1})`;
    }

    return "";
}