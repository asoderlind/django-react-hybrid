interface Config {
  baseUrl: string;
  apiUrl: string;
  credentials: RequestCredentials;
}

const prod: Config = {
  baseUrl: "http://localhost:8000",
  apiUrl: "http://localhost:8000/api",
  credentials: "same-origin",
};

const dev: Config = {
  baseUrl: "http://localhost:8000",
  apiUrl: "http://localhost:8000/api",
  credentials: "include",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
