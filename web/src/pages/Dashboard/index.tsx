import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { AuthContext } from '../../providers/auth';

export function Dashboard() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  const { getMe, user } = useContext(AuthContext)


  useEffect(() => {
    const token = localStorage.getItem('token');
    const valideToken = async () => {
      if (token) {
        await getMe()

        !user.id && navigate('/')
      } else {
        !user.id && navigate('/')
      }
    }
    valideToken()
  },)

  return (
    <div className="content">
      {
        !user.id ? <p>Sua sessão expirou <a onClick={() => navigate('/')}>clique aqui</a> para entrar novamente</p> : <>
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
          </div>
        </>
      }
    </div>
  )
}