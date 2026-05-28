import { useRef, useEffect, useCallback } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"

export default function CodeEditor({ value, onChange, language }) {
  const codeRef = useRef(null)
  const editorRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [value, language])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const start = e.target.selectionStart
        const end = e.target.selectionEnd
        const newValue = value.slice(0, start) + "  " + value.slice(end)
        onChange(newValue)
        requestAnimationFrame(() => {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2
        })
      }
    },
    [value, onChange]
  )

  const handleScroll = useCallback(() => {
    if (codeRef.current && editorRef.current) {
      codeRef.current.scrollTop = editorRef.current.scrollTop
      codeRef.current.scrollLeft = editorRef.current.scrollLeft
    }
  }, [])

  return (
    <div className="relative">
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        placeholder="Escribe tu código aquí..."
        className="
          relative z-10 w-full h-64 p-4
          font-mono text-sm leading-relaxed
          text-transparent caret-gray-100
          bg-transparent resize-none
          border border-gray-700 rounded-lg
          focus:outline-none focus:border-gray-500
          placeholder:text-gray-600
        "
        spellCheck={false}
      />
      <pre
        className="
          absolute inset-0 z-0 w-full h-64 p-4 m-0
          font-mono text-sm leading-relaxed
          overflow-auto pointer-events-none
          border border-transparent rounded-lg
        "
      >
        <code ref={codeRef} className={`hljs language-${language}`}>
          {value || "\n"}
        </code>
      </pre>
    </div>
  )
}
