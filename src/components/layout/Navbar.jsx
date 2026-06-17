import { useState } from 'react'
import Logo from '../ui/Logo.jsx'

const NAV_ITEMS = [
  { id: 'smallcaps', label: 'Small Caps' },
  { id: 'minecraft', label: 'Minecraft' },
  { id: 'about', label: 'About' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { onNavigate('smallcaps'); setMenuOpen(false) }}
          className="flex items-center gap-2.5 group"
        >
          <Logo size={26} />
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            OnyxFormat
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activePage === id
                    ? 'bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); setMenuOpen(false) }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${activePage === id
                  ? 'bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
