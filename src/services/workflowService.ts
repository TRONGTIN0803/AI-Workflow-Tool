import type { Workflow } from '../types'

export function downloadWorkflow(workflow: Workflow) {
  const contents = JSON.stringify(workflow, null, 2)
  const blob = new Blob([contents], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${workflow.id}.workflow.json`
  anchor.click()
  URL.revokeObjectURL(url)
}
