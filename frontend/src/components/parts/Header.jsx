import React, { useEffect } from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const [userData, setUserData] = useState({});
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        const token = localStorage.getItem('token');

        if (userDataString) {
            const parsedUserData = JSON.parse(userDataString);
            setUserData(parsedUserData);
            console.log("DATOS: ", userData);
        }


    }, []);

    const showMenu = () => {
        setMenu(!menu);
    }


    const logout = () => {
        let timerInterval;
        Swal.fire({
            title: "Saliendo del sistema.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                navigate('/');
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

    }

    return (
        <div>
            <header className='w-full h-20 bg-amber-950'>
                <div className='w-11/12 h-full m-auto flex items-center justify-between'>
                    <Link to="http://localhost:5173/">
                        <img className='w-20' src="http://localhost:5173/img/Logo.png" alt="Logo" />
                    </Link>

                    <nav className='w-3/5 h-full'>
                        <ul className='w-full h-full flex items-center justify-between'>
                            <li><Link to="/dashboard" className='text-amber-200 hover:text-amber-500' href=""><FontAwesomeIcon icon={faHome} /> Inicio</Link></li>
                            <li><Link to="/insumos" className='text-amber-200 hover:text-amber-500' href=""><FontAwesomeIcon icon={faUtensils} /> Insumos</Link></li>
                            <li><Link to="/categorias" className='text-amber-200 hover:text-amber-500' href=""><FontAwesomeIcon icon={faSuitcase} /> Categorías</Link></li>
                            <li><Link to="/mesas" className='text-amber-200 hover:text-amber-500' href=""><FontAwesomeIcon icon={faTable} /> Mesas</Link></li>
                            <li><Link to="/usuarios" className='text-amber-200 hover:text-amber-500' href=""><FontAwesomeIcon icon={faUsers} /> Usuarios</Link></li>
                            
                        </ul>
                    </nav>

                    <div className='relative w-auto h-auto'>
                        <button onClick={showMenu} className='text-sm bg-gray-300 hover:bg-stone-400 duration-150 p-2.5'>
                            <FontAwesomeIcon icon={faUser} /> {userData.name} <FontAwesomeIcon className='ml-5' icon={faChevronDown} />
                        </button>
                        <div className={`${menu ? 'block' : 'hidden'} absolute top-full right-0 w-full h-auto`}>
                        <button onClick={logout} className='w-full h-12 text-base duration-200 bg-gray-300 hover:bg-amber-600'><FontAwesomeIcon icon={faGear} /> Configuración</button>
                            <button onClick={logout} className='w-full h-12 text-base duration-200 bg-gray-300 hover:bg-amber-600'><FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión</button>
                        </div>
                    </div>



                </div>
            </header>
        </div>
    )
}
