import React, { useState } from 'react';
import '@radix-ui/themes/styles.css';
import EnrollmentChart from '../components/EnrollmentChart';
import EmploymentStatusChart from '../components/EmploymentStatusChart';
import BulkImport from '../components/BulkImport';
import { Flex, Text, Button, Badge } from '@radix-ui/themes';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Alumni Tracker</h1>
      <EnrollmentChart onDateClick={handleDateClick} />
      {selectedDate && <EmploymentStatusChart selectedDate={selectedDate} />}
      <h2>Bulk Import Alumni Data</h2>
      <BulkImport />
      <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
      <Text weight="bold">Bold</Text>
      <Flex gap="2">
  <Badge color="orange">In progress</Badge>
  <Badge color="blue">In review</Badge>
  <Badge color="green">Complete</Badge>
</Flex>
    </Flex>
    </div>
  );
}

export default App;
