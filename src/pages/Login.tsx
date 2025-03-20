import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { loginSuccess } from "../store/authSlice";
import { loginApi } from "../api/authApi";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils/validate";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    const emailError = validateEmail(form.email);
    if (emailError) validationErrors.email = emailError;

    const passwordError = validatePassword(form.password);
    if (passwordError) validationErrors.password = passwordError;

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await loginApi(form.email, form.password);

        dispatch(loginSuccess({
          token: response.token,
          user: response.user,
        }));

        if (response.isFirstTimeLogin) {
          navigate("/set-password");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Invalid credentials");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </span>
        </div>

        <Button text="Login" />
      </form>
    </div>
  );
};

export default Login;
