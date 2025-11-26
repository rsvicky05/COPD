// src/App.jsx
import Layout from "./components/Layout";
import Home from "./pages/Home"

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;




// react_client/src/App.jsx
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0] || null);
//     setResult(null);
//   };

//   const handlePredict = async () => {
//     if (!file) {
//       alert("Select an audio file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:5000/api/predict",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       setResult({ error: "Prediction failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>Lung Sound Disease Prediction (Demo)</h1>
//       <p style={{ color: "red", fontSize: "0.9rem" }}>
//         Educational demo only. Not for real medical diagnosis.
//       </p>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={handleFileChange}
//         style={{ display: "block", marginBottom: "1rem" }}
//       />

//       <button onClick={handlePredict} disabled={!file || loading}>
//         {loading ? "Predicting..." : "Predict"}
//       </button>

//       {result && (
//         <pre style={{ marginTop: "2rem", background: "#fc0101ff", padding: "1rem" }}>
//           {JSON.stringify(result, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }

// export default App;





// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

