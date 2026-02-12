import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- MOCK DATABASE ---
const mockDatabase = {
  "Last 30 Days": {
    "All Cities": [
      { name: 'Day 1', revenue: 1200 }, { name: 'Day 5', revenue: 1500 },
      { name: 'Day 10', revenue: 1100 }, { name: 'Day 15', revenue: 1800 },
      { name: 'Day 20', revenue: 1700 }, { name: 'Day 25', revenue: 2100 },
      { name: 'Day 30', revenue: 2300 }
    ],
    "City 1": [ 
      { name: 'D1', revenue: 500 }, { name: 'D15', revenue: 900 }, { name: 'D30', revenue: 1200 } 
    ],
    "City 2": [ 
      { name: 'D1', revenue: 700 }, { name: 'D15', revenue: 900 }, { name: 'D30', revenue: 1100 } 
    ]
  },
  "Last 6 Months": {
    "All Cities": [
      { name: 'Aug', revenue: 45000 }, { name: 'Sep', revenue: 48000 },
      { name: 'Oct', revenue: 51000 }, { name: 'Nov', revenue: 49000 },
      { name: 'Dec', revenue: 62000 }, { name: 'Jan', revenue: 58000 }
    ],
    "City 1": [ 
      { name: 'Aug', revenue: 20000 }, { name: 'Jan', revenue: 25000 } 
    ],
    "City 2": [ 
      { name: 'Aug', revenue: 25000 }, { name: 'Jan', revenue: 33000 } 
    ]
  },
  "Last Year": {
    "All Cities": [
      { name: 'Q1', revenue: 120000 }, { name: 'Q2', revenue: 135000 },
      { name: 'Q3', revenue: 140000 }, { name: 'Q4', revenue: 180000 }
    ],
    "City 1": [ 
      { name: 'Q1', revenue: 50000 }, { name: 'Q4', revenue: 80000 } 
    ],
    "City 2": [ 
      { name: 'Q1', revenue: 70000 }, { name: 'Q4', revenue: 100000 } 
    ]
  }
};

// --- NAVIGATION COMPONENT ---
const Navigation = () => {
  const location = useLocation();
  const activeStyle = { borderBottom: '3px solid #2B4ACB' };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={location.pathname === '/' ? activeStyle : {}}>Overview</Link>
      <Link to="/commercial" className="nav-link" style={location.pathname === '/commercial' ? activeStyle : {}}>Commercial</Link>
      <Link to="/operations" className="nav-link" style={location.pathname === '/operations' ? activeStyle : {}}>Operations</Link>
      <Link to="/customer" className="nav-link" style={location.pathname === '/customer' ? activeStyle : {}}>Customer</Link>
    </nav>
  );
};

// --- PAGE 1: OVERVIEW (NO SCROLL) ---
const Overview = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [city, setCity] = useState('All Cities');

  const currentData = useMemo(() => {
    return mockDatabase[dateRange]?.[city] || [];
  }, [dateRange, city]);

  return (
    <div className="container">
      {/* 1. HEADER & CONTROLS */}
      <div className="header">
        <div className="logo">PINGU</div>
        <div className="controls">
          <select className="dropdown" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          <select className="dropdown" value={city} onChange={(e) => setCity(e.target.value)}>
            <option>All Cities</option>
            <option>City 1</option>
            <option>City 2</option>
          </select>
        </div>
      </div>

      {/* 2. TITLE */}
      <h2 className="section-title">OVERVIEW</h2>

      {/* 3. KPI CARDS */}
      <div className="kpi-container">
        <div className="kpi-card">
          <div className="kpi-badge">12.5L</div>
          <div className="kpi-label">TOTAL REVENUE</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-badge">450</div>
          <div className="kpi-label">TOTAL ORDERS</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-badge">85%</div>
          <div className="kpi-label">GROWTH RATE</div>
        </div>
      </div>

      {/* 4. GRAPH (Fills remaining space) */}
      <div className="graph-section">
        <h3 style={{ color: '#2B4ACB', marginBottom: '5px', fontSize: '1rem', textAlign: 'center' }}>
          REVENUE TREND
        </h3>
        <div className="graph-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
              <XAxis dataKey="name" stroke="#2B4ACB" tick={{fill: '#2B4ACB'}} />
              <YAxis stroke="#2B4ACB" tick={{fill: '#2B4ACB'}} />
              <Tooltip cursor={{fill: '#f0f0f0'}} contentStyle={{ borderRadius: '8px', border: '2px solid #2B4ACB' }}/>
              <Bar dataKey="revenue" fill="#2B4ACB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

// --- PLACEHOLDER PAGES (Kept simple for consistency) ---
const PlaceholderPage = ({ title }) => (
  <div className="container">
    <div className="header"><div className="logo">PINGU</div></div>
    <h2 className="section-title">{title}</h2>
    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #2B4ACB', marginBottom: '80px', background: 'white' }}>
      <p style={{ color: '#2B4ACB', fontWeight: 'bold' }}>{title} Content Goes Here</p>
    </div>
    <Navigation />
  </div>
);

// --- MAIN APP ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/commercial" element={<PlaceholderPage title="COMMERCIAL ANALYTICS" />} />
        <Route path="/operations" element={<PlaceholderPage title="OPERATIONS & INVENTORY" />} />
        <Route path="/customer" element={<PlaceholderPage title="CUSTOMER INSIGHTS" />} />
      </Routes>
    </Router>
  );
}

export default App;