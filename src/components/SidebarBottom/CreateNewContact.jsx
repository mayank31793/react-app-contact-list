import { useRef } from "react";
import { useDispatch } from "react-redux";
import { saveNewContact } from "../../contactSlice";

function CreateNewContact() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNumberRef = useRef();
  const dispatch = useDispatch();

  function handleForm(e) {
    e.preventDefault();
    let data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      contactNumber: contactNumberRef.current.value,
    };
    dispatch(saveNewContact(data));
    e.target.reset();
  }
  return (
    <>
      <form onSubmit={handleForm} className="flex flex-col">
        <input
          type="text"
          className="p-3 mt-2 mx-4 border-2 border-solid rounded-lg"
          placeholder="First Name"
          ref={firstNameRef}
        />
        <input
          type="text"
          placeholder="Last Name"
          ref={lastNameRef}
          className="p-3 mt-2 mx-4 border-2 border-solid rounded-lg"
        />
        <input
          type="text"
          className="p-3 mt-2 mx-4 border-2 border-solid rounded-lg"
          placeholder="Contact No."
          ref={contactNumberRef}
        />
        <button
          type="submit"
          className="bg-sky-600 px-1 py-2 font-bold text-white rounded-md mx-4 mt-2"
        >
          Save Contact
        </button>
      </form>
    </>
  );
}

export default CreateNewContact;
