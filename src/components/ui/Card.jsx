export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl ${className}`}>
      {children}
    </div>
  )
}
