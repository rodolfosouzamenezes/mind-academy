import './styles.css'
import { useContext } from 'react';

import { AuthContext } from '../../providers/auth';
import { Button, ButtonProps } from '../Button';

import mindLogo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

interface ButtonListProps {
  hero: ButtonProps[],
  default: ButtonProps[],
}

export function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const buttonList: ButtonListProps = {
    hero: [
      {
        label: "Entar",
        type: "secondary",
        onClick: () => navigate('/login'),
      },
      {
        label: "Criar Conta",
        onClick: () => navigate('/cadastro'),
      },
    ],
    default: [
      {
        label: "Sair",
        type: "secondary",
        onClick: () => {
          logout()

          navigate('/')
        },
      },
    ],
  }

  const currentButtonList = user.id ? buttonList.default : buttonList.hero;

  return (
    <div className='header'>
      <img src={mindLogo} alt="Mind Academy" />

      <div className='buttonList'>
        {
          currentButtonList.map((btn, i) => {
            return (
              <Button
                label={btn.label}
                type={btn.type || 'primary'}
                onClick={btn.onClick}
                key={i}
              />
            )
          })
        }
        {
          user.isAdmin ?
            <Button label='Adicionar Curso' onClick={() => navigate(`/curso/none`)} />
            : ''
        }
      </div>
    </div>
  )
}