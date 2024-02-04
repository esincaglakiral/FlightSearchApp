import axios from "axios";

const API_URL = "http://localhost:3000"; // Mock API'nin URL'si

const api = axios.create({
  baseURL: API_URL,
});

// Tüm uçuşları getir
export const getAllFlights = () => api.get("/flights");

// Kalkış ve varış havaalanlarına göre uçuşları filtrele
export const getFilteredFlights = (origin, destination) =>
  api.get(`/flights?origin=${origin}&destination=${destination}`);

// Kalkış tarihine göre uçuşları filtrele
export const getFlightsByDepartureDate = (departureDate) =>
  api.get(`/flights?departureTime_gte=${departureDate}`);

// Dönüş tarihine göre uçuşları filtrele
export const getFlightsByReturnDate = (returnDate) =>
  api.get(`/flights?arrivalTime_lte=${returnDate}`);

// Uçuşları sırala: departureTime, arrivalTime, price
export const sortFlights = (sortBy) => api.get(`/flights?_sort=${sortBy}`);

// Uçuş detaylarını getir
export const getFlightDetails = (flightId) => api.get(`/flights/${flightId}`);

// Havaalanlarını getir
export const getAirports = () => api.get("/airports");

// Diğer gerekli API istekleri buraya eklenebilir

const apiService = {
  getAllFlights,
  getFilteredFlights,
  getFlightsByDepartureDate,
  getFlightsByReturnDate,
  sortFlights,
  getFlightDetails,
  getAirports, // Yeni eklenen satır
};

export default apiService;
