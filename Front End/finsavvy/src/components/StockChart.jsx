import React, { useState, useEffect } from 'react';
import '../styles/StockChart.css';

const StockChart = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stock');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        // Extract only the first 4 stock items
        const slicedData = data.topStocks.slice(0, 4);
        // Update state with sliced and formatted data
        setStockData(slicedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div className='stock'>
      <h6><b>Top 4 Stocks</b></h6>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.change}</td>
              {/* Display changesPercentage formatted to 2 decimal places */}
              <td>{stock.changesPercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockChart;
