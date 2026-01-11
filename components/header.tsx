"use client";

import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  const [shineMode, setShineMode] = useState(false);

  return (
    <header className="fixed z-9999999 w-full transition-colors backdrop-blur-sm border-b-2 rounded-b-md">
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="home"
            className="flex items-center gap-2 rounded-md px-2 py-1"
          >
            <BookOpen className="size-6 text-primary" />
            <span className="text-xl font-bold text-foreground dark:text-foreground rounded-md font-mono tracking-tighter">
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
                  className={`size-4 ${
                    shineMode
                      ? "text-yellow-400 relative shine"
                      : "text-muted-foreground"
                  }`}
                />
                <span>Star us on GitHub!</span>
              </Link>
            </Button>

            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
