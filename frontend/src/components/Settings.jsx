import React, { useEffect } from 'react'
import { useState } from 'react';
import { Title } from './parts/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faKey } from '@fortawesome/free-solid-svg-icons';
import { Header } from './parts/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


export const Settings = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});


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





  }, []);


  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');


    if (formData.password == '' || formData.passwordConfirm == '') {
      Swal.fire({
        title: 'Error',
        text: 'Error, campos vacíos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });

    } else {
      if (formData.password != formData.passwordConfirm) {
        Swal.fire({
          title: 'Error',
          text: 'Error, las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: "¿Desea cambiar la contraseña?",
          icon: "warning",
          html: `
          <p>Deberá volver a iniciar sesión</p>
        `,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            axios.put(`http://127.0.0.1:8000/api/user-psw/${id}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })
              .then(response => {
                setTimeout(() => {
                  Swal.fire({
                    title: "Contraseña cambiada",
                    icon: "success"
                  }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                      localStorage.removeItem('userData');
                      localStorage.removeItem('token');
                      navigate('/');
                    }
                  });
                }, 500);


              })
              .catch(error => {
                Swal.fire({
                  title: 'Error',
                  text: 'Error, no se pudo cambiar la contraseña',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                });
              });

          }
        });

      }
    }
  }

  return (
    <div>
      <Header />
      <Title title="Configuración" icon={faGear} />
      <form onSubmit={handleSubmit} class="w-3/6 mx-auto mt-5 mb-5">
        <h2 className='text-center my-5 text-2xl'>Cambiar contraseña</h2>
        <div class="mb-5">
          <input type="password" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ingrese la nueva contraseña" name="password" value={formData.password} onChange={handleChange} />
          <input type="password" id="name" class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirme la nueva contraseña" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
        </div>

        <button onClick={handleSubmit} type="submit" class="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FontAwesomeIcon className='cursor-pointer duration-500 mr-3 text-2xl text-white' icon={faKey} /> Cambiar contraseña</button>
      </form>
    </div>
  )
}
