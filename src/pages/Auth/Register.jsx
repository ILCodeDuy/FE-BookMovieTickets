import { useState } from "react";
import { Button, Input, Checkbox } from "react-daisyui";
import { FaEnvelope, FaPhone, FaUser, FaEye, FaEyeSlash  } from "react-icons/fa";
import { useRegisterMutation } from "../../services/Auth/auth.service";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.terms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await register({
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      console.log("Registration successful:", response);
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg")',
      }}
    >
      <div className="w-full max-w-md space-y-8 rounded-xl bg-black bg-opacity-80 p-8 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50">
        <div className="text-center">
          <h2 className="mt-6 text-5xl font-extrabold text-red-600">ST-FLIX</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-white"
              >
                Họ và tên:
              </label>
              <div className="flex items-center">
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md p-1 pl-3 pr-10"
                  placeholder="Fullname"
                />
                <FaUser className="absolute right-2 mt-2" />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email:
              </label>
              <div className="flex items-center">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md p-1 pl-3 pr-10"
                  placeholder="Email address"
                />
                <FaEnvelope className="absolute right-2 mt-2" />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white"
              >
                Số điện thoại:
              </label>
              <div className="flex items-center">
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md p-1 pl-3 pr-10 "
                  placeholder="Phone"
                />
                <FaPhone className="absolute right-2 mt-2" />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Mật khẩu:
              </label>
              <div className="flex items-center">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md p-1 pl-3 pr-10 "
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 mt-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Nhập lại mật khẩu:
              </label>
              <div className="flex items-center">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md p-1 pl-3 pr-10"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 mt-2"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Checkbox
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="checkbox-primary checkbox"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-white">
                Tôi đồng ý với các điều khoản và điều kiện
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
            disabled={isLoading}
          >
            Đăng Ký
          </Button>
        </form>
        <div className="mt-4 text-center text-white">
          Bạn đã có tài khoản?{" "}
          <Link to="/auth/login" className="text-blue-500">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
