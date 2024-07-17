import axios from 'axios';

// Vérifier si le localStorage est disponible
const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;

// Récupérer le token depuis le cache
const authToken = hasLocalStorage ? localStorage.getItem('authToken') : null;

// ----------------------------------------------------------------------
const apiUrl = 'http://localhost:8000/api/v1';
const axiosInstance = axios.create({ baseURL: apiUrl });

// Ajouter le token aux en-têtes de la requête
if (authToken) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}

// Intercepteur de réponse pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Une erreur s'est produite")
);

export default axiosInstance;
