import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-[200px] font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have been misplaced in our library. 
            Let's help you find your way back.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Go to Home
            </Link>
            <Link
              to="/browse"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-semibold"
            >
              Browse Books
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Home
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/browse" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Browse Books
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/profile" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                My Profile
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <p className="text-gray-700 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-medium">Did you know?</span>
            <span className="ml-2">We have over 10,000 books waiting for you!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
