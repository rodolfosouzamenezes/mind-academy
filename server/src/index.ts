import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { authRoutes } from './routes/auth';
import { courseRoutes } from './routes/course';
import { savedCourseRoutes } from './routes/savedCourse';
import { initializeDB } from '../DB/database';
import { DIRNAME_UPLOADS } from './utils/upload';

const PORT = 3333;
const app = express();

// Limitando o tamanho do body
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
app.use(express.json());

// ROTAS
app.use(authRoutes);
app.use(courseRoutes);
app.use(savedCourseRoutes);

// Rota dos arquivos de imagem
app.use("/files", express.static(DIRNAME_UPLOADS));

// Cria as tabelas e inicializa o BD
initializeDB();

app.listen(PORT, () => {
  console.log(`A API está rodando na porta ${PORT}: http://localhost:${PORT}/`)
});