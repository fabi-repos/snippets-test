import SearchBar from "./SearchBar"

const LANG_COLORS = {
  javascript: "text-yellow-400",
  typescript: "text-blue-400",
  jsx: "text-cyan-400",
  tsx: "text-blue-400",
  python: "text-green-400",
  html: "text-orange-400",
  css: "text-pink-400",
  sql: "text-indigo-400",
  json: "text-yellow-300",
  bash: "text-gray-300",
  java: "text-red-400",
  kotlin: "text-purple-400",
  go: "text-cyan-300",
  rust: "text-orange-300",
  cpp: "text-blue-300",
  csharp: "text-green-300",
  php: "text-violet-400",
  ruby: "text-red-300",
  yaml: "text-gray-300",
  markdown: "text-gray-300",
  plaintext: "text-gray-400",
}

function formatDate(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function Sidebar({
  snippets,
  selectedId,
  onSelect,
  onDelete,
  onNew,
  searchQuery,
  onSearchChange,
}) {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col h-screen shrink-0">
      <div className="p-3 border-b border-gray-800 space-y-2">
        <button
          onClick={onNew}
          className="
            w-full py-2 px-3
            bg-gray-800 hover:bg-gray-700
            text-gray-200 text-sm font-medium
            rounded-lg border border-dashed border-gray-600
            transition-colors cursor-pointer
          "
        >
          + Nuevo snippet
        </button>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {snippets.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            {searchQuery ? "Sin resultados" : "No hay snippets"}
          </p>
        ) : (
          <ul className="divide-y divide-gray-800">
            {snippets.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onSelect(s.id)}
                  className={`
                    w-full text-left p-3 hover:bg-gray-800 transition-colors cursor-pointer
                    ${selectedId === s.id ? "bg-gray-800 border-l-2 border-gray-400" : "border-l-2 border-transparent"}
                  `}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {s.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(s.id)
                      }}
                      className="text-gray-600 hover:text-red-400 shrink-0 cursor-pointer"
                      title="Eliminar"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-mono ${LANG_COLORS[s.language] ?? "text-gray-400"}`}>
                      {s.language}
                    </span>
                    <span className="text-xs text-gray-600">{formatDate(s.updatedAt)}</span>
                  </div>
                  {s.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 bg-gray-750 text-gray-400 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
