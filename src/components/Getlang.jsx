import React, { useEffect, useState } from "react";
import Fetch from "./Fetch";
const url = "https://text-translator2.p.rapidapi.com/getLanguages";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77f4a7463bmshb6f8b18e04e62bbp1f587ejsn8aefab0cbc40",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
};
const Getlang = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getLang = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setData(data.data.languages);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };
  useEffect(() => {
    getLang();
  }, []);
  return <div>
    <Fetch data={data}/>
  </div>;
};

export default Getlang;
