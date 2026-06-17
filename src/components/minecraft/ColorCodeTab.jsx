import { useState, useRef } from 'react'
import { COLOR_PALETTE_LIST, FORMAT_CODES, PRESET_TEMPLATES, convertColorFormat } from '../../utils/minecraft.js'
import MinecraftPreview from './MinecraftPreview.jsx'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import CopyButton from '../ui/CopyButton.jsx'

export default function ColorCodeTab() {
  const [text, setText] = useState('')
  const [format, setFormat] = useState('&')
  const textareaRef = useRef(null)

  const insertCode = (code) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newText = text.substring(0, start) + code + text.substring(end)
    setText(newText)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + code.length, start + code.length)
    }, 0)
  }

  const applyPreset = (key) => {
    if (key === 'rainbow') {
      const base = 'Rainbow Text'
      const colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d']
      setText(base.split('').map((c, i) => c === ' ' ? ' ' : colors[i % colors.length] + c).join(''))
    } else {
      setText(PRESET_TEMPLATES[key])
    }
    textareaRef.current?.focus()
  }

  const outputText = convertColorFormat(text, format)

  return (
    <div className="space-y-4">
      {/* Presets */}
      <Card className="p-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Quick Presets</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.keys(PRESET_TEMPLATES).map(key => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="text-left px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 transition-colors capitalize"
            >
              {key}
            </button>
          ))}
        </div>
      </Card>

      {/* Color palette */}
      <Card className="p-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Colors</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {COLOR_PALETTE_LIST.map(({ code, color, name }) => (
            <button
              key={code}
              onClick={() => insertCode(code)}
              title={`${name} (${code})`}
              className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
            >
              <div className="w-7 h-7 rounded-md border border-slate-300 dark:border-slate-600" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 leading-none truncate w-full text-center">
                {name.split(' ').pop()}
              </span>
            </button>
          ))}
        </div>

        {/* Format codes */}
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {FORMAT_CODES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => insertCode(code)}
              className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Input */}
      <Card className="p-4">
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
          Minecraft Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or click colors above... e.g. §eHello §bWorld§r!"
          rows={3}
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm font-mono resize-none outline-none"
        />
        {text && (
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Clear</button>
          </div>
        )}
      </Card>

      {/* Preview + Code */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview</span>
            <Badge>Live</Badge>
          </div>
          <div className="min-h-[48px] bg-zinc-950 rounded-lg p-3">
            <MinecraftPreview text={text} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Code</span>
              <Badge variant="green">Game Ready</Badge>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className="text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-md px-2 py-1 text-slate-600 dark:text-slate-400 outline-none cursor-pointer"
              >
                <option value="&">&amp; Format</option>
                <option value="§">§ Format</option>
              </select>
              {outputText && <CopyButton getText={() => outputText} />}
            </div>
          </div>
          <div className="min-h-[48px] font-mono text-xs text-slate-600 dark:text-slate-400 break-all">
            {outputText || <span className="text-slate-400 dark:text-slate-600">Code will appear here...</span>}
          </div>
        </Card>
      </div>
    </div>
  )
}
