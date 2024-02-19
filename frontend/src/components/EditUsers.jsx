import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Title } from './parts/Title';
import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const EditUsers = () => {

  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [roles, setRoles] = useState([]);
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

  



    axios.get('http://127.0.0.1:8000/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setRoles(response.data.roles);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
      });

  }, []);



  const [formData, setFormData] = useState({
    role_id: '',
    name: '',
    email: '',
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


      if (formData.role_id == '' || formData.name == '' || formData.email == '' || formData.password == '' || formData.passwordConfirm == '') {
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
            axios.put(`http://127.0.0.1:8000/api/user/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    Swal.fire({
                        title: "Usuario editado",
                        icon: "success"
                    });
                    setFormData({
                        role_id: '',
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    })
                    axios.get('http://127.0.0.1:8000/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => {
                            setUsers(response.data.users);
                        })
                        .catch(error => {
                            console.error('Error al hacer la solicitud:', error);
                        });
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error, no se pudo editar el usuario',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                });
        }
    }
  }

  return (
    <div>
      <Header />
      <Title title="Editar usuario" icon={faUser} quantity="" />

      <form onSubmit={handleSubmit} class="w-3/6 mx-auto mt-5 mb-5">
        <div class="mb-5">
          <select className='w-full m-auto border-2 border-stone-400 p-2 mb-5 ' name="role_id" value={formData.role_id} onChange={handleChange}>
            <option>--Roles--</option>
            <hr />
            {roles.map((element) => (
              <option value={element.id}>{element.role}</option>
            ))}
          </select>
          <input type="text" id="name" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre..." name="name" value={formData.name} onChange={handleChange} />
          <input type="email" id="name" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email..." name="email" value={formData.email} onChange={handleChange} />
          <input type="password" id="name" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Contraseña..." name="password" value={formData.password} onChange={handleChange} />
          <input type="password" id="name" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirmar contraseña..." name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
        </div>

        <button type="submit" class="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FontAwesomeIcon className='cursor-pointer duration-500 mr-3 text-2xl text-white' icon={faEdit} /> Editar</button>
      </form>
    </div>
  )
}
