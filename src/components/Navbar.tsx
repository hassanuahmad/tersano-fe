import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && token !== "undefined" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [localStorage.getItem("token")]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  return (
    <div>
      <header className="bg-white shadow rounded">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link to="/">
                <p className="block text-primary">Hassan</p>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <p>Logged in as {userName}</p>
                  <button onClick={handleSignOut} className="btn btn-secondary">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login">
                    <button className="btn">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
