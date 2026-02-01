import React from "react";
import style from "./style.module.css";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { FaRegCalendar } from "react-icons/fa";

const DatePicker = ({ filter, setFilter }) => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const fp = Flatpickr(inputRef.current, {
      enableTime: false,
      mode: "range", // Define o modo como intervalo de datas
      locale: Portuguese,
      plugins: [
        new monthSelectPlugin({
          dateFormat: "M Y",
        }),
      ],
      defaultDate: !filter.date && null, // Define a data padrão
      onChange: (changeDate) => {
        if (changeDate.length !== 2) return;

        const start = new Date(changeDate[0]);

        const end = new Date(changeDate[1]); // Cria um objeto Date para a data final
        end.setMonth(end.getMonth() + 1, 0); // Ajusta para o último dia do mês
        end.setHours(23, 59, 59, 999);

        setFilter({ ...filter, date: { start, end } });
      },
    });

    return () => fp.destroy(); // Limpa o flatpickr ao desmontar o componente
  }, [filter, setFilter]); // Atualiza sempre que as props mudarem

  return (
    <div className={`font-xs ${style.picker__box}`}>
      <input
        ref={inputRef}
        className={`font-xs c4 ${style.picker__input}`}
        type="text"
        placeholder="Selecione uma data..."
      />

      <FaRegCalendar className="font-s c4" />
    </div>
  );
};

export default DatePicker;
