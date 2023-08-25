import { ScrollRestoration, useNavigate, useParams } from 'react-router-dom';
import '../../styles/auth.css'
import { FormEvent, useEffect, useState } from "react";
import { api } from '../../lib/axios';

interface FormData {
  name: string;
  teacher: string;
  category: string;
  description: string;
  isVisible: boolean;
  image: File | null;
}

export function CourseForm() {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = id !== 'none';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    teacher: '',
    category: '',
    description: '',
    isVisible: false,
    image: null,
  });

  // Busca os dados do curso caso seja uma edição
  useEffect(() => {
    async function fetchCourseData() {
      if (isEdit) {
        try {
          const response = await api.get(`/courses/${id}`);
          
          const courseData = response.data.course;

          setFormData({
            name: courseData.name,
            teacher: courseData.teacher,
            category: courseData.category,
            description: courseData.description,
            isVisible: courseData.isVisible,
            image: null, 
          });
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
    }

    fetchCourseData();
  }, [id]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        image: event.target.files[0],
      }));
    }
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { image, ...restData } = formData;
    const formDataToSend = new FormData();

    formDataToSend.append('name', restData.name);
    formDataToSend.append('teacher', restData.teacher);
    formDataToSend.append('category', restData.category);
    formDataToSend.append('description', restData.description);
    formDataToSend.append('isVisible', String(restData.isVisible));
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      if (id === 'none') {
        await api.post('/courses', formDataToSend);
      } else {
        await api.put(`/courses/${id}`, formDataToSend);
      }

      navigate('/dashboard');

      // Limpar o formulário após o envio bem-sucedido, se necessário
      setFormData({
        name: '',
        teacher: '',
        category: '',
        description: '',
        isVisible: false,
        image: null,
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  }

  return (
    <div className="content">

      <a href="/dashboard">CANCELAR</a>
      <h1>{isEdit ? 'Editar curso' : 'Adicionar curso'}</h1>


      <form onSubmit={handleSubmit}>
        <div className="input__container">
          <label htmlFor="name">Nome*</label>
          <input
            autoFocus
            required
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Insira seu nome..."
            onChange={handleInputChange}
          />
        </div>
        <div className="input__container">
          <label htmlFor="teacher">Professor*</label>
          <input
            required
            id="teacher"
            name="teacher"
            type="text"
            value={formData.teacher}
            placeholder="Insira o nome do professor..."
            onChange={handleInputChange}
          />
        </div>
        <div className="input__container">
          <label htmlFor="category">Categoria*</label>
          <input
            required
            id="category"
            name="category"
            type="text"
            value={formData.category}
            placeholder="Insira a categoria..."
            onChange={handleInputChange}
          />
        </div>
        <div className="input__container">
          <label htmlFor="description">Descrição*</label>
          <textarea
            required
            id="description"
            name="description"
            value={formData.description}
            placeholder="Insira a descrição..."
            onChange={handleInputChange}
          />
        </div>
        <div className="input__container">
          <label htmlFor="isVisible">Visível</label>
          <input
            id="isVisible"
            name="isVisible"
            type="checkbox"
            checked={formData.isVisible}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, isVisible: e.target.checked }))}
          />
        </div>
        <div className="input__container">
          <label htmlFor="image">Imagem</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Confirmar</button>
      </form>
      <ScrollRestoration />
    </div>
  )
}