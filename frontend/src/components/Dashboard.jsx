import React, { useEffect } from 'react'
import { useState } from 'react';
import { Title } from './parts/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faCopy, faReceipt,faUsers } from '@fortawesome/free-solid-svg-icons';
import { Header } from './parts/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../public/styles/Styles.css';


export const Dashboard = () => {

  const [userData, setUserData] = useState({});
  const [dishes, setDishes] = useState(0);
  const [categories, setCategories] = useState(0);
  const [users, setUsers] = useState(0);
  const [todaySales, setTodaySales] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const token = localStorage.getItem('token');

    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    }

    if (token == null) {
      navigate('/');
    }


    axios.get('http://127.0.0.1:8000/api/dishes-count', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setDishes(response.data.dishesCount);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
      });






    axios.get('http://127.0.0.1:8000/api/categories-count', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setCategories(response.data.categoriesCount);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
      });




    axios.get('http://127.0.0.1:8000/api/sales-today', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setTodaySales(response.data.salesToday);
        const total = response.data.salesToday.reduce((acc, sale) => acc + sale.total, 0);
        setTotalSales(total);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error.response.data);
      });


      axios.get('http://127.0.0.1:8000/api/users-count', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setUsers(response.data.usersCount);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error.response.data);
      });


  }, []);

  return (
    <div>
      <Header />
      <Title title="Inicio" icon={faHome} />
      <div className='w-11/12 min-h-0 mt-7 m-auto flex items-center justify-between'>
        <div className='w-1/5 h-28 rounded shadow flex items-center justify-evenly'>
          <h3 className='text-2xl text-center'>Insumos: <span className='block'>{ dishes }</span></h3>
          <FontAwesomeIcon className='text-4xl text-red-900' icon={faUtensils} />
        </div>

        <div className='w-1/5 h-28 rounded shadow flex items-center justify-evenly'>
          <h3 className='text-2xl text-center'>Categorías: <span className='block'>{ categories }</span></h3>
          <FontAwesomeIcon className='text-4xl text-indigo-900' icon={faCopy} />
        </div>

        <div className='w-1/5 h-28 rounded shadow flex items-center justify-evenly'>
          <h3 className='text-2xl text-center'>Usuarios: <span className='block'>{ users }</span></h3>
          <FontAwesomeIcon className='text-4xl text-green-900' icon={faUsers} />
        </div>

        <div className='w-1/5 h-28 rounded shadow flex items-center justify-evenly'>     
          <h3 className='text-2xl text-center'>Ventas de hoy: <span className='block'>{ totalSales } $</span></h3>
          <FontAwesomeIcon className='text-4xl text-orange-500' icon={faReceipt} />
        </div>
      </div>
    </div>
  )
}
