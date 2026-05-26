import { type ButtonHTMLAttributes, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-white text-zinc-950 hover:bg-violet-100 shadow-lg shadow-white/10',
        accent: 'bg-violet-500 text-white hover:bg-violet-400 shadow-lg shadow-violet-500/20',
        secondary: 'border border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]',
        ghost: 'text-zinc-400 hover:bg-white/[0.06] hover:text-white',
      },
      size: { sm: 'h-9 px-3', md: 'h-11 px-5', icon: 'size-10' },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
)

export function Button({ className, variant, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('glass rounded-2xl border border-white/[0.08]', className)} {...props} />
}

export function Badge({ className, children }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-zinc-300', className)}>{children}</span>
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>}
    </div>
  )
}
