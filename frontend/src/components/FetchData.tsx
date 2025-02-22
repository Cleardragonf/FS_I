import React, { useState, useEffect } from 'react';
import api from '../api';  // Import the Axios instance we just created

interface Data {
  id: number;
  message: string;
}

const FetchData: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/your-endpoint');  // Replace with your actual endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {data ? (
        <div>
          <p>ID: {data.id}</p>
          <p>Message: {data.message}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default FetchData;
