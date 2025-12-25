import React from "react";

const sponsorSlots = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

export default function SponsorBanner() {
  return (
    <div style={{ marginTop: 40, padding: 20, textAlign: "center" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
        Sponsorship Opportunities
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {sponsorSlots.map((slot) => (
          <div
            key={slot.id}
            style={{
              width: 260,
              height: 100,
              border: "2px dashed #bbb",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 600,
              color: "#777",
              backgroundColor: "#f9f9f9",
            }}
          >
            Available Sponsorship Space
          </div>
        ))}
      </div>
    </div>
  );
}
