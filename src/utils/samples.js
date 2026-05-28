const now = new Date().toISOString()

export const SAMPLES = [
  {
    id: crypto.randomUUID(),
    title: "Debounce function",
    language: "javascript",
    code: `function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}`,
    tags: ["util", "performance"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "Fetch API wrapper",
    language: "javascript",
    code: `async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
}`,
    tags: ["http", "async"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "useState + useEffect",
    language: "jsx",
    code: `import { useState, useEffect } from "react"

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}`,
    tags: ["react", "hook"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "Custom Hook template",
    language: "jsx",
    code: `import { useState, useCallback } from "react"

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  const setTrue = useCallback(() => setOn(true), [])
  const setFalse = useCallback(() => setOn(false), [])
  return { on, toggle, setTrue, setFalse }
}`,
    tags: ["react", "hook", "pattern"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "Flexbox centrado",
    language: "css",
    code: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
    tags: ["css", "layout"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "CSS Grid responsive",
    language: "css",
    code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}`,
    tags: ["css", "layout", "responsive"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "List comprehension",
    language: "python",
    code: `squares = [x**2 for x in range(10)]
evens = [x for x in range(50) if x % 2 == 0]
matrix = [[i + j for j in range(3)] for i in range(3)]`,
    tags: ["python", "idiomatic"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "Flask Hello World",
    language: "python",
    code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)`,
    tags: ["flask", "web"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "SELECT con JOIN",
    language: "sql",
    code: `SELECT
  o.id,
  u.name AS usuario,
  p.nombre AS producto,
  oi.cantidad,
  oi.precio
FROM ordenes o
JOIN usuarios u ON u.id = o.usuario_id
JOIN orden_items oi ON oi.orden_id = o.id
JOIN productos p ON p.id = oi.producto_id
WHERE o.estado = 'confirmada'
ORDER BY o.fecha DESC;`,
    tags: ["sql", "joins"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: "CREATE TABLE",
    language: "sql",
    code: `CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  precio REAL NOT NULL,
  stock INTEGER DEFAULT 0,
  activo INTEGER DEFAULT 1
);`,
    tags: ["sql", "ddl"],
    createdAt: now,
    updatedAt: now,
  },
]
