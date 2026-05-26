import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, Clock3, Cpu, Play, WandSparkles } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Link } from 'react-router-dom'
import { executionLogs, usageChart } from '../data/mockData'
import { useAppStore } from '../store/useAppStore'
import { Badge, Button, Card, SectionHeading } from '../components/ui'

const summary = [
  { label: 'Active workflows', value: '12', change: '+3 this week', icon: Activity },
  { label: 'Runs this month', value: '2,847', change: '+18.4%', icon: Play },
  { label: 'AI tokens used', value: '1.24M', change: '72% budget', icon: Cpu },
  { label: 'Time reclaimed', value: '46.8h', change: '+6.2h', icon: Clock3 },
]

export function DashboardPage() {
  const workflows = useAppStore((state) => state.workflows)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Overview" title="Good morning, Trong" description="Your AI workflows completed 93 tasks today with a 98.2% success rate." />
        <Link to="/app/builder"><Button variant="accent"><WandSparkles size={16} /> New workflow</Button></Link>
      </div>
      <div className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(({ label, value, change, icon: Icon }, index) => <Card key={label} className="p-5"><Icon size={18} className="mb-5 text-zinc-500" /><p className="text-2xl font-semibold text-white">{value}</p><div className="mt-2 flex justify-between text-xs"><span className="text-zinc-500">{label}</span><span className={index === 2 ? 'text-amber-300' : 'text-emerald-400'}>{change}</span></div></Card>)}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Card className="p-5">
          <div className="mb-7 flex items-center justify-between"><div><h3 className="font-medium text-white">Workflow activity</h3><p className="text-sm text-zinc-500">Executions during the last 7 days</p></div><Badge>+24.6%</Badge></div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={usageChart}><defs><linearGradient id="activity" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#8b5cf6" stopOpacity=".4" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} /><Tooltip contentStyle={{ background: '#151620', border: '1px solid #272733', borderRadius: 12 }} /><Area dataKey="executions" type="monotone" stroke="#8b5cf6" strokeWidth={2} fill="url(#activity)" /></AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="mb-5 font-medium text-white">Recently used</h3>
          <div className="space-y-3">{workflows.slice(0, 4).map((workflow) => <Link key={workflow.id} to={`/app/workflows/${workflow.id}`} className="flex items-center justify-between rounded-xl bg-white/[0.025] p-3 transition hover:bg-white/[0.06]"><div><p className="text-sm text-white">{workflow.name}</p><p className="mt-1 text-xs text-zinc-500">{workflow.lastRun}</p></div><ArrowUpRight size={15} className="text-zinc-500" /></Link>)}</div>
        </Card>
      </div>
      <Card className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-5"><h3 className="font-medium text-white">Execution history</h3><Link className="text-sm text-violet-300" to="/app/executions">View all</Link></div>
        {executionLogs.slice(0, 4).map((log) => <div key={log.id} className="grid grid-cols-[1fr_auto] gap-3 border-t border-white/[0.06] px-5 py-4 sm:grid-cols-[1.2fr_1fr_auto_auto]"><p className="text-sm text-white">{log.workflow}</p><p className="hidden text-sm text-zinc-400 sm:block">{log.output}</p><Badge className={log.status === 'Success' ? 'text-emerald-300' : log.status === 'Failed' ? 'text-rose-300' : 'text-sky-300'}>{log.status}</Badge><span className="hidden text-xs text-zinc-500 sm:block">{log.duration}</span></div>)}
      </Card>
    </motion.div>
  )
}
