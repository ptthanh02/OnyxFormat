import { rgbToHex } from './colorUtils.js'

async function fetchWithTimeout(url, timeout = 8000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

async function getSkinInfoFromUUID(uuid) {
  const defaultSkin = {
    skinUrl: `https://crafatar.com/skins/${uuid}`,
    skinType: 'steve',
  }
  try {
    const res = await fetchWithTimeout(`https://crafatar.com/skins/${uuid}`, 5000)
    if (res.ok) {
      const skinType = await detectSkinType(`https://crafatar.com/skins/${uuid}`)
      return { skinUrl: `https://crafatar.com/skins/${uuid}`, skinType }
    }
  } catch {}
  return defaultSkin
}

async function detectSkinType(skinUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(46, 16, 2, 4).data
      let transparent = 0
      for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++
      resolve(transparent > 4 ? 'alex' : 'steve')
    }
    img.onerror = () => resolve('steve')
    img.src = skinUrl
  })
}

function generateSyntheticUUID(username) {
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash) + username.charCodeAt(i)
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${hex.slice(1, 4)}-8${hex.slice(0, 3)}-${hex}${hex.slice(0, 4)}`
}

const KNOWN_PLAYERS = {
  notch: { id: '069a79f4-44e9-4726-a5be-fca90e38aaf5', name: 'Notch' },
  'jeb_': { id: '853c80ef-3c37-49fd-aa49-938b674adae6', name: 'jeb_' },
  dinnerbone: { id: '61699b2e-d327-4a01-9f1e-0ea8c3f06bc6', name: 'Dinnerbone' },
  steve: { id: '8667ba71-b85a-4004-af54-457a9734eed7', name: 'Steve' },
}

export async function lookupPlayer(username) {
  const lower = username.toLowerCase()

  // Known players shortcut
  if (KNOWN_PLAYERS[lower]) {
    const p = KNOWN_PLAYERS[lower]
    const skinInfo = await getSkinInfoFromUUID(p.id)
    return { success: true, playerData: p, skinInfo }
  }

  // PlayerDB API
  try {
    const res = await fetchWithTimeout(`https://playerdb.co/api/player/minecraft/${username}`, 8000)
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.data?.player?.id) {
        const playerData = { id: data.data.player.id, name: data.data.player.username || username }
        const skinInfo = await getSkinInfoFromUUID(playerData.id)
        return { success: true, playerData, skinInfo }
      }
    }
  } catch {}

  // Image-based fallback via Crafatar
  try {
    const exists = await new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      const t = setTimeout(() => resolve(false), 5000)
      img.onload = () => { clearTimeout(t); resolve(true) }
      img.onerror = () => { clearTimeout(t); resolve(false) }
      img.src = `https://crafatar.com/avatars/${username}?size=64&default=steve`
    })
    if (exists) {
      const playerData = { id: generateSyntheticUUID(username), name: username }
      const skinInfo = { skinUrl: `https://crafatar.com/skins/${username}`, skinType: 'steve' }
      return { success: true, playerData, skinInfo }
    }
  } catch {}

  return {
    success: false,
    errorTitle: 'Player Not Found',
    errorMessage: `"${username}" could not be found in Minecraft Java Edition.`,
  }
}

export async function analyzeSkinColors(skinUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const colorMap = new Map()
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue
        const hex = rgbToHex(data[i], data[i + 1], data[i + 2])
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
      }
      const colors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([color]) => color)
      resolve(colors)
    }
    img.onerror = () => resolve([])
    img.src = skinUrl
  })
}
