import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../axios/API_END_POINTS";
import styles from "./styles/Row.module.css";
import Button from "./Button.js";
function Row({ category, children, isNetflixRow, isColumn }) {
  const data = useSelector((state) => state.movieCategory.movieCollection);
  const FilteredData = data.filter((mov) => mov[category]);
  const FilteredMovies = FilteredData ? FilteredData[0] : [];
  const [movieKeys, setMovieKeys] = useState([]);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      /* eslint-disable no-param-reassign */
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    if (FilteredMovies) {
      const movieArray = Object.keys(FilteredMovies[category]);
      setMovieKeys(shuffleArray(movieArray));
    }
  }, [FilteredMovies]);

  return (
    <div className={styles.row}>
      <h1 className={styles.title}>{children}</h1>

      <div className={isColumn ? styles.column : styles["row-container"]}>
        {movieKeys
          ? movieKeys.map((key) => {
              const movie = FilteredMovies[category][key];
              return (
                <div>
                  <Link
                    key={movie.id}
                    className={isColumn ? styles["column-link"] : styles.link}
                    to={{ pathname: `movie/${movie.id}`, state: { movie } }}
                  >
                    <img
                      key={movie.id}
                      className={
                        isNetflixRow ? styles.imageLarge : styles.image
                      }
                      src={`${IMAGE_URL}${
                        isNetflixRow ? movie.poster_path : movie.backdrop_path
                      }`}
                      alt={movie.name}
                    />
                  </Link>
                  <Button movie={movie} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

Row.defaultProps = {
  category: "Trending",
  children: "Trending",
  isNetflixRow: false,
  isColumn: false,
};

Row.propTypes = {
  category: PropTypes.string,
  children: PropTypes.string,
  isNetflixRow: PropTypes.bool,
  isColumn: PropTypes.bool,
};

export default Row;
