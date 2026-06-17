import Logo from '../ui/Logo.jsx'

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
    desc: "Apply any hex color to Minecraft text with a visual color picker. Perfect for matching your server's branding.",
  },
  {
    title: 'Gradient Generator',
    desc: 'Smoothly interpolate between two colors across your text. Each character transitions to create a beautiful gradient effect.',
  },
  {
    title: 'Live Preview',
    desc: 'See your formatted text update in real-time as you type. What you see is exactly what you\'ll get in-game.',
  },
  {
    title: 'Game-Ready Codes',
    desc: 'Output supports both & and § formats so you can paste directly into any Minecraft plugin or server config.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="flex items-center gap-5">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <Logo size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">OnyxFormat</h1>
          <p className="mt-1.5 text-base text-slate-500 dark:text-slate-400">
            Professional text formatting tools for Minecraft server owners and content creators.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-8 text-center">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">Open Source</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          OnyxFormat is open source and hosted on GitHub Pages. No data is collected or stored.
        </p>
      </div>
    </div>
  )
}
