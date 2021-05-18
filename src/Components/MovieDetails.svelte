<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import movies from "../movie-store";

  export let id;
  let selectedMovie;

  const unsubscribe = movies.subscribe((items) => {
    selectedMovie = items.find((i) => i.id === id);
  });

  onDestroy(() => {
    unsubscribe();
  });

  function formatStringArray(array, string) {
    return string !== array[array.length - 1] ? string + "," : string;
  }

  console.log(selectedMovie);
  const dispatch = createEventDispatcher();
</script>

<button
  class="btn btn-outline-secondary align-self-end mb-1"
  on:click={() => dispatch("close")}>Close</button
>
<div class="row">
  <div class="col-md-4">
    <img
      alt="Poster"
      class="img-fluid rounded poster"
      onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/BordgruppeFem/MandatoryAssignmentWebApps/master/src/assets/imageNotFound.jpg'"
      src={selectedMovie.imageUrl}
    />
  </div>
  <div class="col-md-8">
    <h1 class="display-2">{selectedMovie.title}</h1>
    <ul class="list-inline">
      {#each selectedMovie.genres as genre}
        <li class="list-inline-item text-muted">
          {formatStringArray(selectedMovie.genres, genre)}
        </li>
      {/each}
    </ul>
    <hr />
    <p class="lead">{selectedMovie.description}</p>

    <ul class="list-inline">
      {#each selectedMovie.actors as actor}
        <li class="list-inline-item text-muted">
          {formatStringArray(selectedMovie.actors, actor)}
        </li>
      {/each}
    </ul>
  </div>
</div>
