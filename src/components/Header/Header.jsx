import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCode } from "@fortawesome/free-solid-svg-icons";
import { querySearchDetails, getContactDetails } from "../../contactSlice";
import { useDispatch } from "react-redux";
import { useRef, useCallback } from "react";
import lodash from "lodash";

function Header() {
  const searchString = useRef();
  const dispatch = useDispatch();

  const debounceSearch = useCallback(
    lodash.debounce((searchTerm) => {
      searchString.current.value.length != 0
        ? dispatch(querySearchDetails(searchTerm))
        : dispatch(getContactDetails());
    }, 500)
  );

  function searchQuery() {
    debounceSearch(searchString.current.value);
  }
  return (
    <>
      <div className="flex justify-between bg-[#c1cad6] p-4 text-amber-950">
        <div className="logo flex items-center">
          <FontAwesomeIcon
            icon={faAddressCard}
            className="text-4xl text-[#324376]"
          />
          <span className="px-3 text-4xl font-bold text-[#324376]">
            Contacts
          </span>
        </div>
        <div className="searchbar h-12 w-80 rounded-4xl bg-gray-200 border-b-gray-600 border-2 border-solid">
          <input
            type="text"
            className="w-full h-full text-center outline-0"
            placeholder="Search"
            ref={searchString}
            onKeyUp={searchQuery}
          />
        </div>
        <div className="login">
          <a
            href="https://github.com/mayank31793/react-app-contact-list"
            target="_blank"
            className="text-[#324376] text-xl pt-3 items-center"
          >
            Gihub&nbsp;Link&nbsp;
            <FontAwesomeIcon icon={faCode} />
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
