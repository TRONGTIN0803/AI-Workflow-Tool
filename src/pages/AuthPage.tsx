import { ArrowRight, Code2, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'

export function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-5">
      <Card className="w-full max-w-md p-7 md:p-9">
        <Link to="/" className="mb-8 flex items-center gap-3 text-sm font-medium text-white"><span className="rounded-xl bg-violet-500 p-2"><Workflow size={19} /></span> AI Workflow Tool</Link>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
        <p className="mb-8 mt-2 text-sm text-zinc-400">Continue building your personal AI operating system.</p>
        <form className="space-y-4">
          {['Email address', 'Password'].map((label) => <label key={label} className="block text-xs text-zinc-400">{label}<input type={label === 'Password' ? 'password' : 'email'} placeholder={label === 'Password' ? 'Enter your password' : 'creator@studio.dev'} className="mt-2 h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 text-sm text-white outline-none focus:border-violet-400/50" /></label>)}
          <Link to="/app/dashboard" className="block pt-2"><Button variant="accent" className="w-full">Sign in <ArrowRight size={16} /></Button></Link>
        </form>
        <div className="my-6 flex items-center gap-4 text-xs text-zinc-600"><span className="h-px flex-1 bg-white/[0.08]" />OR<span className="h-px flex-1 bg-white/[0.08]" /></div>
        <Button className="w-full"><Code2 size={17} /> Continue with GitHub</Button>
        <p className="mt-7 text-center text-sm text-zinc-500">New creator? <span className="text-violet-300">Create account</span></p>
      </Card>
    </div>
  )
}
