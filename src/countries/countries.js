import {useState, useEffect} from 'react';
import './countries.css';

const Countries = () => {

    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
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
        country.common.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className='grid-item countryCard' key={country.common}>
                        <img src={country.png} alt={country.common} />
                        <p>{country.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Countries;