import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { querySearchDetails, getContactDetails } from "../../contactSlice";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

function Header() {
  const [searchText, setSearchText] = useState("");
  const searchString = useRef();
  const dispatch = useDispatch();
  // let lastKey = null;

  function searchQuery(event) {
    if (event.key == "Enter") {
      searchString.current.value.length != 0
        ? dispatch(querySearchDetails(searchString.current.value))
        : dispatch(getContactDetails());
    }
  }
  // function limitQuery() {
  //   let count = 5;
  //   axios
  //     .get(
  //       `https://spotify-clone-de175.firebaseio.com/contacts.json?orderBy="$key"&limitToFirst=${count}`
  //     )
  //     .then((res) => {
  //       console.log(Object.keys(res.data)[Object.keys(res.data).length - 1]);
  //       lastKey = Object.keys(res.data)[Object.keys(res.data).length - 1];
  //     });
  //   console.log(lastKey);
  // }
  // function limitQueryNext() {
  //   // let count = 5;
  //   console.log("last key", lastKey);
  //   let url =
  //     'https://spotify-clone-de175.firebaseio.com/contacts.json?orderBy="$key"&limitToFirst=5';
  //   axios.get(url);
  //   //   .then((res) => console.log(res));

  //   axios
  //     .get(
  //       `https://spotify-clone-de175.firebaseio.com/contacts.json?orderBy="$key"&limitToFirst=5&startAt="${lastKey}"`
  //     )
  //     .then((res) => console.log("Next batch:", res));

  //   // Update lastKey with the last item in the batch
  // }
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
          {/* <button onClick={limitQuery}>First Call</button>
          <button onClick={limitQueryNext}>Next Call</button> */}
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
