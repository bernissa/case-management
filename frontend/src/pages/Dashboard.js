import React from 'react';
import '../styles.css';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import total from '../assets/solar_archive-linear.svg';
import ridehailingicon from '../assets/mingcute_car-line.svg';
import deliveryicon from '../assets/solar_delivery-outline.svg';
import accidenticon from '../assets/hugeicons_accident.svg';
import pendingicon from '../assets/mingcute_time-line.svg';
import resolvedicon from '../assets/hugeicons_tick-01.svg';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

// Convert '25/3/2025' to Date object
const parseEffectDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
};

// Get weekday abbreviation
const getWeekday = (dateStr) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = parseEffectDate(dateStr);
  return days[date.getDay()];
};

// Group by weekday from effectDate field
const getWeeklyCaseCounts = (caseList) => {
  const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  caseList.forEach(item => {
    if (isInCurrentWeek(item.effectDate)) {
      const day = getWeekday(item.effectDate);
      counts[day]++;
    }
  });

  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    name: day,
    cases: counts[day]
  }));
};


const getStartOfWeek = (date = new Date()) => {
  const day = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const diff = day === 0 ? -6 : 1 - day; // if Sunday, go back 6 days; else to Monday
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0); // reset time
  return monday;
};

const isInCurrentWeek = (dateStr) => {
  const effectDate = parseEffectDate(dateStr);
  const startOfWeek = getStartOfWeek();
  return effectDate >= startOfWeek;
};


export default function Dashboard() {
  const [caseList, setCaseList] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cases');
        setCaseList(response.data);
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    };

    fetchCases();
  }, []);

  const totalCases = caseList.length;


  const caseTypeCounts = caseList.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = caseList.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  // Create data array for Pie Chart
  const caseTypeData = Object.entries(caseTypeCounts).map(([name, value]) => ({ name, value }));

  const weeklyData = getWeeklyCaseCounts(caseList);

  const weekdayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sortedWeeklyData = weekdayOrder.map(day => weeklyData.find(d => d.name === day) || { name: day, cases: 0 });



  return (
    <div className="dashboard-container">
      <div className="grid-item xlarge">
        <h3>Current Statistics</h3>
      </div>

      <div className="grid-item">
        <img src={total} alt="total" className='grid-item-icon' />
        <div className='grid-item-value'>{totalCases}</div>
        <div className='grid-item-title'>Total Cases</div>
      </div>
      <div className="grid-item">
        <img src={ridehailingicon} alt="ridehailing" className='grid-item-icon' />
        <div className='grid-item-value'>{caseTypeCounts['Ride-Hailing'] || 0}</div>
        <div className='grid-item-title'>Ride-Hailing</div>
      </div>
      <div className="grid-item">
        <img src={deliveryicon} alt="delivery" className='grid-item-icon' />
        <div className='grid-item-value'>{caseTypeCounts['Delivery'] || 0}</div>
        <div className='grid-item-title'>Delivery</div>
      </div>
      <div className="grid-item">
        <img src={accidenticon} alt="accident" className='grid-item-icon' />
        <div className='grid-item-value'>{caseTypeCounts['Accident'] || 0}</div>
        <div className='grid-item-title'>Accident</div>
      </div>
      <div className="grid-item">
        <img src={pendingicon} alt="pending" className='grid-item-icon' />
        <div className='grid-item-value'>{statusCounts['Pending'] || 0}</div>
        <div className="grid-item-title">Pending</div>
      </div>
      <div className="grid-item">
        <img src={resolvedicon} alt="resolved" className='grid-item-icon' />
        <div className='grid-item-value'>{statusCounts['Resolved'] || 0}</div>
        <div className="grid-item-title">Resolved</div>
      </div>

      {/* Bar Chart */}
      <div className="grid-item half-width">
        <div className='grid-item-title'>Weekly Case Report</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sortedWeeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cases" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="grid-item half-width">
        <div className='grid-item-title'>Case Type Distribution</div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={caseTypeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {caseTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="grid-item full-width">
        <h3>Cases Over the Week</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sortedWeeklyData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cases" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
