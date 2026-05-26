import { ArrowLeft, Play, Settings2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { WorkflowNodeCard } from '../components/WorkflowNode'
import { Badge, Button, Card, SectionHeading } from '../components/ui'
import { useAppStore } from '../store/useAppStore'

export function WorkflowDetailPage() {
  const { id } = useParams()
  const workflow = useAppStore((state) => state.workflows.find((item) => item.id === id)) ?? useAppStore.getState().workflows[0]
  return (
    <div>
      <Link className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white" to="/app/dashboard"><ArrowLeft size={16} /> Back to dashboard</Link>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading eyebrow={workflow.category} title={workflow.name} description={workflow.description} />
        <div className="mb-6 flex gap-2"><Button><Settings2 size={15} /> Configure</Button><Button variant="accent"><Play size={15} /> Run now</Button></div>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-5"><p className="text-xs text-zinc-500">Status</p><Badge className="mt-3 text-emerald-300">{workflow.status}</Badge></Card>
        <Card className="p-5"><p className="text-xs text-zinc-500">Total executions</p><p className="mt-3 text-2xl text-white">{workflow.executions.toLocaleString()}</p></Card>
        <Card className="p-5"><p className="text-xs text-zinc-500">Success rate</p><p className="mt-3 text-2xl text-white">{workflow.successRate}%</p></Card>
      </div>
      <Card className="p-5"><h3 className="mb-5 font-medium text-white">Workflow logic</h3><div className="relative h-[320px] overflow-hidden rounded-xl bg-black/20 dot-grid">{workflow.nodes.map((node) => <WorkflowNodeCard key={node.id} node={{ ...node, x: node.x * .86, y: Math.min(node.y, 112) }} />)}</div></Card>
    </div>
  )
}
