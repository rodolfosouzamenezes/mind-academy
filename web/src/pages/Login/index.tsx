import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css'
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from '../../providers/auth';

export function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValidEmail = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (!isValidEmail) return

    const isLogged = await login({ email, password })

    isLogged && navigate('/dashboard')
  }

  return (
    <div className="content">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Confirmar</button>
      </form>

      <p>Não tem uma conta? {" "}
        <a href="/cadastro">Cadastrar</a>
      </p>
    </div>
  )
}