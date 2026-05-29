import { useCallback } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "../context/ThemeContext"

const LANGUAGE_MAP = {
  jsx: "javascript",
  tsx: "typescript",
  bash: "shell",
  csharp: "csharp",
  cpp: "cpp",
  plaintext: "plaintext",
}

export default function CodeEditor({ value, onChange, language }) {
  const { effectiveTheme } = useTheme()

  const monacoLanguage = LANGUAGE_MAP[language] || language

  const handleChange = useCallback(
    (val) => {
      onChange(val || "")
    },
    [onChange]
  )

  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-700">
      <Editor
        height="100%"
        language={monacoLanguage}
        value={value}
        onChange={handleChange}
        theme={effectiveTheme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          tabSize: 2,
          wordWrap: "on",
        }}
      />
    </div>
  )
}
