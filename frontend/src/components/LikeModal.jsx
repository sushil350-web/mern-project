import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "./Loading";
import { Link } from "react-router-dom";

const LikeModal = ({ isOpen, onClose, id }) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) fetchLikes();
  }, [id, isOpen]);

  const fetchLikes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/post/${id}`);
      setValue(data.likes || []); // safe fallback
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-4 shadow-lg w-72 max-h-[400px] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-center">Liked By</h2>
        {loading ? (
          <LoadingAnimation />
        ) : value.length > 0 ? (
          <div className="flex flex-col space-y-2">
            {value.map((user) => (
              <Link
                key={user._id}
                to={`/user/${user._id}`}
                className="flex items-center gap-3 bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profilePic?.url || "/default-avatar.png"}
                  alt={user.name}
                />
                <span className="text-gray-700">{user.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Likes yet</p>
        )}
      </div>
    </div>
  );
};

export default LikeModal;
