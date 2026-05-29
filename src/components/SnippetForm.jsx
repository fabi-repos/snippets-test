import { useState, useEffect } from "react"
import { LANGUAGES } from "../utils/languages"
import CodeEditor from "./CodeEditor"

export default function SnippetForm({ snippet, onSave, onCancel }) {
  const isEditing = snippet !== null
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [tagsInput, setTagsInput] = useState("")

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title)
      setLanguage(snippet.language)
      setCode(snippet.code)
      setTagsInput(snippet.tags.join(", "))
    } else {
      setTitle("")
      setLanguage("javascript")
      setCode("")
      setTagsInput("")
    }
  }, [snippet])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !code.trim()) return
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    if (isEditing) {
      onSave(snippet.id, { title: title.trim(), language, code, tags })
    } else {
      onSave({ title: title.trim(), language, code, tags })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del snippet"
          className="
            flex-1 bg-transparent text-lg font-medium
            text-gray-100 placeholder:text-gray-600
            focus:outline-none
          "
          autoFocus
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            bg-gray-800 text-gray-200 text-sm
            border border-gray-700 rounded-lg px-3 py-1.5
            focus:outline-none focus:border-gray-500
          "
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
          <CodeEditor value={code} onChange={setCode} language={language} />
        </div>

        <div className="mt-4 shrink-0">
          <label className="block text-xs text-gray-500 mb-1">Tags (separados por coma)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="ej: react, hook, util"
            className="
              w-full bg-gray-800 border border-gray-700 rounded-lg
              px-3 py-2 text-sm text-gray-200
              placeholder:text-gray-600
              focus:outline-none focus:border-gray-500
            "
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800">
        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2 text-sm text-gray-400
            hover:text-gray-200 transition-colors cursor-pointer
          "
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!title.trim() || !code.trim()}
          className="
            px-4 py-2 text-sm font-medium
            bg-gray-700 hover:bg-gray-600
            disabled:opacity-40 disabled:cursor-not-allowed
            text-gray-200 rounded-lg transition-colors cursor-pointer
          "
        >
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  )
}
