import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "./parts/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faTimes,
  faPenFancy,
  faShoppingBag,
  faTrash,
  faBoxes,
  faCheck,
  faExclamationTriangle,
  faMoneyBill1Wave,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import { Title } from "./parts/Title";
import Swal from "sweetalert2";
import "../../public/styles/Styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BtnAdd } from "./parts/BtnAdd";
import { useParams } from "react-router-dom";


import PDF from "./PDF";
import { PDFDownloadLink,PDFViewer } from "@react-pdf/renderer";

export const Orders = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSale, setShowSale] = useState(false);
  const [formData, setFormData] = useState({
    total: 0,
    date: "",
    hour: "",
  });
  



  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const token = localStorage.getItem("token");

    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    }

    if (token == null) {
      navigate("/");
    }

    axios
      .get("http://127.0.0.1:8000/api/dishes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDishes(response.data.dishes);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });

    const savedSelectedProducts = localStorage.getItem(
      `selectedProducts_${id}`
    );
    if (savedSelectedProducts) {
      setSelectedProducts(JSON.parse(savedSelectedProducts));
    }
  }, []);

  useEffect(() => {
    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      return prevSelectedProducts;
    });
  }, [selectedProducts]);

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    const existingProduct = selectedProducts.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.subtotal + item.price,
              }
            : item
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1, subtotal: product.price, checked: false },
      ]);
    }

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      return prevSelectedProducts;
    });
  };

  const handleDecrement = (id) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? {
              ...product,
              quantity: product.quantity - 1,
              subtotal: product.price * (product.quantity - 1),
            }
          : product
      )
    );

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      return prevSelectedProducts;
    });
  };

  const handleIncrement = (id) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
              subtotal: product.price * (product.quantity + 1),
            }
          : product
      )
    );

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      console.log(localStorage.getItem(`selectedProducts_${id}`));
      return prevSelectedProducts;
    });
  };

  const handleDelete = (id) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== id)
    );

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      console.log(localStorage.getItem(`selectedProducts_${id}`));
      return prevSelectedProducts;
    });
  };

  const totalPrice = selectedProducts.reduce((total, product) => {
    return total + product.subtotal;
  }, 0);

  const handleDelivery = () => {
    const updatedProducts = selectedProducts.map((product) =>
      product.delivered || !product.checked
        ? product
        : { ...product, delivered: true }
    );
    setSelectedProducts(updatedProducts);

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      console.log(localStorage.getItem(`selectedProducts_${id}`));
      return prevSelectedProducts;
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product
      )
    );

    setSelectedProducts((prevSelectedProducts) => {
      localStorage.setItem(
        `selectedProducts_${id}`,
        JSON.stringify(prevSelectedProducts)
      );
      return prevSelectedProducts;
    });
  };

  const handleChangeAvailability = (id) => {
    const token = localStorage.getItem("token");

    axios
      .put(`http://127.0.0.1:8000/api/change/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Estado de la mesa actualizado!",
          icon: "success",
        });
      })
      .catch((error) => {});
  };

  const toggleSale = (e) => {
    e.preventDefault();

    setShowSale(!showSale);
  };

  const handleChange = () => {
    const currentDate = new Date();
    const newFormData = {
      ...formData,
      total: totalPrice,
      date: currentDate.toISOString().split("T")[0],
      hour: currentDate.toTimeString().split(" ")[0],
    };
    setFormData(newFormData);
  };

  const handleSaveSale = () => {
    const token = localStorage.getItem("token");
    const currentDate = new Date();
    const formData = {
      total: totalPrice,
      date: currentDate.toISOString().split("T")[0],
      hour: currentDate.toTimeString().split(" ")[0],
    };

    console.log("DATOS:", formData);

    axios
      .post("http://127.0.0.1:8000/api/sale", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Venta guardada",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error, no se pudo guardar la venta",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  
 

  return (
    <div className="relative">
      <div
        className={`${
          showSale ? "block" : "hidden"
        }  fixed w-full h-full form z-50 flex items-center justify-center`}
      >
        <button
          onClick={toggleSale}
          className="absolute top-3 right-8 text-7xl text-white"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="w-auto h-auto bg-white rounded-md px-10">
          <h2 className="text-center text-4xl my-6">Confirmar venta</h2>
          <table class="min-w-full border text-center text-sm font-light mt-5">
            <thead class="border-b font-medium">
              <tr>
                <th
                  scope="col"
                  class="w-3/12 text-xl border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r border-neutral-500"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500"
                >
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id} class="border-b ">
                  <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                    {product.name}
                  </td>
                  <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                    {product.quantity}
                  </td>
                  <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                    {product.subtotal} $
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="my-5 text-center text-3xl">
            Precio total: <span className="text-amber-600">{totalPrice}</span>
            <input
              className="hidden w-28 text-amber-600 focues:border-0"
              type="number"
              name=""
              id=""
              value={totalPrice}
              onChange={handleChange}
              readOnly
            />
          </h3>
          <button
            onClick={handleSaveSale}
            className="w-2/6 block m-auto my-5 bg-green-700 hover:bg-green-400 rounded-md duration-300 px-5 py-2"
          >
            Confirmar{" "}
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="ml-2" />
          </button>

          <PDFDownloadLink document={<PDF detail={localStorage.getItem(`selectedProducts_${id}`)} total={totalPrice} />} fileName={'Factura.pdf'}>
            {({ loading, url, error, blob }) =>
              loading ? (
                <button>Loading Document</button>
              ) : (
                <button className="w-2/6 block m-auto my-5 bg-orange-700 hover:bg-orange-500 rounded-md duration-300 px-5 py-2">Generar factura <FontAwesomeIcon className="ml-2" icon={faReceipt} /></button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      <Header />
      <Title
        title={`Tomar orden para la mesa Nro° ${id}`}
        icon={faPenFancy}
        quantity=""
      />
      <form className="relative w-11/12 h-96 m-auto mt-12 mb-28" action="">
        <div className="w-full flex items-center justify-between">
          <div>
            <button
              className="bg-green-700 hover:bg-green-400 rounded-md duration-300 px-5 py-2"
              onClick={toggleSale}
            >
              Cobrar{" "}
              <FontAwesomeIcon icon={faMoneyBill1Wave} className="ml-2" />
            </button>
            <button
              className="ml-5 bg-orange-700 hover:bg-orange-400 rounded-md duration-300 px-5 py-2"
              onClick={handleDelivery}
              type="button"
            >
              Entregar <FontAwesomeIcon icon={faBoxes} className="ml-2" />
            </button>
            <button
              className="ml-5 bg-indigo-400 hover:bg-indigo-200 rounded-md duration-300 px-5 py-2"
              onClick={() => handleChangeAvailability(id)}
              type="button"
            >
              Ocupar/Desocupar Mesa{" "}
              <FontAwesomeIcon icon={faTable} className="ml-2" />
            </button>
          </div>
          <span className="text-4xl text-green-900">{totalPrice} $</span>
        </div>
        <input
          className="w-full px-4 py-2 text-xl my-3 rounded-md border-2 border-amber-950 focus:border-amber-700 focus:bg-gray-200 duration-300"
          placeholder="Ingrese el insumo..."
          type="text"
          name="dish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="absolute w-full min-h-0 shadow-2xl mb-4 bg-white z-40">
          {searchTerm !== "" && filteredDishes.length === 0 ? (
            <p>No se encontraron platos que coincidan con la búsqueda.</p>
          ) : (
            searchTerm !== "" &&
            filteredDishes.map((dish) => (
              <li
                className="cursor-pointer py-3 px-2 hover:bg-gray-400"
                key={dish.id}
                onClick={() => handleProductClick(dish)}
              >
                {dish.name}
              </li>
            ))
          )}
        </ul>
        <h2 className="text-center my-5">
          Estado del pedido:{" "}
          <span>
            <FontAwesomeIcon
              className="text-2xl text-red-500"
              icon={faExclamationTriangle}
            />{" "}
            Pendiente
          </span>{" "}
          |{" "}
          <span>
            <FontAwesomeIcon
              className="text-2xl text-green-500"
              icon={faCheck}
            />{" "}
            Entregado
          </span>
        </h2>
        <table class="min-w-full border text-center text-sm font-light mt-5">
          <thead class="border-b font-medium">
            <tr>
              <th
                scope="col"
                class="w-1/12 text-xl border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500"
              ></th>
              <th
                scope="col"
                class="w-3/12 text-xl border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500"
              >
                Nombre
              </th>
              <th
                scope="col"
                class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500"
              >
                Cantidad
              </th>
              <th
                scope="col"
                class="w-3/12 text-xl border-l border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500"
              >
                Precio
              </th>
              <th
                scope="col"
                class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500"
              >
                Subtotal
              </th>
              <th
                scope="col"
                class="w-3/12 text-xl border-l px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500"
              >
                Eliminar
              </th>
              <th
                scope="col"
                class="w-3/12 text-xl border-l px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500"
              ></th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id} class="border-b ">
                <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {product.name}
                </td>
                <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-800 text-white text-xl mr-7 px-3 rounded"
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    onClick={() => handleIncrement(product.id)}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-800 text-white text-xl ml-7 px-3 rounded"
                  >
                    +
                  </button>
                </td>
                <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {product.price} $
                </td>
                <td class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                  {product.subtotal} $
                </td>
                <td class="text-base whitespace-nowrap border-l border-r px-6 py-4 dark:border-neutral-500">
                  <button onClick={() => handleDelete(product.id)}>
                    <FontAwesomeIcon
                      className="cursor-pointer duration-500 text-2xl text-red-500 hover:text-red-950"
                      icon={faTrash}
                    />
                  </button>
                </td>
                <td class="text-base whitespace-nowrap border-l border-r px-6 py-4 dark:border-neutral-500">
                  {product.delivered ? (
                    <FontAwesomeIcon
                      className="text-2xl text-green-500"
                      icon={faCheck}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-2xl text-red-500"
                      icon={faExclamationTriangle}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};
