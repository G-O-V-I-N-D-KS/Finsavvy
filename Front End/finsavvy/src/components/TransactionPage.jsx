import React, { useState,useEffect } from 'react';
import '../styles/TransactionPage.css'
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

const TransactionPage = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [transactions, setTransactions] = useState([]);


  // Define a function to filter data based on selected time period
  const filterDataByPeriod = (period) => {
    const currentDate = new Date();
    const filteredData = transactions.filter((item) => {
      const itemDate = new Date(item.date);

      switch (period) {
        case 'today':
          return itemDate.toDateString() === currentDate.toDateString();
        case 'yesterday':
          const yesterday = new Date(currentDate);
          yesterday.setDate(currentDate.getDate() - 1);
          return itemDate.toDateString() === yesterday.toDateString();
        case 'thisMonth':
          return itemDate.getMonth() === currentDate.getMonth();
        default:
          return true; // For 'other' period, return all data
      }
    });

    return filteredData;
  };

  // Handle change in selected period
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Get filtered data based on selected period
  const filteredData = filterDataByPeriod(selectedPeriod);

  // Sort filtered data by Date field
  filteredData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (id && token) {
          const config = { headers: { Authorization: token } };
          const date = new Date().toISOString().slice(0, 7);

          const response = await axios.get(`http://localhost:3000/api/${id}/transactions?condition=15&month=${date}`, config);

          if (response.status === 200) {
            setTransactions(response.data.data); // Accessing response.data.data
          } else {
            console.error('Failed to fetch transactions');
          }
        } else {
          console.error('User ID or token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to execute only once on component mount

  return (
    <div className="TransactionPage">
      <Sidebar />
      <Header />
      <div className="tttt">
        {/* Period selection dropdown */}
        <label>Select Period: </label>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="thisMonth">This Month</option>
          <option value="other">Other</option>
        </select>
        {/* Render table with filtered and sorted data */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          {filteredData.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.merchant}</td> {/* Using merchant instead of Name */}
                <td>{transaction.date}</td> {/* Using date instead of Date */}
                <td>{transaction.amount}</td> {/* Using amount instead of Amount */}
                <td>{transaction.nature}</td> {/* Using nature instead of Status */}
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default TransactionPage;
