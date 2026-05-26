import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { prompts, workflows } from '../data/mockData'
import type { Workflow, WorkflowNode } from '../types'

interface AppState {
  theme: 'dark' | 'light'
  workflows: Workflow[]
  favoritePromptIds: string[]
  savedTemplateIds: string[]
  assistantOpen: boolean
  commandOpen: boolean
  selectedWorkflowId: string
  toggleTheme: () => void
  toggleAssistant: () => void
  setCommandOpen: (open: boolean) => void
  selectWorkflow: (id: string) => void
  togglePromptFavorite: (id: string) => void
  toggleTemplate: (id: string) => void
  updateNode: (workflowId: string, node: WorkflowNode) => void
  duplicateTemplate: (name: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      workflows,
      favoritePromptIds: prompts.filter((prompt) => prompt.favorite).map((prompt) => prompt.id),
      savedTemplateIds: ['tiktok', 'dev-release'],
      assistantOpen: false,
      commandOpen: false,
      selectedWorkflowId: 'social-content',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      toggleAssistant: () => set((state) => ({ assistantOpen: !state.assistantOpen })),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      selectWorkflow: (selectedWorkflowId) => set({ selectedWorkflowId }),
      togglePromptFavorite: (id) => set((state) => ({
        favoritePromptIds: state.favoritePromptIds.includes(id)
          ? state.favoritePromptIds.filter((item) => item !== id)
          : [...state.favoritePromptIds, id],
      })),
      toggleTemplate: (id) => set((state) => ({
        savedTemplateIds: state.savedTemplateIds.includes(id)
          ? state.savedTemplateIds.filter((item) => item !== id)
          : [...state.savedTemplateIds, id],
      })),
      updateNode: (workflowId, node) => set((state) => ({
        workflows: state.workflows.map((workflow) => workflow.id !== workflowId ? workflow : {
          ...workflow,
          nodes: workflow.nodes.map((item) => item.id === node.id ? node : item),
        }),
      })),
      duplicateTemplate: (name) => set((state) => ({
        workflows: [{
          ...workflows[0],
          id: `copy-${Date.now()}`,
          name: `${name} Copy`,
          status: 'draft',
          executions: 0,
          lastRun: 'Never run',
        }, ...state.workflows],
      })),
    }),
    {
      name: 'ai-workflow-tool',
      version: 1,
      migrate: (persistedState) => ({
        ...(persistedState as Partial<AppState>),
        workflows,
      }),
    },
  ),
)
