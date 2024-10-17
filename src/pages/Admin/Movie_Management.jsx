import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useGetAllMoviesQuery } from "../../services/Movies/movies.services";
import { useGetAllMovieGenreQuery } from "../../services/Genre/genre_movies.service"; // Import all genres query
import { formatDate } from "../../utils/formatDate";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { AiOutlineSearch } from "react-icons/ai";

const Movie_Management = () => {
  const { data: movieData } = useGetAllMoviesQuery();
  const { data: movieGenreData } = useGetAllMovieGenreQuery();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movieData?.movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredMovies?.length || 0) / moviesPerPage);

  const handleAddMovie = () => {
    console.log("Thêm phim mới");
  };

  const handleEditMovie = (id) => {
    console.log("Sửa phim có ID:", id);
  };

  const handleDeleteMovie = (id) => {
    console.log("Xóa phim có ID:", id);
  };

  const handleSelectMovie = (id) => {
    setSelectedMovies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((movieId) => movieId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDeleteSelectedMovies = () => {
    console.log("Xóa các phim đã chọn:", selectedMovies);
    setSelectedMovies([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMoviesPerPageChange = (e) => {
    setMoviesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginatedMovies = filteredMovies?.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage,
  );

  // Function to get genre names by movie ID
  const getGenreNames = (movie) => {
    // Lọc các thể loại của phim với movie_id truyền vào
    const movieGenreRecords = movieGenreData?.genres.filter(
      (record) => record.movie_id._id === movie._id,
    );
    // Trả về tên các thể loại hoặc 'Đang cập nhật' nếu không tìm thấy
    return movieGenreRecords.length > 0
      ? movieGenreRecords.map((genre) => genre.genre_id.name).join(", ")
      : "Đang cập nhật";
  };

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách phim</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
          onClick={handleAddMovie}
        >
          + Thêm phim
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select
            id="entries"
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={moviesPerPage}
            onChange={handleMoviesPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedMovies.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedMovies.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedMovies}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-md bg-[#2d2d2d] p-1 text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedMovies(
                      e.target.checked
                        ? paginatedMovies.map((movie) => movie._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedMovies?.length > 0 &&
                    selectedMovies.length === paginatedMovies.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Phim</th>
              <th className="px-4 py-3 text-left text-white">Mô tả</th>
              <th className="px-4 py-3 text-left text-white">Thể loại</th>
              <th className="px-4 py-3 text-left text-white">
                Ngày khởi chiếu
              </th>
              <th className="px-4 py-3 text-left text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedMovies?.map((movie) => (
              <tr key={movie._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectMovie(movie._id)}
                    checked={selectedMovies.includes(movie._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex">
                    <img
                      src={movie.img}
                      alt={movie.name}
                      className="w-[70px]"
                    />
                    <div className="ml-2">
                      <h2 className="text-md font-medium text-white">
                        {movie.name}
                      </h2>
                      <p className="mt-1 text-xs">{movie.duration} phút</p>
                      <p className="mt-8 text-sm">
                        ({movie.country} - {movie.subtitles})
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {movie.description.slice(0, 50) + "..."}
                </td>
                <td className="px-4 py-2">{getGenreNames(movie)}</td>
                <td className="px-4 py-2">{formatDate(movie.release_date)}</td>
                <td className="px-4 py-2">
                  <Button
                    className="mr-1 rounded-sm bg-[#28ce36] p-2 text-white"
                    onClick={() => handleEditMovie(movie._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteMovie(movie._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Hiển thị trang {currentPage} / {totalPages}
        </div>
        <div className="flex items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className=" bg-[#2c2c2c] py-1 px-2 text-white"
          >
            Previous
          </Button>

          <div className="flex">
            {currentPage > 1 && (
              <Button
                onClick={() => handlePageChange(1)}
                className=" bg-gray-500 text-white"
              >
                1
              </Button>
            )}
            {currentPage > 2 && <span className="mx-1">...</span>}

            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const pageIndex = Math.max(1, currentPage - 2) + index; // Hiển thị 5 trang gần nhất
              if (pageIndex > totalPages) return null;

              return (
                <Button
                  key={pageIndex}
                  onClick={() => handlePageChange(pageIndex)}
                  className={`mx-1 ${currentPage === pageIndex ? "bg-red-600 py-1 px-2 text-white" : "bg-black py-1 px-2 text-red-600"}`}
                >
                  {pageIndex}
                </Button>
              );
            })}

            {currentPage < totalPages - 1 && <span className="mx-1">...</span>}
            {currentPage < totalPages && (
              <Button
                onClick={() => handlePageChange(totalPages)}
                className="bg-gray-500 text-white"
              >
                {totalPages}
              </Button>
            )}
          </div>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className=" bg-black py-1 px-2 text-red-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Movie_Management;
