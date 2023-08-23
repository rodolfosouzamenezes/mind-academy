import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export function Login() {
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
      />

      <div className="content">
        <div className="hero">
          <div className="hero__info">
            <h1>Desbravando Horizontes através do Conhecimento</h1>
            <p>WE MAKE IT HAPPEN</p>
            <Button label={'Quero fazer parte'} onClick={() => { }} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}