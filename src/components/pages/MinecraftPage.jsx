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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Minecraft Colors</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Create colorful Minecraft text with custom hex colors and gradients</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl w-fit">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === id
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
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
