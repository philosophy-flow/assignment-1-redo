export default async function fetchPokemon(offset = 0) {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + offset;

  // fetch arr of pokemon + pagination urls
  const res = await fetch(url);
  const data = await res.json();
  const allPokemon = data.results;

  // fetch details for each pokemon, store results in an arr
  const pokeDetailsArr = await Promise.all(
    allPokemon.map((p) => {
      return fetch(p.url).then((res) => res.json());
    })
  );

  // get current page
  const page = pokeDetailsArr[9].id / 10;

  return [pokeDetailsArr, page];
}
