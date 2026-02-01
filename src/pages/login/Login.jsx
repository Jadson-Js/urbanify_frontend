import React from "react";
import style from "./style.module.css";
import useAuth from "../../hooks/useAuth";
// OAuth removido - usando apenas login por email

function Login() {
  const {
    // Estado e manipulação do e-mail
    email,
    setEmail,

    // Estado e manipulação da senha
    password,
    setPassword,

    showPassword,
    setShowPassword,

    loginError,

    // Função de autenticação
    signIn,
  } = useAuth();

  return (
    <div className={` ${style.login}`}>
      <div className={`${style.login__content}`}>
        <header className={`${style.login__header}`}>
          <div className={`${style.header__content}`}>
            <img src="./src/assets/images/logo-black.svg" />
            <label className={`font-s c6`}>
              Uma rua reparada não é apenas um conserto, mas o caminho para o
              progresso.
            </label>
          </div>
        </header>
        <main className={`${style.login__main}`}>
          <div className={`${style.main__content}`}>
            <h1 className={`font-xl p1 ${style.login__title}`}>Login</h1>
            <div className={`${style.login__form}`}>
              <div className={`form__box`}>
                <img src="/src/assets/icons/login/user.svg" />
                <input
                  className={`font-s c4 form__input`}
                  type="email"
                  placeholder="Digite aqui seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className={`form__box`}>
                  <img
                    className={`icon`}
                    src="/src/assets/icons/login/lock.svg"
                  />
                  <input
                    className={`font-s c4 form__input`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite aqui seu email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={`input__icon`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <img
                        className={`img`}
                        src=" /src/assets/icons/login/hidden.svg"
                      />
                    ) : (
                      <img
                        className={`img`}
                        src=" /src/assets/icons/login/show.svg"
                      />
                    )}
                  </button>
                </div>
                <span
                  className={`${loginError ? "font-xs input__legend" : "hidden"
                    }`}
                >
                  Verifique se seu email ou senha foram corretamente digitado
                </span>
              </div>

              <button className={`font-m-b btn-primary`} onClick={signIn}>
                ENTRAR
              </button>

              {/* Login apenas por email - Google OAuth removido */}
            </div>
          </div>
        </main>
        <footer className={`${style.login__footer}`}>
          <p className={`font-xs c7`}>
            Copyright ©2020 Produced by Ant Finance Experience Technology
            Department
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
