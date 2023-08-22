import './styles.css'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

import heroImage from '../../assets/hero-image.svg';
import { Footer } from '../../components/Footer';

export function Hero() {
  return (
    <>
      <Header
        buttonList={[
          {
            label: 'Entrar',
            type: 'secondary',
            onClick: () => { },
          },
          {
            label: 'Criar Conta',
            onClick: () => { },
          },
        ]}
        linkList={[
          {
            title: 'Início',
            url: '#'
          },
          {
            title: 'Sobre',
            url: '#'
          },
          {
            title: 'Cursos',
            url: '#'
          },
        ]}
      />
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

      <Footer />
    </>
  )
}