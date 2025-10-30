export const searchCities = async (term) => {
  const token = import.meta.env.VITE_TOKEN;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${encodeURIComponent(term)}`,
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar cidades');
    }

    const data = await response.json();

    if (data.length === 0) {
      window.alert('Nenhuma cidade encontrada');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Erro:', error);
    window.alert('Erro ao buscar cidades. Tente novamente mais tarde.');
    return [];
  }
};

export const getWeatherByCity = (/* cityURL */) => {
//   seu código aqui
};
