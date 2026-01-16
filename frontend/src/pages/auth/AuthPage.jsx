// import { useState } from "react";
// import { signup } from "../../services/authService";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";
// import bg from "../../assets/book_background_3.jpg"; // Using Login Page Background

// export default function AuthPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showRules, setShowRules] = useState(false);

//   /* Password Validation Logic */
//   const rules = {
//     length: password.length >= 6,
//     uppercase: /[A-Z]/.test(password),
//     number: /[0-9]/.test(password),
//   };

//   const allRulesMet = rules.length && rules.uppercase && rules.number;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!allRulesMet || password !== confirmPassword) return;

//     setLoading(true);
//     try {
//       await signup(email, password);
//       alert("Signup successful! Please login.");
//       navigate("/login");
//     } catch {
//       setError("Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const RuleItem = ({ valid, label }) => (
//     <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tight">
//       <span className={valid ? "text-green-500" : "text-gray-300"}>
//         {valid ? "✔" : "○"}
//       </span>
//       <span className={valid ? "text-gray-700" : "text-gray-400"}>{label}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
//       <Navbar />

//       <main
//         className="flex-grow relative bg-cover bg-center flex items-center justify-center py-12" // Matched Login Padding
//         style={{ backgroundImage: `url(${bg})` }}
//       >
//         {/* Soft Glassmorphism Overlay */}
//         <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

//         {/* Main Wrapper - Matched Login Container exactly */}
//         <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 px-8 md:px-16 lg:px-20">
          
//           {/* LEFT SECTION - Smaller/Refined */}
//           <div className="hidden lg:flex flex-col justify-center space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-[1.1]">
//                 Join the <br />
//                 <span className="font-serif italic font-semibold text-indigo-800 drop-shadow-sm">
//                   LibraryHub
//                 </span>
//               </h1>
//               <div className="h-1.5 w-24 bg-indigo-600 rounded-full"></div>
//             </div>

//             <p className="text-xl text-gray-700 max-w-lg leading-relaxed italic">
//               "A reader lives a thousand lives before he dies..." Create your account and begin your journey today.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               {["Free Access", "Reading Lists", "Community"].map((tag, i) => (
//                 <div key={i} className="bg-white/60 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest text-indigo-900 shadow-sm">
//                   {tag}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SIGNUP CARD */}
//           <div className="flex justify-center items-center">
//             <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 px-10 py-12 lg:px-14">
//               <div className="text-center mb-10">
//                 <h2 className="text-4xl font-bold tracking-tight text-gray-900">Sign Up</h2>
//                 <p className="text-gray-500 mt-3 font-medium">Create your account to continue</p>
//               </div>

//               {error && (
//                 <div className="mb-6 p-4 text-sm bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center gap-2">
//                   <span>⚠️</span> {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* EMAIL */}
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-tight">Email Address</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
//                     placeholder="name@example.com"
//                     required
//                   />
//                 </div>

//                 {/* PASSWORD with Floating Requirements Above */}
//                 <div className="relative">
//                   {/* Floating Tooltip: Above field, disappears when rules met */}
//                   {showRules && !allRulesMet && (
//                     <div className="absolute bottom-full mb-4 left-0 w-full bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2 z-30">
//                       <p className="text-[10px] font-black text-indigo-700 uppercase mb-3 tracking-widest">Requirements:</p>
//                       <div className="space-y-2">
//                         <RuleItem valid={rules.length} label="6+ characters" />
//                         <RuleItem valid={rules.uppercase} label="Uppercase letter" />
//                         <RuleItem valid={rules.number} label="At least one number" />
//                       </div>
//                       {/* Triangle Pointer */}
//                       <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
//                     </div>
//                   )}

//                   <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-tight">Password</label>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onFocus={() => setShowRules(true)}
//                     onBlur={() => setShowRules(false)}
//                     className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>

