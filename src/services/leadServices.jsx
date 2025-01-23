import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const getLeads = async () => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/leads`);
    return response.data;
  } catch (error) {

    if (error.message.includes('404'))
      throw new Error('No Data Found!')
    else
      throw new Error(error.message);
  }
};

const getLeadById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leads/${id}`);
    return [response.data];
    
  } catch (error) {

    if (error.message.includes('404'))
      throw new Error('No Found!')
    else
      throw new Error(error.message);
  }
};

const createLead = async (lead) => {
  try {
    console.log(lead)
    const response = await axios.post(`${API_BASE_URL}/leads`, lead);
    return response.data;

  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message);
  }
};

const updateLead = async (id, updatedLead) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/leads/${id}`, updatedLead);
    return response.data;
    
  } catch (error) {

    throw new Error(error.message);
  }
};

const deleteLead = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/leads/${id}`);
    return response.data;
    
  } catch (error) {

    throw new Error(error.message);
  }
};

export {createLead, updateLead, deleteLead, getLeadById, getLeads}