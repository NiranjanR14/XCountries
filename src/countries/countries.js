import {useState, useEffect} from 'react';
import './countries.css';

const Countries = () => {

    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredCountries = searchQuery === '' ? countries : countries.filter(country =>
        country.name.includes(searchQuery)
    );

    return (
        <div>
            <h1>Countries</h1>
            <input
                type="text"
                placeholder="Search for countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='grid-container'>
                {filteredCountries.map((country) => (
                    <div className='grid-item countryCard' key={country.name}>
                        <img src={country.flag} alt={country.name} />
                        <p>{country.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Countries;