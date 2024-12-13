import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export const getCurrencyExchange = async (fromCurrency, toCurrency) => {
  try {
    const response = await api.get(`/json/last/${fromCurrency}-${toCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};
