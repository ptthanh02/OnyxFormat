const FEATURES = [
  {
    title: 'Small Caps',
    desc: 'Convert regular text into Unicode small caps or CSS-styled small caps. Works across social media, emails, and messaging apps.',
  },
  {
    title: 'Minecraft Colors',
    desc: 'Create vibrant colored text for Minecraft servers and plugins using standard color codes with bold, italic, and magic text.',
  },
  {
    title: 'Custom Hex Colors',
    desc: 'Apply any hex color to Minecraft text with a visual color picker. Perfect for matching your server\'s branding.',
  },
  {
    title: 'Gradient Generator',
    desc: 'Smoothly interpolate between two colors across your text. Each character transitions to create a beautiful gradient effect.',
  },
  {
    title: 'Skin Checker',
    desc: 'Look up any Java Edition player\'s skin with an interactive 3D preview, color palette extraction, and one-click download.',
  },
  {
    title: 'Live Preview',
    desc: 'See your formatted text update in real-time as you type. What you see is exactly what you\'ll get in-game.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">About OnyxFormat</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Professional text formatting tools for Minecraft server owners and content creators.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-violet-200 dark:hover:border-violet-800 transition-colors"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 rounded-xl p-6 text-center">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Open Source</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          OnyxFormat is open source and hosted on GitHub Pages. No data is collected or stored.
        </p>
      </div>
    </div>
  )
}
