import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Sidebar() {
  return (
    <div>
      <img src={logo} alt="Logo" className="h-24 mx-auto mt-10" />
      <ul className="menu bg-base-200 rounded-box w-56  ">
        
        <li className="p-2 text-2xl "> 
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <Link className="" to="/dashboard">Panel</Link>
          </a>
        </li>
        <li className="p-2 text-2xl">
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <Link to="/members">Miembros</Link>
          </a>
        </li>
        <li className="p-2 text-2xl">
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <Link to="/activities">Actividades</Link>
          </a>
        </li>
        <li className="p-2 text-2xl">
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <Link to="/payments">Pagos</Link>
          </a>
        </li>
        <li className="p-2 text-2xl">
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Link to="/notifications">Notificaciones</Link>
          </a>
        </li>
        <li className="p-2 text-2xl ">
          <a className="hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <Link to="/users">Usuarios</Link>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label
      htmlFor="my-drawer-2"
      className="btn btn-primary drawer-button lg:hidden"
    >
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label
      htmlFor="my-drawer-2"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/dashboard">
            Panel
          </Link>
        </a>
      </li>
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/members">
            Miembros
          </Link>
        </a>
      </li>
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/activities">
            Actividades
          </Link>
        </a>
      </li>
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/payments">
            Pagos
          </Link>
        </a>
      </li>
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/notifications">
            Notificaciones
          </Link>
        </a>
      </li>
      <li>
        <a>
          <Link className="p-2 hover:bg-gray-700" to="/users">
            Usuarios
          </Link>
        </a>
      </li>
    </ul>
  </div>
</div>;
