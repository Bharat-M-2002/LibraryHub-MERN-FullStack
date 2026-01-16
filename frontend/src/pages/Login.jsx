// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import { GoogleLogin } from "@react-oauth/google";
// import { googleLogin, fetchMe } from "../services/authService";

// function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [isAdmin, setIsAdmin] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email is invalid";

//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setIsLoading(true);
//     try {
//       await login(formData.email, formData.password, isAdmin);
//       navigate(isAdmin ? "/admin" : "/");
//     } catch (error) {
//       setErrors({ form: "Login failed. Please check your credentials." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       setIsLoading(true);
//       await googleLogin(credentialResponse.credential);
//       const user = await fetchMe();
//       navigate(
//         user.role === "ADMIN" || user.role === "ROLE_ADMIN" ? "/admin" : "/"
//       );
//     } catch (error) {
//       setErrors({
//         form: "Google login failed. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
//       <Navbar />

//       <main className="flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {/* Floating Books */}
//           <div className="absolute top-20 left-10 w-16 h-20 bg-gradient-to-br from-rose-400 to-pink-500 opacity-20 rounded-lg shadow-2xl transform -rotate-12 animate-pulse"></div>
//           <div
//             className="absolute top-40 right-20 w-12 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 rounded-lg shadow-2xl transform rotate-6 animate-pulse"
//             style={{ animationDelay: "1s" }}
//           ></div>
//           <div
//             className="absolute bottom-32 left-1/4 w-14 h-18 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20 rounded-lg shadow-2xl transform -rotate-6 animate-pulse"
//             style={{ animationDelay: "0.5s" }}
//           ></div>
//           <div
//             className="absolute bottom-20 right-1/3 w-16 h-20 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 rounded-lg shadow-2xl transform rotate-12 animate-pulse"
//             style={{ animationDelay: "1.5s" }}
//           ></div>

//           {/* Library Shelf Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div
//               className="h-full w-full"
//               style={{
//                 backgroundImage:
//                   "repeating-linear-gradient(90deg, #4f46e5 0px, #4f46e5 2px, transparent 2px, transparent 80px)",
//               }}
//             ></div>
//           </div>
//         </div>

//         <div className="relative z-10 min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
//           <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
//             {/* LEFT SECTION */}
//             <div className="hidden lg:flex flex-col justify-center space-y-10">
//               <div className="space-y-6">
//                 <h1 className="text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-tight">
//                   Welcome Back to <br />
//                   <span className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-lg">
//                     LibraryHub
//                   </span>
//                 </h1>
//                 <div className="flex gap-2">
//                   <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
//                   <div className="h-1.5 w-12 bg-purple-500 rounded-full"></div>
//                   <div className="h-1.5 w-8 bg-pink-500 rounded-full"></div>
//                 </div>
//               </div>

//               <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
//                 Your gateway to a world of stories. Track your progress,
//                 discover new authors, and manage your digital shelf effortlessly.
//               </p>

//               <div className="grid grid-cols-1 gap-4 max-w-md">
//                 <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-indigo-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl group-hover:scale-110 transition-transform">
//                     📚
//                   </div>
//                   <span className="text-lg font-semibold text-gray-800">
//                     10,000+ curated books
//                   </span>
//                 </div>
//                 <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-purple-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl group-hover:scale-110 transition-transform">
//                     🔍
//                   </div>
//                   <span className="text-lg font-semibold text-gray-800">
//                     Smart & fast search
//                   </span>
//                 </div>
//                 <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-pink-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl group-hover:scale-110 transition-transform">
//                     📖
//                   </div>
//                   <span className="text-lg font-semibold text-gray-800">
//                     Borrowing history tracking
//                   </span>
//                 </div>
//                 <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-blue-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl group-hover:scale-110 transition-transform">
//                     ⚡
//                   </div>
//                   <span className="text-lg font-semibold text-gray-800">
//                     Smooth & secure access
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SECTION - Login Card */}
//             <div className="flex justify-center items-center">
//               <div className="w-full max-w-lg relative">
//                 {/* Gradient Glow */}
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-xl"></div>

//                 {/* Main Card */}
//                 <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 px-8 py-10 lg:px-12 lg:py-12">
//                   {/* Header with Icon */}
//                   <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl">
//                       <svg
//                         className="w-9 h-9 text-white"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2.5}
//                           d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                         />
//                       </svg>
//                     </div>
//                     <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//                       Sign In
//                     </h2>
//                     <p className="text-gray-600 font-medium">
//                       Enter your credentials to continue
//                     </p>
//                   </div>

//                   {errors.form && (
//                     <div className="mb-6 p-4 text-sm bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center gap-2">
//                       <span>⚠️</span> {errors.form}
//                     </div>
//                   )}

//                   {/* Form Fields */}
//                   <div className="space-y-5 mb-6">
//                     {/* Email */}
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="you@example.com"
//                         className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
//                       />
//                       {errors.email && (
//                         <p className="mt-1 text-sm text-red-600">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>

//                     {/* Password */}
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           placeholder="••••••••"
//                           className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none pr-14 transition-all placeholder:text-gray-400 text-gray-800 font-medium"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-indigo-600 transition-colors"
//                         >
//                           {showPassword ? "🙈" : "👁️"}
//                         </button>
//                       </div>
//                       {errors.password && (
//                         <p className="mt-1 text-sm text-red-600">
//                           {errors.password}
//                         </p>
//                       )}
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                       onClick={handleSubmit}
//                       disabled={isLoading}
//                       className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <span className="flex items-center justify-center gap-3">
//                           <svg
//                             className="animate-spin h-5 w-5"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                               fill="none"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           Verifying...
//                         </span>
//                       ) : (
//                         "Sign In"
//                       )}
//                     </button>
//                   </div>

