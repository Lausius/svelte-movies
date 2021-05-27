<script>
  import { createEventDispatcher } from "svelte";
  import { isEmpty } from "../helpers/validation";
  import movies from "../movie-store";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";

  export let id = null;

  let title = "";
  let imageUrl = "";
  let actors = "";
  let genres = "";
  let description = "";
  let release = "";

  $: formIsValid = !isEmpty(title, imageUrl, description);

  const dispatch = createEventDispatcher();

  function submitForm() {
    genres = genres.split(", ");
    actors = actors.split(", ");
    description.trim();
    const movieData = {
      title,
      imageUrl,
      actors,
      genres,
      release,
      description,
    };

    console.log(id);
    fetch("https://svelte-movies-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify({ ...movieData, isFavorite: false }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occured posting, please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        movies.addMovie({ ...movieData, isFavorite: false, id: data.name });
      })
      .catch((error) => console.log(error));
    dispatch("save");
  }
</script>

<main>
  <Modal title="Add New Movie" on:cancel>
    <form>
      <TextInput
        id="title"
        validityMessage="Please enter a valid title."
        valid={!isEmpty(title)}
        label="Title"
        value={title}
        on:input={(event) => (title = event.target.value)}
      />
      <TextInput
        id="imageUrl"
        validityMessage="Please enter a valid image URL."
        valid={!isEmpty(imageUrl)}
        label="Image URL"
        value={imageUrl}
        on:input={(event) => (imageUrl = event.target.value)}
      />
      <TextInput
        id="imageUrl"
        validityMessage="Please enter a valid release date."
        valid={!isEmpty(release)}
        label="Release Date"
        value={release}
        on:input={(event) => (release = event.target.value)}
      />
      <TextInput
        id="actors"
        validityMessage="Please enter some actors."
        valid={!isEmpty(actors)}
        label="Actors"
        value={actors}
        on:input={(event) => (actors = event.target.value)}
      />
      <TextInput
        id="genres"
        valid={!isEmpty(genres)}
        validityMessage="Please enter some genres."
        label="Genres"
        value={genres}
        on:input={(event) => (genres = event.target.value)}
      />
      <TextInput
        id="description"
        validityMessage="Please enter a valid description."
        valid={!isEmpty(description)}
        label="Description"
        controlType="textarea"
        bind:value={description}
      />
    </form>
    <div slot="footer">
      <button
        class="btn btn-outline-primary "
        on:click={() => dispatch("cancel")}>Cancel</button
      >
      <button
        class="btn btn-outline-secondary"
        disabled={!formIsValid}
        on:click={submitForm}>Save</button
      >

    </div>
  </Modal>
</main>
