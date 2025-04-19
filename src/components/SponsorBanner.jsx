import React from "react";

const SponsorBanner = () => {
  return (
    <div className="w-full text-center my-10">
      <a
        href="https://link-dello-sponsor.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://via.placeholder.com/300x100?text=Il+Tuo+Sponsor+Qui"
          alt="Sponsor"
          className="mx-auto rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </a>
    </div>
  );
};

export default SponsorBanner;
