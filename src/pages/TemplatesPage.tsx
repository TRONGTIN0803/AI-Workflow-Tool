import { motion } from 'framer-motion'
import { Copy, Search, Star, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge, Button, Card, SectionHeading } from '../components/ui'
import { templates } from '../data/mockData'
import { useAppStore } from '../store/useAppStore'

const categories = ['All', 'Creator', 'Social', 'Marketing', 'Developer', 'Video']

export function TemplatesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const saved = useAppStore((state) => state.savedTemplateIds)
  const toggle = useAppStore((state) => state.toggleTemplate)
  const duplicate = useAppStore((state) => state.duplicateTemplate)
  const visible = useMemo(() => templates.filter((template) => (category === 'All' || template.category === category) && template.name.toLowerCase().includes(query.toLowerCase())), [category, query])

  return (
    <div>
      <SectionHeading eyebrow="Marketplace" title="Workflow Templates" description="Production-ready systems from creator workflows to developer automations." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4"><Search size={16} className="text-zinc-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="Search templates..." /></label>
        <div className="flex gap-2 overflow-auto">{categories.map((item) => <Button size="sm" variant={item === category ? 'accent' : 'secondary'} onClick={() => setCategory(item)} key={item}>{item}</Button>)}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((template, index) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .03 }}>
            <Card className="flex h-full flex-col p-5 hover:border-violet-400/20">
              <div className="mb-4 flex justify-between"><Badge>{template.category}</Badge>{template.trending && <span className="flex items-center gap-1 text-xs text-amber-300"><TrendingUp size={14} /> Trending</span>}</div>
              <h3 className="font-medium text-white">{template.name}</h3>
              <p className="mb-5 mt-2 text-sm leading-6 text-zinc-400">{template.description}</p>
              <div className="mb-5 space-y-2">{template.steps.map((step, stepIndex) => <p key={step} className="flex items-center gap-3 text-xs text-zinc-400"><span className="flex size-5 items-center justify-center rounded-full bg-white/[0.06] text-[10px]">{stepIndex + 1}</span>{step}</p>)}</div>
              <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4 text-xs text-zinc-500"><span>{template.estimatedOutput}</span><span>{template.difficulty} / {template.users}</span></div>
              <div className="mt-4 grid grid-cols-2 gap-2"><Button size="sm" onClick={() => toggle(template.id)}><Star size={14} className={saved.includes(template.id) ? 'fill-violet-300 text-violet-300' : ''} />{saved.includes(template.id) ? 'Saved' : 'Save'}</Button><Button size="sm" variant="ghost" onClick={() => duplicate(template.name)}><Copy size={14} /> Duplicate</Button></div>
            </Card>
          </motion.div>
        ))}
      </div>
      {visible.length === 0 && <Card className="p-14 text-center text-zinc-500">No templates match your search.</Card>}
    </div>
  )
}
