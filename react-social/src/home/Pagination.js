import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const { itemsPerPage, totalItems, currentPage, paginate } = this.props;
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
      <div className="pagination-area pb-115 text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-start">
                    {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number) => (
                      <li className="page-item" key={number}>
                        <a
                          className={currentPage === number ? 'page-link active' : 'page-link'}
                          href="#"
                          onClick={() => paginate(number)}
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;