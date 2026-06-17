import { useState } from 'react'
import { Toaster } from 'sonner'
import Navbar from './components/layout/Navbar.jsx'
import SmallCapsPage from './components/pages/SmallCapsPage.jsx'
import MinecraftPage from './components/pages/MinecraftPage.jsx'
import SkinCheckerPage from './components/pages/SkinCheckerPage.jsx'
import AboutPage from './components/pages/AboutPage.jsx'

const PAGES = {
  smallcaps: SmallCapsPage,
  minecraft: MinecraftPage,
  skinchecker: SkinCheckerPage,
  about: AboutPage,
}

export default function App() {
  const [activePage, setActivePage] = useState('smallcaps')
  const ActivePage = PAGES[activePage] ?? SmallCapsPage

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium shadow-lg',
            success: '!border-emerald-200 dark:!border-emerald-800',
            error: '!border-red-200 dark:!border-red-800',
          },
        }}
      />
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ActivePage />
      </main>
    </div>
  )
}
