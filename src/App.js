import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rockets, setRockets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/rockets')
      .then((response) => response.json())
      .then((data) => setRockets(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  // Filter rockets based on the search term
  const filteredRockets = rockets.filter((rocket) =>
    rocket.rocket_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans bg-gray-200">
      {/* Banner */}
      <div className="banner text-center py-8">
        <h1 className="text-3xl text-white font-semibold">SpaceX Rockets</h1>
      </div>

      {/* Search Input */}
      <div className="p-4 text-center">
        <input
          type="text"
          placeholder="Search Rockets"
          className="border border-gray-300 p-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Rocket List */}
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {filteredRockets.map((rocket) => (
          <li key={rocket.id} className="rocket-card p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-red-500 text-xl font-semibold">{rocket.rocket_name}</h2>
              <p className="text-gray-700">Country: {rocket.country}</p>
              <p className="text-gray-700">Description: {rocket.description}</p>
              <a
                href={rocket.wikipedia}
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More on Wikipedia
              </a>
            </div>
            <div className="mt-auto">
              <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
