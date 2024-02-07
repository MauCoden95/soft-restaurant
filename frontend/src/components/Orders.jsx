import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faPenFancy, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import Swal from 'sweetalert2';
import '../../public/styles/Styles.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BtnAdd } from './parts/BtnAdd';
import { useParams } from 'react-router-dom';

export const Orders = () => {

    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [dishes, setDishes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

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

        axios.get('http://127.0.0.1:8000/api/dishes', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setDishes(response.data.dishes);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });




    }, []);


    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const handleProductClick = (product) => {
        const existingProduct = selectedProducts.find(item => item.id === product.id);
        if (existingProduct) {
            setSelectedProducts(selectedProducts.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1, subtotal: item.subtotal + item.price } : item
            ));
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1, subtotal: product.price }]);
        }
    };


    const handleDecrement = (id) => {
        setSelectedProducts(selectedProducts.map(product =>
            product.id === id && product.quantity > 0
                ? { ...product, quantity: product.quantity - 1, subtotal: product.price * (product.quantity - 1) }
                : product
        ));
    };

    const handleIncrement = (id) => {
        setSelectedProducts(selectedProducts.map(product =>
            product.id === id
                ? { ...product, quantity: product.quantity + 1, subtotal: product.price * (product.quantity + 1) }
                : product
        ));
    };

    const handleDelete = (id) => {
        setSelectedProducts(selectedProducts.filter(product => product.id !== id));
    };

    const totalPrice = selectedProducts.reduce((total, product) => {
        return total + product.subtotal;
    }, 0);

    return (
        <div>
            <Header />
            <Title title={`Tomar orden para mesa Nro° ${id}`} icon={faPenFancy} quantity="" />
            <form className='relative w-11/12 h-96 m-auto mt-12' action="">
                <div className='w-full flex items-center justify-between'>
                    <button className='bg-green-700 hover:bg-green-400 rounded-md duration-300 px-5 py-2'>Ordenar <FontAwesomeIcon icon={faShoppingBag} className='ml-2' /></button>
                    <span className='text-4xl text-green-900'>{totalPrice} $</span>
                </div>
                <input className='w-full px-4 py-2 text-xl my-3 rounded-md border-2 border-amber-950 focus:border-amber-700 focus:bg-gray-200 duration-300' placeholder='Ingrese el insumo...' type="text" name="dish" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <ul className='absolute w-full min-h-0 shadow-2xl mb-4 bg-white z-40'>
                    {
                        searchTerm !== '' && filteredDishes.length === 0 ? (
                            <p>No se encontraron platos que coincidan con la búsqueda.</p>
                        ) : (
                            searchTerm !== '' && filteredDishes.map(dish => (
                                <li className='cursor-pointer py-3 px-2 hover:bg-gray-400' key={dish.id} onClick={() => handleProductClick(dish)}>{dish.name}</li>
                            ))
                        )
                    }
                </ul>
                <ul className='w-full min-h-0'>
                    <table
                        class="min-w-full border text-center text-sm font-light mt-5">
                        <thead class="border-b font-medium">
                            <tr>
                                <th
                                    scope="col"
                                    class="w-3/12 text-xl border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500">
                                    Nombre
                                </th>
                                <th
                                    scope="col"
                                    class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500">
                                    Cantidad
                                </th>
                                <th
                                    scope="col"
                                    class="w-3/12 text-xl border-l border-r px-6 py-2 bg-gray-300 border-b-2 border-neutral-500">
                                    Precio
                                </th>
                                <th
                                    scope="col"
                                    class="w-3/12 text-xl px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500">
                                    Subtotal
                                </th>
                                <th
                                    scope="col"
                                    class="w-3/12 text-xl border-l px-6 py-2 bg-gray-300 border-b-2 border-r-0 border-neutral-500">
                                    Eliminar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map(product => (
                                <tr key={product.id} class="border-b ">
                                    <td
                                        class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {product.name}
                                    </td>
                                    <td
                                        class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        <button onClick={() => handleDecrement(product.id)} type='button' className='bg-blue-500 hover:bg-blue-800 text-white text-xl mr-7 px-3 rounded'>-</button>{product.quantity}<button onClick={() => handleIncrement(product.id)} type='button' className='bg-blue-500 hover:bg-blue-800 text-white text-xl ml-7 px-3 rounded'>+</button>
                                    </td>
                                    <td
                                        class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {product.price} $
                                    </td>
                                    <td
                                        class="text-base whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {product.subtotal} $
                                    </td>
                                    <td
                                        class="text-base whitespace-nowrap border-l border-r px-6 py-4 dark:border-neutral-500">
                                        <button onClick={() => handleDelete(product.id)}>
                                            <FontAwesomeIcon  className='cursor-pointer duration-500 text-2xl text-red-500 hover:text-red-950' icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ul>
            </form>

        </div>
    )
}
