import { useState, useEffect } from "react";

// 4 - Custom Hook

export const UseFetch = (url) => {
  const [data, setData] = useState(null); // para trabalhar com os dados recebidos da url

  // Criar um request
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url); // recebe os dados do url

      const json = await res.json(); // transforma os dados em json

      setData(json); // coloca os dados em json para os data
    };

    fetchData();
  }, [url]);
  return { data };
};
