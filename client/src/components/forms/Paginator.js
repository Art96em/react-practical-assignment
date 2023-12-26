import { memo } from "react";

const Pagination = memo(({ props }) => {

    // const [currentPage, setCurrentPage] = useState(props.currentPage);
    // const [totalPages, setTotalPages] = useState(props.totalPages);

    const currentPage = props.currentPage
    const totalPages = props.totalPages

    console.log('render');

    return (
        <nav aria-label="Page navigation example pagination">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={() => props.changePage(currentPage - 1)} tabIndex="-1">{"<"}</a>
                </li>
                {Array.from({ length: totalPages }).map((_, id) => {
                    return <li className={`page-item ${id + 1 == currentPage ? "active" : ""}`} key={id}>
                        <a className="page-link" onClick={() => props.changePage(id + 1)} href="#">
                            {id + 1}
                        </a>
                    </li>
                })}
                <li className={`page-item ${currentPage == totalPages ? "disabled" : ""}`}>
                    <a className="page-link" onClick={() => props.changePage(currentPage + 1)} href="#">{">"}</a>
                </li>
            </ul>
        </nav>
    );
})

export default Pagination;