import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("ChatApp"));
        const token = user?.token;
        const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/allusers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
        setAllUsers(response.data.users || []);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;