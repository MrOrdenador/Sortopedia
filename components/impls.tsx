"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"
import { codeToHtml } from "shiki"

interface Implementation {
  language: string
  code: string
}

interface CodeIDEProps {
  implementations: Implementation[]
}

export function Impls({ implementations }: CodeIDEProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState("")

  useEffect(() => {
    let b = true
    codeToHtml(implementations[activeTab].code, {
      lang: implementations[activeTab].language,
      theme: "tokyo-night", // plastic solarized-light night-owl
    }).then((html) => {
      setHighlightedCode(html)
    })
    return () => { b = false }
  }, [activeTab, implementations])

  async function handleCopy() {
    await navigator.clipboard.writeText(implementations[activeTab].code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex bg-muted border-b border-border">
        {implementations.map((impl, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`impl-tab flex-1 flex items-center justify-center p-3 border-r border-border last:border-r-0 transition-colors relative cursor-pointer ${activeTab === index
                ? "bg-muted text-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
          >
            <img src={`https://skillicons.dev/icons?i=${impl.language}`} alt={impl.language} className="w-5 h-5" />
            {activeTab === index && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="relative bg-card">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 text-muted-foreground border-2 hover:text-foreground hover:border-ring transition-colors duration-300 cursor-pointer z-9999999999 rounded-lg"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>

        <div className="p-4 overflow-x-auto overflow-y-auto">
          <div
            className="font-mono text-sm leading-relaxed [&>pre]:bg-transparent! p-0 m-0"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>
    </div>
  )
}
