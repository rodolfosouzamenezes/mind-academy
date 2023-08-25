import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';

import { db } from "../../DB/database";
import { binaryToBoolean } from "../utils/binaryToBoolean";
import path from "path";
import { deleteImage } from "../utils/upload";

class CourseController {
  async createCourse(req: Request, res: Response) {
    const { name, teacher, category, description, isVisible } = req.body;
    const imageUrl = `http://localhost:3333/files/${req.file?.filename}`;

    try {
      const user = req.user;

      if (!user.isAdmin) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }

      const id = uuid();
      const isVisibleFormatted = isVisible === "true" ? true : false;

      const query = `
        INSERT INTO Course (id, name, teacher, category, description, imageUrl, isVisible) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      db.push(query, [id, name, teacher, category, description, imageUrl, isVisibleFormatted]);
      return res.status(201).json({ message: "Curso adicionado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro ao adicionar o curso",
        message: error.message
      });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    const user = req.user;

    const courses = await db.get_all(`
      SELECT
        c.id,
        c.name,
        c.teacher,
        c.category,
        c.description,
        c.imageUrl,
        c.isVisible,
        CASE WHEN sc.userId IS NULL THEN false ELSE true END as isSaved
      FROM Course c
      LEFT JOIN SavedCourse sc ON c.id = sc.courseId AND sc.userId = '${user.id}'
      ORDER BY c.name;
    `);


    return res.status(200).json({
      courses: {
        ...courses,
        data: courses.data.map(c => {
          return {
            ...c,
            isVisible: binaryToBoolean(c.isVisible),
            isSaved: binaryToBoolean(c.isSaved),
          }
        })
      }
    });
  }

  async getCourseById(req: Request, res: Response) {
    const id = req.params.id;

    const course = await db.get(`
      SELECT * FROM Course WHERE id = '${id}';
    `);

    return res.status(200).json({
      course: {
        ...course,
        isVisible: binaryToBoolean(course.isVisible),
      }
    });
  }

  async deleteCourse(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.user;

    try {
      if (!user.isAdmin) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }

      const course = await db.get(`SELECT * FROM Course WHERE id = '${id}'`);

      if (!course) return res.status(404).json({ message: "Curso não encontrado" });

      await db.push(`DELETE FROM Course WHERE id = '${id}'`);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Ocorreu um erro ao excluir o curso"
      });
    }
  }

  async changeVisibility(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.user;

    try {
      if (!user.isAdmin) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }

      const course = await db.get(`SELECT * FROM Course WHERE id = '${id}'`);

      if (!course) return res.status(404).json({ message: "Curso não encontrado" });

      const newVisibility = course.isVisible === 1 ? 0 : 1;

      const query = `
        UPDATE Course
        SET isVisible = ${newVisibility}
        WHERE id = '${course.id}';
      `;

      db.run(query);

      return res.json({ message: 'Visibilidade do curso atualizada com sucesso.' });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Ocorreu um erro ao excluir o curso"
      });
    }
  }


  async updateCourse(req: Request, res: Response) {
    const { name, teacher, category, description, isVisible } = req.body;

    try {
      const id = req.params.id;
      const user = req.user;

      if (!user.isAdmin) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }

      const course = await db.get(`SELECT * FROM Course WHERE id = '${id}'`);

      if (!course) return res.status(404).json({ message: "Curso não encontrado" });
      
      const currentFilename = path.basename(course.imageUrl);
      const imageUrl = `http://localhost:3333/files/${req.file?.filename || currentFilename}`;


      const query = `
      UPDATE Course 
        SET name = '${name}', 
        teacher = '${teacher}', 
        category = '${category}', 
        description = '${description}', 
        imageUrl = '${imageUrl}', 
        isVisible = ${isVisible}
      WHERE id = '${course.id}';
      `

      await db.run(query, [], (err) => {
        console.log(err);
      });

      req.file?.filename && deleteImage(currentFilename)

      return res.json();
    } catch (error) {
      return res.status(500).json({
        error: "Erro no servidor.",
        message: error
      });
    }
  }
}

export default new CourseController;