import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";
import { useGetMovieByIdQuery } from "../../services/Movies/movies.services";
import { formatDate } from "../../utils/formatDate";
import VideoPlayer from "../../components/Movie/VideoPlayer";
const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieData } = useGetMovieByIdQuery(id);

  const movieDetails = {
    _id: {
      $oid: "670750c1514ae3f24c2463fa",
    },
    image:
      "https://i.pinimg.com/564x/d1/34/48/d13448402555953b83d51f82d67e466a.jpg",
    nameMovie: "Stardust",
    description:
      "Một chàng trai trẻ đi vào một thế giới thần tiên để tìm kiếm một ngôi sao đã rơi, và phát hiện ra nhiều điều kỳ diệu.",
    director: "Matthew Vaughn",
    price: "68000",
    actor: "Charlie Cox , SupperLater",
    producer: "Matthew Vaughn",
    rating: "7.7/10",
    genre: "Hành động , Kịch tính",
    duration: "127 phút",
    title: "Stardust",
    agebig: "16+",
    country: "Mỹ",
    quote: "Vietsub",
    release_date: {
      $date: "2024-10-12T00:00:00.000Z",
    },
    __v: 0,
    hotdeal: "2",

    noidung: (
      <>
        Stardust là một bộ phim khoa học viễn tưởng đầy kịch tính do Christopher
        Nolan đạo diễn. Câu chuyện xoay quanh Dom Cobb, một kẻ đánh cắp những bí
        mật quan trọng từ những giấc mơ của người khác.
        <br /> <br />
        Cobb là một chuyên gia trong lĩnh vực xâm nhập giấc mơ, nơi mà con người
        có thể bước vào thế giới tâm trí của nhau. Tuy nhiên, cuộc sống của anh
        bị đảo lộn khi một tổ chức bí mật buộc anh phải thực hiện một nhiệm vụ
        khó khăn nhất: thay vì đánh cắp một ý tưởng, anh phải cấy ghép một ý
        tưởng vào tâm trí của một CEO lớn.
        <br /> <br />
        Cobb cùng với nhóm đồng đội của mình phải đối mặt với những thử thách
        khắc nghiệt trong các giấc mơ đa tầng, nơi mà thời gian và không gian
        trở nên méo mó.
        <br /> <br />
        Họ phải chiến đấu không chỉ với kẻ thù bên ngoài mà còn với những cơn ác
        mộng từ chính quá khứ của Cobb.
        <br />
        Inception không chỉ là một hành trình ly kỳ và mạo hiểm, mà còn là một
        cuộc khám phá sâu sắc về tình yêu, sự mất mát và những rào cản mà con
        người tự đặt ra cho chính mình.
      </>
    ),
  };

  // Danh sách bình luận (mẫu)
  const [comments, setComments] = useState([
    {
      user: "Xuân Ca",
      content: "Phim hay quá! Mình rất thích!",
      time: "2 giờ trước",
      avatar:
        "https://i.pinimg.com/564x/ac/9e/3d/ac9e3d7c0f10c0689299701c709c2582.jpg",
    },
    {
      user: "Khúc Thị Hương",
      content: "Nội dung rất thú vị, diễn xuất xuất sắc.",
      time: "1 giờ trước",
      avatar:
        "https://i.pinimg.com/564x/25/0f/58/250f584d1f12e823d2cc9a4f82d22883.jpg",
    },
  ]);
  const [activeTab, setActiveTab] = useState("content");

  const tabs = [
    { id: "content", label: "Nội dung", content: movieData?.movie.description },
    {
      id: "dashboard",
      label: "Nhân vật",
      content: (
        <>
          <div className="producer">
            <strong className="text-xl">Tác giả : </strong>
            <span className="underline">{movieDetails.producer}</span>
          </div>
          <div className="actor mt-4">
            <strong className="text-xl">Diễn viên: </strong>
            {movieDetails.actor.split(" , ").map((acto, index) => {
              return (
                <>
                  <span key={index} className="pr-3 underline">
                    {acto}
                  </span>
                </>
              );
            })}
          </div>
          <div className="director mt-4">
            <strong className="text-xl">Đạo diễn : </strong>
            <span className="underline">{movieDetails.director}</span>
          </div>
        </>
      ),
    },
    {
      id: "settings",
      label: "Hình ảnh",
      content: (
        <>
          <strong>Thêm ảnh hoặc bất cứ thứ gì</strong>
          <img
            src="https://i.pinimg.com/564x/d4/6a/f9/d46af97765da77d5d04a0ed33a8c3f31.jpg"
            alt=""
          />
        </>
      ),
    },
    {
      id: "invoice",
      label: "Săn mã giảm ",
      content: (
        <>
          <h1 className="text-center text-xl uppercase">
            Không có đâu lêu lêu
          </h1>
          <div className="flex">
            <img
              className="mx-auto w-56"
              src="https://i.pinimg.com/564x/bd/e9/11/bde9119315ada284d54c1c8c50e8b348.jpg"
              alt=""
            />
            <img
              className="mx-auto w-56"
              src="https://i.pinimg.com/originals/87/14/4c/87144ca098dad9be40e44907bce4cee3.gif"
              alt=""
            />
          </div>
        </>
      ),
    },
  ];
  const videoUrl = "https://www.youtube.com/embed/j6VeCxrGY8U";
  return (
    <div className="mt-[88px] min-h-screen bg-black text-white">
      {/* Show video */}
      <VideoPlayer urlvideo={videoUrl}/>

      <div className="mx-28 grid max-w-[85rem] grid-cols-1 gap-10 py-6 pt-2 md:grid-cols-4">
        {/* left session */}
        <div className="flex flex-col space-y-6 md:col-span-3">
          {/* Movie Detail */}
          <div className="flex items-start space-x-6">
            <img
              src={movieData?.movie.img}
              alt={movieData?.movie.name}
              className="z-10 -mt-32 w-[350px] rounded-lg object-cover shadow-lg md:h-[450px]"
            />
            <div className="w-full">
              <div className="flex items-end justify-between">
                <h1 className="text-3xl font-bold text-gray-200">
                  {movieData?.movie.name}
                </h1>
              </div>

              {movieData?.movie.age_limit && (
                <div className="age mb-2 mt-2 flex items-center text-sm text-gray-300">
                  <span className="mr-2 rounded-full bg-green-500 p-1 px-2 font-bold text-white">
                    {movieData.movie.age_limit}+
                  </span>
                  <p className="flex items-center">
                    Phim được phổ biến từ người xem{" "}
                    <p className="mx-1 font-bold text-yellow-300">
                      {movieData.movie.age_limit}+
                    </p>{" "}
                    tuổi trở lên
                  </p>
                </div>
              )}
              <div className="mt-4 flex items-center">
                <svg
                  className="me-1 h-6 w-6 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="text-xl font-bold text-white">
                  {movieData?.movie.rating}
                </p>
                <span className="text-md ml-2 font-medium text-gray-300">
                  ({movieData?.movie.votes} lượt đánh giá)
                </span>
              </div>
              <div className="mt-2 flex items-center gap-5 text-sm text-gray-300">
                <div className="flex items-center">
                  <FaClock className="mr-1 text-white" />
                  <span>{movieData?.movie.duration} phút</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-white" />
                  <span>Quốc gia: {movieData?.movie.country}</span>
                </div>
                <div className="flex items-center">
                  <FaQuoteLeft className="mr-1 text-white" />
                  <span> Phụ đề : {movieData?.movie.subtitles}</span>
                </div>
                <div className="flex items-center">
                  <FaQuoteLeft className="mr-1 text-white" />
                  <span>
                    {" "}
                    Ngày phát hành : {formatDate(movieData?.movie.release_date)}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-300">
                <div className="mt-2">
                  <span className="text-white">
                    {" "}
                    Nhà sản xuất : {movieData?.movie.producer}{" "}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-white">Thể Loại: </span>
                  {movieDetails.genre.split(" , ").map((cate, index) => {
                    return (
                      <button
                        key={index}
                        className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                        onClick={() => handleCategoryClick(cate)}
                      >
                        {cate}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <span className="text-white">Đạo diễn:</span>
                  <button
                    className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                    onClick={() => handleCategoryClick(cate)}
                  >
                    {movieData?.movie.director}
                  </button>
                </div>
                <div className="mt-2">
                  <span className="mr-2 text-white">Diễn viên:</span>
                  {movieDetails.actor.split(" , ").map((cate, index) => {
                    return (
                      <button
                        key={index}
                        className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                        onClick={() => handleCategoryClick(cate)}
                      >
                        {cate}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* nội dung  */}
          <div className="sm:hidden">
            <label className="sr-only">Select your country</label>
            <select
              id="tabs"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          <ul className="hidden rounded-lg text-center text-sm font-medium text-gray-500 shadow dark:divide-gray-700 dark:text-gray-300 sm:flex">
            {tabs.map((tab) => (
              <li key={tab.id} className="w-full focus-within:z-10">
                <button
                  className={`inline-block w-full border-r border-gray-700 bg-gray-900 p-4 dark:bg-gray-800 dark:hover:text-white ${activeTab === tab.id ? "font-semibold uppercase text-white" : "bg-gray text-gray-500"} border-b-0 border-gray-100`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab === tab.id ? "block" : "hidden"}`}
              >
                {tab.content}
              </div>
            ))}
          </div>

          {/* bình luận  */}
          <div className="max-w-6xl py-5">
            <h2 className="mb-4 text-2xl font-bold">Bình luận</h2>

            {/* ghi bình luận  */}
            <form>
              <label className="sr-only">Your message</label>
              <div className="flex items-center rounded-lg bg-gray-900 px-3 py-2 dark:bg-slate-950">
                <button
                  type="button"
                  className="hover:bg-g inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                    <path
                      stroke="currentColor"
                      d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                  </svg>
                  <span className="sr-only">Upload image</span>
                </button>
                <button
                  type="button"
                  className="hover:bg-gray-00 cursor-pointer rounded-lg p-2 text-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                    />
                  </svg>
                  <span className="sr-only">Add emoji</span>
                </button>
                <textarea
                  id="chat"
                  rows="1"
                  className="mx-4 block w-full rounded-lg border border-gray-300 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Your message..."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="h-5 w-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>

            {/* bình luận người dùng  */}

            <div>
              {comments.map((comment, index) => (
                <div className="mt-5 flex items-start gap-2.5" key={index}>
                  {/* <img className="w-8 h-8 rounded-full" alt="Jese image"> */}
                  <img
                    className="h-12 w-14 rounded-full"
                    src={comment.avatar}
                    alt=""
                  />
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-white dark:text-white">
                        {comment.user}{" "}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-300">
                        {comment.time}{" "}
                      </span>
                    </div>
                    <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-900 p-4 dark:bg-gray-700">
                      <p className="text-sm font-normal text-white dark:text-white">
                        {" "}
                        {comment.content}{" "}
                      </p>
                    </div>
                    {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-300">Delivered</span> */}
                  </div>
                  <button
                    id="dropdownMenuIconButton"
                    data-dropdown-toggle="dropdownDots"
                    data-dropdown-placement="bottom-start"
                    className="inline-flex items-center self-center rounded-lg bg-gray-900 p-2 text-center text-sm font-medium text-gray-900 focus:outline-none dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                  <div
                    id="dropdownDots"
                    className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Reply
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Forward
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Copy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  right session */}
        <div className="md:col-span-1">
          <h2 className="mb-6 text-2xl font-bold text-gray-200">
            {" "}
            <span className="text-red-500">|</span> Phim đang chiếu
          </h2>
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
                alt="item"
                className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  to="/detail"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  Mua vé <i className="fas fa-ticket-alt ml-2"></i>
                </Link>
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-orange-600 px-3 py-1 text-white">
                T18
              </div>
              <div className="absolute bottom-4 right-4 text-yellow-400">
                ★★★★☆
              </div>
            </div>
            <div className="text-center text-gray-200">Tên phim</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
