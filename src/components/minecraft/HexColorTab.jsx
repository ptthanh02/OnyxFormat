import { useState, useRef } from 'react'
import { convertColorFormat } from '../../utils/minecraft.js'
import MinecraftPreview from './MinecraftPreview.jsx'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import CopyButton from '../ui/CopyButton.jsx'

export default function HexColorTab() {
  const [hex, setHex] = useState('#FF5555')
  const [text, setText] = useState('')
  const [format, setFormat] = useState('&')
  const [customHexColors, setCustomHexColors] = useState({})
  const textareaRef = useRef(null)
  const [hexInput, setHexInput] = useState('#FF5555')

  const applyColor = () => {
    let clean = hexInput.trim().replace(/^#/, '')
    if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return
    clean = clean.toUpperCase()
    const fullHex = '#' + clean
    const code = '§#' + clean
    setHex(fullHex)
    setCustomHexColors(prev => ({ ...prev, [code]: fullHex }))
    insertCode(code)
  }

  const insertCode = (code) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    setText(prev => prev.substring(0, start) + code + prev.substring(end))
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + code.length, start + code.length)
    }, 0)
  }

  const outputText = convertColorFormat(text, format)

  return (
    <div className="space-y-4">
      {/* Color picker */}
      <Card className="p-4">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Hex Color Picker</p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={hex}
            onChange={e => { setHex(e.target.value); setHexInput(e.target.value) }}
            className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
            placeholder="#FF5555"
            maxLength={7}
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-zinc-900 dark:text-zinc-100"
            onKeyDown={e => e.key === 'Enter' && applyColor()}
          />
          <button
            onClick={applyColor}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
        <div className="mt-3 px-3 py-2 bg-zinc-950 rounded-lg font-mono text-sm" style={{ color: hex }}>
          Sample text in {hex}
        </div>
      </Card>

      {/* Input */}
      <Card className="p-4">
        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
          Minecraft Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type here or use the color picker above..."
          rows={3}
          className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-mono resize-none outline-none"
        />
        {text && (
          <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <button onClick={() => setText('')} className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Clear</button>
          </div>
        )}
      </Card>

      {/* Preview + Code */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview</span>
            <Badge>Live</Badge>
          </div>
          <div className="min-h-[48px] bg-zinc-950 rounded-lg p-3">
            <MinecraftPreview text={text} customHexColors={customHexColors} />
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
              {outputText && <CopyButton getText={() => outputText} />}
            </div>
          </div>
          <div className="min-h-[48px] font-mono text-xs text-zinc-600 dark:text-zinc-400 break-all">
            {outputText || <span className="text-zinc-400 dark:text-zinc-600">Code will appear here...</span>}
          </div>
        </Card>
      </div>
    </div>
  )
}
