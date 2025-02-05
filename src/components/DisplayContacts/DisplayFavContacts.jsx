import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function DisplatFavContacts() {
  const selector = useSelector((state) => state.name.contact);
  let filterFav = selector.filter((res) => res.isFavourite);
  console.log(filterFav);
  return (
    <>
      <div className="min-w-4xl bg-gray-300">
        {filterFav.length == 0 && (
          <div className="min-w-4xl h-full flex flex-col justify-center items-center">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-7xl block text-red-600"
            />
            <p className="text-3xl block text-center mt-5">
              No Favourites To Display, start adding Favourites
            </p>
          </div>
        )}
        {filterFav.length != 0 && (
          <table className="max-w-7xl m-2 min-w-4xl text-center border border-2 overflow-y-scroll">
            <thead className="bg-gray-400 ">
              <tr className="border-2 border-solid border-black">
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filterFav.map((res) => {
                return (
                  <tr
                    key={res.key}
                    className="border-2 border-solid border-black"
                  >
                    <td className="p-3 ">{res.fname}</td>
                    <td className="p-3">{res.lname}</td>
                    <td className="p-3">{res.contact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default DisplatFavContacts;
