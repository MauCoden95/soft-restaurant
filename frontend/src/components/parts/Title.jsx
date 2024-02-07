import React from 'react'
import { Clock } from './Clock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Title = (props) => {
  return (
    <div className='w-11/12 h-28 m-auto mt-7 rounded px-3 bg-slate-200 flex items-center justify-between'>
      <h2 className='text-3xl flex items-center'>
        {props.title}
        <FontAwesomeIcon className='ml-5' icon={props.icon} />
        {props.quantity > 0 && <span className='bg-amber-950 rounded-lg px-3 py-1.5 ml-10 text-white text-sm'>{props.quantity} resultados</span>}
      </h2>

      <Clock />
    </div>
  )
}
