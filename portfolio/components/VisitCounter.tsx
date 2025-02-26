import { useEffect, useState } from "react";

const VisitCounter = () => {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.visits))
      .catch((err) => console.error("Error fetching visits:", err));
  }, []);

  return (
    <div className="text-white text-lg">
      {visits !== null ? `🌍 Total Visits: ${visits}` : "Loading visits..."}
    </div>
  );
};

export default VisitCounter;
