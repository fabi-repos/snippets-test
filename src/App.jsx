import { useRef } from "react"
import { useSnippets } from "./hooks/useSnippets"
import Sidebar from "./components/Sidebar"
import SnippetForm from "./components/SnippetForm"
import EmptyState from "./components/EmptyState"

function App() {
  const {
    snippets,
    allSnippets,
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
  } = useSnippets()

  const importRef = useRef(null)

  const handleImport = () => {
    importRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) importSnippets(file)
    e.target.value = ""
  }

  return (
    <div className="h-screen flex bg-gray-950 text-gray-100">
      <Sidebar
        snippets={snippets}
        selectedId={selectedId}
        onSelect={selectSnippet}
        onDelete={deleteSnippet}
        onNew={createNew}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {selectedId === null ? (
          selected ? null : (
            <SnippetForm
              key="new"
              snippet={null}
              onSave={(data) => addSnippet(data)}
              onCancel={createNew}
            />
          )
        ) : selected ? (
          <SnippetForm
            key={selected.id}
            snippet={selected}
            onSave={(id, data) => updateSnippet(id, data)}
            onCancel={() => selectSnippet(null)}
          />
        ) : (
          <EmptyState onNew={createNew} />
        )}

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={exportSnippets}
            disabled={allSnippets.length === 0}
            className="
              px-3 py-1.5 text-xs font-medium
              bg-gray-800 hover:bg-gray-700
              disabled:opacity-40 disabled:cursor-not-allowed
              text-gray-400 rounded-lg border border-gray-700
              transition-colors cursor-pointer
            "
            title="Exportar snippets"
          >
            Exportar
          </button>
          <button
            onClick={handleImport}
            className="
              px-3 py-1.5 text-xs font-medium
              bg-gray-800 hover:bg-gray-700
              text-gray-400 rounded-lg border border-gray-700
              transition-colors cursor-pointer
            "
            title="Importar snippets"
          >
            Importar
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </main>
    </div>
  )
}

export default App
