import { useEffect, useState } from "react";
import { GET } from "../services/requestHTTP";
import { data } from "../../users.js";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const findAllUsers = async () => {
    //const res = await GET("/user");
    //setUsers(res.data.users);

    setUsers(data); // UTILIZA O REPORT VINDO DO ARQUIVO.JS
  };

  useEffect(() => {
    findAllUsers();
  }, []);

  return { users, setUsers };
};

export default useUsers;
