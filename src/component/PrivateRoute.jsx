import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
};

export default PrivateRoute;




// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import api from "../api/axios";
// import { useSelector } from "react-redux";
// import { store } from "../redux/store";


// const PrivateRoute = ({ children }) => {
//   const [status, setStatus] = useState("loading");
//   const {user}=useSelector(store=>store.auth);

//   useEffect(() => {
//     let mounted = true;

//     const verifyUser = async () => {
//       try {
//         await api.get("/api/user/me");
//         if (mounted) setStatus("authenticated");
//       } catch {
//         if (mounted) setStatus("unauthenticated");
//       }
//     };

//     verifyUser();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Checking authentication...</p>
//       </div>
//     );
//   }

//   if (status === "unauthenticated") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
