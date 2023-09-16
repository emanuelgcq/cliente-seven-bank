// BASE_URL = "http://localhost:3001"
BASE_URL = "https://servidor-seven-bank.onrender.com";

axiosInstance = axios.create({
  baseURL: BASE_URL,
});

CURRENCY_SYMBOL = {
  VES: "Bs.",
  USD: "$",
  CAD: "$",
  EUR: "€",
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      alert("No posee una sesion activa, por favor inicie sesion");
      localStorage.clear();
      window.location.href = "index.html";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
