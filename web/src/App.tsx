import './App.css'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <Header
        buttonList={[
          {
            label: 'Entrar',
            type: 'secondary',
            onClick: () => {},
          },
          {
            label: 'Criar Conta',
            onClick: () => {},
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
    </>
  )
}

export default App
