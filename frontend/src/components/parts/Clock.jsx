import React from 'react'

import { useState,useEffect } from 'react';

export const Clock = () => {

    const [dateHour, setDateHour] = useState(new Date());

    useEffect(() => {
        const updateDateHour = () => {
            setDateHour(new Date());
        };

        const interval = setInterval(updateDateHour, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const optionsDateHour = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const format = dateHour.toLocaleString('es-ES', optionsDateHour);

  return (
    <div>
         <p className='text-xl'>{format}</p>
    </div>
  )
}


