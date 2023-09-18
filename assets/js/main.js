const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore');
const limit = 12;
let offset = 0;

function pokemonToLi(pokemon) {
    return `
    <button type="button" onclick="getPokemon(${pokemon.number})" class="btn .btn-outline-*" data-bs-toggle="modal" data-bs-target="#exampleModal">
   
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    </button>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(pokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
})