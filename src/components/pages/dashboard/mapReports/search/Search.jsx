import React from "react";
import style from "./style.module.css";
import { IoIosSearch } from "react-icons/io";

function Search({ setCoordinates }) {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (!active) return;

    const timeout = setTimeout(() => {
      getSuggestions();
      console.log("Usuário parou de digitar:", query);
    }, 200); // espera 800ms

    return () => clearTimeout(timeout); // limpa se digitar de novo
  }, [query]);

  // Função chamada a cada alteração no input para buscar sugestões
  const getSuggestions = async () => {
    const viewbox = "-47.4,-1.0,-40.0,-7.5"; // Limita a busca ao Maranhão
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query,
    )}&format=json&viewbox=${viewbox}&bounded=1&addressdetails=1`;

    try {
      const response = await fetch(url);
      const results = await response.json();

      // Mapeia os resultados para exibição no autocomplete
      const suggestionsData = results.map((item) => ({
        label: `${item.address.road ? item.address.road + ", " : ""}${item.address.suburb ? item.address.suburb + " - " : ""}${item.address.city || item.address.municipality || ""}`,

        lat: item.lat,
        lon: item.lon,
      }));

      setSuggestions(suggestionsData);
    } catch (error) {
      console.error("Erro na busca autocomplete:", error);
    }
  };

  // Quando o usuário clica em uma sugestão
  const handleSuggestionClick = (suggestion) => {
    setActive(false);
    setQuery(suggestion.label); // Atualiza o input com a sugestão selecionada
    setSuggestions([]); // Remove as sugestões exibidas
    setCoordinates({ lat: suggestion.lat, lon: suggestion.lon }); // Atualiza as coordenadas

    setTimeout(() => {
      setCoordinates({ lat: null, lon: null });
    }, 500);
  };

  return (
    <div
      className={`${style.search} ${suggestions.length > 0 && style.search__active}`}
    >
      <div className={style.search__box}>
        <input
          className={`font-m c4 ${style.search__input}`}
          type="text"
          placeholder="Pesquisar por bairro ou rua"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(true);
          }}
        />

        <IoIosSearch
          className={`c4 ${style.search__icon}`}
          onClick={getSuggestions}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className={style.autocompleteSuggestions}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={style.autocompleteSuggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
