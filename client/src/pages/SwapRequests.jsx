// import React, { useEffect, useState } from "react";
// import API from "../api/axios";

// const SwapRequests = () => {
//   const [myItems, setMyItems] = useState([]);
//   const [incomingRequests, setIncomingRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]); 
//   const [allMarketProducts, setAllMarketProducts] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedMyItem, setSelectedMyItem] = useState("");
//   const [selectedTargetItem, setSelectedTargetItem] = useState("");

//   // Real-time refresh routine: Forces frontend states to pull fresh logs instantly from MongoDB
//   const refreshDashboard = async () => {
//     try {
//       // 1. Fetch current user's closet items
//       const itemsRes = await API.get("/products/user/my-items");
//       setMyItems(itemsRes.data || []);

//       // 2. Fetch incoming trades where you are the receiver
//       const requestsRes = await API.get("/swaps/my-requests");
//       setIncomingRequests(requestsRes.data || []);

//       // 3. Fetch sent tracking trades where you are the sender
//       const sentRes = await API.get("/swaps/sent-requests");
//       setSentRequests(sentRes.data || []);

//       // 4. Fetch all products globally
//       const marketRes = await API.get("/products");
//       const allProducts = Array.isArray(marketRes.data) ? marketRes.data : [];
      
//       // Extract local storage user context
//       const storedUserString = localStorage.getItem("user");
//       let currentUserId = "";
      
//       if (storedUserString) {
//         const parsedUser = JSON.parse(storedUserString);
//         currentUserId = parsedUser?.id || parsedUser?._id || parsedUser?.userId;
//       }
      
//       // Filter available choices so you don't trade with yourself
//       const foreignItems = allProducts.filter((item) => {
//         const sellerId = item.seller?._id || item.seller?.id || item.seller;
        
//         if (item.seller?.username && JSON.parse(storedUserString)?.username) {
//           return item.seller.username !== JSON.parse(storedUserString).username;
//         }
        
//         return sellerId !== currentUserId;
//       });
      
//       setAllMarketProducts(foreignItems);
//     } catch (err) {
//       console.error("Dashboard pull failed:", err);
//     }
//   };

//   useEffect(() => {
//     const initializeData = async () => {
//       setLoading(true);
//       await refreshDashboard();
//       setLoading(false);
//     };
//     initializeData();
//   }, []);

//   const handleSubmitProposal = async (e) => {
//     e.preventDefault();
//     if (!selectedTargetItem || !selectedMyItem) {
//       alert("⚠️ Please select both items to proceed!");
//       return;
//     }

//     const targetItemObj = allMarketProducts.find((i) => i._id === selectedTargetItem);
    
//     let receiverId = "";
//     if (targetItemObj && targetItemObj.seller) {
//       receiverId = typeof targetItemObj.seller === "object" 
//         ? (targetItemObj.seller._id || targetItemObj.seller.id) 
//         : targetItemObj.seller;
//     }

//     try {
//       setLoading(true);
//       await API.post("/swaps", {
//         receiver: receiverId,
//         itemRequested: selectedTargetItem,
//         itemOffered: selectedMyItem,
//       });

//       alert(`🚀 Success! Your trade proposal has been sent!`);
//       setSelectedMyItem("");
//       setSelectedTargetItem("");
      
//       // Refresh logs immediately on successful submission
//       await refreshDashboard();
//     } catch (err) {
//       alert(err.response?.data?.error || "❌ Failed to submit proposal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (requestId, newStatus) => {
//     try {
//       await API.put(`/swaps/${requestId}/status`, { status: newStatus });
//       alert(`Swap offer ${newStatus.toLowerCase()} successfully!`);
      
//       // Refresh updates onto the tracking dashboards instantly
//       await refreshDashboard();
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to alter status.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FDF4F2]">
//         <p className="text-xl text-[#D94F4F] font-semibold animate-pulse">Processing Swap Dashboard...</p>
//       </div>
//     );
//   }
//     return (
//     <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 md:px-10 py-6 sm:py-10 text-[#2E2E2E]">
//       <div className="max-w-5xl mx-auto space-y-10">
        
