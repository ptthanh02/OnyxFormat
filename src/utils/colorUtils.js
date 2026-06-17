export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function interpolateColor(color1, color2, factor) {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return color1
  const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r))
  const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g))
  const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b))
  return rgbToHex(r, g, b)
}
