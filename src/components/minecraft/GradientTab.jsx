import { useState } from 'react'
import { interpolateColor } from '../../utils/colorUtils.js'
import { convertColorFormat } from '../../utils/minecraft.js'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import CopyButton from '../ui/CopyButton.jsx'

function generateGradient(text, startColor, endColor, format) {
  if (!text.trim()) return { preview: [], code: '' }
  const chars = text.split('')
  const preview = []
  let code = ''

  chars.forEach((char, i) => {
    if (char === ' ') {
      preview.push({ char: ' ', color: null })
      code += ' '
      return
    }
    const factor = chars.filter(c => c !== ' ').length === 1 ? 0 : i / (chars.length - 1)
    const color = interpolateColor(startColor, endColor, factor)
    const hexCode = '§#' + color.substring(1).toUpperCase()
    preview.push({ char, color })
    code += hexCode + char
  })

  return { preview, code: convertColorFormat(code, format) }
}

export default function GradientTab() {
  const [text, setText] = useState('')
  const [startColor, setStartColor] = useState('#FF5555')
  const [endColor, setEndColor] = useState('#5555FF')
  const [format, setFormat] = useState('&')

  const { preview, code } = generateGradient(text, startColor, endColor, format)

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card className="p-4">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Gradient Settings</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value.slice(0, 50))}
            placeholder="Enter text for gradient..."
            maxLength={50}
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-zinc-900 dark:text-zinc-100"
          />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">From</label>
              <input
                type="color"
                value={startColor}
                onChange={e => setStartColor(e.target.value)}
                className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">To</label>
              <input
                type="color"
                value={endColor}
                onChange={e => setEndColor(e.target.value)}
                className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Gradient bar preview */}
        {text && (
          <div
            className="mt-3 h-2 rounded-full"
            style={{ background: `linear-gradient(to right, ${startColor}, ${endColor})` }}
          />
        )}
      </Card>

      {/* Preview + Code */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Gradient Preview</span>
            <Badge>Live</Badge>
          </div>
          <div className="min-h-[48px] bg-zinc-950 rounded-lg p-3 font-mono text-sm">
            {preview.length > 0 ? (
              preview.map((s, i) => (
                <span key={i} style={s.color ? { color: s.color } : undefined}>
                  {s.char}
                </span>
              ))
            ) : (
              <span className="text-zinc-600 text-sm">Gradient preview will appear here...</span>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Code</span>
              <Badge variant="green">Game Ready</Badge>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className="text-xs bg-zinc-100 dark:bg-zinc-800 border-0 rounded-md px-2 py-1 text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer"
              >
                <option value="&">&amp; Format</option>
                <option value="§">§ Format</option>
              </select>
              {code && <CopyButton getText={() => code} />}
            </div>
          </div>
          <div className="min-h-[48px] font-mono text-xs text-zinc-600 dark:text-zinc-400 break-all">
            {code || <span className="text-zinc-400 dark:text-zinc-600">Gradient codes will appear here...</span>}
          </div>
        </Card>
      </div>
    </div>
  )
}
