import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [programPerformance, setProgramPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, performanceRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getProgramPerformance()
      ]);
      setStats(statsRes.data);
      setProgramPerformance(performanceRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="loading">No data available</div>;
  }

  const statusData = Object.entries(stats.enrollments_by_status).map(([name, value]) => ({
    name,
    value
  }));

  const programTypeData = Object.entries(stats.enrollments_by_program_type).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#dc143c', '#ff6b6b', '#b22222', '#c0392b', '#e74c3c'];

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to Iron Lady Participant Tracking System</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={28} />
          </div>
          <div className="stat-details">
            <h3>Active Participants</h3>
            <p>{stats.total_participants.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <BookOpen size={28} />
          </div>
          <div className="stat-details">
            <h3>Active Programs</h3>
            <p>{stats.active_programs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <TrendingUp size={28} />
          </div>
          <div className="stat-details">
            <h3>Total Enrollments</h3>
            <p>{stats.total_enrollments.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <Award size={28} />
          </div>
          <div className="stat-details">
            <h3>Completion Rate</h3>
            <p>{stats.completion_rate}%</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Enrollment Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#dc143c"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Enrollments by Program Type</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#dc143c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Performance */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Program Performance</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Type</th>
                <th>Enrollments</th>
                <th>Avg Progress</th>
                <th>Avg Attendance</th>
                <th>Completions</th>
              </tr>
            </thead>
            <tbody>
              {programPerformance.map((program, idx) => (
                <tr key={idx}>
                  <td><strong>{program.program_name}</strong></td>
                  <td>{program.program_type}</td>
                  <td>{program.total_enrollments}</td>
                  <td>
                    <span style={{ 
                      color: program.avg_progress >= 75 ? '#8b0000' : program.avg_progress >= 50 ? '#dc143c' : '#ff6b6b',
                      fontWeight: '600'
                    }}>
                      {program.avg_progress}%
                    </span>
                  </td>
                  <td>{program.avg_attendance}%</td>
                  <td>{program.completions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Enrollments</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Program</th>
                <th>Enrolled Date</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td><strong>{enrollment.full_name}</strong></td>
                  <td>{enrollment.program_name}</td>
                  <td>{new Date(enrollment.enrollment_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${enrollment.status.toLowerCase().replace(' ', '-')}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td>{enrollment.overall_progress_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
