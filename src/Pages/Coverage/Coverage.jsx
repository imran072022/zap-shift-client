import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FiSearch } from "react-icons/fi";
const Coverage = () => {
  const serviceCenters = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinate, 12);
    }
  };
  return (
    <div className="bg-white py-20 px-24 mt-8 mb-28 rounded-4xl">
      <h1 className="text-5xl text-[#03373D] font-extrabold">
        We are available in 64 districts
      </h1>

      <form onSubmit={handleSearch} className="my-12 w-[530px]">
        <div
          className="relative flex items-center rounded-full bg-[#CBD5E14D]
    focus-within:ring-2 focus-within:ring-[#067A87]"
        >
          <FiSearch className="absolute left-4 text-gray-600" size={20} />

          <input
            className="w-full h-12  text-sm pl-12 pr-32
        rounded-full outline-none"
            type="search"
            name="location"
            placeholder="Search here"
          />

          <button
            type="submit"
            className="absolute right-0 h-12 px-9 font-bold
        bg-[#CAEB66] text-[#1F1F1F] rounded-full cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      <div className="border-t border-[#E5E5E5]">
        <h2 className="font-extrabold text-3xl text-[#03373D] my-12">
          We deliver almost all over Bangladesh
        </h2>
        <MapContainer
          center={position}
          zoom={9}
          scrollWheelZoom={true}
          ref={mapRef}
          className="w-full h-[426px] "
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br></br>
                <strong>Service Area:</strong> {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
