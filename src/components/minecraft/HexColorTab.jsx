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
    <div className="space-y-5">
      {/* Color picker */}
      <Card className="p-6">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Hex Color Picker</p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={hex}
            onChange={e => { setHex(e.target.value); setHexInput(e.target.value) }}
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
            placeholder="#FF5555"
            maxLength={7}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-slate-100"
            onKeyDown={e => e.key === 'Enter' && applyColor()}
          />
          <button
            onClick={applyColor}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Apply
          </button>
        </div>
        <div className="mt-4 px-4 py-3 bg-zinc-950 rounded-xl font-mono text-sm" style={{ color: hex }}>
          Sample text in {hex}
        </div>
      </Card>

      {/* Input */}
      <Card className="p-6">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest">
          Minecraft Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type here or use the color picker above..."
          rows={4}
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-base font-mono resize-none outline-none"
        />
        {text && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Clear</button>
          </div>
        )}
      </Card>

      {/* Preview + Code */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preview</span>
            <Badge>Live</Badge>
          </div>
          <div className="min-h-[56px] bg-zinc-950 rounded-xl p-4">
            <MinecraftPreview text={text} customHexColors={customHexColors} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Code</span>
              <Badge variant="green">Game Ready</Badge>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className="text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-2.5 py-1.5 text-slate-600 dark:text-slate-400 outline-none cursor-pointer"
              >
                <option value="&">&amp; Format</option>
                <option value="§">§ Format</option>
              </select>
              {outputText && <CopyButton getText={() => outputText} />}
            </div>
          </div>
          <div className="min-h-[56px] font-mono text-sm text-slate-600 dark:text-slate-400 break-all">
            {outputText || <span className="text-slate-400 dark:text-slate-600">Code will appear here...</span>}
          </div>
        </Card>
      </div>
    </div>
  )
}
