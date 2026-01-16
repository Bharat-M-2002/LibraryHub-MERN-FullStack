import { useState, useEffect } from 'react';

const BookForm = ({ book = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    publishedYear: '',
    quantity: '',
    description: '',
    coverImage: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'History',
    'Biography',
    'Self-Help',
    'Business',
    'Arts',
    'Philosophy'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Valid quantity is required';
    if (!formData.publishedYear || formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Valid year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {book ? 'Edit Book' : 'Add New Book'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all ${
                errors.author ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ISBN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all ${
                errors.isbn ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
              placeholder="Enter ISBN number"
            />
            {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white ${
                errors.category ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              placeholder="Enter publisher name"
            />
          </div>

          {/* Published Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Published Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all ${
                errors.publishedYear ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
              placeholder="Enter year"
            />
            {errors.publishedYear && <p className="text-red-500 text-sm mt-1">{errors.publishedYear}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all ${
                errors.quantity ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
              }`}
              placeholder="Enter quantity"
              min="1"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
            placeholder="Enter book description..."
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
          >
            {book ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
