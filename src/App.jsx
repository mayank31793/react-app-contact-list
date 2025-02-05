import { Route, Routes } from "react-router-dom";
import DisplayContactList from "./components/DisplayContacts/DisplayContactList";
import Header from "./components/Header/Header";
import CreateNewContact from "./components/SidebarBottom/CreateNewContact";
import ContactsAndFavoutites from "./components/SidebarTop/ContactsAndFavoutites";
import DisplatFavContacts from "./components/DisplayContacts/DisplayFavContacts";

export default function App() {
  return (
    <>
      <div className="w-full bg-[#6c6ea0] h-dvh">
        <Header />
        <div className="flex justify-center w-full pt-10">
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
