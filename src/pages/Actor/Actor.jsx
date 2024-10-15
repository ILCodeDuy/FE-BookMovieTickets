import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetAllActorsQuery } from "../../services/Actor/actor.service";
import notfound_img from "../../assets/img/404/actor-default.png"
const Actor = () => {
  const { data: actorData = [] } = useGetAllActorsQuery();
  console.log(actorData);
  
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 10; // Số lượng diễn viên hiển thị mỗi trang

  // Tính toán chỉ số bắt đầu và kết thúc cho diễn viên của trang hiện tại
  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actorData.slice(indexOfFirstActor, indexOfLastActor);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(actorData.length / actorsPerPage);

  // Hàm điều hướng trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="flex justify-center bg-black">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center bg-gray-900 p-4 rounded-lg mt-28" style={{ backgroundColor: '#181818' }}>
          <h2 className="text-white text-2xl font-semibold font-roboto pb-2">
            <span className="text-red-600 ">|</span> DIỄN VIÊN
          </h2>
          <div className="flex">
            <select className="bg-gray-900 text-white border border-white rounded-md p-2 ml-4 mr-4">
              <option>Quốc Gia</option>
              <option>Việt Nam</option>
              <option>Hàn Quốc</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row my-4">
          <div className="text-white mr-2 flex-1">
            {currentActors.map((actor, index) => (
              <div className="flex items-start p-4 rounded-sm bg-gray-900" style={{ backgroundColor: '#181818' }} key={index}>
                <Link to={`/actor/detail/${actor._id}`} className="flex-shrink-0">
                  <img
                    src={actor.img || notfound_img}
                    alt={actor.name}
                    className="rounded-md"
                    style={{ width: '255px', height: '170px' }}
                  />
                </Link>
                <div className="ml-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold">{actor.name}</h2>
                  <div className="flex items-center my-2">
                    <button className="text-white px-2 rounded" style={{ backgroundColor: '#4080ff' }}>
                      <i className="fa-regular fa-thumbs-up"></i> Thích
                    </button>
                    <div className="ml-4 text-black px-2 bg-gray-200 rounded-sm">
                      <i className="fa-solid fa-eye"></i> {actor.views}
                    </div>
                  </div>
                  <p className="text-gray-300">
                  {actor.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Phân trang */}
            <div className="flex justify-center my-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-red-600' : 'bg-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[30%] mt-4 md:mt-0">
            <h2 className="text-white text-2xl font-semibold font-roboto text-center mb-3">Phim đang chiếu</h2>
            {/* Movie items */}
            {[1, 2, 3].map((_, idx) => (
              <div className="group ml-6" key={idx}>
                <div className="relative flex flex-col items-center flex-grow flex-shrink-0 my-2">
                  <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg" alt="item" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to="/cinema/buy-tickets" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé <i className="ml-1 fas fa-ticket-alt"></i></Link>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                  <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                </div>
                <div className="text-white">Tên phim</div>
              </div>
            ))}
            <h2 className="text-orange-600 mt-5 text-center text-lg font-roboto right-0 rounded-sm border border-orange-600 p-2 ml-auto w-48">
              <Link to="/cinema/movie">Xem thêm</Link>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actor;
