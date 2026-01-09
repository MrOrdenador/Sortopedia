"use client"
import Link from "next/link"
import { BookOpen, Moon, Sun, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export const Header = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [shineMode, setShineMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <header className="fixed z-9999999 w-full transition-colors backdrop-blur-sm border-b-2 rounded-b-md">
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="home" className="flex items-center gap-2 rounded-md px-2 py-1">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-foreground dark:text-foreground rounded-md">
              Sortopedia
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              onMouseEnter={() => setShineMode(true)}
              onMouseLeave={() => setShineMode(false)}
            >
              <Link
                href="https://github.com/mrordenador/Sortopedia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Star
                  className={`w-4 h-4 ${shineMode ? "text-yellow-400 relative shine" : "text-muted-foreground"}`}
                />
                <span>Star us on GitHub!</span>
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center cursor-pointer"
            >
              <a>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </a>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}