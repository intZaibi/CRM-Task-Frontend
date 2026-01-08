import { useEffect, useState } from 'react'
import EditModal from './EditLeadModal.jsx';
import GetLeadByIdModal from './GetLeadByIdModal.jsx';
import { getLeads, deleteLead, updateLead } from '../services/leadServices.jsx';

export default function Cards() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = async () => { // initially fetch all leads
    try {
      const leads = await getLeads();
      setLeads(leads);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };
  
  const handleUpdate = async (updatedData) => {
    await updateLead(selectedLead._id, updatedData);
    fetchLeads();
  };

  const handleDelete = async (id) => { // Delete an specific lead by id
    try {
      await deleteLead(id);
      fetchLeads(); // Refresh the list after deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  return (
    <>
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded mb-6 cursor-pointer "
      onClick={()=>setShowSearchModal(true)}
    >
      Get Lead By Id
    </button>

    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <li
            key={lead._id}
            className="border rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <p className="font-bold">{lead.name}</p>
              <p>{lead.email}</p>
              <p>{lead.phone || 'No phone provided'}</p>
              <p className="text-sm text-gray-500">{lead.status}</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-yellow-400 text-white py-1 px-3 rounded"
                onClick={() => handleEdit(lead)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={() => handleDelete(lead._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
    
    {showModal && (
      <EditModal
        lead={selectedLead}
        onUpdate={handleUpdate}
        onClose={() => setShowModal(false)}
      />
    )}

    {showSearchModal && ( 
      <GetLeadByIdModal onClose={(lead) => { setShowSearchModal(false); lead && setLeads(lead) }} />
    )}
    </>
  )
}
