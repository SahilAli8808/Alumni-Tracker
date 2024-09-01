import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const EmploymentStatusChart = ({ selectedDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`http://localhost:5000/api/alumni/employment-status/${selectedDate}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching employment status:', error));
    }
  }, [selectedDate]);

  return (
    <div>
      <h2>Employment Status for {selectedDate}</h2>
      {data.length > 0 ? (
        <PieChart width={500} height={250}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="industry"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available for the selected date.</p>
      )}
    </div>
  );
};

export default EmploymentStatusChart;
