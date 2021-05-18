<script>
  import EditMovie from "./Components/EditMovie.svelte";
  import MovieDetails from "./Components/MovieDetails.svelte";
  import MovieList from "./Components/MovieList.svelte";
  import movies from "./movie-store";
  import Header from "./UI/Header.svelte";

  let page = "start";
  let isLoading;
  let pageData = {};
  let editMode;
  let editedId;

  fetch("https://svelte-movies-default-rtdb.firebaseio.com/movies.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching movies failed, please try again later!");
      }
      return res.json();
    })
    .then((data) => {
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          ...data[key],
          id: key,
        });
      }
      movies.setMovies(loadedMovies.reverse());
    })
    .catch((error) => {
      console.log(error);
    });

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "start";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function saveMovie() {
    editMode = null;
    editedId = null;
  }
</script>

<div>
  <Header />
</div>
<main class="container mt-2">
  {#if page === "start"}
    {#if editMode === "edit"}
      <EditMovie id={editedId} on:save={saveMovie} on:cancel={saveMovie} />
    {/if}
    {#if isLoading}
      <p>Loading.Modal..</p>
    {:else}
      <MovieList
        movies={$movies}
        on:showdetails={showDetails}
        on:add={() => {
          console.log(editMode);
          editMode = "edit";
        }}
        on:edit={startEdit}
      />
    {/if}
  {:else}
    <MovieDetails id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
