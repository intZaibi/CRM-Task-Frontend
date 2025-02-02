import Table from '../components/Table.jsx';
import Cards from '../components/Cards.jsx';
import { useEffect, useState } from 'react';
import AddLeadModal from '../components/AddLeadModal.jsx'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LeadsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [leadsUpdated, setLeadsUpdated] = useState(false); // State to trigger rerender on modal close

  const router = useNavigate();
  
  // Function to fetch and verify the token
  const verifyUserToken = async () => {
    // console.log(Cookies.get('authToken'))
    try {
      // Fetch request to verify the token (adjust URL to your backend API)
      const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/users`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('authToken'),
        }, // Make sure cookies are sent if the token is stored there
      });
      console.log(response.ok)
      if (!response.ok) {
        console.error('Token verification failed');
        router("/signIn")
      }

      // Check if the token is valid and if we got the expected user info
      if (data.error) {
        throw new data.error
      }

    } catch (err) {
      console.log('An error occurred: ' + err.message);
    }
  };
  
  useEffect(() => {
    // Call the function to verify the token when the component mounts
    // verifyUserToken();   // commented because on deployement cookies are creating isssues. 
  }, []);

  // Function to handle modal closing and trigger table/cards rerender
  const handleModalClose = (bool) => {
    setShowModal(false);
    if(typeof bool !== "object") // if it returns a true then re-render
    setLeadsUpdated(prev => !prev); // Toggle state to force re-render of table/cards
  };

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

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
      {isMobile && <Cards key={leadsUpdated} /> }

      {/* Table for large screens */}
      {!isMobile && <Table key={leadsUpdated} />}

      {/* Add Lead Modal */}
      {showModal && <AddLeadModal onClose={handleModalClose}/>}

    </div>

  );
};

export default LeadsPage;
