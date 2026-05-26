import { CircleAlert, CircleCheck, Clock3, PlayCircle } from 'lucide-react'
import { Badge, Card, SectionHeading } from '../components/ui'
import { executionLogs } from '../data/mockData'

export function ExecutionsPage() {
  return (
    <div>
      <SectionHeading eyebrow="Observability" title="Execution Logs" description="Monitor generated outputs, runtime and failures across every automation." />
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1.2fr_.7fr_1.4fr_.7fr_.6fr] gap-4 border-b border-white/[0.07] px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 md:grid"><span>Workflow</span><span>Status</span><span>Output</span><span>Date</span><span>Duration</span></div>
        {executionLogs.map((log) => {
          const Icon = log.status === 'Success' ? CircleCheck : log.status === 'Failed' ? CircleAlert : PlayCircle
          return <div key={log.id} className="grid gap-3 border-b border-white/[0.06] px-5 py-5 last:border-none md:grid-cols-[1.2fr_.7fr_1.4fr_.7fr_.6fr] md:items-center"><p className="text-sm font-medium text-white">{log.workflow}</p><Badge className={log.status === 'Success' ? 'text-emerald-300' : log.status === 'Failed' ? 'text-rose-300' : 'text-sky-300'}><Icon size={12} className="mr-1.5" />{log.status}</Badge><p className="text-sm text-zinc-400">{log.output}</p><p className="text-xs text-zinc-500">{log.date}</p><p className="flex items-center gap-1 text-xs text-zinc-500"><Clock3 size={12} />{log.duration}</p></div>
        })}
      </Card>
    </div>
  )
}
