import React from "react";
import style from "./style.module.css";
import { IoIosSearch } from "react-icons/io";
import useReports from "../../../hooks/useReports";
import useResolvedReports from "../../../hooks/useResolvedReports";
import { getUniqueDistricts } from "../../../services/dashboard";

function Search({ filter, setFilter }) {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const { reports } = useReports();
  const { resolvedReports } = useResolvedReports();

  React.useEffect(() => {
    if (!active) return;

    const timeout = setTimeout(() => {
      getSuggestions();
      console.log("Usuário parou de digitar:", query);
    }, 200); // espera 800ms

    return () => clearTimeout(timeout); // limpa se digitar de novo
  }, [query]);

  const getSuggestions = () => {
    try {
      const results = getDistricts();

      setSuggestions(results);
    } catch (error) {
      console.error("Erro na busca autocomplete:", error);
    }
  };

  const getDistricts = () => {
    const districts = getUniqueDistricts({ reports, resolvedReports });

    const filtered = districts.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );

    return filtered;
  };

  const handleSuggestionClick = (suggestion) => {
    setActive(false);
    setQuery(suggestion); // Atualiza o input com a sugestão selecionada
    setSuggestions([]); // Remove as sugestões exibidas

    setTimeout(() => {
      setFilter({ ...filter, districtTarget: suggestion });
    }, 500);
  };

  return (
    <div
      className={`${style.search} ${suggestions.length > 0 && style.search__active}`}
    >
      <div className={style.search__box}>
        <input
          className={`font-xs c4 ${style.search__input}`}
          type="text"
          placeholder="Pesquisar por bairro ou rua"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSuggestionClick(""); // Seleciona a primeira sugestão
            }
          }}
        />

        <IoIosSearch className={`c4 ${style.search__icon}`} />
      </div>
      {suggestions.length > 0 && (
        <ul className={style.autocompleteSuggestions}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`font-xs c4 ${style.autocompleteSuggestion}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
