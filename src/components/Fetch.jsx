import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
const Fetch = ({ data }) => {
  const [query, setQuery] = useState("");
  const [translatedQuery, setTranslatedQuery] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("fr");
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY_,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: sourceLanguage,
      target_language: targetLanguage,
      text: query,
    }),
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslatedQuery(result.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleSourceLanguage = (e) => {
    setSourceLanguage(e.target.value);
  };
  const handleTargetLanguage = (e) => {
    setTargetLanguage(e.target.value);
  };
  const handleClick = () => {
    fetchdata();
    setIsCopied(false);
  };
  const selectOptions = [
    { value: "fr", label: "French" },
    { value: "en", label: "English" },
  ];
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedQuery);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy to clipboard: ", err);
    }
  };


  return (
    <div className="container max-w-5xl mx-auto px-4">
        <div className="heading my-4 mt-8 rounded-full  md:p-4 flex flex-col gap-3">
            <h1 className="font-lexend text-lg md:text-lg ">HaYTranslate</h1>
            <p className="text-sm font-lexend">Effortlessly translate text into over 100 languages</p>
        </div>
      <div className="flex items-center gap-3 justify-between w-full flex-wrap my-4 ">
        <div className="custom-select">
          <select
            name=""
            id=""
            onChange={handleSourceLanguage}
            className=" p-2"
          >
            <option value="en">English</option>
            {data.map((sel, index) => {
              return (
                <option key={index} value={sel.code}>
                  {sel.name}
                </option>
              );
            })}
          </select>
        </div>
       
        <div className="custom-select">
          <select name="" id="" onChange={handleTargetLanguage} className="p-2">
            <option value="fr">French</option>
            {data.map((sel, index) => {
              return (
                <option key={index} value={sel.code} className="jost p-2">
                  {sel.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          name=""
          onChange={handleQuery}
          style={{ resize: "none" }}
          className="py-2 px-3 rounded-md border focus:outline-blue-400 font-lexend focus:bg-white placeholder-gray-500 text-sm border-gray-200 h-36"
          placeholder="Enter Text"
        ></textarea>
        <div className=" flex justify-end w-full">
          {translatedQuery.length !== 0 ? (
            <button onClick={handleCopyToClipboard}>
              {isCopied ? (
                <p className="font-lexend">Copied!</p>
              ) : (
                <IoCopy className=" cursor-pointer" />
              )}
            </button>
          ) : null}
        </div>
        <textarea
          name=""
          value={translatedQuery}
          readOnly
          style={{ resize: "none" }}
          className="py-2 px-3 rounded-md border focus:outline-blue-400 font-lexend focus:bg-white placeholder-gray-200 text-sm border-gray-200 h-48"
        >
          {" "}
        </textarea>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white hover:ring-2  h-10 rounded-full font-lexend mt-3 w-36 flex items-center justify-center gap-2"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default Fetch;