//         {/* SECTION 1: PROPOSE NEW TRADE BLOCK */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <h2 className="text-xl font-bold text-[#D94F4F] mb-4">Propose a Fashion Swap</h2>
//           <form onSubmit={handleSubmitProposal} className="space-y-4 max-w-md">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">1. Select the Marketplace Item You Want:</label>
//               <select value={selectedTargetItem} onChange={(e) => setSelectedTargetItem(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#D94F4F]" required>
//                 <option value="">-- Choose Item to Receive  --</option>
//                 {allMarketProducts.map((item) => (
//                   <option key={item._id} value={item._id}>
//                     {item.title} (by {item.seller?.username || "Other User"})
//                   </option>
//                 ))}
//               </select>
//               {allMarketProducts.length === 0 && (
//                 <p className="text-xs text-amber-600 font-medium mt-1">
//                   💡 No other users' clothes found. Make sure Amit's item is uploaded!
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">2. Select Your Item to Offer in Trade:</label>
//               <select value={selectedMyItem} onChange={(e) => setSelectedMyItem(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#D94F4F]" required>
//                 <option value="">-- Choose from Your Closet (Jeans) --</option>
//                 {myItems.map((item) => (
//                   <option key={item._id} value={item._id}>{item.title}</option>
//                 ))}
//               </select>
//             </div>

//             <button type="submit" disabled={myItems.length === 0 || allMarketProducts.length === 0} className="w-full bg-[#D94F4F] text-white py-2.5 rounded-full font-bold text-sm hover:bg-[#bf3f3f] transition disabled:bg-gray-300">
//               Submit Swap Proposal
//             </button>
//           </form>
//         </div>

