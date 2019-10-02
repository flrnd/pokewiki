// ***********************
// Dummy data for mocking.
// ***********************
// Because the pokemon response is quite big,
// there are 3 json files in the mock directory to
// emulate data from the API.

import { bulbasaur, charmeleon, ekans } from './mocks';

const pokemons = [bulbasaur, charmeleon, ekans];

const allPokemons = () => pokemons;
const pokemon = () => pokemons[0];

export { allPokemons, pokemon };
