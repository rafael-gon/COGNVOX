import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    console.log({
      usuario: login,
      senha: senha,
    });

    try {
      const response = await api.post("/login", {
        usuario: login,
        senha: senha,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/atores";
    } catch (err) {
      setErro("Usuário ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  }


  return (
    <div className="loginSection">

      <div className="glassCard">

        <div className="contentWrapper">
          <div>
            <img src="./logoOficial.png" alt="Logo" className="logo" />
          </div>

          <div className="centeredContent">

            <div className="header">
              <p>Área Restrita</p>
              {erro && <p className="erro-login">{erro}</p>}
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <div>
                {!carregando ? (
                  <div className="footer">
                    <input
                      type="submit"
                      value="ENTRAR"
                    />
                    <div>
                      <a href="#">
                        Esqueceu a Senha?
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="loading">
                    <img src="./aguarde.gif" height="50" />
                  </div>
                )}

              </div>


            </form>
          </div>

        </div>

        <div className="contentRight">
          <img src="./estudantesCognvox.png" alt="Cognvox" className="estud" />
          <div className="icons">
            <img src="./web.svg" alt="Site" />
            <img src="./instagram.svg" alt="Instagram" />
            <img src="./at-sign.svg" alt="Email" />
          </div>
        </div>

      </div>

    </div>
  );
}
