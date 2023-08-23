import '../../styles/auth.css'
import { FormEvent, useState } from "react";

export function SignUp() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(name);
  }

  return (
    <div className="content">

      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div className="input__container">
          <label htmlFor="name">Nome*</label>
          <input
            autoFocus
            required
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Insira seu nome..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input__container">
          <label htmlFor="email">Email*</label>
          <input
            autoFocus
            required
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Insira seu email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__container">
          <label htmlFor="password">Senha*</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Insira sua senha..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input__container">
          <label htmlFor="confirm-password">Confirme a Senha*</label>
          <input
            required
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="Confirme sua senha..."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Criar conta</button>
      </form>

      <p>Já possui uma conta? {" "}
        <a href="/login">Entrar</a>
      </p>
    </div>
  )
}