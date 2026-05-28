export default function EmptyState({ onNew }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 mb-4 rounded-xl bg-gray-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <h2 className="text-lg font-medium text-gray-300 mb-2">
        No hay snippets aún
      </h2>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        Crea tu primer snippet de código para empezar a guardar tus fragmentos favoritos.
      </p>
      <button
        onClick={onNew}
        className="
          px-5 py-2.5 text-sm font-medium
          bg-gray-800 hover:bg-gray-700
          text-gray-200 rounded-lg
          border border-gray-700
          transition-colors cursor-pointer
        "
      >
        Crear primer snippet
      </button>
    </div>
  )
}
