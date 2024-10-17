import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MovieForm = ({ movieData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    url_video: '',
    name: '',
    description: '',
    country: '',
    director: '',
    producer: '',
    duration: '',
    release_date: '',
    subtitles: '',
    age_limit: ''
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (movieData) {
      setFormData({
        id: movieData._id,
        url_video: movieData.url_video,
        name: movieData.name,
        description: movieData.description,
        country: movieData.country,
        director: movieData.director,
        producer: movieData.producer,
        duration: movieData.duration,
        release_date: movieData.release_date,
        subtitles: movieData.subtitles,
        age_limit: movieData.age_limit
      });
    }
  }, [movieData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    onSubmit(formDataToSend, isEdit);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
  
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onCancel]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isVisible ? 'hidden' : 'block'}`}>
      <div ref={modalRef} className="bg-[#1d1d1d] p-6 rounded-lg shadow-lg shadow-blue-500/50 w-full max-w-4xl">
        <h2 className="text-white font-bold text-xl uppercase mb-4">{movieData ? 'Cập nhật phim' : 'Thêm phim'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-2">
              <label className="block mb-1 text-white">Tên phim: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên phim"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">URL Video</label>
              <input
                type="text"
                name="url_video"
                value={formData.url_video}
                onChange={handleChange}
                placeholder="URL Video"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Quốc gia</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Quốc gia"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Đạo diễn</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                placeholder="Đạo diễn"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Nhà sản xuất</label>
              <input
                type="text"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
                placeholder="Nhà sản xuất"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Thời lượng</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Thời lượng"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Ngày phát hành</label>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Phụ đề</label>
              <select
                name="subtitles"
                value={formData.subtitles}
                onChange={handleChange}
                className="select select-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              >
                <option value="">Chọn phụ đề</option>
                <option value="Vietsub">Vietsub</option>
                <option value="Thuyết minh">Thuyết minh</option>
                <option value="Lồng tiếng">Lồng tiếng</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Giới hạn độ tuổi</label>
              <input
                type="number"
                name="age_limit"
                value={formData.age_limit}
                onChange={handleChange}
                placeholder="Giới hạn độ tuổi"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                min="0"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-white">Hình ảnh</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleChange}
                className="input input-bordered w-full text-white bg-gray-800 border-gray-600"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-white">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả"
              className="textarea textarea-bordered w-full bg-gray-800 text-white border-gray-600"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="p-2 bg-[#0728dd] rounded-md mr-2">
              {movieData ? 'Cập nhật phim' : 'Thêm phim'}
            </button>
            <button type="button" className="p-2 bg-red-600 rounded-md " onClick={onCancel}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Define PropTypes for MovieForm
MovieForm.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    url_video: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    director: PropTypes.string,
    producer: PropTypes.string,
    duration: PropTypes.string,
    release_date: PropTypes.string,
    subtitles: PropTypes.string,
    age_limit: PropTypes.number
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default MovieForm;
