import { useState, useEffect } from 'react';
import BookTable from '../../components/admin/BookTable';
import BookForm from '../../components/admin/BookForm';
import Loader from '../../components/common/Loader';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Mock data - Replace with API call later
  useEffect(() => {
    setTimeout(() => {
      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          isbn: '978-0-7432-7356-5',
          category: 'Fiction',
          publisher: 'Scribner',
          publishedYear: 1925,
          quantity: 5,
          description: 'A classic American novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.',
          coverImage: ''
        },
        {
          id: 2,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          isbn: '978-0-06-112008-4',
          category: 'Fiction',
          publisher: 'J.B. Lippincott & Co.',
          publishedYear: 1960,
          quantity: 3,
          description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
          coverImage: ''
        },
        {
          id: 3,
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          isbn: '978-0-553-10953-5',
          category: 'Science',
          publisher: 'Bantam Dell',
          publishedYear: 1988,
          quantity: 8,
          description: 'From the Big Bang to black holes, Stephen Hawking explores the universe in accessible terms.',
          coverImage: ''
        },
        {
          id: 4,
          title: 'Steve Jobs',
          author: 'Walter Isaacson',
          isbn: '978-1-4516-4853-9',
          category: 'Biography',
          publisher: 'Simon & Schuster',
          publishedYear: 2011,
          quantity: 6,
          description: 'The authorized biography of Steve Jobs, based on exclusive interviews.',
          coverImage: ''
        },
        {
          id: 5,
          title: 'Sapiens',
          author: 'Yuval Noah Harari',
          isbn: '978-0-06-231609-7',
          category: 'History',
          publisher: 'Harper',
          publishedYear: 2015,
          quantity: 10,
          description: 'A brief history of humankind, exploring how Homo sapiens came to dominate the world.',
          coverImage: ''
        },
        {
          id: 6,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '978-0-13-235088-4',
          category: 'Technology',
          publisher: 'Prentice Hall',
          publishedYear: 2008,
          quantity: 0,
          description: 'A handbook of agile software craftsmanship with practical advice for writing clean code.',
          coverImage: ''
        },
        {
          id: 7,
          title: '1984',
          author: 'George Orwell',
          isbn: '978-0-452-28423-4',
          category: 'Fiction',
          publisher: 'Signet Classic',
          publishedYear: 1949,
          quantity: 7,
          description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
          coverImage: ''
        },
        {
          id: 8,
          title: 'The Pragmatic Programmer',
          author: 'Andrew Hunt',
          isbn: '978-0-13-595705-9',
          category: 'Technology',
          publisher: 'Addison-Wesley',
          publishedYear: 2019,
          quantity: 4,
          description: 'Your journey to mastery in software development.',
          coverImage: ''
        }
      ];
      
      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.id !== bookToDelete.id));
      setShowDeleteModal(false);
      setBookToDelete(null);
      // TODO: Add API call to delete book
      alert(`Book "${bookToDelete.title}" deleted successfully!`);
    }
  };

  const handleFormSubmit = (formData) => {
    if (selectedBook) {
      // Update existing book
      setBooks(books.map(book => 
        book.id === selectedBook.id ? { ...book, ...formData } : book
      ));
      alert('Book updated successfully!');
    } else {
      // Add new book
      const newBook = {
        id: books.length + 1,
        ...formData
      };
      setBooks([...books, newBook]);
      alert('Book added successfully!');
    }
    setShowForm(false);
    setSelectedBook(null);
    // TODO: Add API call to save book
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!showForm && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Manage Books
              </h1>
              <p className="text-gray-600">Add, edit, or remove books from the library</p>
            </div>
            <button
              onClick={handleAddBook}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Book
            </button>
          </div>
        )}

        {/* Content */}
        {showForm ? (
          <BookForm
            book={selectedBook}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <BookTable
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform scale-100 animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Book?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">"{bookToDelete?.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
