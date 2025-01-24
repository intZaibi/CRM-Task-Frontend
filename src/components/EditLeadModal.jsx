import React, { useState } from 'react';

// Email validation function
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Phone validation function (checks for a valid phone number format, for example, 10 digits)
const isValidPhone = (phone) => {
  const regex = /^\+?[0-9]{11,13}$/; // Assuming a 11-digit phone number
  return regex.test(phone);
};

// Name validation function (checks for alphabetic characters and spaces only)
const isValidName = (name) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(name.trim());
};

const EditModal = ({ lead, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    status: lead.status,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear individual field errors on change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { name: '', email: '', phone: '' };

    // Validate Name
    if (!isValidName(formData.name)) {
      newErrors.name = 'Name should only contain letters and spaces.';
      isValid = false;
    }

    // Validate Email
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Phone
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
      isValid = false;
    }

    // If any validation fails, update errors and return
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Proceed to update the lead if all validations pass
    onUpdate(formData); // Pass updated data to the parent component
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Lead</h2>
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
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} {/* Show name error */}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} {/* Show email error */}
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
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>} {/* Show phone error */}
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
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
