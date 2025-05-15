"use client"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
          {theme === "dark" ? (
  <Moon className="h-[1.2rem] w-[1.2rem] text-primary animate-pulse" />
) : theme === "light" ? (
  <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400 animate-pulse" />
) : (
  <Sparkles className="h-[1.2rem] w-[1.2rem] text-accent animate-pulse" />
)}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] backdrop-blur-sm bg-background/80 border-primary/20">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10 transition-colors duration-200 flex items-center gap-2"
        >
          <Sun className="h-4 w-4 text-yellow-400" />

          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10 transition-colors duration-200 flex items-center gap-2"
        >
          <Moon className="h-4 w-4 text-primary" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10 transition-colors duration-200 flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
