import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const HistoryList = () => {
  const history = useLiveQuery(
    () => db.history.orderBy('timestamp').reverse().toArray(),
    []
  );

  const calculateRemainingTime = (timestamp) => {
    const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const expirationTime = timestamp + sevenDays;
    const now = Date.now();
    const timeLeft = expirationTime - now;

    if (timeLeft <= 0) {
      return "Expired";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    let timeString = "";
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    timeString += `${minutes}m`;
    return timeString.trim() + " left";
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats to local date and time
  };

  useEffect(() => {
    const cleanupInterval = setInterval(async () => {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      await db.history.where('timestamp').below(sevenDaysAgo).delete();
    }, 60 * 60 * 1000); // Run every hour

    return () => clearInterval(cleanupInterval);
  }, []);

  const handleClearItem = async (id) => {
    await db.history.delete(id);
  };

  const handleClearAll = async () => {
    await db.history.clear();
  };

  return (
    <div>
      {history && history.filter(item => calculateRemainingTime(item.timestamp) !== "Expired").length > 0 && (
        <div className="text-right mb-4">
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear All
          </button>
        </div>
      )}
      {history && history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.filter(item => calculateRemainingTime(item.timestamp) !== "Expired").map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-md p-4">
              <img src={URL.createObjectURL(item.image)} alt="Generated" className="w-full h-48 object-cover rounded-t-lg" />
              <div className="py-4">
                <p className="text-text text-sm">{item.caption}</p>
                <p className="text-secondary text-xs mt-2">Expires in: {calculateRemainingTime(item.timestamp)}</p>
              </div>
              {item.audio && (
                <audio controls src={URL.createObjectURL(item.audio)} className="w-full mt-2">
                  Your browser does not support the audio element.
                </audio>
              )}
              <div className="text-right mt-4 flex justify-between items-center">
                <span className="text-secondary text-xs">{formatTimestamp(item.timestamp)}</span>
                <button
                  onClick={() => handleClearItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Clear
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-text">No history yet.</p>
      )}
    </div>
  );
};

export default HistoryList;
