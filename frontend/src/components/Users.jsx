import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faTrash, faEdit, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { BtnAdd } from './parts/BtnAdd';
import Swal from 'sweetalert2';


export const Users = () => {

    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        role_id: '',
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });


    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        const token = localStorage.getItem('token');

        if (userDataString) {
            const parsedUserData = JSON.parse(userDataString);
            setUserData(parsedUserData);

        }

        console.log(token);

        axios.get('http://127.0.0.1:8000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setUsers(response.data.users);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });


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



    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }


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
                axios.post('http://127.0.0.1:8000/api/register', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        Swal.fire({
                            title: "Nuevo usuario creado",
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
                            text: 'Error, no se pudo guardar el usuario',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        });
                    });
            }
        }
    }

    return (
        <div className='relative'>
            <div className={`${showAdd ? 'block' : 'hidden'} fixed top-0 bottom-0 left-0 right-0 w-screen h-screen form z-40 flex items-center justify-center`}>
                <button onClick={toggleAdd} className='absolute top-3 right-8 text-7xl text-white'>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='w-3/6 h-auto p-7 bg-white rounded-lg'>
                    <form onSubmit={handleSubmit} className='w-11/12 m-auto' action="" autoComplete='off'>
                        <select className='w-full m-auto border-2 border-stone-400 p-2' name="role_id" value={formData.role_id} onChange={handleChange}>
                            <option>--Roles--</option>
                            <hr />
                            {roles.map((element) => (
                                <option value={element.id}>{element.role}</option>
                            ))}
                        </select>
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.name} onChange={handleChange} type="text" name="name" placeholder='Nombre...' />
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.email} onChange={handleChange} type="email" name="email" placeholder='Correo electrónico...' />
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.password} onChange={handleChange} type="password" name="password" placeholder='Contraseña...' />
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.passwordConfirm} onChange={handleChange} type="password" name="passwordConfirm" placeholder='Confirmar contraseña...' />
                        <button className='cursor-pointer duration-300 w-full mt-5 m-auto border-2 text-xl bg-green-500 hover:bg-green-600 p-2' onClick={handleSubmit}><FontAwesomeIcon className='mr-2' icon={faSave} />Guardar</button>
                    </form>
                </div>
            </div>
            <Header />
            <Title title="Usuarios" icon={faUsers} quantity={users.length} />
            <div class="w-11/12 m-auto my-12 flex flex-col">
                <BtnAdd onClick={toggleAdd} />
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table
                                class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Rol
                                        </th>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            mail
                                        </th>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {users.map((element) => (
                                        <tr class="border-b dark:border-neutral-500">
                                            <td
                                                class="text-xl bg-amber-400 whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                {element.id}
                                            </td> <td
                                                class="text-xl whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.role.role}
                                            </td>

                                            <td
                                                class="text-xl whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.name}
                                            </td>
                                            <td
                                                class="text-xl whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.email}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <FontAwesomeIcon className='cursor-pointer duration-500 mr-5 text-2xl text-blue-500 hover:text-blue-950' icon={faEdit} />
                                                <FontAwesomeIcon className='cursor-pointer duration-500 text-2xl text-red-500 hover:text-red-950' icon={faTrash} />
                                            </td>
                                        </tr>
                                    ))}





                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
