// // components/Navbar.jsx
// import React, { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { Menu, X } from "lucide-react";

// // ⚡ ADDED: Explicitly import your logo asset from the src/pages folder depth
// import rewearLogo from "../pages/image.png"; 

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const currentPath = location.pathname;
//   const { connect, disconnect, account, connected, wallets } = useWallet();

//   const [open, setOpen] = useState(false);

//   // Check traditional email login parameters from browser storage
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     alert("Logged out successfully!");
//     navigate("/login");
//   };

//   const handleWalletAction = async () => {
//     if (connected) {
//       disconnect();
//     } else {
//       try {
//         const petraWallet = wallets.find((w) => w.name === "Petra");
//         if (petraWallet) {
//           await connect(petraWallet.name);
//         } else {
//           window.open("https://petra.app", "_blank");
//         }
//       } catch (err) {
//         console.error("Wallet hook connection failed:", err);
//       }
//     }
//   };

//   const getBtnClass = (targetPath) =>
//     `px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap text-sm font-medium
//      ${
//        currentPath === targetPath
//          ? "bg-[#D94F4F] text-white"
//          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//      }`;

//   return (
//     <nav className="bg-white shadow sticky top-0 z-50 p-3 sm:p-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* BRAND LOGO AREA (Far Left Position) */}
//         <NavLink to="/" className="flex items-center gap-2 mr-2">
//           {/* ⚡ CHANGED HERE: Now utilizes your imported asset variable inside curly braces */}
//           <img src={rewearLogo} alt="REWEAR Logo" className="h-8 w-auto object-contain" />
//           <span className="text-lg sm:text-xl font-black tracking-tight text-[#D94F4F]">ReWear</span>
//         </NavLink>

//         {/* DESKTOP CENTER NAVBAR LINKS */}
//         <div className="hidden sm:flex flex-wrap items-center gap-3">
//           <NavLink to="/" className={getBtnClass("/")}>Home</NavLink>
//           <NavLink to="/browse" className={getBtnClass("/browse")}>Browse Marketplace</NavLink>
//           <NavLink to="/my-listings" className={getBtnClass("/my-listings")}>My Listings</NavLink>
//           <NavLink to="/swap-requests" className={getBtnClass("/swap-requests")}>Swap Requests</NavLink>
//           <NavLink to="/product-design" className={getBtnClass("/product-design")}>Upload Item</NavLink>
//         </div>

//         {/* DESKTOP RIGHT ACCOUNT ACTIONS */}
//         <div className="hidden sm:flex items-center gap-3">
//           {/* Aptos Connection Element */}
//           <button
//             onClick={handleWalletAction}
//             className={`px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium
//               ${connected ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-black text-white hover:bg-gray-800"}`}
//           >
//             {connected && account
//               ? `🟢 ${account.address.toString().slice(0, 4)}...${account.address.toString().slice(-4)}`
//               : "Connect Wallet"}
//           </button>

//           {/* Dynamic Hi Username & Traditional Auth Links */}
//           {token ? (
//             <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
//               <span className="text-sm font-medium text-gray-700">
//                 Hi, <span className="text-[#D94F4F] font-bold">{user?.username || "User"}</span>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//               >
//                 Log Out
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
//               <NavLink to="/login" className={getBtnClass("/login")}>Sign In</NavLink>
//               <NavLink to="/signup" className={getBtnClass("/signup")}>Sign Up</NavLink>
//             </div>
//           )}
//         </div>

//         {/* MOBILE HAMBURGER ICON */}
//         <div className="flex items-center justify-end sm:hidden">
//           <button onClick={() => setOpen(!open)} className="text-gray-800 p-1">
//             {open ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE DROPDOWN */}
//       {open && (
//         <div className="flex flex-col gap-3 mt-3 sm:hidden border-t border-gray-100 pt-3">
//           <NavLink to="/" className={getBtnClass("/")} onClick={() => setOpen(false)}>Home</NavLink>
//           <NavLink to="/browse" className={getBtnClass("/browse")} onClick={() => setOpen(false)}>Browse Marketplace</NavLink>
//           <NavLink to="/my-listings" className={getBtnClass("/my-listings")} onClick={() => setOpen(false)}>My Listings</NavLink>
//           <NavLink to="/swap-requests" className={getBtnClass("/swap-requests")} onClick={() => setOpen(false)}>Swap Requests</NavLink>
//           <NavLink to="/product-design" className={getBtnClass("/product-design")} onClick={() => setOpen(false)}>Upload Item</NavLink>

