import React, { useEffect, useState } from "react";
import API from "../api/axios";

const MyListings = () => {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        // ⚡ Automatically attaches your secure token to look up Pooja's closet items
        const res = await API.get("/products/user/my-items");
        setMyItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to look up your personal wardrobe collections.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to permanently delete this item?")) return;

    try {
      // ⚡ Fires secure removal route to MongoDB Atlas cluster
      await API.delete(`/products/${itemId}`);
      // Instantly wipes card layout off screen
      setMyItems(myItems.filter((item) => item._id !== itemId));
      alert("Listing cleared successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF4F2]">
        <p className="text-xl text-[#D94F4F] font-semibold animate-pulse">Loading Your Closet...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 md:px-10 py-6 sm:py-10 text-[#2E2E2E]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#D94F4F] mb-2 text-center sm:text-left">
          My Listed Items
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center sm:text-left">
          Manage your personal fashion listings available for swap requests.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {myItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 font-medium">You haven't listed any garments for exchange yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-3 sm:p-4 flex flex-col justify-between border border-gray-50"
              >
                <div>
                  <img
                    src={item.image || "https://placehold.co"}
                    alt={item.title}
                    className="w-full h-40 sm:h-44 object-contain rounded-xl mb-3 bg-gray-50 p-2"
                    onError={(e) => { e.target.src = "https://placehold.co"; }}
                  />
                  <div className="flex justify-between items-start gap-1 mb-1">
                    <h2 className="text-base font-bold text-gray-800 truncate max-w-[70%]">
                      {item.title}
                    </h2>
                    <span className="text-sm font-black text-[#D94F4F]">${item.price}</span>
                  </div>

                  <span className="inline-block bg-[#FDF4F2] text-[#D94F4F] text-[10px] font-extrabold px-2 py-0.5 rounded mb-2 uppercase tracking-wider">
                    {item.condition}
                  </span>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 py-2 rounded-full hover:bg-red-100 transition-colors"
                >
                  Delete Listing
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;

