import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const BtnAdd = ({ onClick }) => {
    return (
        <button onClick={onClick} className='w-32 float-left mb-8 px-6 py-1.5 rounded-md duration-300 bg-green-900 hover:bg-green-700 text-white'>
            <FontAwesomeIcon icon={faPlusCircle} /> Añadir
        </button>
    )
}
