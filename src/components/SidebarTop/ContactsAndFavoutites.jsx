import { isAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function ContactsAndFavoutites() {
  const selector = useSelector((state) => state.name.contact);
  return (
    <>
      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-l-2 border-solid border-l-amber-300" : null
          }
        >
          {selector.length} Contacts
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? "border-l-2 border-solid border-l-amber-300" : null
          }
        >
          Favourites
        </NavLink>
      </div>
    </>
  );
}

export default ContactsAndFavoutites;
