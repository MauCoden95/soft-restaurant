import React from 'react'
import { Link } from 'react-router-dom';
import { BtnSend } from './parts/BtnSend';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import Swal from 'sweetalert2';

export const Login = () => {

  const value = "Ingresar";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);


    if (formData.email == '' || formData.password == '') {
        Swal.fire({
          title: 'Error',
          text: 'Error, campos vacíos',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
    } else {
        axios.post('http://127.0.0.1:8000/api/login', formData)
            .then(response => {
              console.log(response.data.status);
                
                if (response.data.status != 'error') {
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    navigate('/dashboard');
                }else{
                  Swal.fire({
                    title: 'Error',
                    text: 'Error, credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                  });
                }
            })
            .catch(error => {
              Swal.fire({
                title: 'Error',
                text: 'Error, credenciales incorrectas',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            });

    }








};

  return (
    <div className="w-screen h-screen bg-yellow-950 flex items-center justify-center">





      <div class="w-4/6 min-h-0 rounded-lg flex items-center justify-center">
        <Link to="http://localhost:5173/">
          <img className='w-[40rem]' src="http://localhost:5173/img/Logo.png" alt="Logo" />
        </Link>



        <form onSubmit={handleSubmit} class="w-5/6 h-66 bg-white p-6 rounded-lg ml-20" autocomplete="off">


          <div>
            <label htmlFor="">Correo</label>

            <input className='m-auto mt-0.5 w-full px-3 py-2 bg-gray-100 rounded-md border-2 border-gray-300 active:border-gray-700' type="text" name="email" value={formData.email} onChange={handleChange}/>

         
          </div>

          <div className="mt-4">
          <label htmlFor="">Contraseña</label>

          <input className='m-auto mt-0.5 w-full px-3 py-2 bg-gray-100 rounded-md border-2 border-gray-300 active:border-gray-700' type="password" name="password"  value={formData.password} onChange={handleChange}/>

               
          </div>


          <div className="flex items-center justify-end mt-4">


            <BtnSend value={value}/>
          </div>






        </form>
      </div >
    </div >
  )
}
