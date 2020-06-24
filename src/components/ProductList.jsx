import React, { useContext, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProductContext } from "../contexts/ProductContext";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const { products, findProduct } = useContext(ProductContext);

  const [isVisible, setIsVisible] = useState(false);

  const saveProduct = (id) => {
    findProduct(id);
    setIsVisible(true);
  };

  const footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button
        style={{ float: "left" }}
        icon="pi pi-plus"
        label="Add"
        onClick={() => setIsVisible(true)}
      />
    </div>
  );

  return (
    <div>
      <Panel header="LISTA DE PRODUCTOS" style={{ textAlign: "center" }}>
        <DataTable
          value={products}
          selectionMode="single"
          onSelectionChange={(e) => saveProduct(e.value._id)}
          footer={footer}
        >
          <Column field="_id" header="Id" />
          <Column field="name" header="Nombre" />
          <Column field="price" header="Precio" />
          <Column field="expiry_date" header="Fecha de Caducidad" />
        </DataTable>
      </Panel>
      <ProductForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

export default ProductList;
