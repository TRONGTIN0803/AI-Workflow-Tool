import * as Dialog from '@radix-ui/react-dialog'
import { DndContext, type DragEndEvent, useDroppable } from '@dnd-kit/core'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, ChevronDown, Download, Eye, Heart, Play, Plus, Upload, X } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { WorkflowNodeCard } from '../components/WorkflowNode'
import { Badge, Button, Card, SectionHeading } from '../components/ui'
import { prompts } from '../data/mockData'
import { downloadWorkflow } from '../services/workflowService'
import { useAppStore } from '../store/useAppStore'
import type { Prompt } from '../types'

function Canvas({ children }: { children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })
  return <div ref={setNodeRef} className={`relative h-[470px] min-w-[610px] overflow-auto rounded-2xl border dot-grid transition ${isOver ? 'border-violet-400/40 bg-violet-500/[0.03]' : 'border-white/[0.07] bg-black/20'}`}>{children}</div>
}

export function BuilderPage() {
  const workflows = useAppStore((state) => state.workflows)
  const selectedId = useAppStore((state) => state.selectedWorkflowId)
  const select = useAppStore((state) => state.selectWorkflow)
  const updateNode = useAppStore((state) => state.updateNode)
  const favoriteIds = useAppStore((state) => state.favoritePromptIds)
  const toggleFavorite = useAppStore((state) => state.togglePromptFavorite)
  const [preview, setPreview] = useState<Prompt | null>(null)
  const [toast, setToast] = useState('')
  const workflow = useMemo(() => workflows.find((item) => item.id === selectedId) ?? workflows[0], [selectedId, workflows])

  const onDragEnd = ({ active, delta }: DragEndEvent) => {
    const node = workflow.nodes.find((item) => item.id === active.id)
    if (node) updateNode(workflow.id, { ...node, x: Math.max(8, node.x + delta.x), y: Math.max(8, node.y + delta.y) })
  }
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Studio" title="Workflow Builder" description="Design a reliable automation with triggers, prompt intelligence and publish-ready output." />
        <div className="mb-6 flex gap-2"><Button size="sm" onClick={() => { downloadWorkflow(workflow); notify('Workflow exported as JSON') }}><Download size={15} /> Export</Button><Button size="sm" onClick={() => notify('Import workflow is ready for API connection')}><Upload size={15} /> Import</Button><Button variant="accent" size="sm" onClick={() => notify('Test execution started')}><Play size={15} /> Test run</Button></div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_285px]">
        <Card className="p-4 md:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white">
              <select value={workflow.id} onChange={(event) => select(event.target.value)} className="appearance-none bg-transparent pr-8 outline-none">
                {workflows.map((item) => <option key={item.id} value={item.id} className="bg-zinc-900">{item.name}</option>)}
              </select><ChevronDown size={15} className="-ml-7 pointer-events-none text-zinc-400" />
            </label>
            <Badge className="text-emerald-300">{workflow.status}</Badge>
          </div>
          <div className="overflow-x-auto">
            <DndContext onDragEnd={onDragEnd}>
              <Canvas>
                <svg className="pointer-events-none absolute inset-0 size-full text-zinc-700"><path d="M182 120 C204 120 204 80 226 80 M306 126 L306 224 M386 278 C410 278 406 174 430 174" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" /></svg>
                {workflow.nodes.map((node) => <WorkflowNodeCard key={node.id} node={node} />)}
                <button className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-2 text-xs text-zinc-400 hover:text-white"><Plus size={15} /> Add node</button>
              </Canvas>
            </DndContext>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-4 flex items-center gap-2"><Bot size={16} className="text-violet-300" /><h3 className="text-sm font-medium text-white">AI Prompt Manager</h3></div>
            <div className="space-y-2">{prompts.map((prompt) => <div key={prompt.id} className="rounded-xl bg-white/[0.035] p-3"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-white">{prompt.name}</p><p className="mt-1 text-[11px] text-zinc-500">{prompt.category}</p></div><button onClick={() => toggleFavorite(prompt.id)}><Heart size={14} className={favoriteIds.includes(prompt.id) ? 'fill-violet-400 text-violet-400' : 'text-zinc-500'} /></button></div><Button size="sm" variant="ghost" className="mt-2 h-7 px-2 text-xs" onClick={() => setPreview(prompt)}><Eye size={13} /> Preview</Button></div>)}</div>
          </Card>
        </div>
      </div>
      <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-7 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-900 px-5 py-3 text-sm text-white shadow-xl">{toast}</motion.div>}</AnimatePresence>
      <Dialog.Root open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#11121a] p-6">
            <Dialog.Title className="text-lg font-medium text-white">{preview?.name}</Dialog.Title>
            <Dialog.Description className="sr-only">Preview this prompt content and its dynamic workflow variables.</Dialog.Description>
            <Dialog.Close className="absolute right-5 top-5 text-zinc-400"><X size={18} /></Dialog.Close>
            <p className="mt-5 rounded-xl bg-white/[0.04] p-4 text-sm leading-7 text-zinc-300">{preview?.content}</p>
            <div className="mt-4 flex gap-2">{preview?.variables.map((variable) => <Badge key={variable}>{`{${variable}}`}</Badge>)}</div>
            <Button variant="accent" className="mt-6 w-full">Use in workflow</Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
