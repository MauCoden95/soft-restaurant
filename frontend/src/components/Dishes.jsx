import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faTrash, faEdit, faPlusCircle, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../public/styles/Styles.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BtnAdd } from './parts/BtnAdd';


export const Dishes = () => {

    const [userData, setUserData] = useState({});
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
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

        console.log(token);

        axios.get('http://127.0.0.1:8000/api/dishes', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setDishes(response.data.dishes);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });


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

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: "¿Desea eliminar el insumo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/dish/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        Swal.fire({
                            title: "Producto eliminado!",
                            icon: "success"
                        });
                        setDishes(prevDishes => prevDishes.filter(dish => dish.id !== id));
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud:', error);
                    });

            }
        });
    }

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }






    const [formData, setFormData] = useState({
        category_id: 0,
        name: '',
        description: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const valorCategoryId = name === 'category_id' ? parseInt(value, 10) : value;

        setFormData({ ...formData, [name]: valorCategoryId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');     



        if (formData.category_id === '' || formData.name === '' || formData.description === '' || formData.price === '') {
            Swal.fire({
                title: 'Error',
                text: 'Error, campos vacíos',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } else {
            axios.post('http://127.0.0.1:8000/api/dish', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    Swal.fire({
                        title: "Nuevo producto creado",
                        icon: "success"
                    });
                    setFormData({
                        category_id: 0,
                        name: '',
                        description: '',
                        price: '0'
                    })
                    axios.get('http://127.0.0.1:8000/api/dishes', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => {
                            setDishes(response.data.dishes);
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error('Error al hacer la solicitud:', error);
                        });
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error, no se pudo guardar el producto',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                });
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
                        <select className='w-full m-auto border-2 border-stone-400 p-2' name="category_id" value={formData.category_id} onChange={handleChange}>
                            <option>--Categoría--</option>
                            <hr />
                            {categories.map((element) => (
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.name} onChange={handleChange} type="text" name="name" placeholder='Nombre...' />
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.description} onChange={handleChange} type="text" name="description" placeholder='Descripcion...' />
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.price} onChange={handleChange} type="number" name="price" placeholder='Precio...' />
                        <button className='cursor-pointer duration-300 w-full mt-5 m-auto border-2 text-xl bg-green-500 hover:bg-green-600 p-2'><FontAwesomeIcon className='mr-2' icon={faSave} />Guardar</button>
                    </form>
                </div>
            </div>
            <Header />
            <Title title="Insumos" icon={faUtensils} quantity={dishes.length} />
            <div className="w-11/12 m-auto my-12 flex flex-col">
                <BtnAdd onClick={toggleAdd} />
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Categoría
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Descripción
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Precio
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-xl border-r px-6 py-4 dark:border-neutral-500">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dishes.map((element) => (
                                        <tr className="border-b dark:border-neutral-500">
                                            <td
                                                className="textbase bg-amber-400 whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                {element.id}
                                            </td>
                                            <td
                                                className="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.category_name}
                                            </td>
                                            <td
                                                className="textbase whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.name}
                                            </td>
                                            <td
                                                className="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.description}
                                            </td>
                                            <td
                                                className="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                {element.price}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Link to={`/editar-insumo/${element.id}`}><FontAwesomeIcon className='cursor-pointer duration-500 mr-5 text-2xl text-blue-500 hover:text-blue-950' icon={faEdit} /></Link>
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
