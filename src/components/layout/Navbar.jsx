import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'smallcaps', label: 'Small Caps' },
  { id: 'minecraft', label: 'Minecraft' },
  { id: 'skinchecker', label: 'Skin Checker' },
  { id: 'about', label: 'About' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { onNavigate('smallcaps'); setMenuOpen(false) }}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          OnyxFormat
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${activePage === id
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); setMenuOpen(false) }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activePage === id
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
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
