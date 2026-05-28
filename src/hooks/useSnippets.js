import { useState, useCallback, useMemo, useEffect } from "react"
import { loadSnippets, saveSnippets } from "../utils/storage"
import { SAMPLES } from "../utils/samples"

function initializeSnippets() {
  const stored = loadSnippets()
  if (stored.length === 0) {
    saveSnippets(SAMPLES)
    return SAMPLES
  }
  return stored
}

export function useSnippets() {
  const [snippets, setSnippets] = useState(initializeSnippets)
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    saveSnippets(snippets)
  }, [snippets])

  const addSnippet = useCallback((data) => {
    const now = new Date().toISOString()
    const snippet = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    setSnippets((prev) => [snippet, ...prev])
    setSelectedId(snippet.id)
  }, [])

  const updateSnippet = useCallback((id, data) => {
    setSnippets((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      )
    )
  }, [])

  const deleteSnippet = useCallback((id) => {
    setSnippets((prev) => {
      const next = prev.filter((s) => s.id !== id)
      return next
    })
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const selectSnippet = useCallback((id) => {
    setSelectedId(id)
  }, [])

  const createNew = useCallback(() => {
    setSelectedId(null)
  }, [])

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return snippets
    const q = searchQuery.toLowerCase()
    return snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.code.toLowerCase().includes(q)
    )
  }, [snippets, searchQuery])

  const selected = useMemo(
    () => snippets.find((s) => s.id === selectedId) ?? null,
    [snippets, selectedId]
  )

  const exportSnippets = useCallback(() => {
    const blob = new Blob([JSON.stringify(snippets, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `snippets-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [snippets])

  const importSnippets = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (!Array.isArray(data)) throw new Error("Invalid format")
        const valid = data.filter((s) => s.title && s.code)
        setSnippets((prev) => [...valid, ...prev])
      } catch (err) {
        alert("Error importing snippets: " + err.message)
      }
    }
    reader.readAsText(file)
  }, [])

  return {
    snippets: filtered,
    allSnippets: snippets,
    selected,
    selectedId,
    searchQuery,
    setSearchQuery,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    selectSnippet,
    createNew,
    exportSnippets,
    importSnippets,
  }
}
