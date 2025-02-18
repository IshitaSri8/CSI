import React from "react";
import { getScoreColor } from "./scoreColor"; // Assuming this function returns color based on score
import { MeterGroup } from "primereact/metergroup";

const GroupedMeterBar = ({ score }) => {
  const scoreRanges = [
    { label: 'Excellent', min: 90, max: 100 },
    { label: 'Good', min: 80, max: 89 },
    { label: 'Average', min: 60, max: 79 },
    { label: 'Poor', min: 40, max: 59 },
    { label: 'Very Poor', min: 20, max: 39 },
    { label: 'Critical', min: 0, max: 19 },
  ];

  // Create meterItems based on scoreRanges and getScoreColor
  const meterItems = scoreRanges.map(range => ({
    label: range.label,
    value: (score >= range.min && score <= range.max) ? score : range.max,
    color1: getScoreColor(range.max), // Use getScoreColor to determine color
    icon: 'pi pi-check' // You can customize icons as needed
  }));

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Performance Meter</h2>
      <MeterGroup 
        value={meterItems} 
        orientation="vertical" 
        labelPosition="start" 
        labelOrientation="vertical" 
        style={{ height: '300px' }} 
      />
    </div>
  );
};

export default GroupedMeterBar;
