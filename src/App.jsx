import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';

// --- MOCK DATABASE ---
const mockDatabase = {
  overview: {
    "Last 30 Days": {
      "All Cities": [
        { name: 'Day 1', revenue: 1200 }, { name: 'Day 10', revenue: 1100 },
        { name: 'Day 20', revenue: 1700 }, { name: 'Day 30', revenue: 2300 }
      ],
      "City 1": [ { name: 'D1', revenue: 500 }, { name: 'D30', revenue: 1200 } ],
      "City 2": [ { name: 'D1', revenue: 700 }, { name: 'D30', revenue: 1100 } ]
    },
    "Last 6 Months": { "All Cities": [] }, // Fill if needed
    "Last Year": { "All Cities": [] }      // Fill if needed
  },
  
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
    ]
  },
  
  topProducts: [
    { name: 'Running Shoes', sales: 1200, revenue: '$45k' },
    { name: 'Leather Bag', sales: 850, revenue: '$32k' },
    { name: 'Winter Jacket', sales: 600, revenue: '$28k' },
    { name: 'Smart Watch', sales: 500, revenue: '$25k' },
    { name: 'Sunglasses', sales: 450, revenue: '$15k' },
    { name: 'Sports Cap', sales: 300, revenue: '$5k' },
  ],

  operations: {
    seasonalTrends: [
      { name: 'Winter', demand: 65 },
      { name: 'Spring', demand: 85 },
      { name: 'Summer', demand: 120 },
      { name: 'Autumn', demand: 90 },
    ]
  },

  customer: {
    // Pie Chart Data
    newVsReturning: [
      { name: 'New Customers', value: 400 },
      { name: 'Returning', value: 800 },
    ],
    // CLV Trend Line Data
    clvTrend: [
      { name: 'Jan', value: 120 }, { name: 'Feb', value: 125 },
      { name: 'Mar', value: 130 }, { name: 'Apr', value: 128 },
      { name: 'May', value: 140 }, { name: 'Jun', value: 155 },
    ],
    // Market Basket Data
    marketBasket: [
      { item1: 'Shoes', item2: 'Socks', freq: '85%' },
      { item1: 'Phone', item2: 'Case', freq: '70%' },
      { item1: 'Coffee', item2: 'Sugar', freq: '65%' },
      { item1: 'Shirt', item2: 'Tie', freq: '50%' },
      { item1: 'Laptop', item2: 'Mouse', freq: '45%' },
    ]
  }
};

// Colors for Pie Chart
const PIE_COLORS = ['#2B4ACB', '#93a9ff']; // Dark Blue, Light Blue

