// Colors are 0-63, multiplied to separate, then added into big int
// This func turns them into rgba(0-256, 0-256, 0-256)
export function parseColor(str: string) {
  const num = Number(str).toString(2).slice(1).padStart(18, "0")
  const r = parseInt(num.slice(0, 6), 2) * 4
  const g = parseInt(num.slice(6, 12), 2) * 4
  const b = Math.max(0, parseInt(num.slice(12), 2) * 4) || 256
  return `rgb(${r}, ${g}, ${b})`
}
