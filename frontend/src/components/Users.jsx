import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


export const Users = () => {

    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);


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
    }, []);

    return (
        <div>
            <Header />
            <Title title="Usuarios" icon={faUsers} quantity={users.length}/>


            <div class="w-11/12 m-auto my-12 flex flex-col">
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
                                            Email
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
                                                class="text-xl whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                {element.id}
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
