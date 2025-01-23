import { useEffect, useState } from 'react'
import EditModal from './EditLeadModal.jsx';
import { getLeads, deleteLead, updateLead  } from '../services/leadServices.jsx';
import GetLeadByIdModal from './GetLeadByIdModal.jsx';

export default function Table() {
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
    <div>
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded mb-6 cursor-pointer"
      onClick={() => setShowSearchModal(true)}
    >
      Get Lead By Id
    </button>

    <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg shadow-md">
          
        <thead> 
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="px-6 py-3 text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-sm font-semibold">Phone</th>
            <th className="px-6 py-3 text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-sm font-semibold">Created At</th>
            <th className="px-6 py-3 text-sm font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {leads?.length > 0 ? ( // check for empty data
            leads?.map((row) => {
              return (
              <tr key={row._id}>
                <td className="px-6 py-4 text-sm text-gray-700">{row?.name}</td>
                <td className="px-6 py-4 text-sm">{row?.email}</td>
                <td className="px-6 py-4 text-sm">{row?.phone}</td>
                <td className="px-6 py-4 text-sm">{row?.status}</td>
                <td className="px-6 py-4 text-sm">{row?.createdAt.split("T")[0] + " " + row?.createdAt.split("T")[1].split(".")[0]}</td>
                
                <td className="flex gap-2 px-6 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(row)}
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
                
              </tr>
            )})
          ) : (
            // if no record found
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 text-sm text-center text-gray-500"
              >
                No leads found!
              </td>
            </tr>

          )}
        </tbody>
    </table>

    {showModal && (
        <EditModal lead={selectedLead} onUpdate={handleUpdate} onClose={() => setShowModal(false)}/>
      )}

      {showSearchModal && ( 
        <GetLeadByIdModal onClose={(lead) => { setShowSearchModal(false); lead && setLeads(lead) }} />
      )}
    </div>
  )
}
