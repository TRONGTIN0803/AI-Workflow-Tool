import { motion } from 'framer-motion'
import { ArrowRight, Bot, Check, Layers3, Play, Sparkles, Workflow, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card, SectionHeading } from '../components/ui'

const stats = [['42k+', 'Workflows executed'], ['98.2%', 'Success rate'], ['12.6h', 'Saved each week'], ['4', 'Connected products']]
const features = [
  { icon: Workflow, title: 'Visual automation', text: 'Compose triggers, prompt logic and publishing outputs on one focused canvas.' },
  { icon: Bot, title: 'Prompt intelligence', text: 'Reuse your Prompt Manager library with variables, previews and favorites.' },
  { icon: Zap, title: 'Creator velocity', text: 'Repurpose one insight into content for every channel automatically.' },
]
const faq = ['Can I connect my existing prompts?', 'Do workflows require code?', 'Can I export automation templates?']

export function LandingPage() {
  return (
    <div className="min-h-screen bg-app text-zinc-200">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold text-white"><span className="flex size-10 items-center justify-center rounded-xl bg-violet-500"><Workflow size={20} /></span>AI Workflow Tool</Link>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"><a href="#features">Features</a><a href="#ecosystem">Ecosystem</a><a href="#faq">FAQ</a></nav>
        <div className="flex gap-2"><Link to="/auth" className="hidden sm:block"><Button variant="ghost">Sign in</Button></Link><Link to="/app/dashboard"><Button variant="primary" size="sm">Launch App</Button></Link></div>
      </header>
      <main>
        <section className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden px-5 pb-20 pt-14 lg:grid-cols-[.9fr_1.1fr] lg:pt-24">
          <div className="orb left-[-180px] top-[-60px]" />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300"><Sparkles size={14} /> Personal AI OS for creators</span>
            <h1 className="max-w-xl text-5xl font-semibold leading-[1.06] tracking-[-0.06em] text-white sm:text-6xl">Build Your AI Operating System</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">Manage prompts, automate content, and scale your creator workflow with AI.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link to="/app/builder"><Button variant="primary">Start Building <ArrowRight size={16} /></Button></Link><Link to="/app/templates"><Button>Explore Workflows <Play size={16} /></Button></Link></div>
            <div className="mt-12 flex items-center gap-5 text-sm text-zinc-500"><span className="flex -space-x-2">{['PT', 'AI', 'CR'].map((item) => <i key={item} className="flex size-9 items-center justify-center rounded-full border-2 border-[#08090e] bg-zinc-800 not-italic text-xs text-white">{item}</i>)}</span>Built for independent creators</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 }} className="relative z-10 lg:pt-7">
            <Card className="relative min-h-[450px] overflow-hidden p-5 shadow-2xl shadow-violet-950/40">
              <div className="mb-6 flex items-center justify-between"><div><p className="text-xs text-zinc-500">Running workflow</p><p className="mt-1 font-medium text-white">Content Repurposing Pipeline</p></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">Active</span></div>
              <div className="relative h-[320px] rounded-xl border border-white/[0.06] bg-black/25 dot-grid">
                {[
                  ['Trigger', 'New video', 'left-5 top-16 border-amber-400/30'],
                  ['AI Prompt', 'Hook Writer', 'left-[35%] top-40 border-violet-400/30'],
                  ['Action', 'Generate post', 'right-5 top-20 border-sky-400/30'],
                ].map(([label, text, style]) => <div key={label} className={`absolute w-36 rounded-xl border bg-[#11131c] p-3 ${style}`}><p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-2 text-xs text-white">{text}</p></div>)}
                <svg className="absolute inset-0 size-full text-violet-500/40"><path d="M155 108 C210 108 180 192 230 192 M370 192 C410 192 390 112 440 112" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" /></svg>
              </div>
            </Card>
          </motion.div>
        </section>
        <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pb-20 md:grid-cols-4">
          {stats.map(([number, label]) => <Card className="p-5" key={label}><p className="text-3xl font-semibold tracking-tight text-white">{number}</p><p className="mt-2 text-sm text-zinc-500">{label}</p></Card>)}
        </section>
        <section id="features" className="mx-auto max-w-7xl px-5 py-14">
          <SectionHeading eyebrow="Automation" title="Everything in one intelligent workspace" description="A calm, powerful interface for ideas, prompts, executions and measurable output." />
          <div className="grid gap-4 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <Card key={title} className="p-6 transition hover:-translate-y-1 hover:border-violet-400/25"><Icon className="mb-8 text-violet-300" /><h3 className="mb-2 font-medium text-white">{title}</h3><p className="text-sm leading-6 text-zinc-400">{text}</p></Card>)}</div>
        </section>
        <section id="ecosystem" className="mx-auto max-w-7xl px-5 py-16">
          <Card className="grid gap-8 p-7 md:grid-cols-[.7fr_1fr] md:p-12">
            <div><p className="text-sm text-violet-300">Creator Ecosystem</p><h2 className="mt-4 text-3xl font-semibold text-white">Your personal AI stack, connected.</h2><p className="mt-4 text-zinc-400">Portfolio, prompt library, dashboard and automations speak one product language.</p></div>
            <div className="space-y-3">{['Portfolio Website', 'AI Prompt Manager', 'Creator Dashboard', 'AI Workflow Tool'].map((name, index) => <div key={name} className="flex items-center justify-between rounded-xl bg-white/[0.04] p-4"><span className="flex items-center gap-3 text-sm text-zinc-200"><Check size={16} className="text-emerald-400" />{name}</span><Layers3 size={16} className={index === 3 ? 'text-violet-300' : 'text-zinc-600'} /></div>)}</div>
          </Card>
        </section>
        <section id="faq" className="mx-auto max-w-3xl px-5 py-16"><SectionHeading eyebrow="FAQ" title="Questions, answered" />{faq.map((item) => <Card key={item} className="mb-3 flex items-center justify-between p-5"><span className="text-sm text-zinc-200">{item}</span><span className="text-zinc-500">+</span></Card>)}</section>
      </main>
      <footer className="mt-12 border-t border-white/[0.07] px-5 py-8 text-center text-sm text-zinc-500">AI Workflow Tool / Part of the Creator AI Operating System</footer>
    </div>
  )
}
