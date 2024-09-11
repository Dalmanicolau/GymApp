import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RiPassExpiredFill } from "react-icons/ri";

//eslint-disable-next-line
function Sidebar() {
  return (
    <div>
      
      <div className="">
        <img src={logo} alt="Logo" className="h-24 ml-2 mt-10" />
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
              <Link className="" to="/dashboard">
                Panel
              </Link>
            </a>
          </li>
          <li className="p-2 text-2xl">
            <a className="hover:bg-blue-500">
              <FaPeopleGroup className="text-blue-600"/>
              <Link to="/members">Miembros</Link>
            </a>
          </li>
          <li className="p-2 text-2xl">
            <a className="hover:bg-blue-500">
              <CgGym className="text-green-600"/>
              <Link to="/activities">Actividades</Link>
            </a>
          </li>
          <li className="p-2 text-2xl">
            <a className="hover:bg-blue-500">
              <FaMoneyBillTrendUp className="text-orange-500"/>
              <Link to="/payments">Pagos</Link>
            </a>
          </li>
          <li className="p-2 text-2xl">
            <a className="hover:bg-blue-500">
             <RiPassExpiredFill className="text-yellow-500"/>
              <Link to="/notifications">Notificaciones</Link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
