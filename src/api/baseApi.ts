const baseUrl = "https://pokeapi.co/api/v2/";

export const getPokemonName = (name: string) => {
  let result;
  try {
    fetch(`${baseUrl}pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        result = data;
        return result;
      });
  } catch (error) {}

  return result;
};

