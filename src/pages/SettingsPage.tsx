import { Bell, KeyRound, Link2, Moon, ShieldCheck } from 'lucide-react'
import { Button, Card, SectionHeading } from '../components/ui'
import { useAppStore } from '../store/useAppStore'

const integrations = ['AI Prompt Manager', 'Creator Dashboard', 'Notion', 'OpenAI']
const settingCards = [
  { label: 'API keys', icon: KeyRound },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: ShieldCheck },
]

export function SettingsPage() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  return (
    <div className="max-w-4xl">
      <SectionHeading eyebrow="Account" title="Settings" description="Manage product appearance, connected tools and workflow security." />
      <Card className="mb-4 p-5">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-medium text-white"><Moon size={17} className="text-violet-300" /> Appearance</h3>
        <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4"><div><p className="text-sm text-white">Interface theme</p><p className="text-xs text-zinc-500">Currently using {theme} mode</p></div><Button size="sm" onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'}</Button></div>
      </Card>
      <Card className="mb-4 p-5">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-medium text-white"><Link2 size={17} className="text-violet-300" /> Connected ecosystem</h3>
        {integrations.map((integration) => <div key={integration} className="flex items-center justify-between border-b border-white/[0.06] py-4 last:border-0"><span className="text-sm text-zinc-300">{integration}</span><span className="text-xs text-emerald-300">Connected</span></div>)}
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        {settingCards.map(({ label, icon: Icon }) => <Card key={label} className="p-5"><Icon className="mb-4 text-zinc-500" size={18} /><p className="text-sm text-white">{label}</p><Button variant="ghost" size="sm" className="mt-3 px-0">Configure</Button></Card>)}
      </div>
    </div>
  )
}
