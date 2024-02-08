import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faTrash, faEdit, faPlusCircle, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../public/styles/Styles.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BtnAdd } from './parts/BtnAdd';



export const Categories = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [userData, setUserData] = useState({});
    const [showAdd, setShowAdd] = useState(false);

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



        axios.get('http://127.0.0.1:8000/api/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });
    }, []);

    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (formData.name == '') {
            Swal.fire({
                title: 'Error',
                text: 'Error, campos vacíos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } else {
            axios.post('http://127.0.0.1:8000/api/category', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    Swal.fire({
                        title: "Nueva categoría creada",
                        icon: "success"
                    });
                    setFormData({
                        name: ''
                    })
                    axios.get('http://127.0.0.1:8000/api/categories', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => {
                            setCategories(response.data.categories);
                        })
                        .catch(error => {
                            console.error('Error al hacer la solicitud:', error);
                        });
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error, no se pudo guardar la categoría',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                });
        }
    }


    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: "¿Desea eliminar la categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        Swal.fire({
                            title: "Categoría eliminada!",
                            icon: "success"
                        });
                        setCategories(prevDishes => prevDishes.filter(category => category.id !== id));
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud:', error);
                    });

            }
        });
    }

    return (
        <div className='relative'>
            <div className={`${showAdd ? 'block' : 'hidden'} fixed top-0 bottom-0 left-0 right-0 w-screen h-screen form z-40 flex items-center justify-center`}>
                <button onClick={toggleAdd} className='absolute top-3 right-8 text-7xl text-white'>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='w-3/6 h-auto p-7 bg-white rounded-lg'>
                    <form onSubmit={handleSubmit} className='w-11/12 m-auto' action="" autoComplete='off'>
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.name} onChange={handleChange} type="text" name="name" placeholder='Nombre...' />
                        <button className='cursor-pointer duration-300 w-full mt-5 m-auto border-2 text-xl bg-green-500 hover:bg-green-600 p-2'><FontAwesomeIcon className='mr-2' icon={faSave} />Guardar</button>
                    </form>
                </div>
            </div>
            <Header />
            <Title title="Categorías" icon={faCopy} quantity={categories.length} />
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
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            class="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map((element) => (
                                        <tr class="border-b dark:border-neutral-500">
                                            <td
                                                class="text-xl bg-amber-400 whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                {element.id}
                                            </td>
                                            <td
                                                class="text-xl whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.name}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <Link to={`/editar-categoria/${element.id}`}><FontAwesomeIcon className='cursor-pointer duration-500 mr-5 text-2xl text-blue-500 hover:text-blue-950' icon={faEdit} /></Link>
                                                <FontAwesomeIcon onClick={() => handleDelete(element.id)} className='cursor-pointer duration-500 text-2xl text-red-500 hover:text-red-950' icon={faTrash} />
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
