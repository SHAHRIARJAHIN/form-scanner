import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { exportToCSV } from '../utils/export';

export default function FormsDashboard() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setForms(data);
    setLoading(false);
  };

  const filteredForms = forms.filter(form => 
    form.form_data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.unique_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => exportToCSV(filteredForms)}>
          Export to CSV
        </button>
      </div>

      {loading ? (
        <p>Loading forms...</p>
      ) : (
        <table className="forms-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Faculty</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map(form => (
              <tr key={form.id}>
                <td>{form.unique_id}</td>
                <td>{form.form_data.name}</td>
                <td>{form.form_data.faculty}</td>
                <td>{form.status}</td>
                <td>{new Date(form.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}