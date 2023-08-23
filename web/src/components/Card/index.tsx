import './styles.css'
import { BookmarkSimple, Info } from 'phosphor-react'

export function Card() {
  return (
    <div className="card">
      <img className="banner" src="https://www.sp.senac.br/documents/20125/45323/14015_01-08-2022_332183904.jpg/7ca0a175-34ca-06fd-b288-73ee8f19e30f?version=1.0&t=1654010967988null&download=true" alt="" />


      <div className="card__content">
        <div className="info">
          <h2>Culinária Básica</h2>
          <p>com Jessica Hasse</p>

        </div>

        <div className="buttons">
          <button>
            <Info size={22} weight="light" />
          </button>
          <button>
            <BookmarkSimple size={22} weight="light" />
          </button>
        </div>
      </div>

    </div>
  )
}