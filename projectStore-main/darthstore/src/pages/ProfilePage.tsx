import React from "react";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/profile.css";

const ProfilePage: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const profile = useAuthStore((state) => state.profile);
  console.log({
    profile,
  });

  return (
    <div className="">
      <div className="bg-zinc-700 p-20">
        <h3 className="text-4xl font-bold">{profile?.email}</h3>
        <p>{profile?.createdAt.toString()}</p>
      </div>

      <div>
        <Link
          to="/landing"
          className="inline-block rounded-md btn border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
          onClick={() => {
            logout();
            navigate("/landing");
          }}
        >
          Logout
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
