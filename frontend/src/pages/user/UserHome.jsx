import { Link } from 'react-router-dom';
import bookBg from '../../assets/book_background_2.jpg';

const UserHome = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Browse Books',
      description: 'Explore our vast collection of books across various genres and categories.',
      gradient: 'from-violet-400 to-indigo-400',
      bgGradient: 'from-violet-50 to-indigo-100',
      link: '/browse'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Borrow Books',
      description: 'Easily borrow your favorite books and manage your reading list.',
      gradient: 'from-emerald-400 to-teal-400',
      bgGradient: 'from-emerald-50 to-teal-100',
      link: '/browse'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Track History',
      description: 'Keep track of your borrowed books and reading history.',
      gradient: 'from-fuchsia-400 to-pink-400',
      bgGradient: 'from-fuchsia-50 to-pink-100',
      link: '/profile'
    }
  ];

  const popularCategories = [
    { name: 'Fiction', icon: '📚', color: 'bg-violet-400' },
    { name: 'Science', icon: '🔬', color: 'bg-emerald-400' },
    { name: 'Technology', icon: '💻', color: 'bg-indigo-400' },
    { name: 'History', icon: '📜', color: 'bg-orange-400' },
    { name: 'Biography', icon: '👤', color: 'bg-rose-400' },
    { name: 'Business', icon: '💼', color: 'bg-sky-400' }
  ];

  const stats = [
    { label: 'Total Books', value: '50,000+', icon: '📚' },
    { label: 'Active Members', value: '5,000+', icon: '👥' },
    { label: 'Books Borrowed', value: '50,000+', icon: '📖' },
    { label: 'Categories', value: '50+', icon: '🏷️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-violet-100 to-purple-200 text-slate-900">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${bookBg})`
        }}
      >
        <div className="absolute inset-0 bg-violet-300/55 mix-blend-multiply"></div>

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4">
              Welcome to LibraryHub
            </h1>
            <p className="text-lg md:text-2xl text-violet-50/95 mb-8 max-w-3xl mx-auto drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
              Your gateway to endless knowledge. Discover, borrow, and explore thousands of books at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="px-8 py-3 rounded-2xl
                           bg-white/95 text-violet-700
                           hover:bg-violet-50
                           font-semibold text-lg
                           shadow-lg shadow-violet-400/40
                           border border-violet-100
                           transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Books
              </Link>

              <Link
                to="/profile"
                className="px-8 py-3 rounded-2xl
                           bg-violet-600/90 text-white
                           hover:bg-violet-500
                           font-semibold text-lg
                           shadow-lg shadow-violet-500/40
                           border border-violet-400/60
                           transition-all duration-200 hover:-translate-y-0.5"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-10 relative z-10">
        {/* Added mt-6 so lavender card is not touching the hero edge */}
        <div className="mt-6">
          <div className="bg-purple-50/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-violet-100">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 -mt-20 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-violet-100/70 text-center transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div className="py-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Everything You Need
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  LibraryHub provides a seamless experience for all your reading needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.link}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-white h-full`}>
                      <div className={`inline-flex p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-200`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex items-center text-violet-600 font-semibold group-hover:translate-x-1 transition-transform">
                        Learn More
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div className="py-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Popular Categories
                </h2>
                <p className="text-slate-600 text-lg">
                  Explore books from your favorite genres
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/browse?category=${category.name}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-violet-100 text-center">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="py-10">
              <div className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 rounded-3xl p-10 md:p-12 text-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/25"></div>
                <div className="absolute top-0 right-0 w-52 h-52 bg-white/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/50 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Ready to Start Reading?
                  </h2>
                  <p className="text-slate-700 text-lg mb-7 max-w-2xl mx-auto">
                    Join thousands of readers and start your literary journey today
                  </p>
                  <Link
                    to="/browse"
                    className="inline-block px-8 py-3 bg-slate-900 text-violet-100 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    Explore Books Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
