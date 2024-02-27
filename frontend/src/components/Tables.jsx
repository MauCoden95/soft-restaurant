import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from './parts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { Title } from './parts/Title';
import { faTrash, faEdit, faPlusCircle, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../public/styles/Styles.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BtnAdd } from './parts/BtnAdd';



export const Tables = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [tables, setTables] = useState([]);
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


        axios.get('http://127.0.0.1:8000/api/tables', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setTables(response.data.tables);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });


    }, []);

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const [formData, setFormData] = useState({
        name: '',
        state: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <div className='relative'>
            <div className={`${showAdd ? 'block' : 'hidden'} fixed top-0 bottom-0 left-0 right-0 w-screen h-screen form z-40 flex items-center justify-center`}>
                <button onClick={toggleAdd} className='absolute top-3 right-8 text-7xl text-white'>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='w-3/6 h-auto p-7 bg-white rounded-lg'>
                    <form  className='w-11/12 m-auto' action="" autoComplete='off'>
                        <input className='w-full mt-5 m-auto border-2 border-stone-400 p-2' value={formData.nro} onChange={handleChange} type="number" name="nro" placeholder='Número...' />
                        <button className='cursor-pointer duration-300 w-full mt-5 m-auto border-2 text-xl bg-green-500 hover:bg-green-600 p-2'><FontAwesomeIcon className='mr-2' icon={faSave} />Guardar</button>
                    </form>
                </div>
            </div>
            <Header />
            <Title title="Mesas" icon={faTable} quantity={tables.length} />
            <div className='w-11/12 min-h-0 m-auto mt-12 flex items-center justify-start'>
                <BtnAdd onClick={toggleAdd}/>
            </div>
            <h2 className='text-center my-5'>Estado de las mesas: <span className='text-blue-500'>Libre</span> | <span className='text-orange-500'>Ocupada</span></h2>
            <div className='w-11/12 min-h-0 m-auto mt-12 mb-8 grid grid-cols-8 gap-4 justify-items-center'>
                {tables.map((element) => (
                    <Link to={`/mesa/${element.nro}`} class={`w-full h-36 border-4 border-blue-700 ${element.state ? 'bg-orange-500' : 'bg-blue-500'} flex items-center justify-center text-xl`}>
                        Mesa # {element.nro}
                    </Link>
                ))}
            </div>
        </div>
    )
}
