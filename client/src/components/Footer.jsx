// // components/Footer.jsx
// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#2E2E2E] text-gray-200 py-12 px-6 md:px-12">

//       {/* MAIN GRID */}
//       <div className="max-w-7xl mx-auto grid 
//                       grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
//                       gap-12">

//         {/* BRAND & SOCIAL */}
//         <div>
//           <h2 className="text-2xl font-bold text-white mb-3">
//             ReWear Clothing
//           </h2>

//           <p className="text-gray-400 mb-5 leading-relaxed text-sm">
//             Give your clothes a second life. Join our mission for  
//             sustainable fashion and conscious living.
//           </p>

//           {/* Social Icons */}
//           <div className="flex gap-4 text-lg">
//             <a href="#" className="hover:text-white transition-colors">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </div>

//         {/* IMPORTANT LINKS */}
//         <div>
//           <h3 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">
//             Important Links
//           </h3>

//           <ul className="space-y-3">
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Donate Clothes</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Request Pickup</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Partner With Us</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Our Projects</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Careers</a></li>
//           </ul>
//         </div>

//         {/* LEARN MORE */}
//         <div>
//           <h3 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">
//             Learn More
//           </h3>

//           <ul className="space-y-3">
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Privacy Policy</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Refund Policy</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">FAQs</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Sustainability Report</a></li>
//             <li><a href="#" className="hover:text-white text-gray-300 text-sm">Media & Press</a></li>
//           </ul>
//         </div>

//         {/* CONTACT */}
//         <div>
//           <h3 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">
//             Contact Us
//           </h3>

//           <p className="text-gray-300 text-sm mb-1">info@rewear.org</p>
//           <p className="text-gray-300 text-sm">+91 96XXX XXXXX</p>

//           <p className="text-gray-400 mt-4 text-sm">
//             Office & Collection Center:
//           </p>

//           <p className="text-gray-300 text-sm leading-relaxed">
//             12 Green Street, Sector 22,<br /> Gurugram, Haryana 122015
//           </p>
//         </div>

//       </div>

//       {/* SEPARATOR */}
//       <hr className="my-10 border-gray-700" />

//       {/* COPYRIGHT */}
//       <div className="text-center text-gray-400 text-xs sm:text-sm">
//         © 2025 ReWear Clothing — Fashion that goes further ♻️
//       </div>

//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Footer = () => {
  const { connected, network } = useWallet();

  return (
    <footer className="bg-[#1A1A1A] text-[#E0E0E0] border-t-2 border-[#D94F4F] pt-12 pb-8 mt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP REWIND MAIN GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUMN 1: PLATFORM MANIFESTO */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-[#D94F4F]">ReWear</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              A decentralized fashion barter ecosystem empowering community closets. Swap garments, minimize textile waste, and log secure transaction receipts natively on the blockchain ledger.
            </p>
          </div>

          {/* COLUMN 2: MARKETPLACE DIRECT NAVIGATION */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#D94F4F] tracking-widest mb-3">
              Marketplace
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/browse" className="hover:text-white transition-colors duration-200">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link to="/product-design" className="hover:text-white transition-colors duration-200">
                  Upload Garment
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="hover:text-white transition-colors duration-200">
                  My Wardrobe Closet
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: TRANSACTIONAL UTILITIES */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#D94F4F] tracking-widest mb-3">
              Dashboard Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/swap-requests" className="hover:text-white transition-colors duration-200">
                  Swap Registry Panel
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors duration-200">
                  Account Sign In
                </Link>
              </li>
              <li>
                <a href="https://aptoslabs.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                  Aptos Ledger Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: DYNAMIC WEB3 NETWORK HUB VALIDATION STATUS STATUS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-[#D94F4F] tracking-widest mb-1">
              Web3 Node Metrics
            </h3>
            <div className="bg-[#242424] p-3 rounded-xl border border-gray-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Ledger Grid Status:</span>
                <span className="text-green-500 font-bold animate-pulse">● Online</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Active Pipeline:</span>
                {connected ? (
                  <span className="text-green-400 font-semibold uppercase tracking-wide text-[10px] bg-green-950/50 px-2 py-0.5 rounded border border-green-900">
                    {network?.name || "Testnet"} Ready
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold uppercase tracking-wide text-[10px] bg-amber-950/50 px-2 py-0.5 rounded border border-amber-900">
                    Wallet Detached
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA ACCREDITATION STANDARDS BAR */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ReWear Marketplace Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Security Protocol Encryption</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">AIP-62 Standards Aligned</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
