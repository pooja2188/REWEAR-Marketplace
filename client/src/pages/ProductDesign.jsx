// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProductDesign = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",       
//     condition: "",   
//     image: "",       
//   });

//   const [loading, setLoading] = useState(false);

//   // Handle text input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit form data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Please log in first to upload an item.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Pointing to the production server matching your MyListings dashboard
//       const res = await axios.post(
//         "https://onrender.com", 
//         {
//           title: form.title,
//           description: form.description,
//           price: Number(form.price),
//           condition: form.condition,
//           // Sending image as an array matching the item?.images?.[0] expectation in your dashboard
//           images: [form.image], 
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("✅ Item uploaded successfully!");
      
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         condition: "",
//         image: "",
//       });

//       navigate("/browse"); 
//     } catch (err) {
//       alert(err.response?.data?.error || err.response?.data?.message || "❌ Upload failed. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 py-6 sm:py-10 flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
      
//       {/* UPLOAD FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="
//           bg-white w-full max-w-sm sm:max-w-md md:max-w-lg
//           p-5 sm:p-7 md:p-8 
//           rounded-xl shadow-md 
//           space-y-4 sm:space-y-5
//         "
//       >
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#D94F4F] mb-2">
//           Upload Item
//         </h2>

//         <input
//           name="title"
//           placeholder="Title (e.g., Vintage Denim Jacket)"
//           className="w-full p-3 border rounded text-sm sm:text-base"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description (Size, material, flaws...)"
//           className="w-full p-3 border rounded text-sm sm:text-base"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             name="price"
//             type="number"
//             placeholder="Price ($)"
//             className="w-full p-3 border rounded text-sm sm:text-base"
//             value={form.price}
//             onChange={handleChange}
//             required
//           />
//           <select
//             name="condition"
//             className="w-full p-3 border rounded text-sm sm:text-base bg-white"
//             value={form.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select Condition</option>
//             <option value="New">New with Tags</option>
//             <option value="Like New">Like New</option>
//             <option value="Good">Good</option>
//             <option value="Fair">Fair / Used</option>
//           </select>
//         </div>
//         <div>
//           <input
//             name="image"
//             type="text"
//             placeholder="Image Web URL (e.g., https://example.com)"
//             className="w-full p-3 border rounded text-sm sm:text-base"
//             value={form.image}
//             onChange={handleChange}
//             required
//           />
//           <p className="text-[11px] text-gray-400 mt-1 pl-1">
//             Tip: Paste any image link from the web to test your marketplace listing immediately!
//           </p>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white py-3 rounded-md text-sm sm:text-base transition 
//             ${loading ? "bg-gray-400" : "bg-[#D94F4F] hover:bg-[#bf3f3f]"}`}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>

//       {/* LIVE IMAGE PREVIEW CARD */}
//       {form.image && (
//         <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center w-full max-w-[240px] animate-fade-in">
//           <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Preview</p>
//           <img
//             src={form.image}
//             alt="Preview"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://placeholder.com";
//             }}
//             className="w-40 h-56 object-cover rounded-xl border shadow-inner"
//           />
//           <p className="text-md font-semibold text-center mt-3 truncate w-full">
//             {form.title || "Untitled Item"}
//           </p>
//           <p className="text-sm text-gray-500">{form.condition || "No Condition Specified"}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDesign;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProductDesign = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",       
//     condition: "",   
//     image: "",       
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Please log in first to upload an item.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Fixed endpoint and added manual auth token injection
//       await axios.post(
//         "https://onrender.com", 
//         {
//           title: form.title,
//           description: form.description,
//           price: Number(form.price),
//           condition: form.condition,
//           images: [form.image], // Properly wrapped inside an array
//         },
//         {
//           headers: { 
//             Authorization: `Bearer ${token}` // Injects identity into your backend schema
//           },
//         }
//       );

//       alert("✅ Item uploaded successfully!");
//       navigate("/browse"); 
//     } catch (err) {
//       alert(err.response?.data?.error || err.response?.data?.message || "❌ Upload failed. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md space-y-4"
//       >
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#D94F4F] mb-2">
//           Upload Item
//         </h2>

//         <input
//           name="title"
//           placeholder="Title (e.g., Vintage Denim Jacket)"
//           className="w-full p-3 border rounded text-sm"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description (Size, material, flaws...)"
//           className="w-full p-3 border rounded text-sm"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             name="price"
//             type="number"
//             placeholder="Price ($)"
//             className="w-full p-3 border rounded text-sm"
//             value={form.price}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="condition"
//             className="w-full p-3 border rounded text-sm bg-white"
//             value={form.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select Condition</option>
//             <option value="New">New with Tags</option>
//             <option value="Like New">Like New</option>
//             <option value="Good">Good</option>
//             <option value="Fair">Fair / Used</option>
//           </select>
//         </div>

//         <div>
//           <input
//             name="image"
//             type="text"
//             placeholder="Image Web URL"
//             className="w-full p-3 border rounded text-sm"
//             value={form.image}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white py-3 rounded-md transition font-medium
//             ${loading ? "bg-gray-400" : "bg-[#D94F4F] hover:bg-[#bf3f3f]"}`}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductDesign;


import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProductDesign = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",       // Added to match your database schema
    condition: "",   // Maps to your database schema
    image: "",       // Changed from file list array to a text URL string field
  });

  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please log in first to upload an item.");
      return;
    }

    try {
      setLoading(true);

      // Hits your exact backend route: POST http://localhost:5000/api/products
      // Sends a clean JSON payload. Your global axios interceptor automatically injects the token.
      const res = await API.post("/products", {
        ...form,
        price: Number(form.price), // Enforces integer tracking type safety for MongoDB
      });

      alert("✅ Item uploaded successfully!");
      
      setForm({
        title: "",
        description: "",
        price: "",
        condition: "",
        image: "",
      });

      navigate("/browse"); // Redirect users straight to the updated catalog view
    } catch (err) {
      // Adjusted property path from .message to .error to align with productController responses
      alert(err.response?.data?.error || "❌ Upload failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF4F2] px-4 sm:px-6 py-6 sm:py-10 flex items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white w-full max-w-sm sm:max-w-md md:max-w-lg
          p-5 sm:p-7 md:p-8 
          rounded-xl shadow-md 
          space-y-4 sm:space-y-5 mb-6
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#D94F4F] mb-2">
          Upload Item
        </h2>

        <input
          name="title"
          placeholder="Title (e.g., Vintage Denim Jacket)"
          className="w-full p-3 border rounded text-sm sm:text-base"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description (Size, material, flaws...)"
          className="w-full p-3 border rounded text-sm sm:text-base"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price ($)"
            className="w-full p-3 border rounded text-sm sm:text-base"
            value={form.price}
            onChange={handleChange}
            required
          />

          <select
            name="condition"
            className="w-full p-3 border rounded text-sm sm:text-base bg-white"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Condition</option>
            <option value="New">New with Tags</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair / Used</option>
          </select>
        </div>

        {/* Replaced file input with standard string URL input field to match backend schema */}
        <div>
          <input
            name="image"
            type="text"
            placeholder="Image Web URL (e.g., https://example.com)"
            className="w-full p-3 border rounded text-sm sm:text-base"
            value={form.image}
            onChange={handleChange}
            required
          />
          <p className="text-[11px] text-gray-400 mt-1 pl-1">
            Tip: Paste any image link from the web to test your marketplace listing immediately!
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-md text-sm sm:text-base transition 
            ${loading ? "bg-gray-400" : "bg-[#D94F4F] hover:bg-[#bf3f3f]"}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ProductDesign;
