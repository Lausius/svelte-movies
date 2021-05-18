<script>
  import { createEventDispatcher } from "svelte";
  import Movie from "./Movie.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MovieFilter from "./MovieFilter.svelte";

  export let movies;

  let favoriteOnly = false;

  $: filteredMovies = favoriteOnly
    ? movies.filter((m) => m.isFavorite)
    : movies;

  const dispatch = createEventDispatcher();

  function setFilter(event) {
    favoriteOnly = event.detail === 1;
  }
</script>

<section class="d-flex justify-content-between mb-2">
  <MovieFilter on:select={setFilter} />
  <button class="btn btn-outline-success" on:click={() => dispatch("add")}
    >Add New Movie</button
  >
</section>
{#if !filteredMovies.length}
  <p class="lead">No movies found, you can start by adding some.</p>
{/if}
<div class="row row-cols-1 row-cols-xxl-4 row-cols-lg-2">
  {#each filteredMovies as movie (movie.id)}
    <div
      animate:flip={{ duration: 300 }}
      class="col-lg-4 col-md-6 col-sm-12 mb-4"
      transition:fade
    >
      <Movie {...movie} on:showdetails />
    </div>
  {/each}
</div>
