import ListItem from "../molecules/ListItem";
import { getImageUrl } from "../../utils/api/urlUtils";

import { GameStateTypes } from "../../types/app.types";

export default function List({
  movieArray,
  gameState,
  setGameState,
  selectionClickHandler,
}) {
  return movieArray.map((movie, i) => {
    const { id, title, poster_path } = movie;
    const fullPosterPath = getImageUrl(poster_path, "w500");
    const handleClick = () => {
      selectionClickHandler(movie, fullPosterPath, "movie");
      gameState === GameStateTypes.START &&
        setGameState(GameStateTypes.FILM_CHOSEN);
    };

    return (
      <ListItem
        key={i}
        imageSrc={fullPosterPath}
        size={400}
        alt={title}
        clickHandler={handleClick}
      />
    );
  });
}
