// src/components/AnalyticsDashboard.js
const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
  
    useEffect(() => {
      const fetchStats = async () => {
        // Total forms
        const { count: total } = await supabase
          .from('forms')
          .select('*', { count: 'exact' });
  
        // Forms by status
        const { data: byStatus } = await supabase
          .from('forms')
          .select('status')
          .group('status');
  
        // Forms by faculty
        const { data: byFaculty } = await supabase
          .rpc('get_forms_by_faculty'); // Requires a PostgreSQL function
  
        setStats({ total, byStatus, byFaculty });
      };
      fetchStats();
    }, []);
  
    return (
      <div className="analytics-grid">
        <StatCard title="Total Forms" value={stats?.total} />
        <PieChart data={stats?.byStatus} title="Forms by Status" />
        <BarChart data={stats?.byFaculty} title="Forms by Faculty" />
      </div>
    );
  };