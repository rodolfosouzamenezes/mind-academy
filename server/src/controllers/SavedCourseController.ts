import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';

import { db } from "../../DB/database";


class SavedCourseController {
  async addToSavedList(req: Request, res: Response) {
    const courseId = req.params.id;
    const user = req.user;

    try {
      const course = await db.get(`SELECT * FROM Course WHERE id = '${courseId}'`);

      if (!course) return res.status(404).json({ message: "Course não encontrado" });

      const id = uuid();

      const query = `
        INSERT INTO SavedCourse (id, userId, courseId) VALUES (?, ?, ?);
      `;

      await db.push(query, [id, user.id, courseId]);

      return res.status(201).json({ message: "Adicionado aos salvos com sucesso" });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Ocorreu um erro ao adicionar o curso nos salvos"
      });
    }
  }

  async removeToSavedList(req: Request, res: Response) {
    const savedId = req.params.id;

    try {
      const saved = await db.get(`SELECT * FROM SavedCourse WHERE id = '${savedId}'`);

      if (!saved) return res.status(404).json({ message: "Salvo não encontrado" });

      await db.push(`DELETE FROM SavedCourse WHERE id = '${savedId}'`);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Ocorreu um erro ao excluir salvo"
      });
    }
  }
}

export default new SavedCourseController();