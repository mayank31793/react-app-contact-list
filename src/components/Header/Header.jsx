import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Header() {
  function searchQuery() {
    let name = "mayank";
    axios
      .get(
        `https://spotify-clone-de175.firebaseio.com/contacts.json?orderBy="firstName"&equalTo="${name}"`
      )
      .then((res) => console.log(res));
  }
  function limitQuery() {
    let count = 5;
    axios
      .get(
        `https://spotify-clone-de175.firebaseio.com/contacts.json?orderBy="$key"&limitToFirst=${count}`
      )
      .then((res) => console.log(res));
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
          />
          <button onClick={searchQuery}>search name</button>
          <button onClick={limitQuery}>limit index</button>
        </div>
        <div className="login">
          <p>Login</p>
        </div>
      </div>
    </>
  );
}

export default Header;
