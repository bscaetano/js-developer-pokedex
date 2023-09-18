const pokedex = document.querySelector('#pokedex')
const pName = document.querySelector('#pName')
const pNumber = document.querySelector('#pNumber')
const api = 'https://pokeapi.co/api/v2/'
const pokeDetail = document.getElementById('pokeDetail');

async function getPokemonsSpecies(id, info, gender) {
    const response = await fetch(`${api}pokemon-species/${id}`)
    
    if (info == 'egg_groups') {
        const data = await response.json().then(dataSpecie => dataSpecie.egg_groups.map(eggs => eggs.name).join(', '))

        return `${data}`
    } else if (info == 'specie'){
        const data = await response.json().then(genera => genera.genera[7].genus)
        return `${data}`.split(' ')[0]
    } else {
        const data = await response.json().then(gender => gender.gender_rate)
        
        if (gender == 'male') {
            if (data == 1) {
                return '87,5%'
            } else if (data == 2) {
                return '75,0%'
            } else if (data == 3) {
                return '50,0%'
            } else if (data == 4) {
                return '25,0%'
            } else if (data == 5) {
                return '0,0%'
            } else if (data == 0) {
                return '100,0%'
            }
        } else {
            if (data == 1) {
                return '12,5%'
            } else if (data == 2) {
                return '25,0%'
            } else if (data == 3) {
                return '50,0%'
            } else if (data == 4) {
                return '75,0%'
            } else if (data == 5) {
                return '100,0%'
            } else if (data == 0) {
                return '0,0%'
            }
        }
    }
}

async function getPokemon(pokemon) {
    const response = await fetch(`${api}pokemon/${pokemon}`)
    const data = await response.json()

        pokeDetail.innerHTML = `
        <div class="card" style="width: 100%;">
        <img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
          <h5 class="card-title">${data.name[0].toUpperCase() + data.name.substring(1)}</h5>
          <p class="card-text">${await getPokemonsSpecies(data.id, 'specie')}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Especie: ${await getPokemonsSpecies(data.id, 'specie')}</li>
          <li class="list-group-item">Tamanho: ${data.height/10} m</li>
          <li class="list-group-item">Peso: ${data.weight/10} Kg</li>
          <li class="list-group-item">Habilidade: ${data.abilities.map((ability) => ability.ability.name).join(', ')}</li>
          <li class="list-group-item">Grupo: ${await getPokemonsSpecies(data.id,   'egg_groups')}</li>
          <li class="list-group-item">Macho: ${await getPokemonsSpecies(data.id, ' ', 'male')}</li>
          <li class="list-group-item">Fêmea: ${await getPokemonsSpecies(data.id, ' ', 'female')}</li>
        </ul>
      </div>
            `
     
}