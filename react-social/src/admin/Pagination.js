import React from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageNumbers) {
            paginate(currentPage + 1);
        }
    };

    return (
        
            <div className="row" >
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" id="datatables-buttons_info" role="status" aria-live="polite">
                        Hiển thị 1 đến 10 của {totalItems} kết quả</div></div><div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate paging_simple_numbers" id="datatables-buttons_paginate" style={{marginLeft: "50%"}}>
                        <ul className="pagination">
                            <li className="previous" id="datatables-buttons_previous">
                                <a aria-controls="datatables-buttons" onClick={handlePrevious} aria-role="link" data-dt-idx="previous" tabindex="0" className="page-link">Previous</a>
                            </li>
                            {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number) => (
                            <li key={number}><a href="#" aria-controls="datatables-buttons" aria-role="link" data-dt-idx="1" tabindex="0"  onClick={() => paginate(number)} className={currentPage === number ? 'page-link active' : 'page-link '}>{number}</a></li>
                            ))}
                            <li className=" next" id="datatables-buttons_next">
                                <a href="#" aria-controls="datatables-buttons" onClick={handleNext} aria-role="link" data-dt-idx="next" tabindex="0" className="page-link">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
    );
};

export default Pagination;