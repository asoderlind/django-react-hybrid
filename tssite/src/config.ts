interface Config {
  base_url: string;
  credentials: RequestCredentials;
}

const prod: Config = {
  base_url: "",
  credentials: "same-origin",
};

const dev: Config = {
  base_url: "http://localhost:8000",
  credentials: "include",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
