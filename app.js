const selectPokemon = document.querySelector("#select-pokemon");
const selectNumber = document.querySelector("#select-number");
const image = document.querySelector(".card-img-top");
const text = document.querySelector('.card-title');
const btnShiny = document.querySelector(".btn.btn-success");
const deleteBootstrapClass = (() => image.classList.remove('d-none'))()

const state = {
    urlData: "https://pokeapi.co/api/v2/pokemon/",
    urlPokemon: "https://pokeapi.co/api/v2/pokemon?limit=", 
    resultados: 0,
    renderPokemons: function (data){
        image.src = data.sprites.front_default;
        image.setAttribute("shiny", data.sprites.front_shiny)
        text.textContent = data.name;
    },
    getDataPokemons: async function(url){
        const response = await fetch(url);
        let result = await response.json();
        return result;
    },
    morePokemons: async function(num){
        const response = await fetch(state.urlPokemon + num);
        let result = await response.json();
        return result;
    }
}

function addPokemonsToSelect(item){
    selectPokemon.innerHTML = "";
    item.results.forEach((pokemon) => {
        let newOption = document.createElement("option");
        newOption.textContent = pokemon.name;
        selectPokemon.append(newOption)
    });
}

// Listeners
btnShiny.addEventListener("click", ()=> image.src = image.getAttribute("shiny"));

selectPokemon.addEventListener("change", (event)=>{
    selectPokemon.disabled = true;
    state.getDataPokemons(state.urlData+event.target.value).then(pokemon => {
        state.renderPokemons(pokemon);
        selectPokemon.disabled = false;
    }).catch(console.log)
});

selectNumber.addEventListener("change", (event)=>{
    state.resultados = event.target.value;
    state.morePokemons(state.resultados).then((item)=>addPokemonsToSelect(item)).catch(console.log)
});