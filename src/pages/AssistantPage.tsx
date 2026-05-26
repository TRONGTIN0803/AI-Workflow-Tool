import { ArrowRight, Bot, Bug, Lightbulb, Workflow } from 'lucide-react'
import { Button, Card, SectionHeading } from '../components/ui'
import { useAppStore } from '../store/useAppStore'

const capabilities = [
  { icon: Workflow, name: 'Generate workflow', text: 'Describe an outcome and AI assembles the nodes.' },
  { icon: Lightbulb, name: 'Improve logic', text: 'Find missing validations and faster prompt chains.' },
  { icon: Bug, name: 'Debug failures', text: 'Analyze failed outputs and recommend fixes.' },
]

export function AssistantPage() {
  const toggle = useAppStore((state) => state.toggleAssistant)
  return (
    <div>
      <SectionHeading eyebrow="AI Copilot" title="Assistant Workspace" description="Your collaborator for designing, auditing and evolving reliable AI workflows." />
      <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
        <div className="space-y-3">{capabilities.map(({ icon: Icon, name, text }) => <Card key={name} className="p-5"><Icon size={19} className="mb-4 text-violet-300" /><h3 className="text-sm font-medium text-white">{name}</h3><p className="mt-2 text-sm text-zinc-400">{text}</p></Card>)}</div>
        <Card className="flex min-h-[455px] flex-col p-5">
          <div className="mb-5 flex items-center gap-3 border-b border-white/[0.07] pb-5"><span className="rounded-xl bg-violet-500/15 p-3 text-violet-300"><Bot size={20} /></span><div><h3 className="text-sm text-white">Workflow Copilot</h3><p className="text-xs text-emerald-400">Ready to collaborate</p></div></div>
          <div className="flex flex-1 items-center justify-center text-center"><div><p className="text-lg text-white">What will you automate today?</p><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">Open the persistent assistant panel to create workflows while you navigate the product.</p><Button variant="accent" className="mt-6" onClick={toggle}>Open assistant <ArrowRight size={16} /></Button></div></div>
        </Card>
      </div>
    </div>
  )
}
