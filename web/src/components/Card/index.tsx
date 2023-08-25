import { useContext, useState } from 'react';
import './styles.css'
import { BookmarkSimple, Info, PencilSimple } from 'phosphor-react'
import { AuthContext } from '../../providers/auth';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';

export interface CourseProps {
  id: string;
  name: string;
  teacher: string;
  category: string;
  description: string;
  imageUrl: string;
  isVisible: boolean;
  isSaved: boolean;
}

interface CardProps {
  course: CourseProps;
}

export function Card({ course }: CardProps) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  console.log(user.isAdmin);
  

  const [isVisible, setIsVisible] = useState(course.isVisible)

  const handleChangeVisibility = async ()  => {
    setIsVisible(!isVisible)

    await api.patch(`/courses/changeVisibility/${course.id}`)
    
  }

  return (
    <div className="card">
      <img className={`banner ${!isVisible && 'banner-desative'}`} src={course.imageUrl} alt={`Curso de ${course.name}`} />


      <div className="card__description">
        <p className='card__category'>{course.category}</p>
        <p className='card__text'>{course.description}</p>

        {
          user.isAdmin ?
            <div className='but'>
              <Button label='Editar Curso' onClick={() => navigate(`/curso/${course.id}`)} />
              <Button label={isVisible ? 'Desativar' : 'Ativar'} onClick={handleChangeVisibility} />
            </div>
            : ''
        }
      </div>
      <div className="card__content">
        <div className="info">
          <h2>{course.name}</h2>
          <p>com {course.teacher}</p>
        </div>

        <div className="buttons">
          {
            user.isAdmin ?
              <button>
                <PencilSimple size={22} weight="light" />
              </button>
              : ''
          }
          {/* <button>
            <BookmarkSimple size={22} weight="light" />
          </button> */}
        </div>
      </div>

    </div>
  )
}