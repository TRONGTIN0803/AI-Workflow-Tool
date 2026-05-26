import * as Dialog from '@radix-ui/react-dialog'
import { Command } from 'cmdk'
import { Bot, LayoutDashboard, Layers3, Settings, Workflow, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const commands = [
  { name: 'Open dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Build a workflow', path: '/app/builder', icon: Workflow },
  { name: 'Explore templates', path: '/app/templates', icon: Layers3 },
  { name: 'Ask AI assistant', path: '/app/assistant', icon: Bot },
  { name: 'Settings', path: '/app/settings', icon: Settings },
]

export function CommandPalette() {
  const navigate = useNavigate()
  const open = useAppStore((state) => state.commandOpen)
  const setOpen = useAppStore((state) => state.setCommandOpen)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#111118] shadow-2xl">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">Search application destinations and open a workspace page.</Dialog.Description>
          <Command className="text-zinc-100">
            <div className="flex items-center border-b border-white/10 px-4">
              <span className="text-zinc-500">/</span>
              <Command.Input autoFocus placeholder="Search workflows or navigate..." className="h-14 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-500" />
              <Dialog.Close className="rounded-lg p-1 text-zinc-400 hover:bg-white/10"><X size={16} /></Dialog.Close>
            </div>
            <Command.List className="max-h-80 overflow-auto p-2">
              <Command.Empty className="p-8 text-center text-sm text-zinc-500">No action found.</Command.Empty>
              <Command.Group heading="Navigate" className="text-xs text-zinc-500 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                {commands.map(({ name, path, icon: Icon }) => (
                  <Command.Item
                    key={path}
                    onSelect={() => { navigate(path); setOpen(false) }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
                  >
                    <Icon size={16} />{name}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
