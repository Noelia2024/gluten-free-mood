import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import  db  from "/src/fireStore.config";

const ContainProducts = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Productos"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(lista);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <section className="contain-products">
      <h2>Nuestros Productos Sin TACC</h2>
      {productos.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="products-grid">
          {productos.map((prod) => (
            <div key={prod.id} className="product-card">
              {prod.Imagen && <img src={prod.Imagen} alt={prod.Nombre} />}
              <h3>{prod.Nombre || "Producto sin nombre"}</h3>
              {prod.Precio && <p>${prod.Precio}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContainProducts;