import { useSelector, useDispatch } from "react-redux";
import {
  getPreviousSetOfContactDetails,
  getNextSetOfContactDetails,
} from "../../contactSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination() {
  let [pageCount, setPageCount] = useState(1);
  const totalRecordsCount = useSelector(
    (state) => state.name.totalRecordsCount
  );
  const AllRecords = useSelector((state) => state.name.contact);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.name.refresh);

  function nextResults() {
    // console.log("all rec", AllRecords[AllRecords.length - 1].key);
    dispatch(getNextSetOfContactDetails(AllRecords[AllRecords.length - 1].key));
    setPageCount((prev) => prev + 1);
  }
  function prevResults() {
    // console.log("all rec", AllRecords[AllRecords.length - 1].key);
    dispatch(getPreviousSetOfContactDetails(AllRecords[0].key));
    setPageCount((prev) => prev - 1);
  }
  useEffect(() => {
    setPageCount(1);
  }, [refresh]);
  return (
    <>
      <div className="flex justify-center text-center align-middle mt-2">
        <p className="px-3 py-2 font-bold text-lg text-[#324376]">
          {pageCount}/{Math.ceil(totalRecordsCount / 15)}
        </p>
        <button
          onClick={prevResults}
          className={`px-3 py-1 mx-2 bg-[#6365a4]  ${
            pageCount == 1
              ? "text-gray-400 disabled:cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={pageCount == 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextResults}
          className={`px-3 mx-2 bg-[#6365a4]  ${
            pageCount == Math.ceil(totalRecordsCount / 15)
              ? "text-gray-400 disabled:cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={pageCount == Math.ceil(totalRecordsCount / 15)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
}

export default Pagination;
