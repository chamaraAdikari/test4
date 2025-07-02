import React, { useState } from "react";
import TuitionClassCard from "../../components/tuitionClasses/TuitionClassCard";
import useFetch from "../../hooks/useFetch";

const TuitionClasses = () => {
  const [city, setCity] = useState("");
  const { data, loading, error } = useFetch(
    `https://ceylonbookin.com/api/businesses?category=Tuition Classes${city ? `&city=${city}` : ""}`
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontWeight: 700, fontSize: 32 }}>Tuition Classes</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>
        Showing results for <b>Tuition Classes</b>.
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Enter city to filter..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: 8,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            flex: 1,
          }}
        />
        <button
          style={{
            padding: "8px 18px",
            fontSize: 16,
            borderRadius: 6,
            background: "#0d70ea",
            color: "#fff",
            border: "none",
            fontWeight: 600,
          }}
          onClick={() => {}}
        >
          Search
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && (
        <div style={{ color: "red" }}>Error loading tuition classes</div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        {Array.isArray(data) && data.length === 0 && (
          <div>No tuition classes found.</div>
        )}
        {Array.isArray(data) &&
          data.map((item) => (
            <TuitionClassCard item={item} key={item._id} />
          ))}
      </div>
    </div>
  );
};

export default TuitionClasses;
