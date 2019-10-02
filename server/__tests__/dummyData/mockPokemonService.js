// Dummy data for mocking.
// Because the pokemon response is quite big, there are
// a few json examples directly from the API.

import { bulbasaur, charmeleon, ekans } from './mocks';

const pokemons = [bulbasaur, charmeleon, ekans];

const allPokemons = () => pokemons;
const pokemon = () => pokemons[0];

export { allPokemons, pokemon };
