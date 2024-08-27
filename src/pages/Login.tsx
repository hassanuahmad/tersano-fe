import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginValues = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  name: string;
};

const initialFormValues: LoginValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState<LoginValues>(initialFormValues);
  const [isToast, setIsToast] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setIsToast(true);
        setTimeout(() => {
          setIsToast(false);
        }, 3000);
      } else {
        const data: LoginResponse = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setFormData(initialFormValues);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error Login", err);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {isToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error ">
            <span>
              Incorrect email or password combination. Please try again.
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center">Welcome back!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register">
              <button className="btn btn-link">Register</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
