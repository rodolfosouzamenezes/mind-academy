import { useContext } from 'react';
import './styles.css'
import { BookmarkSimple, Info, PencilSimple } from 'phosphor-react'
import { AuthContext } from '../../providers/auth';

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

  return (
    <div className="card">
      <img className="banner" src={course.imageUrl} alt={`Curso de ${course.name}`} />


      <div className="card__content">
        <div className="info">
          <h2>{course.name}</h2>
          <p>com {course.teacher}</p>

        </div>

        <div className="buttons">
          <button>
            <Info size={22} weight="light" />
          </button>
          {
            user.isAdmin &&
            <button>
              <PencilSimple size={22} weight="light" />
            </button>
          }
          {/* <button>
            <BookmarkSimple size={22} weight="light" />
          </button> */}
        </div>
      </div>

    </div>
  )
}