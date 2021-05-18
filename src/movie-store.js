import { writable } from "svelte/store";

const movies = writable([]);

const customMovieStore = {
  subscribe: movies.subscribe,
  setMovies: (movieArray) => {
    movies.set(movieArray);
  },
  addMovie: (movieData) => {
    const newMovie = {
      ...movieData,
    };
    movies.update((movies) => {
      return [newMovie, ...movies];
    });
  },
  removeMovie: (id) => {
    movies.update((items) => {
      return items.filter((i) => i.id !== id);
    });
  },
  toggleFavorite: (id) => {
    movies.update((items) => {
      const movieIndex = items.findIndex((m) => m.id === id);
      items[movieIndex].isFavorite = !items[movieIndex].isFavorite;
      return [...items];
    });
  },
};

export default customMovieStore;
