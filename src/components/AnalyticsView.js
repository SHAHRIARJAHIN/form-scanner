import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import PieChart from './charts/ChartPie';
import BarChart from './charts/ChartBar';


export default function AnalyticsView() {
  const [stats, setStats] = useState({
    total: 0,
    byStatus: [],
    byFaculty: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Get total forms
    const { count: total } = await supabase
      .from('forms')
      .select('*', { count: 'exact' });

    // Get forms by status
    const { data: byStatus } = await supabase
      .from('forms')
      .select('status, count(*)')
      .group('status');

    // Get forms by faculty
    const { data: byFaculty } = await supabase
      .from('forms')
      .select('form_data->faculty, count(*)')
      .group('form_data->faculty');

    setStats({
      total,
      byStatus: byStatus || [],
      byFaculty: byFaculty || []
    });
  };

  return (
    <div className="analytics-container">
      <div className="stat-cards">
        <div className="stat-card">
          <h3>Total Forms</h3>
          <p>{stats.total}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h4>Forms by Status</h4>
          <PieChart 
            data={stats.byStatus.map(item => ({
              label: item.status,
              value: item.count
            }))}
          />
        </div>

        <div className="chart-container">
          <h4>Forms by Faculty</h4>
          <BarChart 
            data={stats.byFaculty.map(item => ({
              label: item.faculty || 'Unknown',
              value: item.count
            }))}
          />
        </div>
      </div>
    </div>
  );
}