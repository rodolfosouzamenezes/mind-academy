import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AuthContext } from "../../providers/auth";
import { Card, CourseProps } from "../Card";
import './styles.css'
import { useLocation } from "react-router-dom";


export function CourseList() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([] as CourseProps[]);
  const location = useLocation();


  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchCourses = async () => {
    const response = await api.get('/courses').then(res => {
      return res.data.courses.data;
    })

    const coursesOrganized = response.filter((course: CourseProps) => {
      if (user.isAdmin || course.isVisible) {
        return true;
      }      

      return false;
    });

    setCourses(coursesOrganized)
  }

  useEffect(() => {
    fetchCourses()
  }, [location.key])

  return (
    <>
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
        {
          filteredCourses.map((c, i) => {
            return (
              <Card key={i} course={c} />
            )
          })
        }
      </div>
    </>
  );
}
