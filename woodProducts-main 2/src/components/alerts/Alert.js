// src/components/alerts/Alert.js
import React, {useContext} from 'react';
import {AppContext} from '../../contexts/context';

const Alert = () => {
    const {alert} = useContext(AppContext);

    if (!alert.show) return null;

    let bgColor = 'bg-blue-500';
    if (alert.type === 'success') bgColor = 'bg-green-500';
    else if (alert.type === 'error') bgColor = 'bg-red-500';
    else if (alert.type === 'warning') bgColor = 'bg-yellow-500';

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white ${bgColor} z-50`}>
            {alert.message}
        </div>
    );
};

export default Alert;
