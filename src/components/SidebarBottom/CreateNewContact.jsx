import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNewContact, updateTotalRecordsCount } from "../../contactSlice";

function CreateNewContact() {
  const [errorFieldFirstName, setErrorFieldFirstName] = useState(false);
  const [errorFieldLastName, setErrorFieldLastName] = useState(false);
  const [errorFieldContactNumber, setErrorFieldContactNumber] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNumberRef = useRef();
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.name.totalRecordsCount);

  function handleForm(e) {
    e.preventDefault();
    setErrorFieldFirstName(false);
    setErrorFieldLastName(false);
    setErrorFieldContactNumber(false);
    if (firstNameRef.current.value == "") {
      setErrorFieldFirstName(true);
    } else if (firstNameRef.current.value.length < 3) {
      setErrorFieldFirstName(true);
    } else if (lastNameRef.current.value == "") {
      setErrorFieldLastName(true);
    } else if (lastNameRef.current.value.length < 3) {
      setErrorFieldLastName(true);
    } else if (contactNumberRef.current.value == "") {
      setErrorFieldContactNumber(true);
    } else if (contactNumberRef.current.value.length < 7) {
      setErrorFieldContactNumber(true);
    } else {
      let data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        contactNumber: contactNumberRef.current.value,
        isFavourite: false,
      };
      dispatch(saveNewContact(data));
      dispatch(updateTotalRecordsCount(totalCount + 1));
      e.target.reset();
    }
  }
  return (
    <>
      <form onSubmit={handleForm} className="flex flex-col">
        <div className="relative mt-3 flex flex-col">
          <label
            htmlFor="fname"
            className="bg-[#324376] absolute left-6 text-xs p-0.5"
          >
            First Name
          </label>
          <input
            type="text"
            id="fname"
            className={`p-3 mt-2 mx-4 border-2 border-solid rounded-lg outline-0 focus:border-amber-300" ${
              errorFieldFirstName ? "border-amber-800" : ""
            }`}
            placeholder="First Name"
            ref={firstNameRef}
          />
          {errorFieldFirstName && (
            <span className="text-xs text-amber-800 mx-4">
              *Field require minimum 3 characters
            </span>
          )}
        </div>
        <div className="relative mt-3 flex flex-col">
          <label
            htmlFor="lname"
            className="bg-[#324376] absolute left-6 text-xs p-0.5"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            placeholder="Last Name"
            ref={lastNameRef}
            className={`p-3 mt-2 mx-4 border-2 border-solid rounded-lg outline-0 focus:border-amber-300" ${
              errorFieldLastName ? "border-amber-800" : ""
            }`}
          />
          {errorFieldLastName && (
            <span className="text-xs text-amber-800 mx-4">
              *Field require minimum 3 characters
            </span>
          )}
        </div>
        <div className="relative mt-3 flex flex-col">
          <label
            htmlFor="contact"
            className="bg-[#324376] absolute left-6 text-xs p-0.5"
          >
            Contact
          </label>
          <input
            type="number"
            id="contact"
            className={`p-3 mt-2 mx-4 border-2 border-solid rounded-lg outline-0 focus:border-amber-300 appearance-none" ${
              errorFieldContactNumber ? "border-amber-800" : ""
            }`}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            placeholder="Contact No."
            ref={contactNumberRef}
          />
          {errorFieldContactNumber && (
            <span className="text-xs text-amber-800 mx-4">
              *Field require minimum 7 digits
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-sky-600 px-1 py-2 font-bold text-white rounded-md mx-4 mt-2 hover:bg-sky-700 cursor-pointer"
        >
          Save Contact
        </button>
      </form>
    </>
  );
}

export default CreateNewContact;
