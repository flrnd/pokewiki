// Dummy data for mocking.
// Because the pokemon response is quite big, there are
// a few json examples directly from the API.

import fs from 'fs';
import path from 'path';

const jsonFolder = './json/';
const defaultPokemon = { name: 'bulbasaur.json', folder: jsonFolder };

const getAllFilesFromFolder = folder =>
  fs.readdirSync(folder).map(file => path.resolve(folder, file));

const getAllPokemonsFromFileList = fileList =>
  fileList.map(file => JSON.parse(fs.readFileSync(file)));

const getPokemonByFileName = pokemonFile => {
  const file = path.resolve(pokemonFile.folder, pokemonFile.name);
  return JSON.parse(fs.readFileSync(file));
};

const pokemons = getAllPokemonsFromFileList(getAllFilesFromFolder(jsonFolder));
const pokemon = getPokemonByFileName(defaultPokemon);

export const allPokemons = () => pokemons;
export const getPokemon = () => pokemon;
