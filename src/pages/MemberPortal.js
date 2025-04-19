// src/pages/MemberPortal.js
const MemberPortal = () => {
    const [searchId, setSearchId] = useState('');
    const [form, setForm] = useState(null);
  
    const checkStatus = async () => {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('unique_id', searchId)
        .single();
  
      if (!error) setForm(data);
    };
  
    return (
      <div>
        <input
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter your form ID"
        />
        <button onClick={checkStatus}>Check Status</button>
  
        {form && (
          <div className="status-card">
            <h3>Status: {form.status}</h3>
            <p>ID: {form.unique_id}</p>
            <p>Name: {form.form_data.name}</p>
          </div>
        )}
      </div>
    );
  };