import { useState } from 'react';
import { getLeadById } from '../services/leadServices';

const SearchModal = ({ onClose }) => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setId(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const lead = await getLeadById(id);
    setLoading(false);
    onClose(lead); // Close the modal and send lead to show in table
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Search Lead</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block font-bold mb-2">ID</label>
            <input
              type="text"
              value={id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={()=>onClose(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;

