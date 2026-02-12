import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- MOCK DATABASE ---
const mockDatabase = {
  // 1. DATA FOR OVERVIEW PAGE
  overview: {
    "Last 30 Days": {
      "All Cities": [
        { name: 'Day 1', revenue: 1200 }, { name: 'Day 5', revenue: 1500 },
        { name: 'Day 10', revenue: 1100 }, { name: 'Day 15', revenue: 1800 },
        { name: 'Day 20', revenue: 1700 }, { name: 'Day 25', revenue: 2100 },
        { name: 'Day 30', revenue: 2300 }
      ],
      "City 1": [ { name: 'D1', revenue: 500 }, { name: 'D15', revenue: 900 }, { name: 'D30', revenue: 1200 } ],
      "City 2": [ { name: 'D1', revenue: 700 }, { name: 'D15', revenue: 900 }, { name: 'D30', revenue: 1100 } ]
    },
    "Last 6 Months": {
      "All Cities": [
        { name: 'Aug', revenue: 45000 }, { name: 'Sep', revenue: 48000 },
        { name: 'Oct', revenue: 51000 }, { name: 'Nov', revenue: 49000 },
        { name: 'Dec', revenue: 62000 }, { name: 'Jan', revenue: 58000 }
      ],
      "City 1": [ { name: 'Aug', revenue: 20000 }, { name: 'Jan', revenue: 25000 } ],
      "City 2": [ { name: 'Aug', revenue: 25000 }, { name: 'Jan', revenue: 33000 } ]
    },
    "Last Year": {
      "All Cities": [
        { name: 'Q1', revenue: 120000 }, { name: 'Q2', revenue: 135000 },
        { name: 'Q3', revenue: 140000 }, { name: 'Q4', revenue: 180000 }
      ],
      "City 1": [ { name: 'Q1', revenue: 50000 }, { name: 'Q4', revenue: 80000 } ],
      "City 2": [ { name: 'Q1', revenue: 70000 }, { name: 'Q4', revenue: 100000 } ]
    }
  },
  
  // 2. DATA FOR COMMERCIAL PAGE
  commercial: {
    "All Cities": [
      { name: 'Jan', revenue: 45000 }, { name: 'Feb', revenue: 52000 },
      { name: 'Mar', revenue: 48000 }, { name: 'Apr', revenue: 61000 },
      { name: 'May', revenue: 55000 }, { name: 'Jun', revenue: 67000 }
    ],
    "New York": [
      { name: 'Jan', revenue: 20000 }, { name: 'Feb', revenue: 22000 },
      { name: 'Mar', revenue: 19000 }, { name: 'Apr', revenue: 25000 },
      { name: 'May', revenue: 23000 }, { name: 'Jun', revenue: 30000 }
    ],
    "London": [
      { name: 'Jan', revenue: 15000 }, { name: 'Feb', revenue: 18000 },
      { name: 'Mar', revenue: 16000 }, { name: 'Apr', revenue: 21000 },
      { name: 'May', revenue: 19000 }, { name: 'Jun', revenue: 24000 }
    ],
    "Mumbai": [
      { name: 'Jan', revenue: 10000 }, { name: 'Feb', revenue: 12000 },
      { name: 'Mar', revenue: 13000 }, { name: 'Apr', revenue: 15000 },
      { name: 'May', revenue: 13000 }, { name: 'Jun', revenue: 13000 }
    ]
  },
  
  // 3. TOP PRODUCTS DATA
  topProducts: [
    { name: 'Running Shoes', sales: 1200, revenue: '$45k' },
    { name: 'Leather Bag', sales: 850, revenue: '$32k' },
    { name: 'Winter Jacket', sales: 600, revenue: '$28k' },
    { name: 'Smart Watch', sales: 500, revenue: '$25k' },
    { name: 'Sunglasses', sales: 450, revenue: '$15k' },
    { name: 'Sports Cap', sales: 300, revenue: '$5k' },
    { name: 'Yoga Mat', sales: 250, revenue: '$4k' },
    { name: 'Water Bottle', sales: 200, revenue: '$2k' },
  ]
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

// --- PAGE 1: OVERVIEW ---
const Overview = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [city, setCity] = useState('All Cities');

  const currentData = useMemo(() => {
    return mockDatabase.overview[dateRange]?.[city] || [];
  }, [dateRange, city]);

  return (
    <div className="container">
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

      <h2 className="section-title">OVERVIEW</h2>

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

// --- PAGE 2: COMMERCIAL ---
const Commercial = () => {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  
  // Get data based on dropdown selection
  const chartData = mockDatabase.commercial[selectedCity] || [];
  const productList = mockDatabase.topProducts;

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="logo">PINGU</div>
      </div>

      <h2 className="section-title">COMMERCIAL ANALYTICS</h2>

      {/* Split Layout: Graph on Left, List on Right */}
      <div className="split-layout">
        
        {/* LEFT PANEL: BAR GRAPH */}
        <div className="panel-left">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#2B4ACB', fontSize: '1.2rem' }}>MONTHLY REVENUE</h3>
            
            {/* The "City-wise" Dropdown */}
            <select 
              className="dropdown" 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option>All Cities</option>
              <option>New York</option>
              <option>London</option>
              <option>Mumbai</option>
            </select>
          </div>

          {/* The Graph */}
          <div style={{ flexGrow: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
                <XAxis dataKey="name" stroke="#2B4ACB" tick={{fill: '#2B4ACB'}} />
                <YAxis stroke="#2B4ACB" tick={{fill: '#2B4ACB'}} />
                <Tooltip 
                  cursor={{fill: '#f0f0f0'}} 
                  contentStyle={{ borderRadius: '8px', border: '2px solid #2B4ACB' }}
                />
                <Bar dataKey="revenue" fill="#2B4ACB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT PANEL: TOP PRODUCTS LIST */}
        <div className="panel-right">
          <h3 style={{ margin: '0 0 15px 0', color: '#2B4ACB', textAlign: 'center', borderBottom: '2px solid #2B4ACB', paddingBottom: '10px', fontSize: '1.2rem' }}>
            TOP PRODUCTS
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {productList.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-sales">{product.sales} sold</div>
                </div>
                <div className="product-revenue">{product.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

// --- PLACEHOLDER PAGES ---
const PlaceholderPage = ({ title }) => (
  <div className="container">
    <div className="header"><div className="logo">PINGU</div></div>
    <h2 className="section-title">{title}</h2>
    <div style={{ flexGrow: 1, border: '2px dashed #2B4ACB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '80px', background: 'white' }}>
      <p style={{ color: '#2B4ACB' }}>{title} Content</p>
    </div>
    <Navigation />
  </div>
);

// --- ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/operations" element={<PlaceholderPage title="OPERATIONS" />} />
        <Route path="/customer" element={<PlaceholderPage title="CUSTOMER INSIGHTS" />} />
      </Routes>
    </Router>
  );
}

export default App;