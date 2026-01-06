// src/contexts/BusContext.jsx
import React, { createContext, useState, useContext } from 'react';

const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to search for buses with loading state
  const searchBuses = async (params) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - replace with actual API call
      const mockBuses = [
        {
          id: 1,
          from: params.from,
          to: params.to,
          Departure_Time: '08:00 AM',
          Price: '₹450',
          Bus_Type: 'AC Sleeper',
          Total_Distance: '250 KM',
          Via: 'Panipat, Karnal'
        },
        {
          id: 2,
          from: params.from,
          to: params.to,
          Departure_Time: '10:30 AM',
          Price: '₹350',
          Bus_Type: 'Non-AC Seater',
          Total_Distance: '250 KM',
          Via: 'Direct'
        },
        {
          id: 3,
          from: params.from,
          to: params.to,
          Departure_Time: '02:00 PM',
          Price: '₹550',
          Bus_Type: 'Volvo AC',
          Total_Distance: '250 KM',
          Via: 'Sonipat, Panipat'
        }
      ];
      
      setBuses(mockBuses);
      setSearchParams(params);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setBuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearBuses = () => {
    setBuses([]);
    setSearchParams(null);
  };

  return (
    <BusContext.Provider value={{ 
      buses, 
      searchParams, 
      isLoading,
      searchBuses, 
      clearBuses 
    }}>
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => useContext(BusContext);