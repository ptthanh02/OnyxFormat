import { useState } from 'react'
import { convertToUnicodeSmallCaps } from '../../utils/smallcaps.js'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import CopyButton from '../ui/CopyButton.jsx'

export default function SmallCapsPage() {
  const [input, setInput] = useState('')

  const unicode = input ? convertToUnicodeSmallCaps(input) : ''
  const css = input || ''

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Small Caps</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Transform your text into elegant small caps format</p>
      </div>

      {/* Input */}
      <Card className="p-4">
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something here..."
          rows={3}
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm resize-none outline-none"
        />
        {input && (
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => setInput('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </Card>

      {/* Outputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <OutputCard
          title="Unicode Small Caps"
          badge={<Badge>Universal</Badge>}
          content={unicode}
          placeholder="Unicode small caps will appear here..."
          description="Uses Unicode characters — works everywhere: social media, emails, messaging apps."
        />
        <OutputCard
          title="CSS Small Caps"
          badge={<Badge variant="violet">Web Only</Badge>}
          content={css}
          placeholder="CSS styled small caps will appear here..."
          description="Uses CSS font-variant — works on websites but may not paste correctly elsewhere."
          className="small-caps-css"
        />
      </div>
    </div>
  )
}

function OutputCard({ title, badge, content, placeholder, description, className = '' }) {
  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>
          {badge}
        </div>
        {content && <CopyButton getText={() => content} />}
      </div>

      <div
        className={`min-h-[60px] text-sm leading-relaxed ${
          content
            ? 'text-slate-900 dark:text-slate-100'
            : 'text-slate-400 dark:text-slate-600'
        } ${className}`}
        style={className === 'small-caps-css' ? { fontVariant: 'small-caps' } : {}}
      >
        {content || placeholder}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
        {description}
      </p>
    </Card>
  )
}
