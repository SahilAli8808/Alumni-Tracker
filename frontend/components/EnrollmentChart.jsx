import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';

const EnrollmentChart = ({ onDateClick }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('Bar'); // Default to Bar chart

  useEffect(() => {
    fetch('http://localhost:5000/api/alumni/enrollment-dates')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          ...item,
          formattedDate: format(new Date(item._id), 'dd MMM yyyy')
        }));
        setData(formattedData);
      });
  }, []);

  const handleClick = (data) => {
    if (data && data._id) {
      // Pass the date in the format yyyy-MM-dd
      const date = new Date(data._id).toISOString().split('T')[0];
      onDateClick(date);
    }
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    if (chartType === 'Bar') {
      return (
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" onClick={handleClick} />
        </BarChart>
      );
    } else if (chartType === 'Line') {
      return (
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" onClick={handleClick} />
        </LineChart>
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="chartType">Select Chart Type: </label>
        <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>
      {renderChart()}
    </div>
  );
};

export default EnrollmentChart;
