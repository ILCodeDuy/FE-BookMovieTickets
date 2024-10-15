import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovieForm = ({ movieData, onSubmit, onCancel }) => {
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

  // Update formData if editing a movie
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
    if (name === 'img' || name === 'img_video') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra xem đang edit hay tạo mới bằng cách dựa vào id của movieData
    const isEdit = !!formData.id;
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    // Gửi cả dữ liệu isEdit để biết có phải đang edit hay không
    onSubmit(formDataToSend, isEdit);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4 text-black">
      <div className="mb-2">
        <label className="block mb-1 text-white">Tên phim</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên phim"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-white">Hình ảnh</label>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleChange}
          className="input input-bordered w-full text-white"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-white">Hình ảnh video</label>
        <input
          type="file"
          name="img_video"
          accept="image/*"
          onChange={handleChange}
          className="input input-bordered w-full text-white"
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
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-white">Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Mô tả"
          className="textarea textarea-bordered w-full"
          required
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-white">Phụ đề</label>
        <select
          name="subtitles"
          value={formData.subtitles}
          onChange={handleChange}
          className="select select-bordered w-full"
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
          className="input input-bordered w-full"
          min="0"
        />
      </div>
      <button type="submit" className="btn btn-primary rounded-md p-2 bg-green-400 mr-2 text-white">
        {movieData ? 'Cập nhật phim' : 'Thêm phim'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Hủy
      </button>
    </form>
  );
};

// Định nghĩa PropTypes cho MovieForm
MovieForm.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    url_video: PropTypes.string,
    description: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    subtitles: PropTypes.string,
    age_limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default MovieForm;
