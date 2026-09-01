"use client"

import { useEffect, useRef, useState } from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const options = [
  { value: "system", label: "System", Icon: Laptop },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
]

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = options.find((option) => option.value === (theme || "system")) || options[0]
  const ActiveIcon = active.Icon

  useEffect(() => {
    const close = (event) => { if (!ref.current?.contains(event.target)) setOpen(false) }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return <div ref={ref} className="relative">
    <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-w-28 items-center justify-between gap-2 rounded-lg border border-foreground/20 bg-background px-3 py-2 text-xs font-semibold text-foreground">
      <span className="flex items-center gap-2"><ActiveIcon className="h-4 w-4" />{active.label}</span><span className="text-foreground/55">⌄</span>
    </button>
    {open && <div role="menu" className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-32 rounded-lg border border-foreground/15 bg-background p-1 shadow-lg">
      {options.map(({ value, label, Icon }) => <button key={value} role="menuitem" onClick={() => { setTheme(value); setOpen(false) }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-foreground hover:bg-foreground hover:text-background">
        <Icon className="h-4 w-4" />{label}
      </button>)}
    </div>}
  </div>
}
