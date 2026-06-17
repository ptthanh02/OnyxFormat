export const MINECRAFT_COLORS = {
  '§0': '#000000', '§1': '#0000AA', '§2': '#00AA00', '§3': '#00AAAA',
  '§4': '#AA0000', '§5': '#AA00AA', '§6': '#FFAA00', '§7': '#AAAAAA',
  '§8': '#555555', '§9': '#5555FF', '§a': '#55FF55', '§b': '#55FFFF',
  '§c': '#FF5555', '§d': '#FF55FF', '§e': '#FFFF55', '§f': '#FFFFFF',
}

export const COLOR_PALETTE_LIST = [
  { code: '§0', color: '#000000', name: 'Black' },
  { code: '§1', color: '#0000AA', name: 'Dark Blue' },
  { code: '§2', color: '#00AA00', name: 'Dark Green' },
  { code: '§3', color: '#00AAAA', name: 'Dark Aqua' },
  { code: '§4', color: '#AA0000', name: 'Dark Red' },
  { code: '§5', color: '#AA00AA', name: 'Dark Purple' },
  { code: '§6', color: '#FFAA00', name: 'Gold' },
  { code: '§7', color: '#AAAAAA', name: 'Gray' },
  { code: '§8', color: '#555555', name: 'Dark Gray' },
  { code: '§9', color: '#5555FF', name: 'Blue' },
  { code: '§a', color: '#55FF55', name: 'Green' },
  { code: '§b', color: '#55FFFF', name: 'Aqua' },
  { code: '§c', color: '#FF5555', name: 'Red' },
  { code: '§d', color: '#FF55FF', name: 'Light Purple' },
  { code: '§e', color: '#FFFF55', name: 'Yellow' },
  { code: '§f', color: '#FFFFFF', name: 'White' },
]

export const FORMAT_CODES = [
  { code: '§l', label: 'Bold' },
  { code: '§o', label: 'Italic' },
  { code: '§n', label: 'Underline' },
  { code: '§m', label: 'Strike' },
  { code: '§k', label: 'Magic' },
  { code: '§r', label: 'Reset' },
]

export const PRESET_TEMPLATES = {
  welcome: '§e✨ §bWelcome to §a§lOur Server§r§e! §6Enjoy your stay! §e✨',
  error: '§c§l [ERROR]§r §cSomething went wrong! Please try again.',
  success: '§a§l [SUCCESS]§r §aAction completed successfully!',
  warning: '§6§l [WARNING]§r §6Please be careful with this action.',
  info: '§b§l [INFO]§r §bHere is some important information.',
  rainbow: '§cR§6a§ei§an§bb§9o§dw §cT§6e§ex§at',
}

export function convertColorFormat(text, targetFormat) {
  return targetFormat === '&' ? text.replace(/§/g, '&') : text.replace(/&/g, '§')
}

export function parseMinecraftText(text, customHexColors = {}) {
  const spans = []
  let currentColor = '#FFFFFF'
  let isBold = false
  let isItalic = false
  let isUnderlined = false
  let isStrikethrough = false
  let isObfuscated = false

  let i = 0
  while (i < text.length) {
    if (text[i] === '§' && i + 1 < text.length) {
      if (text[i + 1] === '#' && i + 7 < text.length) {
        const hexCode = text.substring(i, i + 8)
        if (customHexColors[hexCode]) {
          currentColor = customHexColors[hexCode]
          isBold = isItalic = isUnderlined = isStrikethrough = isObfuscated = false
          i += 8
          continue
        }
      }

      const code = '§' + text[i + 1]
      if (MINECRAFT_COLORS[code]) {
        currentColor = MINECRAFT_COLORS[code]
        isBold = isItalic = isUnderlined = isStrikethrough = isObfuscated = false
      } else {
        switch (text[i + 1]) {
          case 'l': isBold = true; break
          case 'o': isItalic = true; break
          case 'n': isUnderlined = true; break
          case 'm': isStrikethrough = true; break
          case 'k': isObfuscated = true; break
          case 'r':
            currentColor = '#FFFFFF'
            isBold = isItalic = isUnderlined = isStrikethrough = isObfuscated = false
            break
        }
      }
      i += 2
    } else {
      const obfuscatedChars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
      const char = isObfuscated
        ? obfuscatedChars[Math.floor(Math.random() * obfuscatedChars.length)]
        : text[i]

      let decoration = 'none'
      if (isUnderlined && isStrikethrough) decoration = 'underline line-through'
      else if (isUnderlined) decoration = 'underline'
      else if (isStrikethrough) decoration = 'line-through'

      spans.push({
        char,
        style: {
          color: currentColor,
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textDecoration: decoration,
        },
      })
      i++
    }
  }

  return spans
}
