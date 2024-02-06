import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../public/styles/Styles.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const EditDishes = () => {

    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [dish, setDish] = useState({});
    const [categories, setCategories] = useState([]);
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

        axios.get(`http://127.0.0.1:8000/api/dish/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setDish(response.data.dish);
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
            axios.put(`http://127.0.0.1:8000/api/dish/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                Swal.fire({
                    title: "Producto editado!",
                    icon: "success"
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error, no se pudo editar el insumo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            });
            console.log(formData);
        }
    };

    return (
        <div>
            <Header />  
            <Title title="Editar insumo" icon={faUtensils} quantity="" />


            <form onSubmit={handleSubmit} class="w-3/6 mx-auto mt-5 mb-5">
                <select className='mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' value={formData.category_id} onChange={handleChange} name="category_id" >
                    <option>--Categoría--</option>
                    <hr />
                    {categories.map((element) => (
                        <option value={element.id}>{element.name}</option>
                    ))}
                </select>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={`${dish.name}`} name="name" value={formData.name} onChange={handleChange}  />
                </div>

                <div class="mb-5">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="text" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={`${dish.description}`} name="description" value={formData.description} onChange={handleChange}  />
                </div>

                <div class="mb-5">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="number" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={`${dish.price}`} name="price" value={formData.price} onChange={handleChange}  />
                </div>

                <button type="submit" class="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FontAwesomeIcon className='cursor-pointer duration-500 mr-3 text-2xl text-white' icon={faEdit} /> Editar</button>
            </form>


        </div>
    )
}
