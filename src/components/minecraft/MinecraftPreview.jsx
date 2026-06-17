import { parseMinecraftText } from '../../utils/minecraft.js'

export default function MinecraftPreview({ text, customHexColors = {}, className = '' }) {
  if (!text.trim()) {
    return (
      <span className="text-zinc-400 dark:text-zinc-600 text-sm">
        Start typing to see a live preview...
      </span>
    )
  }

  const spans = parseMinecraftText(text, customHexColors)

  return (
    <span className={`font-mono text-sm leading-relaxed ${className}`}>
      {spans.map((s, i) => (
        <span key={i} style={s.style}>
          {s.char === ' ' ? ' ' : s.char}
        </span>
      ))}
    </span>
  )
}
