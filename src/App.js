import './App.css';
import { useState } from 'react'
import Axios from 'axios';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [showPokemon, setShowPokemon] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
    ability: '',
    smove: '',
  });

  const searchPokemon = () => {
    if (!pokemonName) {
      setError('Please enter a Pokémon name.');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowPokemon(false);

    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
        ability: response.data.abilities[0].ability.name,
        weight: response.data.weight,
      })
      setShowPokemon(true);
    })
      .catch(() => {
        setError('Pokemon not found');
      })
      .finally(() => {
        setIsLoading(false);
        setPokemonName('');
      });
  }

  return (
    <>
      {/* Header */}
      <section>
        <div className="Headercontainer container flex justify-center items-center py-2">
          <div className='intro'>
            <h1 className='flex text-4xl md:text-8xl font-bold justify-center items-center md:ml-10 text-gray-200'>PokeTab</h1>
            <h6 className='text-lg md:text-2xl font-semibold text-gray-200'>Get all the info of your favourite Pokemon</h6>
          </div>
        </div>
        <div className="container px-5 py-6 mx-auto justify-center items-center">
          {!showPokemon && (
            <h1 className="flex justify-center items-center sm:text-4xl mb-6 text-3xl font-bold text-purple-900">
              Choose your Pokemon
            </h1>
          )}
          <div className="flex flex-wrap justify-center items-center">
            <div className="search flex sm:mr-4">
              <input value={pokemonName} onChange={(event) => { setPokemonName(event.target.value.toLowerCase()) }} type="text" id="footer-field" name="footer-field" placeholder='Enter Pokemon Name' className="w-full bg-gray-100 bg-opacity-50 rounded border-4 border-purple-900 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-purple-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button onClick={searchPokemon} className="inline-flex mt-2 md:mt-0 text-yellow-400 text-lg font-semibold bg-purple-800 border-0 py-2 px-6 focus:outline-non rounded">Search Pokemon</button>
          </div>
        </div>
      </section>
      {/* Header */}
      {error && <p className="text-red-500 font-semibold text-4xl flex justify-center">{error}</p>}
      {/* Pokemon */}
      <div className="displaySection">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-800"></div>
          </div>
        ) : !showPokemon ? (<></>) :
          (<section className="overflow-hidden">
            <div className="container px-5 lg:py-16 mx-auto">
              <div className="lg:w-full mx-auto flex flex-wrap justify-center items-center">
                <img className="lg:w-72 w-full sm:w-96 object-cover object-center rounded" alt={pokemon.name} src={pokemon.img} />
                <div className='lg:w-9/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-wrap'>
                  <h1 className="flex justify-center items-center text-purple-900 text-5xl title-font capitalize font-medium mx-auto">{pokemon.name}</h1>
                  <div className="grid grid-rows-1 space-x-1 md:grid-cols-3 lg:w-full w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-gray-300">Type: {pokemon.type}</h1>
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-green-500">HP: {pokemon.hp}</h1>
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-yellow-400">Ability: {pokemon.ability}</h1>
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-yellow-700">Defense: {pokemon.defense}</h1>
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-red-500">Attack: {pokemon.attack}</h1>
                    <h1 className="flex text-gray-900 text-3xl title-font font-medium mb-1 box-content h-8 w-auto p-4 border-4 items-center justify-center bg-slate-400">Weight: {pokemon.weight}</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}
      </div>
      {/* Pokemon */}
    </>
  );
}

export default App;