//           {/* Mobile Aptos Connection Element */}
//           <button
//             onClick={() => { handleWalletAction(); setOpen(false); }}
//             className={`px-4 py-2 rounded-full text-sm font-medium text-center transition-colors
//               ${connected ? "bg-green-100 text-green-800" : "bg-black text-white"}`}
//           >
//             {connected && account
//               ? `Disconnect Wallet (${account.address.toString().slice(0, 4)}...)`
//               : "Connect Wallet"}
//           </button>

//           {/* Mobile Traditional Auth Links */}
//           {token ? (
//             <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 text-center">
//               <span className="text-sm font-medium text-gray-700">
//                 Hi, <span className="text-[#D94F4F] font-bold">{user?.username || "User"}</span>
//               </span>
//               <button
//                 onClick={() => { handleLogout(); setOpen(false); }}
//                 className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 w-full"
//               >
//                 Log Out
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
//               <NavLink to="/login" className={getBtnClass("/login")} onClick={() => setOpen(false)}>Sign In</NavLink>
//               <NavLink to="/signup" className={getBtnClass("/signup")} onClick={() => setOpen(false)}>Sign Up</NavLink>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import WalletSelector from "./WalletSelector"; 
import rewearLogo from "../pages/image.png"; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const getBtnClass = (targetPath) =>
    `px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap text-sm font-medium
     ${currentPath === targetPath ? "bg-[#D94F4F] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50 p-3 sm:p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO LINK CONTAINER */}
        <NavLink to="/" className="flex items-center gap-2 mr-2">
          <img src={rewearLogo} alt="REWEAR Logo" className="h-8 w-auto object-contain" />
          <span className="text-lg sm:text-xl font-black tracking-tight text-[#D94F4F]">ReWear</span>
        </NavLink>

        {/* DESKTOP CONTENT MENU LINKS */}
        <div className="hidden sm:flex flex-wrap items-center gap-3">
          <NavLink to="/" className={getBtnClass("/")}>Home</NavLink>
          <NavLink to="/browse" className={getBtnClass("/browse")}>Browse Marketplace</NavLink>
          <NavLink to="/my-listings" className={getBtnClass("/my-listings")}>My Listings</NavLink>
          <NavLink to="/swap-requests" className={getBtnClass("/swap-requests")}>Swap Requests</NavLink>
          <NavLink to="/product-design" className={getBtnClass("/product-design")}>Upload Item</NavLink>
        </div>

        {/* DESKTOP AUTH / WALLET CTA ALIGNMENT */}
        <div className="hidden sm:flex items-center gap-3">
          <WalletSelector />

          {token ? (
            <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
              <span className="text-sm font-medium text-gray-700">Hi, <span className="text-[#D94F4F] font-bold">{user?.username || "User"}</span></span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">Log Out</button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <NavLink to="/login" className={getBtnClass("/login")}>Sign In</NavLink>
              <NavLink to="/signup" className={getBtnClass("/signup")}>Sign Up</NavLink>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER TOGGLE TRIGGER BUTTON */}
        <div className="flex items-center justify-end sm:hidden">
          <button onClick={() => setOpen(!open)} className="text-gray-800 p-1 font-bold text-xl">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE COLLAPSED ACCORDION MENU ROW */}
      {open && (
        <div className="flex flex-col gap-3 mt-3 sm:hidden border-t border-gray-100 pt-3">
          <NavLink to="/" className={getBtnClass("/")} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/browse" className={getBtnClass("/browse")} onClick={() => setOpen(false)}>Browse Marketplace</NavLink>
          <NavLink to="/my-listings" className={getBtnClass("/my-listings")} onClick={() => setOpen(false)}>My Listings</NavLink>
          <NavLink to="/swap-requests" className={getBtnClass("/swap-requests")} onClick={() => setOpen(false)}>Swap Requests</NavLink>
          <NavLink to="/product-design" className={getBtnClass("/product-design")} onClick={() => setOpen(false)}>Upload Item</NavLink>
          
          <div className="pt-2 border-t border-gray-100 flex justify-center"><WalletSelector /></div>

          {token ? (
            <div className="flex flex-col gap-2 pt-2 text-center">
              <span className="text-sm font-medium text-gray-700">Hi, <span className="text-[#D94F4F] font-bold">{user?.username || "User"}</span></span>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 w-full">Log Out</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <NavLink to="/login" className={getBtnClass("/login")} onClick={() => setOpen(false)}>Sign In</NavLink>
              <NavLink to="/signup" className={getBtnClass("/signup")} onClick={() => setOpen(false)}>Sign Up</NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
