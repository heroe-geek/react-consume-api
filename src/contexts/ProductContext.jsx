import React, { createContext, useState, useEffect } from "react";
import { ProductService } from "../services/ProductService";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const productService = new ProductService();

  const [products, setProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    productService.readAll().then((data) => setProducts(data));
  }, []);

  const createProduct = (product) => {
    productService
      .create(product)
      .then((data) => setProducts([...products, data]));
  };

  const deleteProduct = (id) => {
    productService
      .delete(id)
      .then(() => setProducts(products.filter((p) => p._id !== id)));
  };

  const findProduct = (id) => {
    const product = products.find((p) => p._id === id);

    setEditProduct(product);
  };

  const updateProduct = (product) => {
    productService
      .update(product)
      .then((data) =>
        setProducts(
          products.map((p) => (p._id === product._id ? data : product))
        )
      );

    setEditProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        deleteProduct,
        findProduct,
        updateProduct,
        editProduct,
        products,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
