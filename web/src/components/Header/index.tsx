import './styles.css'

import { Button, ButtonProps } from '../Button';
import mindLogo from '../../assets/logo.svg';

interface HeaderProps {
  linkList: {
    title: string;
    url: string;
  }[];
  buttonList: ButtonProps[];
}

export function Header({ linkList, buttonList }: HeaderProps) {
  return (
    <div className='header'>
      <img src={mindLogo} alt="Mind Academy" />
      <div className='linkList'>
        {linkList.map(link => {
          return (
            <a href={link.url}>{link.title}</a>
          )
        })}
      </div>
      <div className='buttonList'>
        {buttonList.map(btn => {
          return (
            <Button label={btn.label} type={btn.type || 'primary'} onClick={btn.onClick} />
          )
        })}
      </div>
    </div>
  )
}