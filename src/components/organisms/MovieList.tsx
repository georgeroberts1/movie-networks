import ListItem from "../molecules/ListItem";
import { getImageUrl } from "../../utils/api/urlUtils";

import { GameStateTypes } from "../../types/app.types";
import clsx from "clsx";

export default function MovieList({
  movieArray,
  gameState,
  setGameState,
  selectionClickHandler,
}) {
  return (
    <div className={clsx("w-full overflow-auto overflow-y-auto")}>
      <span className="bigFeedback">
        Start by choosing one of these upcoming movies...
      </span>
      <div className="flex">
        {movieArray.map((movie, i) => {
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
              size={300}
              alt={title}
              clickHandler={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}
