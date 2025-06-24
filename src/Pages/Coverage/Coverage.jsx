import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router-dom";
import SearchBox from "./SearchBox";

const Coverage = () => {
  const branches = useLoaderData();
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (searchText) => {
    const district = branches.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="bg-secondary py-6 px-4 md:py-12 md:px-8 lg:px-16 rounded-2xl md:rounded-3xl mb-20">
      {/* Title */}
      <h1 className="text-primary text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-10">
        We are available in 64 districts
      </h1>

      {/* Search Box */}
      <div className="mb-8 flex justify-center">
        <SearchBox onSearch={handleSearch} />
      </div>

      {/* Subheading */}
      <h2 className="text-primary text-lg md:text-xl lg:text-2xl font-semibold text-center mb-6 md:mb-10">
        We deliver almost all over Bangladesh
      </h2>

      {/* Map */}
      <div className="w-full">
        <BangladeshMap
          branches={branches}
          activeCoords={activeCoords}
          activeDistrict={activeDistrict}
        />
      </div>
    </div>
  );
};

export default Coverage;
