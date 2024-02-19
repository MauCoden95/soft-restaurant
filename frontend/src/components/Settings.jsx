import React, { useEffect } from 'react'
import { useState } from 'react';
import { Title } from './parts/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Header } from './parts/Header';
import axios from 'axios';

export const Settings = () => {
  return (
    <div>
        <Header />
        <Title title="Configuración" icon={faGear} />
    </div>
  )
}
