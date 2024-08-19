export const rgbToHex = (r: number, g: number, b: number): string => {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
};
export const hexToRgb = (hex: string): string => {
    let alpha = false;
    let h = hex.slice(hex.startsWith("#") ? 1 : 0);

    if (h.length === 3) {
        h = [...h].map((x) => x + x).join("");
    } else if (h.length === 8) {
        alpha = true;
    }

    const parsedHex = parseInt(h, 16);

    return (
        "rgb" +
        (alpha ? "a" : "") +
        "(" +
        (parsedHex >>> (alpha ? 24 : 16)) +
        ", " +
        ((parsedHex & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
        ", " +
        ((parsedHex & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
        (alpha ? `, ${parsedHex & 0x000000ff}` : "") +
        ")"
    );
};

export const rgbToHsl = (
    r: number,
    g: number,
    b: number
): [number, number, number] => {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
              ? 2 + (b - r) / s
              : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};

export const hslToRgb = (
    h: number,
    s: number,
    l: number
): [number, number, number] => {
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    s /= 100;
    l /= 100;
    const k = (n: number): number => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number): number =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};
