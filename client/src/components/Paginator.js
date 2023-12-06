import { memo } from "react";

const Pagination = memo(({ props }) => {

    // const [currentPage, setCurrentPage] = useState(props.currentPage);
    // const [totalPages, setTotalPages] = useState(props.totalPages);

    const currentPage = props.currentPage
    const totalPages = props.totalPages

    console.log(currentPage, totalPages);
    console.log('render');

    return (
        <nav aria-label="Page navigation example pagination">
            <ul class="pagination justify-content-center">
                <li class={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
                    <a class="page-link" href="#" onClick={() => props.changePage(currentPage - 1)} tabindex="-1">{"<"}</a>
                </li>
                {Array.from({ length: totalPages }).map((_, id) => {
                    return <li class={`page-item ${id + 1 == currentPage ? "active" : ""}`}>
                        <a class="page-link" onClick={() => props.changePage(id + 1)} href="#">
                            {id + 1}
                        </a>
                    </li>
                })}
                <li class={`page-item ${currentPage == totalPages ? "disabled" : ""}`}>
                    <a class="page-link" onClick={() => props.changePage(currentPage + 1)} href="#">{">"}</a>
                </li>
            </ul>
        </nav>
    );
})

export default Pagination;