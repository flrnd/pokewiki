// Dummy data for mocking.
// Because the pokemon response is quite big, there are
// a few json examples directly from the API.

import fs from 'fs';
import path from 'path';

const jsonFolder = './json/';

const readDummyData = folder => {
  const jsonFiles = fs
    .readdirSync(folder)
    .map(file => path.resolve(folder, file));
  return jsonFiles.map(file => JSON.parse(fs.readFileSync(file)));
};

const pokemons = readDummyData(jsonFolder);

export const allPokemons = () => pokemons;
