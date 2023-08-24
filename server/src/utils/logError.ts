export const logError = (err: Error | null, local: string) => {
  if (err) {
    console.log(`Ocorreu um erro em ${local}`);
    
    console.log(err.message);
  }
}