// --- NAVIGATION ---
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
          </select>
          <select className="dropdown" value={city} onChange={(e) => setCity(e.target.value)}>
            <option>All Cities</option>
            <option>City 1</option>
          </select>
        </div>
      </div>
      <h2 className="section-title">OVERVIEW</h2>
      <div className="kpi-container">
        <div className="kpi-card"><div className="kpi-badge">12.5L</div><div className="kpi-label">TOTAL REVENUE</div></div>
        <div className="kpi-card"><div className="kpi-badge">450</div><div className="kpi-label">TOTAL ORDERS</div></div>
        <div className="kpi-card"><div className="kpi-badge">85%</div><div className="kpi-label">GROWTH RATE</div></div>
      </div>
      <div className="graph-section">
        <div className="graph-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
              <XAxis dataKey="name" stroke="#2B4ACB" />
              <YAxis stroke="#2B4ACB" />
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
  const chartData = mockDatabase.commercial[selectedCity] || [];
  const productList = mockDatabase.topProducts;

  return (
    <div className="container">
      <div className="header"><div className="logo">PINGU</div></div>
      <h2 className="section-title">COMMERCIAL ANALYTICS</h2>
      <div className="split-layout">
        <div className="panel-left">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, color: '#2B4ACB', fontSize: '1.2rem' }}>MONTHLY REVENUE</h3>
            <select className="dropdown" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option>All Cities</option>
              <option>New York</option>
            </select>
          </div>
          <div className="chart-container" style={{border: 'none', padding: 0}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
                <XAxis dataKey="name" stroke="#2B4ACB" />
                <YAxis stroke="#2B4ACB" />
                <Tooltip cursor={{fill: '#f0f0f0'}} contentStyle={{ borderRadius: '8px', border: '2px solid #2B4ACB' }}/>
                <Bar dataKey="revenue" fill="#2B4ACB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel-right">
          <h3 style={{ margin: '0 0 15px 0', color: '#2B4ACB', textAlign: 'center', borderBottom: '2px solid #2B4ACB', paddingBottom: '10px', fontSize: '1.2rem' }}>TOP PRODUCTS</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {productList.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info"><div className="product-name">{product.name}</div><div className="product-sales">{product.sales} sold</div></div>
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

// --- PAGE 3: OPERATIONS ---
const Operations = () => {
  const seasonalData = mockDatabase.operations.seasonalTrends;

  return (
    <div className="container">
      <div className="header"><div className="logo">PINGU</div></div>
      <h2 className="section-title">OPERATIONS & INVENTORY</h2>
      <div className="kpi-container">
        <div className="kpi-card">
          <div className="kpi-badge">4.2</div>
          <div className="kpi-label">INVENTORY TURNOVER RATIO</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-badge">2.5 Days</div>
          <div className="kpi-label">AVERAGE DELIVERY TIME</div>
        </div>
      </div>
      <div className="graph-section">
        <h3 style={{ color: '#2B4ACB', marginBottom: '5px', fontSize: '1rem', textAlign: 'center' }}>
          SEASONAL DEMAND TRENDS
        </h3>
        <div className="graph-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
              <XAxis dataKey="name" stroke="#2B4ACB" />
              <YAxis stroke="#2B4ACB" />
              <Tooltip cursor={{fill: '#f0f0f0'}} contentStyle={{ borderRadius: '8px', border: '2px solid #2B4ACB' }}/>
              <Bar dataKey="demand" fill="#2B4ACB" radius={[4, 4, 0, 0]} barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

// --- PAGE 4: CUSTOMER (NEW!) ---
const Customer = () => {
  const { newVsReturning, clvTrend, marketBasket } = mockDatabase.customer;

  return (
    <div className="container">
      <div className="header"><div className="logo">PINGU</div></div>
      <h2 className="section-title">CUSTOMER INSIGHTS</h2>

      <div className="split-layout">
        
        {/* LEFT PANEL: GRAPHS */}
        <div className="panel-left">
          
          {/* 1. PIE CHART (Top Half) */}
          <div className="chart-container">
            <h3 style={{ margin: '0 0 10px 0', color: '#2B4ACB', fontSize: '1rem' }}>NEW VS RETURNING</h3>
            <div style={{flexGrow: 1}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={newVsReturning}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {newVsReturning.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="middle" align="right" layout="vertical" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. CLV LINE CHART (Bottom Half) */}
          <div className="chart-container">
            <h3 style={{ margin: '0 0 10px 0', color: '#2B4ACB', fontSize: '1rem' }}>AVG CUSTOMER LIFETIME VALUE (TREND)</h3>
            <div style={{flexGrow: 1}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clvTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
                  <XAxis dataKey="name" stroke="#2B4ACB" />
                  <YAxis stroke="#2B4ACB" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '2px solid #2B4ACB' }} />
                  <Line type="monotone" dataKey="value" stroke="#2B4ACB" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: MARKET BASKET */}
        <div className="panel-right">
          <h3 style={{ margin: '0 0 15px 0', color: '#2B4ACB', textAlign: 'center', borderBottom: '2px solid #2B4ACB', paddingBottom: '10px', fontSize: '1.2rem' }}>
            MARKET BASKET
          </h3>
          <p style={{fontSize: '0.8rem', textAlign: 'center', color: '#666', marginBottom: '20px'}}>
            Items frequently bought together
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {marketBasket.map((combo, index) => (
              <div key={index} className="product-item">
                <div className="product-rank" style={{fontSize: '1rem'}}>#{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{combo.item1} & {combo.item2}</div>
                  <div className="combo-tag">Bought together {combo.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Navigation />
    </div>
  );
};

// --- ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;