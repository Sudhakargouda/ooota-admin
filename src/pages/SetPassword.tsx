import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginSuccess } from "../store/authSlice";
import { validatePassword, validateConfirmPassword } from "../utils/validate";

const SetPassword = () => {
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    const passwordError = validatePassword(form.newPassword);
    if (passwordError) validationErrors.newPassword = passwordError;

    const confirmPasswordError = validateConfirmPassword(form.newPassword, form.confirmPassword);
    if (confirmPasswordError) validationErrors.confirmPassword = confirmPasswordError;

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Simulate API call (Replace with actual API request)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get existing user data
        const storedUser = localStorage.getItem("user");
        const user = storedUser && storedUser !== "null" ? JSON.parse(storedUser) : null;

        if (!user) {
          alert("User not found. Please login again.");
          navigate("/");
          return;
        }

        // Dispatch Redux update (Only update user & token)
        dispatch(loginSuccess({ token: localStorage.getItem("token")!, user }));

        // Navigate to dashboard
        navigate("/dashboard");

      } catch (error) {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Set Your Password</h2>

        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button text="Submit" />
      </form>
    </div>
  );
};

export default SetPassword;
