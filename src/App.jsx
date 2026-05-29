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

  return (
    <div className="h-screen flex bg-gray-950 text-gray-100">
      <Sidebar
        snippets={snippets}
        allSnippets={allSnippets}
        selectedId={selectedId}
        onSelect={selectSnippet}
        onDelete={deleteSnippet}
        onNew={createNew}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={exportSnippets}
        onImport={importSnippets}
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
      </main>
    </div>
  )
}

export default App
