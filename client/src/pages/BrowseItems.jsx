// import React, { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Link } from "react-router-dom";

// const BrowseItems = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         setError("Failed to load marketplace listings.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FDF4F2]">
//         <p className="text-xl text-[#D94F4F] font-semibold animate-pulse">Loading ReWear Marketplace...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FDF4F2] p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Browse Catalog</h2>
//           <Link to="/list-item" className="bg-[#D94F4F] text-white px-4 py-2 rounded-md font-medium hover:bg-[#bf3f3f] transition">
//             + List an Item
//           </Link>
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {products.length === 0 ? (
//           <p className="text-gray-500 text-center py-12">No clothing items listed yet. Be the first!</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((item) => (
//               <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
//                 <img 
//                   src={item.image} 
//                   alt={item.title} 
//                   // ⚡ CHANGED HERE: object-cover updated to object-contain and added p-2
//                   className="w-full h-48 object-contain p-2 bg-gray-50"
//                   onError={(e) => { e.target.src = "https://placehold.co"; }}
//                 />
//                 <div className="p-4 flex flex-col flex-grow">
//                   <span className="text-xs font-bold uppercase tracking-wide text-[#D94F4F] mb-1">
//                     {item.condition}
//                   </span>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
                  
//                   <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                     <span className="text-xl font-bold text-gray-900">${item.price}</span>
//                     <span className="text-xs text-gray-400">by {item.seller?.username || "Anonymous"}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrowseItems;


import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const BrowseItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load marketplace listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSwapClick = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("🔒 Please log in first to propose a swap request!");
      navigate("/login");
      return;
    }

    // ⚡ Pass the REAL item IDs over to the Swap Requests page state memory
    navigate("/swap-requests", {
      state: {
        receiverId: item.seller?._id,
        productId: item._id,
        productTitle: item.title
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF4F2]">
        <p className="text-xl text-[#D94F4F] font-semibold animate-pulse">Loading ReWear Marketplace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF4F2] p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse Catalog</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No clothing items listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-contain p-2 bg-gray-50"
                    onError={(e) => { e.target.src = "https://placehold.co"; }}
                  />
                  <div className="p-4 flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#D94F4F] mb-1">
                      {item.condition}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mb-3">
                    <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    <span className="text-xs text-gray-400">by {item.seller?.username || "User"}</span>
                  </div>

                  {/* ⚡ NEW ACTION BUTTON: Triggers the data routing hook */}
                  <button
                    onClick={() => handleSwapClick(item)}
                    className="w-full bg-[#D94F4F] text-white py-2 rounded-full font-bold text-xs hover:bg-[#bf3f3f] transition"
                  >
                    Propose Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseItems;
