import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const ProductForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createProduct,
    deleteProduct,
    editProduct,
    updateProduct,
  } = useContext(ProductContext);

  const initialProductState = {
    _id: null,
    name: "",
    price: 0,
    expiry_date: null,
  };

  const [productData, setProductData] = useState(initialProductState);

  useEffect(() => {
    if (editProduct) setProductData(editProduct);
  }, [editProduct]);

  const updateField = (data, field) => {
    setProductData({
      ...productData,
      [field]: data,
    });

    console.log(productData);
  };

  const _deleteProduct = () => {
    if (editProduct) {
      deleteProduct(productData._id);
      setProductData(initialProductState);
    }
    setIsVisible(false);
  };

  const saveProduct = () => {
    if (!editProduct) {
      createProduct(productData);
    } else {
      updateProduct(productData);
    }
    setProductData(initialProductState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={_deleteProduct} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setProductData(initialProductState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Detalles del Producto"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={productData.name}
              onChange={(e) => updateField(e.target.value.trim(), "name")}
            />
            <label>Nombre:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputNumber
              value={productData.price}
              onChange={(e) => updateField(e.target.value, "price")}
              mode="currency"
              currency="USD"
            />
            <label>Precio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                productData.expiry_date &&
                new Date(productData.expiry_date + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "expiry_date"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha de caducidad:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default ProductForm;