//         {/* SECTION 2: MY OUTGOING TRACKING HISTORY */}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">My Sent Swap Proposals</h1>
//           <p className="text-sm text-gray-500 mb-6">Track trade requests you sent to other users and check their live approval statuses.</p>
//           {sentRequests.length === 0 ? (
//             <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
//               You haven't initiated any trade proposals yet.
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {sentRequests.map((req) => (
//                 <div key={req._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
//                     <div>
//                       <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sent To</p>
//                       <p className="font-semibold text-gray-800">{req.receiver?.username || "Other User"}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
//                       <span className="text-[10px] uppercase font-bold text-[#D94F4F]">You Want:</span>
//                       <p className="font-medium text-sm text-gray-800 truncate">{req.itemRequested?.title || "Deleted Item"}</p>
//                     </div>
//                     <div className="text-gray-400 text-lg font-bold">⇄</div>
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
//                       <span className="text-[10px] uppercase font-bold text-green-600">You Offered:</span>
//                       <p className="font-medium text-sm text-gray-800 truncate">{req.itemOffered?.title || "Deleted Item"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-end">
//                     <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
//                       ${req.status === "Approved" ? "bg-green-100 text-green-800" : req.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
//                       {req.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* SECTION 3: INCOMING SWAP REQUEST FEED TRAFFIC */}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Incoming Swap Offers</h1>
//           <p className="text-sm text-gray-500 mb-6">Review requests made by other shoppers on your listings.</p>
//           {incomingRequests.length === 0 ? (
//             <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">No incoming offers right now.</div>
//           ) : (
//             <div className="space-y-4">
//               {incomingRequests.map((req) => (
//                 <div key={req._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
//                     <div className="text-sm">
//                       <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">From</p>
//                       <p className="font-semibold text-gray-800">{req.sender?.username || "Community Member"}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
//                       <span className="text-[10px] uppercase font-bold text-[#D94F4F]">They Want:</span>
//                       <p className="font-medium text-sm text-gray-800 truncate">{req.itemRequested?.title || "Deleted Item"}</p>
//                     </div>
//                     <div className="text-gray-400 text-lg font-bold">⇄</div>
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
//                       <span className="text-[10px] uppercase font-bold text-green-600">They Offer In Return:</span>
//                       <p className="font-medium text-sm text-gray-800 truncate">{req.itemOffered?.title || "Deleted Item"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 justify-end">
//                     {req.status === "Pending" ? (
//                       <>
//                         <button onClick={() => handleStatusUpdate(req._id, "Approved")} className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-full hover:bg-green-700 transition">Accept</button>
//                         <button onClick={() => handleStatusUpdate(req._id, "Rejected")} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full hover:bg-gray-200 transition">Decline</button>
//                       </>
//                     ) : (
//                       <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${req.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{req.status}</span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SwapRequests;


import React, { useEffect, useState } from "react";
import API from "../api/axios";
// ⚡ IMPORT AT THE TOP OF SwapRequests.jsx: Grabs the active adapter hook
import { useWallet } from "@aptos-labs/wallet-adapter-react"; 

const SwapRequests = () => {
  // ⚡ HOOK INTEGRATION: Connects directly with Amit's active browser wallet account
  const { signAndSubmitTransaction, connected } = useWallet(); 

  const [myItems, setMyItems] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]); 
  const [allMarketProducts, setAllMarketProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMyItem, setSelectedMyItem] = useState("");
  const [selectedTargetItem, setSelectedTargetItem] = useState("");

  const refreshDashboard = async () => {
    try {
      const itemsRes = await API.get("/products/user/my-items");
      setMyItems(itemsRes.data || []);
      const requestsRes = await API.get("/swaps/my-requests");
      setIncomingRequests(requestsRes.data || []);
      const sentRes = await API.get("/swaps/sent-requests");
      setSentRequests(sentRes.data || []);
      const marketRes = await API.get("/products");
      const allProducts = Array.isArray(marketRes.data) ? marketRes.data : [];
      setAllMarketProducts(allProducts);
    } catch (err) {
      console.error("Dashboard pull failed:", err);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await refreshDashboard();
      setLoading(false);
    };
    initializeData();
  }, []);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!selectedTargetItem || !selectedMyItem) {
      alert("⚠️ Please select both items to proceed!");
      return;
    }
    const targetItemObj = allMarketProducts.find((i) => i._id === selectedTargetItem);
    let receiverId = "";
    if (targetItemObj && targetItemObj.seller) {
      receiverId = typeof targetItemObj.seller === "object" ? (targetItemObj.seller._id || targetItemObj.seller.id) : targetItemObj.seller;
    }
    try {
      setLoading(true);
      await API.post("/swaps", { receiver: receiverId, itemRequested: selectedTargetItem, itemOffered: selectedMyItem });
      alert(`🚀 Success! Your trade proposal has been sent!`);
      setSelectedMyItem("");
      setSelectedTargetItem("");
      await refreshDashboard();
    } catch (err) {
      alert(err.response?.data?.error || "❌ Failed to submit proposal.");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ UPDATED WITH BLOCKCHAIN TRIGGER SCHEMA
  const handleStatusUpdate = async (req, newStatus) => {
    // If Amit accepts, enforce a true decentralised transaction signature prompt
    if (newStatus === "Approved") {
      if (!connected) {
        alert("🔒 Please click the 'Connect Wallet' button in your top navbar before accepting trades!");
        return;
      }

      try {
        setLoading(true);
        alert("Connecting to Aptos Testnet... Please approve the Petra wallet extension pop-up!");

        // 🟢 WEB3 PAYLOAD BLOCK: Fires standard Entry-Function structure signature prompt
        const transactionPayload = {
          data: {
            function: "0x1::aptos_account::transfer", // Utilizes standard core validation paths for sandbox testing
            typeArguments: [],
            functionArguments: [
              "0x0000000000000000000000000000000000000000000000000000000000000001", // Mocks decentralised escrow ledger routing hash
              "100" // Submits minor octas tracking token value to validate receipt logs on-chain
            ],
          },
        };

        const response = await signAndSubmitTransaction(transactionPayload);
        console.log("Blockchain Receipt Generated! Transaction Hash:", response.hash);
        alert(`🔗 Receipt logged on the Aptos Ledger! Tx Hash: ${response.hash.slice(0, 10)}...`);
      } catch (blockchainErr) {
        console.error(blockchainErr);
        alert("❌ Blockchain signature rejected or failed. Transaction cancelled.");
        setLoading(false);
        return; 
      }
    }

    // After Web3 validation completes, run traditional status mapping updates inside MongoDB Atlas
    try {
      setLoading(true);
      await API.put(`/swaps/${req._id}/status`, { status: newStatus });
      alert(`Swap offer ${newStatus.toLowerCase()} successfully!`);
      await refreshDashboard();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to alter status.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF4F2]">
        <p className="text-xl text-[#D94F4F] font-semibold animate-pulse">Processing Swap Dashboard...</p>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 md:px-10 py-6 sm:py-10 text-[#2E2E2E]">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* SECTION 1: PROPOSE NEW TRADE BLOCK */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-[#D94F4F] mb-4">Propose a Fashion Swap</h2>
          <form onSubmit={handleSubmitProposal} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">1. Select the Marketplace Item You Want:</label>
              <select value={selectedTargetItem} onChange={(e) => setSelectedTargetItem(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#D94F4F]" required>
                <option value="">-- Choose Item to Receive (Amit's Clothes) --</option>
                {allMarketProducts.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title} (by {item.seller?.username || "Other User"})
                  </option>
                ))}
              </select>
              {allMarketProducts.length === 0 && (
                <p className="text-xs text-amber-600 font-medium mt-1">
                  💡 No other users' clothes found. Make sure Amit's item is uploaded!
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">2. Select Your Item to Offer in Trade:</label>
              <select value={selectedMyItem} onChange={(e) => setSelectedMyItem(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#D94F4F]" required>
                <option value="">-- Choose from Your Closet (Jeans) --</option>
                {myItems.map((item) => (
                  <option key={item._id} value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={myItems.length === 0 || allMarketProducts.length === 0} className="w-full bg-[#D94F4F] text-white py-2.5 rounded-full font-bold text-sm hover:bg-[#bf3f3f] transition disabled:bg-gray-300">
              Submit Swap Proposal
            </button>
          </form>
        </div>

        {/* SECTION 2: MY OUTGOING TRACKING HISTORY */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Sent Swap Proposals</h1>
          <p className="text-sm text-gray-500 mb-6">Track trade requests you sent to other users and check their live approval statuses.</p>
          {sentRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
              You haven't initiated any trade proposals yet.
            </div>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((req) => (
                <div key={req._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sent To</p>
                      <p className="font-semibold text-gray-800">{req.receiver?.username || "Other User"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
                      <span className="text-[10px] uppercase font-bold text-[#D94F4F]">You Want:</span>
                      <p className="font-medium text-sm text-gray-800 truncate">{req.itemRequested?.title || "Deleted Item"}</p>
                    </div>
                    <div className="text-gray-400 text-lg font-bold">⇄</div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
                      <span className="text-[10px] uppercase font-bold text-green-600">You Offered:</span>
                      <p className="font-medium text-sm text-gray-800 truncate">{req.itemOffered?.title || "Deleted Item"}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                      ${req.status === "Approved" ? "bg-green-100 text-green-800" : req.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: INCOMING SWAP REQUEST FEED TRAFFIC */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Incoming Swap Offers</h1>
          <p className="text-sm text-gray-500 mb-6">Review requests made by other shoppers on your listings.</p>
          {incomingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">No incoming offers right now.</div>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map((req) => (
                <div key={req._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
                    <div className="text-sm">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">From</p>
                      <p className="font-semibold text-gray-800">{req.sender?.username || "Community Member"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
                      <span className="text-[10px] uppercase font-bold text-[#D94F4F]">They Want:</span>
                      <p className="font-medium text-sm text-gray-800 truncate">{req.itemRequested?.title || "Deleted Item"}</p>
                    </div>
                    <div className="text-gray-400 text-lg font-bold">⇄</div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[150px]">
                      <span className="text-[10px] uppercase font-bold text-green-600">They Offer In Return:</span>
                      <p className="font-medium text-sm text-gray-800 truncate">{req.itemOffered?.title || "Deleted Item"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    {req.status === "Pending" ? (
                      <>
                        {/* ⚡ UPDATED: Passes the full req object parameter instead of just req._id */}
                        <button onClick={() => handleStatusUpdate(req, "Approved")} className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-full hover:bg-green-700 transition">Accept</button>
                        <button onClick={() => handleStatusUpdate(req, "Rejected")} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full hover:bg-gray-200 transition">Decline</button>
                      </>
                    ) : (
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${req.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{req.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SwapRequests;

