import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useNavigate } from "react-router-dom";
import Skeleton from "../../Components/Skeleton.tsx";
import "../Results/Results.css";
import pic from "../../assets/download.png";
import CarDetailsModal from "../../Components/CarDetailsModal.tsx";

interface Car {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export default function Results() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const carsPerPage = 15;

  useEffect(() => {
    const modelOrMake = searchParams.get("modelOrMake");
    if (modelOrMake) {
      setSearchTerm(modelOrMake);
      fetchData(modelOrMake);
    }
  }, [searchParams]);

  const fetchData = async (term: string) => {
    if (!term) return;

    setLoading(true);
    try {
      const [makeResponse, modelResponse] = await Promise.all([
        fetch(`https://api.api-ninjas.com/v1/cars?make=${term}&limit=50`, {
          headers: {
            "X-Api-Key": "6M8maH50sOTjQ7R0fOKPHNjr1VOUHDnsMcBNFNEF",
          },
        }),
        fetch(`https://api.api-ninjas.com/v1/cars?model=${term}&limit=50`, {
          headers: {
            "X-Api-Key": "6M8maH50sOTjQ7R0fOKPHNjr1VOUHDnsMcBNFNEF",
          },
        }),
      ]);

      const makeData = makeResponse.ok ? await makeResponse.json() : [];
      const modelData = modelResponse.ok ? await modelResponse.json() : [];
      const data = makeData.length ? makeData : modelData;

      setCars(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/results?modelOrMake=${searchTerm.trim()}`);
      fetchData(searchTerm);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <div className="container">
      {selectedCar && (
        <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
      <div className="frontpage">
        <div className="content-wrapper">
          <h1 className="content">Browse our cars</h1>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="Search by Make, Model, or Keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <section id="search">
        <div id="filter" className="content-wrapper">
          <div className="results-filter-wrapper">
            <h1 className="search-info">
              <span className="black-txt">Search Results:</span>
            </h1>
          </div>
        </div>
        <div id="cars">
          <div className="content-wrappers grid-container">
            {loading ? (
              Array.from({ length: carsPerPage }).map((_, index) => (
                <Skeleton key={index} />
              ))
            ) : (
              currentCars.map((car, index) => (
                <div
                  key={index}
                  className="car-item"
                  onClick={() => setSelectedCar(car)}
                >
                  <img
                    src={pic}
                    alt={`${car.make} ${car.model}`}
                    className="car-image"
                  />
                  <h2>{car.make} {car.model}</h2>
                </div>
              ))
            )}
          </div>
          {cars.length > carsPerPage && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
