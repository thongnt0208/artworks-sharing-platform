import React from "react";
import axios from "axios";

const RegisterService = {
  fetchDatda: async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  fetchAnotherData: async () => {
    try {
      const response = await axios.get("https://api.example.com/another-data");
      return response.data;
    } catch (error) {
      console.error("Error fetching another data:", error);
      throw error;
    }
  },

  // Add more functions for other API calls
};

export default RegisterService;