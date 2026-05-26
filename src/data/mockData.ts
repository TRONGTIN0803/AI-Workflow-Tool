import type { ExecutionLog, Prompt, Template, Workflow } from '../types'

const contentNodes = [
  { id: 'n1', kind: 'trigger' as const, title: 'New idea added', description: 'Notion content inbox', x: 22, y: 64 },
  { id: 'n2', kind: 'prompt' as const, title: 'Creator Hook Writer', description: 'Inject {topic} + {tone}', x: 226, y: 24 },
  { id: 'n3', kind: 'action' as const, title: 'Generate variants', description: 'GPT-4.1 / 3 outputs', x: 226, y: 224 },
  { id: 'n4', kind: 'output' as const, title: 'Schedule draft', description: 'Creator Dashboard', x: 430, y: 118 },
]

export const workflows: Workflow[] = [
  { id: 'social-content', name: 'Generate Social Content', description: 'Turn new ideas into polished multi-channel drafts.', category: 'Content', status: 'active', executions: 1284, successRate: 98.2, lastRun: '2 min ago', saved: true, nodes: contentNodes },
  { id: 'carousel-script', name: 'Instagram Carousel Script', description: 'Structure a scroll-stopping 8-card carousel.', category: 'Creator', status: 'active', executions: 862, successRate: 96.4, lastRun: '18 min ago', saved: false, nodes: contentNodes },
  { id: 'copy-rewrite', name: 'Rewrite Landing Copy', description: 'Rewrite offers with conversion-focused language.', category: 'Marketing', status: 'draft', executions: 304, successRate: 94.8, lastRun: 'Yesterday', saved: false, nodes: contentNodes },
  { id: 'affiliate', name: 'Affiliate Review Pipeline', description: 'Research, compare and format review posts.', category: 'Affiliate', status: 'paused', executions: 497, successRate: 91.3, lastRun: 'May 23', saved: true, nodes: contentNodes },
]

export const templates: Template[] = [
  { id: 'tiktok', name: 'TikTok Content Workflow', description: 'Idea to hook, script and caption in under three minutes.', category: 'Creator', steps: ['Topic intake', 'Hook generator', 'Script outline', 'Caption + hashtags'], estimatedOutput: '5 video concepts', difficulty: 'Beginner', trending: true, users: '4.8k' },
  { id: 'carousel', name: 'Instagram Carousel Workflow', description: 'Educational carousel copy with visual direction.', category: 'Social', steps: ['Audience pain', 'Slide narrative', 'CTA writer'], estimatedOutput: '8 slides + caption', difficulty: 'Beginner', trending: true, users: '3.1k' },
  { id: 'affiliate-template', name: 'Affiliate Content Workflow', description: 'Product briefs into high-intent review content.', category: 'Marketing', steps: ['Product facts', 'Comparison', 'SEO article', 'Affiliate CTA'], estimatedOutput: '1 article + 3 posts', difficulty: 'Intermediate', trending: false, users: '1.9k' },
  { id: 'shorts', name: 'YouTube Shorts Workflow', description: 'Repurpose long videos into short scripts.', category: 'Video', steps: ['Transcript', 'Moment scoring', 'Shorts script'], estimatedOutput: '6 scripts', difficulty: 'Intermediate', trending: true, users: '2.4k' },
  { id: 'linkedin', name: 'LinkedIn Personal Branding', description: 'Build thoughtful posts from daily learnings.', category: 'Creator', steps: ['Journal entry', 'Story arc', 'Format post'], estimatedOutput: '3 posts', difficulty: 'Beginner', trending: false, users: '1.2k' },
  { id: 'dev-release', name: 'Developer Release Notes AI', description: 'Translate commits into clear launch posts.', category: 'Developer', steps: ['Git changes', 'Summarize', 'Publish channels'], estimatedOutput: 'Release note + tweet', difficulty: 'Advanced', trending: true, users: '920' },
]

export const prompts: Prompt[] = [
  { id: 'hook', name: 'Creator Hook Writer', category: 'Social', content: 'Write 5 curiosity-driven hooks about {topic} for {audience} in a {tone} tone.', variables: ['topic', 'audience', 'tone'], favorite: true },
  { id: 'repurpose', name: 'Content Repurposer', category: 'Creator', content: 'Turn {source} into platform-native content for {platform}. Preserve the central insight.', variables: ['source', 'platform'], favorite: true },
  { id: 'cta', name: 'Conversion CTA', category: 'Marketing', content: 'Generate three CTAs for {offer}, aimed at {persona}.', variables: ['offer', 'persona'], favorite: false },
  { id: 'debug', name: 'Workflow Debugger', category: 'Developer', content: 'Review this automation: {workflow}. Identify weak steps and propose safeguards.', variables: ['workflow'], favorite: false },
]

export const executionLogs: ExecutionLog[] = [
  { id: 'e1', workflow: 'Generate Social Content', status: 'Success', output: '3 LinkedIn drafts generated', date: 'Today, 09:42', duration: '12.4s' },
  { id: 'e2', workflow: 'Instagram Carousel Script', status: 'Success', output: '8-slide carousel saved', date: 'Today, 09:18', duration: '18.1s' },
  { id: 'e3', workflow: 'Affiliate Review Pipeline', status: 'Failed', output: 'Missing product URL variable', date: 'Yesterday, 22:13', duration: '2.8s' },
  { id: 'e4', workflow: 'Rewrite Landing Copy', status: 'Success', output: 'Hero section variants ready', date: 'Yesterday, 17:06', duration: '9.7s' },
  { id: 'e5', workflow: 'YouTube Shorts Workflow', status: 'Running', output: 'Extracting key moments', date: 'Just now', duration: '04.2s' },
]

export const usageChart = [
  { day: 'Mon', executions: 38, tokens: 22 },
  { day: 'Tue', executions: 52, tokens: 34 },
  { day: 'Wed', executions: 45, tokens: 28 },
  { day: 'Thu', executions: 71, tokens: 51 },
  { day: 'Fri', executions: 64, tokens: 44 },
  { day: 'Sat', executions: 81, tokens: 58 },
  { day: 'Sun', executions: 93, tokens: 68 },
]
