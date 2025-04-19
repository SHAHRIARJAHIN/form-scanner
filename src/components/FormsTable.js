// src/components/FormsTable.js
import { supabase } from '../lib/supabaseClient';

const FormsTable = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredForms = forms.filter(form => 
    form.form_data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.unique_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchForms = async () => {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setForms(data);
      setLoading(false);
    };
    fetchForms();
  }, []);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Faculty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.unique_id}</td>
                <td>{form.form_data.name}</td>
                <td>{form.form_data.faculty}</td>
                <td>{form.status}</td>
                <td>
                  <button onClick={() => viewForm(form.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};