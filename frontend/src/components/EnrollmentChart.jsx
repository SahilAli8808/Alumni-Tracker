import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';

const EnrollmentChart = ({ onDateClick }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('Area'); // Default to Bar chart

  useEffect(() => {
    axios.get('http://localhost:5000/api/alumni/enrollment-dates')
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item,
          formattedDate: format(new Date(item._id), 'dd MMM yyyy'),
        }));

        // Sort the data by date
        formattedData.sort((a, b) => new Date(a._id) - new Date(b._id));
        setData(formattedData);
      })
      .catch(error => {
        toast.error("There was an error fetching the data!")
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleClick = (data) => {
    if (data && data._id) {
      const date = new Date(data._id).toISOString().split('T')[0];
      onDateClick(date); // Pass the selected date to the parent component
    }
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    // toast.success("Chart Rendered Successfully!")
    if (chartType === 'Bar') {
      return (
        <BarChart width={500} height={250} data={data}>
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" onClick={handleClick} />
        </BarChart>
      );
    } else if (chartType === 'Line') {
      return (
        <LineChart width={500} height={250} data={data}>
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" onClick={handleClick} />
        </LineChart>
      );
    } else if (chartType === 'Area') {
      return (
        <AreaChart width={500} height={250} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            onClick={handleClick}
          />
        </AreaChart>
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
          <option value="Area">Area Chart</option>
        </select>
      </div>
      {renderChart()}
    </div>
  );
};

export default EnrollmentChart;
