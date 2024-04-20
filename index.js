let pokemonDescription = document.getElementById("pokemonContainer");

async function getPokemon(s) {
    let pokemonName="";
    if(s=='search')
        {
             pokemonName = document.getElementById("pokemonName").value.trim().toLowerCase();
        }
    else
    {
        pokemonName=Math.floor(Math.random() * 999) + 1;
    }
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
        pokemonDescription.classList.add('container-fail');
            pokemonDescription.innerHTML = "Couldn't find any Pokémon with the name:"+pokemonName;
            throw new Error("Couldn't fetch data");
        }
        let data = await response.json();

        let name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        let weight = data.weight + "kgs";
        let height = data.height * 10 + "cms";
        let image = data.sprites.other.home.front_default;
        let types = data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
        let imgele=`<img src=${image}>`;
        pokemonDescription.innerHTML = '<div>'+imgele+'</div>'+
            '<p>'+name+'</p>'+
            '<p>'+weight+"   "+height+'</p>'+
            '<p>'+types.join(', ')+'</p>'
        pokemonDescription.classList.add('container-sucess');
    } catch (error) {
        console.error(error);
    }
}


document.getElementById("searchButton").addEventListener("click", ()=>{getPokemon('search')});
document.getElementById("randomButton").addEventListener("click", ()=>{getPokemon('random')});

