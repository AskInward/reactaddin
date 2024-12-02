import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import AddInUI from './AddInUI';

// Simplified main component
const GeotabCustomPage = ({ api }) => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const results = await api.call('Get', {
                    typeName: 'Device',
                    resultsLimit: 10
                });
                setDevices(results);
            } catch (error) {
                console.error('Failed to load devices:', error);
            }
        };

        loadDevices();
    }, [api]);

    return (
        <div>
         
            <h1>Geotab Devices</h1>
            {devices.map(device => (
                <div key={device.id}>{device.name}</div>
            ))}
        </div>
    );
};

// Simplified Geotab add-in initialization
window.geotab.addin.myReactAddIn = () => ({
    initialize(api, state, callback) {
        
        
        ReactDOM.createRoot(document.querySelector('#root')).render(
            <>
            <AddInUI />
            <GeotabCustomPage api={api} />
            </>
        );
        
        callback();
    }
});