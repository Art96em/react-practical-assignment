import { memo, useCallback, useEffect, useState } from "react";
import { useSelectorPaginatorCurrent, useSelectorPaginatorTotal } from "../../redux/store";
import { useDispatch } from "react-redux";
import { paginationActions } from "../../redux/PaginationSlice";

const Pagination = memo(() => {

    const dispatch = useDispatch();
    const currentPage = useSelectorPaginatorCurrent();
    const totalPages = useSelectorPaginatorTotal();

    const changePage = useCallback((pageNumber) => {
        if (pageNumber != currentPage) {
            dispatch(paginationActions.setCurrentPage(pageNumber))
        }
    }, [currentPage])

    return (
        <nav aria-label="Page" className="p-0">
            <ul className="pagination justify-content-center align-content-center m-1">
                <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={() => changePage(currentPage - 1)} tabIndex="-1">{"<"}</a>
                </li>
                {Array.from({ length: totalPages }).map((_, id) => {
                    return <li className={`page-item ${id + 1 == currentPage ? "active" : ""}`} key={id}>
                        <a className="page-link" onClick={() => changePage(id + 1)} href="#">{id + 1}</a>
                    </li>
                })}
                <li className={`page-item ${currentPage == totalPages ? "disabled" : ""}`}>
                    <a className="page-link" onClick={() => changePage(currentPage + 1)} href="#">{">"}</a>
                </li>
            </ul>
        </nav>
    );
})

export default Pagination;