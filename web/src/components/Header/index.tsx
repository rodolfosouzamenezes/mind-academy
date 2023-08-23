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
  const { user } = useContext(AuthContext)
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
        onClick: () => {},
      },
    ],
  }

  const currentButtonList = user.id ? buttonList.default : buttonList.hero;

  return (
    <div className='header'>
      <img src={mindLogo} alt="Mind Academy" />

      <div className='buttonList'>
        {
          currentButtonList.map(btn => {
            return (
              <Button label={btn.label} type={btn.type || 'primary'} onClick={btn.onClick} />
            )
          })
        }
        {
          user.isAdmin &&
          <Button label='Adicionar Curso' onClick={() => {}} />
        }
      </div>
    </div>
  )
}