//                   {/* Divider */}
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                       Or continue with
//                     </span>
//                     <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//                   </div>

//                   {/* Google Sign In Button */}
//                   <div className="w-full flex justify-center">
//                     <div className="w-full">
//                       <button
//                         onClick={() => {
//                           document.getElementById("google-login-btn")?.click();
//                         }}
//                         type="button"
//                         disabled={isLoading}
//                         className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <svg
//                           className="w-6 h-6 group-hover:scale-110 transition-transform"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             fill="#4285F4"
//                             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                           />
//                           <path
//                             fill="#34A853"
//                             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                           />
//                           <path
//                             fill="#FBBC05"
//                             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                           />
//                           <path
//                             fill="#EA4335"
//                             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                           />
//                         </svg>
//                         <span className="text-base">Continue with Google</span>
//                       </button>

//                       <div className="hidden">
//                         <GoogleLogin
//                           onSuccess={handleGoogleLogin}
//                           onError={() =>
//                             setErrors({
//                               form: "Google login failed. Please try again.",
//                             })
//                           }
//                           theme="outline"
//                           size="large"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Footer */}
//                   <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//                     <p className="text-gray-600 font-medium">
//                       New to LibraryHub?{" "}
//                       <button
//                         onClick={() => navigate("/signup")}
//                         className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                       >
//                         Create Account →
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin, fetchMe } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoToast, setShowDemoToast] = useState(false);

  useEffect(() => {
    setShowDemoToast(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login(formData.email, formData.password, isAdmin);
      navigate(isAdmin ? "/admin" : "/");
    } catch {
      setErrors({ form: "Login failed. Please check your credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      setIsLoading(true);
      await googleLogin(tokenResponse.access_token);
      const user = await fetchMe();
      navigate(
        user.role === "ADMIN" || user.role === "ROLE_ADMIN"
          ? "/admin"
          : "/"
      );
    } catch {
      setErrors({ form: "Google login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const googleAuth = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () =>
      setErrors({ form: "Google login failed. Please try again." }),
    ux_mode: "popup",
    auto_select: false,
    prompt: "select_account",
  });

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
      <Navbar />

      <main className="flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-20 bg-gradient-to-br from-rose-400 to-pink-500 opacity-20 rounded-lg shadow-2xl transform -rotate-12 animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-12 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 rounded-lg shadow-2xl transform rotate-6 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-14 h-18 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20 rounded-lg shadow-2xl transform -rotate-6 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-16 h-20 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 rounded-lg shadow-2xl transform rotate-12 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #4f46e5 0px, #4f46e5 2px, transparent 2px, transparent 80px)",
              }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* LEFT SECTION */}
            <div className="hidden lg:flex flex-col justify-center space-y-10 pl-8">
              <div className="space-y-6">
                <h1 className="text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-tight">
                  Welcome Back to <br />
                  <span className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-lg">
                    LibraryHub
                  </span>
                </h1>
                <div className="flex gap-2">
                  <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
                  <div className="h-1.5 w-12 bg-purple-500 rounded-full"></div>
                  <div className="h-1.5 w-8 bg-pink-500 rounded-full"></div>
                </div>
              </div>

              <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                Your gateway to a world of stories. Track your progress, discover
                new authors, and manage your digital shelf effortlessly.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-md">
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-indigo-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">📚</div>
                  <span className="text-lg font-semibold text-gray-800">10,000+ curated books</span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-purple-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">🔍</div>
                  <span className="text-lg font-semibold text-gray-800">Smart & fast search</span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-pink-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">📖</div>
                  <span className="text-lg font-semibold text-gray-800">Borrowing history tracking</span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-blue-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">⚡</div>
                  <span className="text-lg font-semibold text-gray-800">Smooth & secure access</span>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Login Card */}
            <div className="flex justify-center items-center pr-8 pb-8">
              <div className="w-full max-w-lg relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-xl"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 px-8 py-10 lg:px-12 lg:py-12">
                  {showDemoToast && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                      <span>💡</span>
                      <span>Demo credentials: <strong>user1@example.com</strong> / <strong>password123</strong></span>
                      <button
                        onClick={() => setShowDemoToast(false)}
                        className="ml-auto text-blue-600 hover:text-blue-800 font-bold text-sm"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl">
                      <svg
                        className="w-9 h-9 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Sign In
                    </h2>
                    <p className="text-gray-600 font-medium">
                      Enter your credentials to continue
                    </p>
                  </div>

                  {errors.form && (
                    <div className="mb-6 p-4 text-sm bg-red-50 text-red-600 border border-red-200 rounded-xl">
                      {errors.form}
                    </div>
                  )}

                  <div className="space-y-5 mb-6">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200"
                    />

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold"
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-xs font-bold text-gray-400">
                      OR CONTINUE WITH
                    </span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <button
                    onClick={() => googleAuth()}
                    disabled={isLoading}
                    type="button"
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <button
                      onClick={() => navigate("/signup")}
                      className="font-bold text-indigo-600"
                    >
                      Create Account →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
