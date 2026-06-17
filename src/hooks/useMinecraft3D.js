import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

class Minecraft3DViewer {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.scene.background = null

    this.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    this.camera.position.set(0, 0, 4)

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9)
    dirLight.position.set(5, 10, 5)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-5, -5, -5)
    this.scene.add(ambient, dirLight, fillLight)

    this.model = null
    this.rafId = null
    this.targetRotY = 0
    this.currentRotY = 0
    this.isDragging = false
    this.lastX = 0
    this.zoom = 4

    this._bindEvents()
    this._animate()
  }

  _createModel(texture = null) {
    if (this.model) {
      this.model.children.forEach(m => {
        m.geometry?.dispose()
        m.material?.dispose()
      })
      this.scene.remove(this.model)
    }

    const mat = (color) => new THREE.MeshLambertMaterial({ color, transparent: true })
    const texMat = texture
      ? new THREE.MeshLambertMaterial({ map: texture, transparent: true })
      : null

    const group = new THREE.Group()
    const parts = [
      { geo: [1, 1, 1],     pos: [0, 1.75, 0],   mat: texMat || mat(0xf1af78) }, // head
      { geo: [1, 1.5, 0.5], pos: [0, 0.5, 0],     mat: texMat || mat(0x3b5998) }, // body
      { geo: [0.5, 1.5, 0.5], pos: [-0.75, 0.5, 0], mat: texMat || mat(0xf1af78) }, // left arm
      { geo: [0.5, 1.5, 0.5], pos: [0.75, 0.5, 0],  mat: texMat || mat(0xf1af78) }, // right arm
      { geo: [0.5, 1.5, 0.5], pos: [-0.25, -0.75, 0], mat: texMat || mat(0x3a3a5c) }, // left leg
      { geo: [0.5, 1.5, 0.5], pos: [0.25, -0.75, 0],  mat: texMat || mat(0x3a3a5c) }, // right leg
    ]

    parts.forEach(({ geo, pos, mat: m }) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...geo), m)
      mesh.position.set(...pos)
      group.add(mesh)
    })

    this.scene.add(group)
    this.model = group
    group.position.set(0, -0.5, 0)
  }

  async loadSkin(skinUrl) {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader()
      loader.crossOrigin = 'anonymous'
      loader.load(
        skinUrl,
        (texture) => {
          texture.magFilter = THREE.NearestFilter
          texture.minFilter = THREE.NearestFilter
          this._createModel(texture)
          resolve(true)
        },
        undefined,
        () => {
          this._createModel(null)
          resolve(false)
        }
      )
    })
  }

  resetView() {
    this.targetRotY = 0
    this.currentRotY = 0
    this.zoom = 4
    this.camera.position.z = this.zoom
    if (this.model) this.model.rotation.y = 0
  }

  _bindEvents() {
    const el = this.canvas

    const onDown = (x) => { this.isDragging = true; this.lastX = x }
    const onUp = () => { this.isDragging = false }
    const onMove = (x) => {
      if (!this.isDragging) return
      this.targetRotY += (x - this.lastX) * 0.01
      this.lastX = x
    }
    const onWheel = (e) => {
      e.preventDefault()
      this.zoom = Math.max(2, Math.min(8, this.zoom + e.deltaY * 0.01))
      this.camera.position.z = this.zoom
    }

    el.addEventListener('mousedown', (e) => onDown(e.clientX))
    el.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    window.addEventListener('mousemove', (e) => onMove(e.clientX))
    window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })

    this._resizeObserver = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight
      this.renderer.setSize(w, h)
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
    })
    this._resizeObserver.observe(el)
  }

  _animate() {
    this.rafId = requestAnimationFrame(() => this._animate())
    if (this.model) {
      this.currentRotY += (this.targetRotY - this.currentRotY) * 0.1
      this.model.rotation.y = this.currentRotY
      if (!this.isDragging) this.targetRotY += 0.005
    }
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    cancelAnimationFrame(this.rafId)
    this._resizeObserver?.disconnect()
    this.renderer.dispose()
  }
}

export function useMinecraft3D(canvasRef) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const viewer = new Minecraft3DViewer(canvasRef.current)
    viewerRef.current = viewer
    return () => viewer.dispose()
  }, [canvasRef])

  const loadSkin = useCallback((skinUrl) => {
    return viewerRef.current?.loadSkin(skinUrl)
  }, [])

  const resetView = useCallback(() => {
    viewerRef.current?.resetView()
  }, [])

  return { loadSkin, resetView }
}
