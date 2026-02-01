import React from "react";
import style from "./style.module.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineAlert } from "react-icons/ai";

const Modal = ({ setModalOpen }) => {
  return (
    <div className={style.modal__overlay}>
      <div className={style.modal}>
        <div className={style.header}>
          <div className={style.icon__frame}>
            <AiOutlineAlert className={style.icon__alert} />
          </div>

          <div className={style.icon__frame}>
            <IoMdClose
              className={`c2 ${style.icon__close}`}
              onClick={() => setModalOpen(false)}
            />
          </div>
        </div>

        <div className={`mb-2`}>
          <h2 className={`font-l c2 mb-0-5`}>Notificar os relatores</h2>
          <p className={`font-s c4`}>
            Todas as pessoas que relataram está região serão notificados que
            seus relatos forão avaliados, com isso esperam ser atendindo. Se
            deseja continuar com a ação click em “CONFIMAR”
          </p>
        </div>

        <div className={style.modal__buttons}>
          <button
            className="font-s btn-outline"
            onClick={() => setModalOpen(false)}
          >
            Cancelar
          </button>

          <button
            className={`font-s btn-primary-red `}
            onClick={() => setModalOpen(false)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
