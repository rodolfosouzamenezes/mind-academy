import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import './styles.css'
import { AuthContext } from '../../providers/auth';
import { CourseList } from '../../components/CourseList';

export function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation();

  const { getMe, user } = useContext(AuthContext)

  const valideToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await getMe()      
    } else {
      setTimeout(() => {
        !user.id && navigate('/')
      }, 2000)
    }
  }

  useEffect(() => {
    valideToken()
  }, [])

  return (
    <div className="content">
      {
        !user.id ? <p>Sua sessão expirou <a onClick={() => navigate('/')}>clique aqui</a> para entrar novamente</p> : 
          <CourseList />
        
      }

    <ScrollRestoration />
    </div>
  )
}