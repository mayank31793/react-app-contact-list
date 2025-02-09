import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function ContactsAndFavoutites() {
  const selector = useSelector((state) => state.name.contact);
  const favourites = selector.filter((res) => res.isFavourite);
  return (
    <>
      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-5 m-1 border-l-2 border-solid border-l-amber-300 bg-blue-950"
              : "p-5 m-1"
          }
        >
          {selector.length} Contacts
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive
              ? "p-5 m-1 border-l-2 border-solid border-l-amber-300 bg-blue-950"
              : "p-5 m-1"
          }
        >
          {favourites.length} Favourites
        </NavLink>
      </div>
    </>
  );
}

export default ContactsAndFavoutites;
