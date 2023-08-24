import { useState } from 'react'
import './styles.css'

export function Dashboard() {
  const [search, setSearch] = useState('')

  return (
    <div className="content">
      <div className="input__container">
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          placeholder="Pesquise cursos..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-list">
        {}
      </div>
    </div>
  )
}