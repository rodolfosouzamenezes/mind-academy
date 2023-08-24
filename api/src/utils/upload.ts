import multer from "multer";
import path from "path";
import fs from "fs";

export const DIRNAME_UPLOADS = path.resolve(__dirname, '../../DB/uploads');

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
     callback(null, path.resolve('./DB/uploads'));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`)
  }
});

export const deleteImage = (filename: string) => {
  const FILE_PATH = `${DIRNAME_UPLOADS}/${filename}`;
  fs.unlink(FILE_PATH, (erro) => {
    if (erro) {
      console.error('Erro ao excluir o arquivo:', erro);
      return;
    }
    console.log('Arquivo excluído com sucesso.');
  });
}