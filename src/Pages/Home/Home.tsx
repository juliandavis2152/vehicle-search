import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import building from "../../assets/building.png";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/results?modelOrMake=${searchTerm.trim()}`);
    }
  };  

  return (
    <section id="landing-page">
      <div className="page-container">
        <div className="page-row">
          <h1>United States most awarded car subscription platform</h1>
          <h2>
            Find your dream car with <span>Blinker</span>
          </h2>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search by Model, Make, or Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="not-loading" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <img src={building} alt="" className="building" />
      </div>
    </section>
  );
}
