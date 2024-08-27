import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  token: string;
  name: string;
};

const initialFormValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState<RegisterValues>(initialFormValues);
  const navigate = useNavigate();

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Error registering user");
      } else {
        const data: RegisterResponse = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setFormData(initialFormValues);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

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
              Create an account
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <button className="btn btn-link">Login</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
