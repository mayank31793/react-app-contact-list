import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faHeart,
  faXmark,
  faCheck,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactDetails,
  updateContactDetails,
  updateTotalRecordsCount,
} from "../../contactSlice";
import Loader from "../Loader/Loader";

function DisplayContactList() {
  const [coordinates, setCoordinates] = useState({ left: 0, right: 0 });
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.name.contact);
  const totalRecordsCount = useSelector(
    (state) => state.name.totalRecordsCount
  );

  const editFirstName = useRef();
  const editLastName = useRef();
  const editContactNumber = useRef();
  const editContactKey = useRef();
  const editFavourite = useRef();

  const [showEditableFields, setshowEditableFields] = useState(false);

  function deleteContact(id) {
    let confirm = window.confirm(
      "Are you sure you want to delete this contact ?"
    );
    if (confirm) {
      dispatch(deleteContactDetails(id));
      dispatch(updateTotalRecordsCount(totalRecordsCount - 1));
    }
  }
  function editContact(e, data) {
    console.log(e.target, data);
    const element = e.target;
    const rect = element.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    console.log(`Element clicked at: X: ${x}, Y: ${y}`);
    setCoordinates({ ...coordinates, left: x, top: y });
    editFirstName.current.value = data.fname;
    editLastName.current.value = data.lname;
    editContactNumber.current.value = data.contact;
    editContactKey.current.value = data.key;
    editFavourite.current.value = data.isFavourite;
    setshowEditableFields(true);
  }
  function closeEditInfo() {
    setshowEditableFields(false);
  }
  function favContact(responseData) {
    let data = {
      key: responseData.key,
      firstName: responseData.fname,
      lastName: responseData.lname,
      contactNumber: responseData.contact,
      isFavourite: !responseData.isFavourite,
    };
    dispatch(updateContactDetails(data));
  }
  function updateContactInfo() {
    let data = {
      key: editContactKey.current.value,
      firstName: editFirstName.current.value,
      lastName: editLastName.current.value,
      contactNumber: editContactNumber.current.value,
      isFavourite: editFavourite.current.value,
    };
    dispatch(updateContactDetails(data));
    setshowEditableFields(false);
  }
  return (
    <>
      {/* <Loader /> */}
      <div className="border-2 border-amber-700 bg-gray-300 overflow-y-scroll relative">
        {selector.length == 0 && (
          <div className="min-w-4xl h-full flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faFilePen} className="text-7xl block" />
            <p className="text-3xl block text-center mt-5">
              No Contacts To Display, start adding Contacts
            </p>
          </div>
        )}
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
                        onClick={(event) => editContact(event, res)}
                        className="ml-2 mr-2 hover:text-emerald-400 cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={() => favContact(res)}
                        className={`ml-2 mr-2 hover:text-rose-700 cursor-pointer ${
                          res.isFavourite ? " text-red-600" : "text-black"
                        }`}
                        ref={editFavourite}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div
          className={`min-w-full rounded-xs flex justify-between px-5 items-center ${
            showEditableFields ? "block" : "hidden"
          }`}
          style={{
            position: "absolute",
            left: "0px",
            top: `${coordinates.top - 115}px`,
            height: "39px",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            className="h-7 border border-solid border-gray-400 rounded-2xl outline-0 text-center focus:border-[#324376]"
            ref={editFirstName}
          />
          <input
            type="text"
            className="h-7 border border-solid border-gray-400 rounded-2xl outline-0 text-center focus:border-[#324376]"
            ref={editLastName}
          />
          <input
            type="number"
            className="h-7 border border-solid border-gray-400 rounded-2xl outline-0 text-center focus:border-[#324376] focus: appearance-none"
            ref={editContactNumber}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <div className="flex justify-center items-center w-40">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-2xl text-green-400 mx-3 hover:cursor-pointer hover:text-green-600"
              ref={editContactKey}
              onClick={updateContactInfo}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl text-red-400 mx-3 hover:cursor-pointer hover:text-red-600"
              onClick={closeEditInfo}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayContactList;
