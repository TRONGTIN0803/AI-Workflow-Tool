import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Compass, LayoutDashboard, Layers3, LogOut, Menu, Moon, Search, Settings, Sun, Workflow, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AssistantPanel } from '../components/AssistantPanel'
import { CommandPalette } from '../components/CommandPalette'
import { Button } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../utils/cn'

const navigation = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Workflow Builder', to: '/app/builder', icon: Workflow },
  { label: 'Templates', to: '/app/templates', icon: Layers3 },
  { label: 'Executions', to: '/app/executions', icon: Compass },
  { label: 'AI Assistant', to: '/app/assistant', icon: Bot },
  { label: 'Settings', to: '/app/settings', icon: Settings },
]

const ecosystem = ['Portfolio Website', 'AI Prompt Manager', 'Creator Dashboard']

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const setCommandOpen = useAppStore((state) => state.setCommandOpen)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [setCommandOpen, theme])

  const sidebar = (
    <div className="flex h-full flex-col p-4">
      <NavLink to="/" className="mb-7 flex items-center gap-3 px-2">
        <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 text-white"><Workflow size={21} /></span>
        <span><strong className="block text-sm text-white">AI Workflow</strong><small className="text-zinc-500">Operating System</small></span>
      </NavLink>
      <nav className="space-y-1">
        {navigation.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition', isActive ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200')}>
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-7 border-t border-white/[0.08] pt-5">
        <p className="mb-3 px-3 text-[11px] uppercase tracking-[0.2em] text-zinc-600">Ecosystem</p>
        {ecosystem.map((app) => <a href="#" key={app} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 hover:text-zinc-200"><span className="size-1.5 rounded-full bg-violet-400/60" />{app}</a>)}
      </div>
      <NavLink to="/auth" className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 hover:bg-white/[0.04] hover:text-white"><LogOut size={17} /> Sign out</NavLink>
    </div>
  )

  return (
    <div className="min-h-screen bg-app text-zinc-200">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/[0.06] bg-[#090a10]/90 lg:block">{sidebar}</aside>
      <AnimatePresence>{mobileOpen && <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#090a10] lg:hidden">{sidebar}<Button variant="ghost" size="icon" className="absolute right-3 top-4" onClick={() => setMobileOpen(false)}><X size={18} /></Button></motion.aside>}</AnimatePresence>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#08090e]/75 px-4 backdrop-blur-xl md:px-7">
          <Button aria-label="Open menu" className="lg:hidden" variant="ghost" size="icon" onClick={() => setMobileOpen(true)}><Menu size={20} /></Button>
          <button onClick={() => setCommandOpen(true)} className="hidden h-10 w-72 items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-zinc-500 sm:flex">
            <span className="flex items-center gap-2"><Search size={15} />Search anything</span><kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[11px]">Ctrl K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <Button aria-label="Toggle theme" variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</Button>
            <div className="ml-2 flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-semibold text-white">PT</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1240px] px-4 py-6 md:px-7 md:py-8"><Outlet /></main>
      </div>
      <CommandPalette />
      <AssistantPanel />
    </div>
  )
}
