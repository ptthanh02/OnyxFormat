import { useRef, useEffect } from 'react'
import { useMinecraft3D } from '../../hooks/useMinecraft3D.js'

export default function ModelViewer({ skinUrl }) {
  const canvasRef = useRef(null)
  const { loadSkin, resetView } = useMinecraft3D(canvasRef)
  const prevSkinRef = useRef(null)

  useEffect(() => {
    if (skinUrl && skinUrl !== prevSkinRef.current) {
      prevSkinRef.current = skinUrl
      loadSkin(skinUrl)
    }
  }, [skinUrl, loadSkin])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: '280px' }}
      />
      <button
        onClick={resetView}
        className="absolute bottom-3 right-3 px-2.5 py-1.5 text-xs font-medium bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-sm transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
