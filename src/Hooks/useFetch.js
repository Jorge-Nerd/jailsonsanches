import { useState, useEffect } from "react";

// 4 - Custom Hook

export const useFetch = (url) => {
  const [data, setData] = useState(null); // para trabalhar com os dados recebidos da url

  // Refatorando POST
  const [config, setConfig] = useState(null); // configurar dentro do método
  const [method, setMethod] = useState(null); // colocar o método a ser utilizado
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };
  httpConfig();
  // Criar um request
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url); // recebe os dados do url

      const json = await res.json(); // transforma os dados em json

      setData(json); // coloca os dados em json para os data
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - Refatorando o POST
  useEffect(() => {
    const httpReq = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);
        const json = res.json();

        setCallFetch(json);
      }
    };

    httpReq();
  }, [config]);
  return { data, httpConfig };
};
