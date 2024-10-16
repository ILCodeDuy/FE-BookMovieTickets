import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Set default tab
  const [userInfo, setUserInfo] = useState({
    image: "",
    name: "",
    phone: "",
    fullName: "",
    email: "",
    gender: "Nam",
    birthday: "", // Ensure birthday is included in the state
  });

  // Function to change tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="p-28 px-20">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
        <div
          className="rounded-lg bg-black p-6 shadow-lg"
          style={{ boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)" }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              {userInfo.image && (
                <img
                  src={userInfo.image}
                  alt="User"
                  className="mb-4 h-24 w-24 rounded-full"
                />
              )}
              <label className="mx-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-center text-sm font-semibold text-black shadow focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                <i className="fa-regular fa-image pr-1 text-2xl"></i>
                <span className="hidden md:inline"></span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-lg font-semibold">Tuấn Nguyễn </h4>
              <h4 className="text-lg font-semibold">Star </h4>
            </div>
          </div>
          <hr
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              height: "1px",
            }}
            className="my-3"
          />
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Tổng chi tiêu 2024</h1>
            <div className="text-xl font-semibold text-orange-500">0 đ</div>
          </div>
          <div className="my-24">
            <div className="relative m-10">
              <div className="absolute -top-10 left-0 flex flex-col items-center">
                <img
                  src="https://www.galaxycine.vn/_next/static/media/bronze.6c2b2f39.png"
                  alt=""
                  className="mb-5 h-8 w-5"
                />
                <div className="absolute left-0 h-full w-1/3 rounded-full"></div>
                <span className="mt-1 text-xs">0 đ</span>
              </div>
              <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center">
                <img
                  src="https://www.galaxycine.vn/_next/static/media/silver.6313aa20.png"
                  alt=""
                  className="mb-5 h-10 w-7"
                />
                <div className="absolute left-1/3 h-full w-2/3 rounded-full"></div>
                <span className="mt-1 text-xs">2.000.000 đ</span>
              </div>
              <div className="absolute -top-14 right-0 flex flex-col items-center">
                <img
                  src="https://www.galaxycine.vn/_next/static/media/gold.ff661579.png"
                  alt=""
                  className="mb-5 h-12 w-8"
                />
                <div className="absolute right-0 h-full w-1/3 rounded-full"></div>
                <span className="mt-1 text-xs">4.000.000 đ</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-gray-200">
                <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full border-2 border-blue-500 bg-white"></div>
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-blue-500 bg-white"></div>
                <div className="absolute right-6 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full border-2 border-blue-500 bg-white"></div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <hr
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                height: "1px",
              }}
              className="my-3"
            />
            <div className="flex items-center justify-between py-5">
              <div>
                <span className="font-bold">HOTLINE hỗ trợ: </span>
                <a href="tel:19002224" className="text-blue-600">
                  19002224
                </a>
                <span> (9:00 - 22:00)</span>
              </div>
            </div>
            <hr
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                height: "1px",
              }}
              className="my-3"
            />
            <div className="flex items-center justify-between py-5">
              <div>
                <span className="font-bold">Email: </span>
                <a href="mailto:nqtuan1123@gmail.com" className="text-blue-600">
                  nqtuan1123@gmail.com
                </a>
              </div>
              <div>
                <span an className="text-gray-400">
                  &gt;
                </span>
              </div>
            </div>
            <hr
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                height: "1px",
              }}
              className="my-3"
            />
            <div className="flex items-center justify-between py-5">
              <div className="font-semibold">Câu hỏi thường gặp</div>
              <div>
                <span className="text-gray-400">&gt;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="">
            <ul className="mb-6 flex flex-row justify-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400 md:mb-0 md:me-4">
              {["profile", "history", "whislist", "Notification", "gift"].map(
                (tab) => (
                  <li key={tab} className="relative flex flex-col items-center">
                    <a
                      href="#"
                      className={`inline-flex items-center text-xl ${activeTab === tab ? "text-white" : "text-gray-400"} rounded-lg`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab === "profile"
                        ? "Thông tin"
                        : tab === "history"
                          ? "Lịch sử giao dịch"
                          : tab === "gift"
                            ? "Quà tặng"
                            : tab === "whislist"
                              ? "Yêu thích"
                              : tab === "Notification"
                                ? "Thông báo"
                                : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </a>
                    {/* Gạch chân */}
                    {activeTab === tab && (
                      <div className="absolute -bottom-2 left-1/2 h-0.5 w-1/4 -translate-x-1/2 transform rounded bg-white"></div>
                    )}
                  </li>
                ),
              )}
            </ul>

            <hr className="my-3 border-t border-gray-300" />
            <div
              className="flex-1 rounded-lg p-2"
              style={{ boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)" }}
            >
              {activeTab === "profile" && (
                <div className="rounded-lg bg-black p-6 shadow-lg">
                  <form className="space-y-6">
                    {/* Name and Date of Birth */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Họ và tên
                        </label>
                        <div className="mt-1 flex items-center rounded bg-gray-100 p-2">
                          <span className="material-icons text-gray-500">
                            <i class="fa-solid fa-user"></i>
                          </span>
                          <input
                            type="text"
                            value="Tuấn Nguyễn"
                            disabled
                            className="ml-2 flex-1 bg-transparent text-gray-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Ngày sinh
                        </label>
                        <div className="mt-1 flex items-center rounded bg-gray-100 p-2">
                          <span className="material-icons text-gray-500">
                            <i class="fa-regular fa-calendar"></i>
                          </span>
                          <input
                            type="text"
                            value="03/12/2004"
                            disabled
                            className="ml-2 flex-1 bg-transparent text-gray-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Phone Number */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Email
                        </label>
                        <div className="mt-1 flex items-center rounded bg-gray-100 p-2">
                          <span className="material-icons text-gray-500">
                            <i class="fa-solid fa-envelope"></i>
                          </span>
                          <input
                            type="email"
                            value="nqtuan1123@gmail.com"
                            disabled
                            className="ml-2 flex-1 bg-transparent text-gray-400 focus:outline-none"
                          />
                          <a href="#" className="ml-2 text-sm text-orange-500">
                            Thay đổi
                          </a>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Phone
                        </label>
                        <div className="mt-1 flex items-center rounded bg-gray-100 p-2">
                          <span className="material-icons text-gray-500">
                            <i class="fa-solid fa-phone"></i>
                          </span>
                          <input
                            type="text"
                            value="0376395095"
                            disabled
                            className="ml-2 flex-1 bg-transparent text-gray-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Giới tính
                        </label>
                        <div className="mt-1 flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="gender"
                              value="male"
                              className="h-5 w-5 border border-gray-300 bg-white text-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2">Nam</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="gender"
                              value="female"
                              className="h-5 w-5 border border-gray-300 bg-white text-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2">Nữ</span>
                          </label>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="">
                        <div>
                          <label className="block text-sm font-medium text-white">
                            Mật khẩu
                          </label>
                          <div className="mt-1 flex items-center rounded bg-gray-100 p-2">
                            <span className="material-icons text-gray-500">
                              <i class="fa-solid fa-lock"></i>
                            </span>
                            <input
                              type="password"
                              value="********"
                              disabled
                              className="relative ml-2 w-full flex-1 bg-transparent text-gray-400 focus:outline-none"
                            />
                            <a
                              href="#"
                              className="absolute right-36 ml-2 text-sm text-orange-500"
                            >
                              Thay đổi
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="rounded bg-orange-500 px-6 py-2 text-white shadow hover:bg-orange-600"
                      >
                        Cập nhập
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === "history" && (
                <div className="overflow-hidden shadow-sm">
                  <div className="mb-3 flex rounded-sm bg-slate-100">
                    <div className="w-2/12">
                      <img
                        src="https://cdn.galaxycine.vn/media/2024/10/10/tee-yod-2-500_1728531355521.jpg"
                        alt="Movie Poster"
                        className="m-auto w-auto p-2"
                      />
                    </div>
                    <div className="w-10/12 p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Quỷ Ăn Tạng Phần 2
                      </h3>
                      <div className="mt-2 flex items-center">
                        <span className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white">
                          2D PHÙ ĐỀ
                        </span>
                        <span className="rounded bg-orange-600 px-2 py-1 text-white">
                          C13
                        </span>
                      </div>
                      <div className="mt-2 text-gray-600">
                        Galaxy Mipec Long Biên - Rạp 3
                      </div>
                      <div className="mt-1 text-gray-500">
                        <span>14:15 - Chủ Nhật</span>, <span>13/12/2020</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 flex rounded-sm bg-slate-100">
                    <div className="w-2/12">
                      <img
                        src="https://cdn.galaxycine.vn/media/2024/10/10/tee-yod-2-500_1728531355521.jpg"
                        alt="Movie Poster"
                        className="m-auto w-auto p-2"
                      />
                    </div>
                    <div className="w-10/12 p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Quỷ Ăn Tạng Phần 2
                      </h3>
                      <div className="mt-2 flex items-center">
                        <span className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white">
                          2D PHÙ ĐỀ
                        </span>
                        <span className="rounded bg-orange-600 px-2 py-1 text-white">
                          C13
                        </span>
                      </div>
                      <div className="mt-2 text-gray-600">
                        Galaxy Mipec Long Biên - Rạp 3
                      </div>
                      <div className="mt-1 text-gray-500">
                        <span>14:15 - Chủ Nhật</span>, <span>13/12/2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "whislist" && <div>Yêu thích của bạn</div>}
              {activeTab === "Notification" && <div>Thông báo</div>}
              {activeTab === "out" && <div>Đăng xuất ra ngoài</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
