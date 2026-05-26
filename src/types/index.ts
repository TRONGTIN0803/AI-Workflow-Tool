export type WorkflowStatus = 'active' | 'draft' | 'paused' | 'error'
export type NodeKind = 'trigger' | 'prompt' | 'action' | 'output'

export interface WorkflowNode {
  id: string
  kind: NodeKind
  title: string
  description: string
  x: number
  y: number
}

export interface Workflow {
  id: string
  name: string
  description: string
  category: string
  status: WorkflowStatus
  executions: number
  successRate: number
  lastRun: string
  saved: boolean
  nodes: WorkflowNode[]
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  steps: string[]
  estimatedOutput: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  trending: boolean
  users: string
}

export interface Prompt {
  id: string
  name: string
  category: string
  content: string
  variables: string[]
  favorite: boolean
}

export interface ExecutionLog {
  id: string
  workflow: string
  status: 'Success' | 'Failed' | 'Running'
  output: string
  date: string
  duration: string
}
