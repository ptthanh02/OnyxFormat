import { useState } from 'react'
import HexColorTab from '../minecraft/HexColorTab.jsx'
import ColorCodeTab from '../minecraft/ColorCodeTab.jsx'
import GradientTab from '../minecraft/GradientTab.jsx'

const TABS = [
  { id: 'hex', label: 'Hex Color' },
  { id: 'colors', label: 'Color Codes' },
  { id: 'gradient', label: 'Gradient' },
]

export default function MinecraftPage() {
  const [activeTab, setActiveTab] = useState('hex')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Minecraft Colors</h1>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">Create colorful Minecraft text with custom hex colors and gradients</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl w-fit">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${activeTab === id
                ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'hex' && <HexColorTab />}
      {activeTab === 'colors' && <ColorCodeTab />}
      {activeTab === 'gradient' && <GradientTab />}
    </div>
  )
}
