// src/contexts/context.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const openProfileModal = () => setIsProfileModalOpen(true);
    const closeProfileModal = () => setIsProfileModalOpen(false);

    const showAlert = (message, type = 'info') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: 'info' }), 3000);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthModalOpen,
                openAuthModal,
                closeAuthModal,
                isProfileModalOpen,
                openProfileModal,
                closeProfileModal,
                alert,
                showAlert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
