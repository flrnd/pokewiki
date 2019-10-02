// Dummy data for mocking.
// Because the pokemon response is quite big, there are
// a few json examples directly from the API.

import { bulbasaur, charmeleon, ekans } from './mocks';

pokemons = [bulbasaur, charmeleon, ekans];
pokemon = bulbasaur;

export const allPokemons = () => pokemons;
export const getPokemon = () => pokemon;
