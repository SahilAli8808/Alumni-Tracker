import React, { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Badge, Box, Button, Callout, Card, Text } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

const EmploymentStatusChart = ({ selectedDate }) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      axios.get(`http://localhost:5000/api/alumni/employment-status/${selectedDate}`)
        .then(response => {
          console.log("response is:", response);
          const rawData = response.data;
          setData(rawData);

          // Transform data for bar chart
          const industries = [...new Set(rawData.map(item => item.industry))];
          const transformedData = industries.map(industry => {
            const employed = rawData.find(d => d.industry === industry && d.employment_status === "Employed");
            const unemployed = rawData.find(d => d.industry === industry && d.employment_status === "UnEmployed");
            return {
              industry,
              Employed: employed ? employed.count : 0,
              UnEmployed: unemployed ? unemployed.count : 0
            };
          });

          setChartData(transformedData);
        })
        .catch(error => console.error('Error fetching employment status:', error));
    }
  }, [selectedDate]);

  return (
    <div>
      <h2 className='mb-2'>Employment Status for : <Badge color="green">{selectedDate && format(selectedDate, "dd MMM yyyy")}</Badge></h2>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis allowDecimals={false} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Employed" fill="#82ca9d" />
              <Bar dataKey="UnEmployed" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        // <p>Click on the date to see the Employed Status</p>
        <Callout.Root>
  <Callout.Icon>
    <InfoCircledIcon />
  </Callout.Icon>
  <Callout.Text>
    Click on the date to see the Employed Status
  </Callout.Text>
</Callout.Root>
      )}
    </div>
  );
};

export default EmploymentStatusChart;
