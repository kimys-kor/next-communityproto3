import { FC } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface PagingProps {
  page: number;
  size: number;
  totalElements: number;
  setPage: (pageNumber: number) => void;
  scroll: "top" | "bottom";
}

const Paging: FC<PagingProps> = ({
  page,
  size,
  totalElements,
  setPage,
  scroll,
}) => {
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);

    if (scroll === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (scroll === "bottom") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-1 px-4 text-gray-600 md:px-8 mb-5">
      <div className="justify-center sm:flex" aria-label="Pagination">
        <StyledPagination>
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={totalElements}
            pageRangeDisplayed={5}
            prevPageText={
              <span className="inline-flex items-center gap-x-2">
                <MdOutlineKeyboardArrowLeft />
              </span>
            }
            nextPageText={
              <span className="inline-flex items-center gap-x-2">
                <MdOutlineKeyboardArrowRight />
              </span>
            }
            firstPageText={
              <span className="inline-flex items-center gap-x-2">
                <MdOutlineKeyboardDoubleArrowLeft />
              </span>
            }
            lastPageText={
              <span className="inline-flex items-center gap-x-2">
                <MdOutlineKeyboardDoubleArrowRight />
              </span>
            }
            onChange={handlePageChange}
          />
        </StyledPagination>
      </div>
    </div>
  );
};

export default Paging;

const StyledPagination = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination {
    display: flex;
    gap: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
  }

  ul.pagination li a {
    border: 1px solid #ccc;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:
      background-color 0.2s,
      color 0.2s;
  }

  ul.pagination li:first-child a {
    border-left: 1px solid #ccc;
    border-radius: 1.5rem 0 0 1.5rem;
  }

  ul.pagination li:last-child a {
    border-right: 1px solid #ccc;
    border-radius: 0 1.5rem 1.5rem 0;
  }

  ul.pagination li a:hover,
  ul.pagination li.active a {
    background-color: #e0e7ff;
    color: white;
  }
`;
