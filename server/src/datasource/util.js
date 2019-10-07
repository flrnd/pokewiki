export const checkArraySize = num => (num >= 0 ? num : 0);

export const getByLanguage = (lang, list) =>
  list.filter(l => l.language.name === lang);

// return the description matching the lastest version of the game
// which is the first item of the array (sorted)
export const getDescription = flavorTextEntries =>
  flavorTextEntries[0].flavor_text.replace(/\n|\f/g, ' ');
