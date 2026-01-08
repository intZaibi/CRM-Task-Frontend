import Table from '../components/Table.jsx';
import Cards from '../components/Cards.jsx';
import { useEffect, useState } from 'react';
import AddLeadModal from '../components/AddLeadModal.jsx'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

const LeadsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [leadsUpdated, setLeadsUpdated] = useState(false); // State to trigger rerender on modal close
  const [user, setUser] = useState(null); // State to trigger rerender on modal close

  const router = useNavigate();
  
  // Function to fetch and verify the token
  const verifyUserToken = async () => {
    try {
      // Fetch request to verify the token (adjust URL to your backend API)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`, {
        withCredentials: true,
      });
      setUser(response.data.user)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401)
        console.log('Token verification failed');
      else
        console.log('An error occurred: ' + err.message);
      router("/signIn")
    }
  };
  
  useEffect(() => {
    if(!user){
      verifyUserToken();
    }
  }, []);

  // Function to handle modal closing and trigger table/cards rerender
  const handleModalClose = (bool) => {
    setShowModal(false);
    if(typeof bool !== "object") // if it returns a true then re-render
    setLeadsUpdated(prev => !prev); // Toggle state to force re-render of table/cards
  };

  return (
    <div className="p-8 lg:block flex flex-col justify-center items-center overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center mb-6">Leads</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add Lead
      </button>

      {/* Cards for small screens */}
      <div className='lg:hidden flex flex-col justify-center items-center'>
        <Cards key={leadsUpdated} />
      </div>

      {/* Table for large screens */}
      <div className='hidden lg:block'>
        <Table key={leadsUpdated} />
      </div>

      {/* Add Lead Modal */}
      {showModal && <AddLeadModal onClose={handleModalClose}/>}

    </div>

  );
};

export default LeadsPage;
