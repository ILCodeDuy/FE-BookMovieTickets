import { useState } from 'react';
import MovieForm from '../../../components/Admin/Movies/MovieForm';
import MovieList from '../../../components/Admin/Movies/MovieList';
import {
  useGetAllMoviesQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from '../../../services/Movies/movies.services';

const MoviesAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // Fetch movies from API using RTK Query
  const { data, error, isLoading, refetch } = useGetAllMoviesQuery();
  // Set movies to an empty array if data is not an array
  const movies = Array.isArray(data?.movies) ? data.movies : [];

  // Hooks for mutations (add, update, delete)
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  // Handle form submission (for adding or updating a movie)
  const handleSubmitMovie = async (formDataToSend, isEdit) => {
    try {
      if (isEdit) {
        // Nếu đang edit thì cập nhật
        await updateMovie({ id: formDataToSend.get('id'), updatedData: formDataToSend });
      } else {
        // Nếu không thì thêm mới
        await addMovie(formDataToSend);
      }
      refetch(); // Refresh danh sách phim sau khi thao tác thành công
      setIsEditing(false);
      setEditingMovie(null);
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  // Handle movie deletion
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      refetch(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  // Handle editing a movie
  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movies Admin</h1>

      {isEditing ? (
        <MovieForm
          movieData={editingMovie}
          onSubmit={handleSubmitMovie}
          onCancel={() => {
            setIsEditing(false);
            setEditingMovie(null);
          }}
        />
      ) : (
        <div>
          <button
            className="btn btn-primary mb-4"
            onClick={() => setIsEditing(true)}
          >
            Add New Movie
          </button>
          <MovieList
            movies={movies}  // Ensure movies is an array
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
          />
          {error && <div className="text-red-500">Error fetching movies: {error.message}</div>}
          {isLoading && <div>Loading...</div>}
        </div>
      )}
    </div>
  );
};

export default MoviesAdmin;
