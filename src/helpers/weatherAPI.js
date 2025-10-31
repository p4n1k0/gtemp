export const searchCities = async (term) => {
  const token = import.meta.env.VITE_TOKEN;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${encodeURIComponent(term)}`,
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

export const getWeatherByCity = async (cityURL) => {
  const token = import.meta.env.VITE_TOKEN;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${cityURL}`,
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar clima da cidade');
    }

    const data = await response.json();

    return {
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      country: data.location.country,
      name: data.location.name,
      url: cityURL,
    };
  } catch (error) {
    console.error('Erro:', error);
    window.alert('Erro ao buscar clima. Tente novamente mais tarde.');
  }
};

export const getForecastByCity = async (cityURL) => {
  const token = import.meta.env.VITE_TOKEN;
  const days = 7;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?lang=pt&key=${token}&q=${cityURL}&days=${days}`,
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar previsão do tempo');
    }

    const data = await response.json();

    const forecastList = data.forecast.forecastday;

    return forecastList.map((day) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }));
  } catch (error) {
    console.error('Erro:', error);
    window.alert('Erro ao buscar previsão do tempo. Tente novamente mais tarte');
  }
};
