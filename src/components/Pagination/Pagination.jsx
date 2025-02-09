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
import { useLocation } from "react-router-dom";

function Pagination() {
  let [pageCount, setPageCount] = useState(1);
  const totalRecordsCount = useSelector(
    (state) => state.name.totalRecordsCount
  );
  const pathname = useLocation();
  const AllRecords = useSelector((state) => state.name.contact);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.name.refresh);
  const paginationVisible = useSelector(
    (state) => state.name.isPaginationVisible
  );

  function nextResults() {
    dispatch(getNextSetOfContactDetails(AllRecords[AllRecords.length - 1].key));
    setPageCount((prev) => prev + 1);
  }
  function prevResults() {
    dispatch(getPreviousSetOfContactDetails(AllRecords[0].key));
    setPageCount((prev) => prev - 1);
  }
  useEffect(() => {
    setPageCount(1);
  }, [refresh, paginationVisible]);
  return (
    <>
      <div
        className={`justify-center text-center align-middle mt-2 ${
          pathname.pathname == "/" && paginationVisible ? "flex" : "hidden"
        }`}
      >
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
