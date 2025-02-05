import { useSelector } from "react-redux";

function DisplatFavContacts() {
  const selector = useSelector((state) => state.name.contact);
  let filterFav = selector.filter((res) => res.isFavourite);
  console.log(filterFav);
  return (
    <>
      <div className="min-w-4xl bg-gray-300">
        {filterFav.length == 0 && <p>No Contacts Added</p>}
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
