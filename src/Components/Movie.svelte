<script>
  import { createEventDispatcher } from "svelte";
  import movies from "../movie-store";
  import Badge from "../UI/Badge.svelte";

  let isLoading = false;

  export let title;
  export let imageUrl;
  export let description;
  export let actors;
  export let id;
  export let genres;
  export let release;
  export let isFavorite;

  function sliceDescription(desc) {
    if (desc.length > 200) {
      let tempStr = desc.slice(0, 200);
      return tempStr + "...";
    } else {
      return desc;
    }
  }

  async function deleteMovie() {
    await fetch(
      `https://svelte-movies-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Movie cannot be deleted at the moment.");
      }
      movies.removeMovie(id);
    });
  }

  function toggleFavorite() {
    isLoading = true;
    fetch(
      `https://svelte-movies-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ isFavorite: !isFavorite }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occured");
        }
        isLoading = false;
        movies.toggleFavorite(id);
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  }

  const dispatch = createEventDispatcher();
</script>

<div class="card h-100 mb-4 box-shadow">
  <img
    class="card-img-top"
    src={imageUrl}
    onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/BordgruppeFem/MandatoryAssignmentWebApps/master/src/assets/imageNotFound.jpg'"
    alt="Movieposter"
  />
  <div class="card-body d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between">
      <p id="release" class="lead">{release}</p>
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </div>
    <hr />
    <div>
      <div class="text-center" style="height: 2.5rem">
        <h3 class=" card-title lead">
          <strong>
            {title}
          </strong>
        </h3>
      </div>
      <hr/>
      {sliceDescription(description)}
    </div>
  </div>
  <div class="card-footer text-center">
    <div class=" d-flex justify-content-between">
      <button
        class="btn btn-outline-primary"
        on:click={() => dispatch("showdetails", id)}>Details</button
      >
      <button class="btn btn-outline-danger" on:click={deleteMovie}
        >Delete</button
      >
      {#if isLoading}
        <button
          on:click={toggleFavorite}
          class="btn {isFavorite
            ? 'btn-outline-danger'
            : 'btn-outline-success'}"
          ><span class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only" />
          </span></button
        >
      {:else}
        <button
          on:click={toggleFavorite}
          class="btn {isFavorite
            ? 'btn-outline-danger'
            : 'btn-outline-success'}"
          >{isFavorite ? "Unfavorite" : "Favorite"}</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  #release {
    margin: 0;
  }

  .card-body {
    padding: 0;
    margin: 1rem;
  }

  strong {
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
  }

  .card {
    border-color: blueviolet;
  }
</style>
