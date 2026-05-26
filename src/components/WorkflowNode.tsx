import { useDraggable } from '@dnd-kit/core'
import { Bot, CirclePlay, Send, Zap } from 'lucide-react'
import type { WorkflowNode as WorkflowNodeType } from '../types'
import { cn } from '../utils/cn'

const nodeConfig = {
  trigger: { icon: Zap, color: 'border-amber-400/35 text-amber-300 bg-amber-500/10' },
  prompt: { icon: Bot, color: 'border-violet-400/35 text-violet-300 bg-violet-500/10' },
  action: { icon: CirclePlay, color: 'border-sky-400/35 text-sky-300 bg-sky-500/10' },
  output: { icon: Send, color: 'border-emerald-400/35 text-emerald-300 bg-emerald-500/10' },
}

export function WorkflowNodeCard({ node }: { node: WorkflowNodeType }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: node.id })
  const config = nodeConfig[node.kind]
  const Icon = config.icon
  const style = {
    left: node.x,
    top: node.y,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={cn('absolute w-40 cursor-grab rounded-2xl border bg-[#14151e] p-3 text-left shadow-xl transition active:cursor-grabbing', config.color, isDragging && 'z-20 scale-[1.03] shadow-violet-500/20')}>
      <div className="mb-3 flex items-center justify-between">
        <Icon size={16} /><span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">{node.kind}</span>
      </div>
      <p className="text-sm font-medium text-white">{node.title}</p>
      <p className="mt-1 text-xs text-zinc-400">{node.description}</p>
    </button>
  )
}
