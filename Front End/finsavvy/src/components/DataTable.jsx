import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DataTable.css';

const DataTable = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (id && token) {
          const config = { headers: { Authorization: token } };
          const date = new Date().toISOString().slice(0, 7);

          const response = await axios.get(`http://localhost:3000/api/${id}/transactions?condition=4&month=${date}`, config);

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
    <div className='transaction'>
      <p><b>Transaction</b></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.merchant}</td> {/* Using merchant instead of Name */}
              <td>{transaction.date}</td> {/* Using date instead of Date */}
              <td>{transaction.amount}</td> {/* Using amount instead of Amount */}
              <td>{transaction.nature}</td> {/* Using nature instead of Status */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
