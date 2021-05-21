import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
const headers = {
  "Cache-Control": "no-cashe",
};

const StaticSide = (props) => {
  return props.pokemon.map((poke) => {
    return (
      <div key={poke.id}>
        <img src={poke.imgUrl} />
        <p>{poke.name}</p>
        <hr />
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const response = await axios.get(url, { headers });

  const promises = response.data.results.map((result) => {
    return axios.get(result.url);
  });

  const responses = await Promise.all(promises);

  const pokeData = responses.map((res) => {
    return {
      id: res.data.id,
      name: res.data.name,
      imgUrl: res.data.sprites.front_default,
    };
  });
  return {
    props: {
      pokemon: pokeData,
    },
  };
};

export default StaticSide;