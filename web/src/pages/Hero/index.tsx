import './styles.css'

import { Button } from '../../components/Button'

import heroImage from '../../assets/hero-image.svg';

export function Hero() {
  return (
    <div className="content">
      <div className="hero">
        <div className="hero__info">
          <h1>Desbravando Horizontes através do Conhecimento</h1>
          <p>WE MAKE IT HAPPEN</p>
          <Button label={'Quero fazer parte'} onClick={() => { }} />
        </div>
        <img src={heroImage} alt="Urso Mind" />
      </div>
    </div>
  )
}