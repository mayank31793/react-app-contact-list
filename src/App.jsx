import { Route, Routes } from "react-router-dom";
import DisplayContactList from "./components/DisplayContacts/DisplayContactList";
import Header from "./components/Header/Header";
import CreateNewContact from "./components/SidebarBottom/CreateNewContact";
import ContactsAndFavoutites from "./components/SidebarTop/ContactsAndFavoutites";
import DisplatFavContacts from "./components/DisplayContacts/DisplayFavContacts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactDetails } from "./contactSlice";

export default function App() {
  const dispatch = useDispatch();
  const selectorRefresh = useSelector((state) => state.name.refresh);
  useEffect(() => {
    dispatch(getContactDetails());
  }, [dispatch, selectorRefresh]);
  return (
    <>
      <div className="w-full bg-[#6c6ea0] h-dvh">
        <Header />
        <div className="flex justify-center w-full pt-10 h-130">
          <div className="bg-[#324376] text-white">
            <ContactsAndFavoutites />
            <CreateNewContact />
          </div>
          {/* <DisplayContactList /> */}
          <Routes>
            <Route path="/" element={<DisplayContactList />} />
            <Route path="/favourites" element={<DisplatFavContacts />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
