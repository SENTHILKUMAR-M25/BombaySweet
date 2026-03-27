import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminProtected({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          { withCredentials: true }
        );

        if (res.data.role !== "admin") navigate("/admin/login");
      } catch {
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return children;
}