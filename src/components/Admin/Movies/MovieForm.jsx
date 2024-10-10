import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovieForm = ({ movieData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    img: '',
    name: '',
    description: '',
    director: '',
    producer: '',
    duration: '',
    release_date: ''
  });

  // Update formData if editing a movie
  useEffect(() => {
    if (movieData) {
      setFormData(movieData);
    }
  }, [movieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Movie Name"
        className="input input-bordered mb-2 w-full"
        required
      />
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
        placeholder="Image URL"
        className="input input-bordered mb-2 w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="textarea textarea-bordered mb-2 w-full"
        required
      />
      <input
        type="text"
        name="director"
        value={formData.director}
        onChange={handleChange}
        placeholder="Director"
        className="input input-bordered mb-2 w-full"
        required
      />
      <input
        type="text"
        name="producer"
        value={formData.producer}
        onChange={handleChange}
        placeholder="Producer"
        className="input input-bordered mb-2 w-full"
        required
      />
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration"
        className="input input-bordered mb-2 w-full"
        required
      />
      <input
        type="date"
        name="release_date"
        value={formData.release_date}
        onChange={handleChange}
        className="input input-bordered mb-2 w-full"
        required
      />
      <button type="submit" className="btn btn-primary mr-2">
        {movieData ? 'Update Movie' : 'Add Movie'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

// Định nghĩa PropTypes cho MovieForm
MovieForm.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default MovieForm;
