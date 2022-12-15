import { useEffect, useState } from "react";
import "./App.css";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url); // recebe os dados da api do url

      const data = await res.json(); // transforma os dados em json

      setProducts(data); // coloca nos produtos os dados
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product={
      name,
      price
    };
    // 2 - Fazer a requisicao

    const res = await fetch(url, {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(product),
    });

    // 3 - Carregamento dinamico

    const addProduct= await res.json()

    setProducts((prevProduct)=> [...prevProduct,addProduct])
    
    // limpar o input depois de fazer a submissão

    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((ele, i) => (
          <li key={ele.id}> {ele.name} :  ${ele.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Pice:
            <input
              type="number"
              id="number"
              value={price}
              onChange={(e)=> setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="create"/>
        </form>
      </div>
    </div>
  );
}

export default App;
