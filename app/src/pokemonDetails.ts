// gets data from local storage and shows them in the specified elements
function displayPokemonDetails() {
    const pokemonId = document.getElementById("pokemon-id")!;
    const pokemonName = document.getElementById("pokemon-name")!;
    const pokemonTypes = document.getElementById("pokemon-types")!;
    const pokemonImage = document.getElementById("image-container")!;

    pokemonId.textContent = localStorage.getItem("pokeId");
    pokemonName.textContent = localStorage.getItem("pokeName");
    pokemonTypes.textContent = localStorage.getItem("pokeType");

    pokemonImage.innerHTML = `<img src="${localStorage.getItem("pokeImage")}" alt="Pokemon Image">`;
}

displayPokemonDetails();