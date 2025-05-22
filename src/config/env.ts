const API = import.meta.env.VITE_API;

export const ENV = {
  API: {
    API: API,
    ENDPOINTS: {
      PRODUCTS: `${API}/products`,
      VISITORS: `${API}/visitors`,
      GATES: `${API}/gates`,
      ORDERS: `${API}/orders`,
      ENTRIES: `${API}/entries`,
    }
  }
};