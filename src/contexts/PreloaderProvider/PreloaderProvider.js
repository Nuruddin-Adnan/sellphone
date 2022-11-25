import React, { createContext, useState } from 'react';
import './PreloaderProvider.css'

export const PreloaderContext = createContext()
const PreloaderProvider = ({ children }) => {

    const [preloader, setPreloader] = useState(false);
    const value = {
        preloader,
        setPreloader,
    }

    return (
        <PreloaderContext.Provider value={value}>
            {
                preloader &&
                <div id="preloader-box">
                    <div id="loader-spiner"></div>
                </div>
            }
            {children}
        </PreloaderContext.Provider>
    );
};

export default PreloaderProvider;