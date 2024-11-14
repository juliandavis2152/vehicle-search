import React from "react";
import "./CarDetailsModal.css"; 
import pic from "../assets/download.png";

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

interface CarDetailsModalProps {
  car: Car;
  onClose: () => void;
}

export default function CarDetailsModal({ car, onClose }: CarDetailsModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}></button>
        <img src={pic} alt="Car placeholder" className="car-image" />
        <h2>{car.make} {car.model} ({car.year})</h2>
        <p><strong>Class:</strong> {car.class}</p>
        <p><strong>City MPG:</strong> {car.city_mpg}</p>
        <p><strong>Highway MPG:</strong> {car.highway_mpg}</p>
        <p><strong>Combination MPG:</strong> {car.combination_mpg}</p>
        <p><strong>Cylinders:</strong> {car.cylinders}</p>
        <p><strong>Displacement:</strong> {car.displacement}</p>
        <p><strong>Drive:</strong> {car.drive}</p>
        <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
      </div>
    </div>
  );
}