//                 {/* CONFIRM PASSWORD */}
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-tight">Confirm Password</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`w-full px-5 py-4 rounded-xl border transition-all outline-none ${
//                       confirmPassword && password !== confirmPassword
//                         ? "border-red-400 bg-red-50/30"
//                         : "border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600"
//                     }`}
//                     placeholder="••••••••"
//                     required
//                   />
//                   {confirmPassword && password !== confirmPassword && (
//                     <p className="text-red-500 text-xs font-bold mt-2 ml-1 uppercase">Passwords don't match</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading || !allRulesMet || password !== confirmPassword}
//                   className="w-full py-4 bg-indigo-700 text-white rounded-2xl font-bold text-lg hover:bg-indigo-800 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
//                 >
//                   {loading ? "Verifying..." : "Sign Up"}
//                 </button>
//               </form>

//               <div className="mt-10 pt-8 border-t border-gray-100 text-center">
//                 <p className="text-gray-500 font-medium">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-all cursor-pointer decoration-2 underline-offset-4"
//                   >
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function AuthPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  /* Password Validation Logic */
  const rules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const allRulesMet = rules.length && rules.uppercase && rules.number;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allRulesMet || password !== confirmPassword) return;

    setLoading(true);
    try {
      await signup(email, password);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const RuleItem = ({ valid, label }) => (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tight">
      <span className={valid ? "text-green-500" : "text-gray-300"}>
        {valid ? "✔" : "○"}
      </span>
      <span className={valid ? "text-gray-700" : "text-gray-400"}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
      <Navbar />

      <main className="flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Books */}
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

          {/* Library Shelf Pattern */}
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
                  Welcome to <br />
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
                Create your account and dive into a world of stories. Track your progress,
                discover new authors, and manage your digital shelf effortlessly.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-md">
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-indigo-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    10,000+ curated books
                  </span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-purple-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    🔍
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Smart & fast search
                  </span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-pink-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Borrowing history tracking
                  </span>
                </div>
                <div className="group flex items-center gap-4 bg-white/80 backdrop-blur-lg border border-blue-100 px-6 py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    ⚡
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Smooth & secure access
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Signup Card */}
            <div className="flex justify-center items-center pr-8 pb-8">
              <div className="w-full max-w-lg relative">
                {/* Gradient Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-xl"></div>

                {/* Main Card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 px-8 py-10 lg:px-12 lg:py-12">
                  {/* Header with Icon */}
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
                          d="M18 13.482a4 4 0 01-3.247 3.518l-.683.16a6.5 6.5 0 01-5.763-10.482l.685-.16a4 4 0 013.248 3.518L12 10.5a4 4 0 01-.017 3.482M6 10.5a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Sign Up
                    </h2>
                    <p className="text-gray-600 font-medium">
                      Create your account to continue
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 text-sm bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center gap-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      {showRules && !allRulesMet && (
                        <div className="absolute bottom-full mb-4 left-0 w-full bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2 z-30">
                          <p className="text-[10px] font-black text-indigo-700 uppercase mb-3 tracking-widest">Requirements:</p>
                          <div className="space-y-2">
                            <RuleItem valid={rules.length} label="6+ characters" />
                            <RuleItem valid={rules.uppercase} label="Uppercase letter" />
                            <RuleItem valid={rules.number} label="At least one number" />
                          </div>
                          {/* Triangle Pointer */}
                          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
                        </div>
                      )}
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowRules(true)}
                        onBlur={() => setShowRules(false)}
                        placeholder="••••••••"
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none pr-14 transition-all placeholder:text-gray-400 text-gray-800 font-medium"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full px-5 py-4 rounded-xl border-2 transition-all outline-none ${
                          confirmPassword && password !== confirmPassword
                            ? "border-red-400 bg-red-50/50 focus:ring-red-100 focus:border-red-500"
                            : "border-gray-200 bg-white focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                        } placeholder:text-gray-400 text-gray-800 font-medium`}
                        required
                      />
                      {confirmPassword && password !== confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          Passwords don't match
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading || !allRulesMet || password !== confirmPassword}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600 font-medium">
                      Already have an account?{" "}
                      <button
                        onClick={() => navigate("/login")}
                        className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        Sign In →
                      </button>
                    </p>
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
