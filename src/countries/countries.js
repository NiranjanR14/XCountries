import {useState, useEffect} from 'react';
import './countries.css';

const Countries = () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <h1>Countries</h1>
            <div className='grid-container'>
                {countries.map((country) => (
                    <div className='grid-item'>
                        <img src={country.flag} alt={country.name} />
                        <p>{country.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Countries;