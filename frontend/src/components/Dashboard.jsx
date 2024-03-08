import React, { useEffect } from "react";
import { useState } from "react";
import { Title } from "./parts/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faCopy,
  faReceipt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Header } from "./parts/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../public/styles/Styles.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



export const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [dishes, setDishes] = useState(0);
  const [categories, setCategories] = useState(0);
  const [users, setUsers] = useState(0);
  const [todaySales, setTodaySales] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [salesWeek, setSalesWeek] = useState([]);
  const [salesMonth, setSalesMonth] = useState([]);
  const [salesForDay, setSalesForDay] = useState([]);
  const navigate = useNavigate();

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
      .get("http://127.0.0.1:8000/api/dishes-count", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDishes(response.data.dishesCount);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/categories-count", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data.categoriesCount);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/sales-today", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTodaySales(response.data.salesToday);
        const total = response.data.salesToday.reduce(
          (acc, sale) => acc + sale.total,
          0
        );
        setTotalSales(total);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error.response.data);
      });

    axios
      .get("http://127.0.0.1:8000/api/users-count", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data.usersCount);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error.response.data);
      });

    axios
      .get("http://127.0.0.1:8000/api/sales-week", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSalesWeek(response.data);
        console.log("VENTAS: ", salesWeek);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error.response.data);
      });

    axios
      .get("http://127.0.0.1:8000/api/sales-four-weeks", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSalesMonth(response.data);
        console.log("VENTAS DEL MES: ", salesMonth);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error.response.data);
      });

    axios
      .get("http://127.0.0.1:8000/api/sales-for-days", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSalesForDay(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error.response.data);
      });
  }, []);

  //GRAFICOS

  //Datos primer grafico
  const dates = salesWeek.map((item) => item.date);
  const sales = salesWeek.map((item) => parseInt(item.total_sales));

  const data = {
    labels: dates,
    datasets: [
      {
        labels: "Ventas por día",
        data: sales,
        backgroundColor: "#654321",
        borderColor: "#b5651d",
        pointBorderColor: "#654321",
        pointBorderWidth: 5,
        tension: 0.2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  //Datos segundo grafico
  const datesMonth = salesMonth.map((item) => item.week);
  const monthSales = salesMonth.map((item) => parseInt(item.total_sales));

  const dataMonth = {
    labels: datesMonth,
    datasets: [
      {
        labels: "Ventas del mes",
        data: monthSales,
        backgroundColor: "#654321",
        borderColor: "#b5651d",
        pointBorderColor: "#654321",
        pointBorderWidth: 5,
        tension: 0.2,
      },
    ],
  };

  const optionsMonth = {
    plugins: {
      legend: true,
    },
  };

  //Datos Tercer grafico
  const salesDay = salesForDay.map((item) => item.date);
  const quantity_sales = salesForDay.map((item) =>
    parseInt(item.quantity_sales)
  );

  const dataSalesDay = {
    labels: salesDay,
    datasets: [
      {
        labels: "Ventas del mes",
        data: quantity_sales,
        backgroundColor: "#654321",
        borderColor: "#b5651d",
        pointBorderColor: "#654321",
        pointBorderWidth: 5,
        tension: 0.2,
      },
    ],
  };

  const optionsSalesDay = {
    plugins: {
      legend: true,
    },
  };

  return (
    <div>
      <Header />
      <Title title="Inicio" icon={faHome} />
      <div className="w-11/12 min-h-0 mt-7 m-auto flex items-center justify-between">
        <div className="w-1/5 h-28 rounded shadow flex items-center justify-evenly">
          <h3 className="text-2xl text-center">
            Insumos: <span className="block">{dishes}</span>
          </h3>
          <FontAwesomeIcon
            className="text-4xl text-red-900"
            icon={faUtensils}
          />
        </div>

        <div className="w-1/5 h-28 rounded shadow flex items-center justify-evenly">
          <h3 className="text-2xl text-center">
            Categorías: <span className="block">{categories}</span>
          </h3>
          <FontAwesomeIcon className="text-4xl text-indigo-900" icon={faCopy} />
        </div>

        <div className="w-1/5 h-28 rounded shadow flex items-center justify-evenly">
          <h3 className="text-2xl text-center">
            Usuarios: <span className="block">{users}</span>
          </h3>
          <FontAwesomeIcon className="text-4xl text-green-900" icon={faUsers} />
        </div>

        <div className="w-1/5 h-28 rounded shadow flex items-center justify-evenly">
          <h3 className="text-2xl text-center">
            Ventas de hoy: <span className="block">{totalSales} $</span>
          </h3>
          <FontAwesomeIcon
            className="text-4xl text-orange-500"
            icon={faReceipt}
          />
        </div>
      </div>

      <div className="w-11/12 min-h-0 m-auto mt-5 flex items-center justify-between">
        <div className="w-4/12">
          <h2 className="text-center text-amber-800 text-xl">Ventas por día</h2>
          <Line data={data} options={options}></Line>
        </div>
        <div className="w-4/12">
          <h2 className="text-center text-amber-800 text-xl">Ventas del mes</h2>
          <Line data={dataMonth} options={optionsMonth}></Line>
        </div>
        <div className="w-4/12">
          <h2 className="text-center text-amber-800 text-xl">Ventas por día</h2>
          <Line data={dataSalesDay} options={optionsSalesDay}></Line>
        </div>
      </div>
    </div>
  );
};
