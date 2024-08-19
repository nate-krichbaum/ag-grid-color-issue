var style = getComputedStyle(document.body);
import { hslToRgb, rgbToHex } from "@/helpers/colors";

// Get chart colors from css styles so that we can reuse them in AG Grid, which requires hex colors
export function getChartColorHex(chartNumber: number) {
    const hsl = style.getPropertyValue(`--chart-${chartNumber}`);
    const [hue, saturation, lightness] = hsl.split(" ").map((value, index) => {
        return index === 0 ? Number(value) : Number(value.replace("%", ""));
    });
    const [red, green, blue] = hslToRgb(hue, saturation, lightness);
    const hex = rgbToHex(red, green, blue);
    return hex;
}
