import { useState } from 'react';
import { createLead } from '../services/leadServices.jsx';

const AddLeadModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'New',
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null); // New state for name validation
  const [phoneError, setPhoneError] = useState(null); // New state for name validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      setEmailError(null); // Clear email error if the user is editing it
    }
    if (name === 'name') {
      setNameError(null); // Clear name error when editing the name field
    }
  };

  // Email validation function
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Name validation function (checks for alphabetic characters and spaces only)
  const isValidName = (name) => {
    const regex = /^[A-Za-z\s]+$/; // This allows only letters and spaces
    return regex.test(name.trim()); 
  };

  // Phone validation function 
  const isValidPhone = (phone) => {
    const regex = /^\+?[0-9]{11,13}$/;
    return regex.test(phone);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email and name are valid
    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!isValidName(formData.name)) {
      setNameError('Name should only contain letters and spaces.');
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    }
    
    try {
      await createLead(formData); // Pass updated data to the parent component
      onClose(true); // Close the modal
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add Lead</h2>
        {error && <p className="text-2xl text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>} {/* Show name error */}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Show email error */}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>} {/* Show name error */}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
