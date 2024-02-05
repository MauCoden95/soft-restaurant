import React, { useEffect } from 'react'
import { useState } from 'react';
import { Title } from './parts/Title';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Header } from './parts/Header';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const token = localStorage.getItem('token');

    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
            setUserData(parsedUserData);
            console.log("DATOS: ", userData);
        }

    if (token == null) {
      navigate('/');
     }
  }, []);

  return (
    <div>
      <Header/>

      <Title title="Inicio" icon={faHome} />
    </div>
  )
}
