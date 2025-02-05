import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactDetails,
  deleteContactDetails,
  editContactDetails,
} from "../../contactSlice";

function DisplayContactList() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.name.contact);
  const selectorRefresh = useSelector((state) => state.name.refresh);

  useEffect(() => {
    dispatch(getContactDetails());
  }, [dispatch, selectorRefresh]);

  function deleteContact(id) {
    dispatch(deleteContactDetails(id));
    // api
    //   .delete(`/contacts/${id}.json`)
    //   .then((res) => dispatch(getContactData(contactData)));
  }
  function editContact(id) {
    let data = {
      key: id,
      firstName: "lll",
      lastName: "ppp",
      contactNumber: 321112,
    };
    dispatch(editContactDetails(data));
    // api
    //   .put(`/contacts/${id}.json`, {
    //     firstName: "lll",
    //     lastName: "ppp",
    //     contactNumber: 321112,
    //   })
    //   .then((res) => console.log(res));
  }
  function favContact(id) {
    console.log(id);
  }
  return (
    <>
      <div className="border-2 border-amber-700 bg-gray-300 overflow-y-scroll ">
        {selector.length == 0 && <p>No Contacts Added</p>}
        {selector.length != 0 && (
          <table className="max-w-7xl m-2 min-w-4xl text-center border border-2 overflow-y-scroll">
            <thead className="bg-gray-400 ">
              <tr className="border-2 border-solid border-black">
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selector.map((res) => {
                return (
                  <tr
                    key={res.key}
                    className="border-2 border-solid border-black"
                  >
                    <td className="p-3 ">{res.fname}</td>
                    <td className="p-3">{res.lname}</td>
                    <td className="p-3">{res.contact}</td>
                    <td className="flex justify-center p-3">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => deleteContact(res.key)}
                        className="ml-2 mr-2 hover:text-rose-700 cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        onClick={() => editContact(res.key)}
                        className="ml-2 mr-2 hover:text-emerald-400 cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={() => favContact(res.key)}
                        className="ml-2 mr-2 hover:text-rose-700 cursor-pointer"
                      />
                    </td>
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

export default DisplayContactList;
