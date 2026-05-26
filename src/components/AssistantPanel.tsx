import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Bot, Sparkles, WandSparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Button } from './ui'

const suggestions = ['Optimize my content pipeline', 'Debug a failed workflow', 'Create a LinkedIn repurposing flow']

export function AssistantPanel() {
  const open = useAppStore((state) => state.assistantOpen)
  const toggle = useAppStore((state) => state.toggleAssistant)
  const [conversation, setConversation] = useState<string[]>([])
  const [input, setInput] = useState('')

  const submit = (prompt: string) => {
    if (!prompt.trim()) return
    setConversation((messages) => [...messages, prompt])
    setInput('')
  }

  return (
    <>
      <button onClick={toggle} className="fixed bottom-6 right-5 z-30 flex size-14 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-xl shadow-violet-500/30 transition hover:scale-105 md:right-8" aria-label="AI assistant">
        <Bot size={23} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'spring', damping: 27 }} className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[390px] flex-col border-l border-white/10 bg-[#0b0c12]/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/15 p-2 text-violet-300"><WandSparkles size={19} /></div>
                <div><h3 className="font-medium text-white">Workflow Copilot</h3><p className="text-xs text-emerald-400">Online and context-aware</p></div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggle}><X size={18} /></Button>
            </div>
            <div className="flex-1 space-y-4 overflow-auto py-5">
              <div className="rounded-2xl bg-white/[0.04] p-4 text-sm leading-6 text-zinc-300">
                <Sparkles size={16} className="mb-2 text-violet-400" />
                I can generate a workflow, improve your logic, or explain a failed execution.
              </div>
              {suggestions.map((text) => (
                <button key={text} onClick={() => submit(text)} className="block w-full rounded-xl border border-white/[0.08] p-3 text-left text-sm text-zinc-400 transition hover:border-violet-400/40 hover:text-white">{text}</button>
              ))}
              {conversation.map((text, index) => (
                <div key={`${text}-${index}`} className="space-y-2">
                  <p className="ml-auto w-fit max-w-[88%] rounded-2xl bg-violet-500 px-4 py-3 text-sm text-white">{text}</p>
                  <p className="rounded-2xl bg-white/[0.05] px-4 py-3 text-sm leading-6 text-zinc-300">I mapped a streamlined four-step workflow. Add a prompt node with quality checks before publishing.</p>
                </div>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); submit(input) }} className="flex gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-500" placeholder="Ask Copilot..." />
              <Button variant="accent" size="icon" type="submit"><ArrowUp size={18} /></Button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
