import { useState, lazy, Suspense } from 'react'
import { lookupPlayer, analyzeSkinColors } from '../../utils/skinApi.js'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import CopyButton from '../ui/CopyButton.jsx'
import { toast } from 'sonner'

const ModelViewer = lazy(() => import('../skin/ModelViewer.jsx'))

export default function SkinCheckerPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState(null)
  const [error, setError] = useState(null)
  const [colors, setColors] = useState([])

  const search = async () => {
    const name = username.trim()
    if (!name) return
    if (!/^[a-zA-Z0-9_]{1,16}$/.test(name)) {
      toast.error('Invalid username: only letters, numbers, and underscores (1–16 chars)')
      return
    }

    setLoading(true)
    setError(null)
    setPlayer(null)
    setColors([])

    const result = await lookupPlayer(name)
    setLoading(false)

    if (result.success) {
      setPlayer(result)
      toast.success(`Loaded ${result.playerData.name}'s skin`)
      analyzeSkinColors(result.skinInfo.skinUrl).then(setColors)
    } else {
      setError(result)
      toast.error(result.errorTitle)
    }
  }

  const downloadSkin = async () => {
    if (!player) return
    try {
      const res = await fetch(player.skinInfo.skinUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${player.playerData.name}_skin.png`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Skin downloaded!')
    } catch {
      toast.error('Failed to download skin')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Skin Checker</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">View any Minecraft player's skin and download it instantly</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Enter Minecraft username..."
            maxLength={16}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
          <button
            onClick={search}
            disabled={loading || !username.trim()}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : 'Search'}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Java Edition only</p>
      </Card>

      {/* Error */}
      {error && !loading && (
        <Card className="p-6 text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{error.errorTitle}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{error.errorMessage}</p>
        </Card>
      )}

      {/* Player result */}
      {player && !loading && (
        <div className="space-y-4">
          {/* Player header */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://crafatar.com/avatars/${player.playerData.id}?size=64&overlay`}
                alt={player.playerData.name}
                className="w-14 h-14 rounded-lg"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{player.playerData.name}</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate mt-0.5">{player.playerData.id}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={player.skinInfo.skinType === 'alex' ? 'violet' : 'default'}>
                    {player.skinInfo.skinType === 'alex' ? 'Alex (Slim)' : 'Steve (Classic)'}
                  </Badge>
                  <Badge>64×64 PNG</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Skin + 3D */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Skin</span>
                <Badge>2D View</Badge>
              </div>
              <div className="flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <img
                  src={player.skinInfo.skinUrl}
                  alt="Full Skin"
                  className="h-32"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={downloadSkin}
                  className="flex-1 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Download
                </button>
                <CopyButton getText={() => player.skinInfo.skinUrl} className="flex-1 justify-center" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">3D Preview</span>
                <Badge variant="violet">Interactive</Badge>
              </div>
              <div className="bg-slate-800 dark:bg-slate-900 rounded-lg overflow-hidden">
                <Suspense fallback={<div className="h-[280px] flex items-center justify-center text-slate-400 text-sm">Loading 3D viewer...</div>}>
                  <ModelViewer skinUrl={player.skinInfo.skinUrl} />
                </Suspense>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
                Drag to rotate · Scroll to zoom
              </p>
            </Card>
          </div>

          {/* Color palette */}
          {colors.length > 0 && (
            <Card className="p-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Skin Colors</p>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    title={`Click to copy ${color}`}
                    onClick={async () => {
                      await navigator.clipboard.writeText(color)
                      toast.success(`Copied ${color}`)
                    }}
                    className="group relative w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
