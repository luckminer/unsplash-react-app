import React, {Component} from "react";

class Pagination extends Component {
  pages = () => {
    const pages = [];
    for(let i = this.rangeStart(); i <= this.rangeEnd(); i++) pages.push(i);
    return pages;
  };

  rangeStart = () => {
    const start = this.props.current - this.props.pageRange;
    return (start > 0) ? start : 1
  };

  rangeEnd = () => {
    const end = this.props.current + this.props.pageRange;
    const totalPages = this.totalPages();
    return (end < totalPages) ? end : totalPages;
  };

  totalPages = () => (Math.ceil(this.props.total / this.props.perPage));
  nextPage = () => (this.props.current + 1);
  prevPage = () => (this.props.current - 1);
  hasFirst = () => (this.rangeStart() !== 1);
  hasLast = () => (this.rangeEnd() < this.totalPages());
  hasPrev = () => (this.props.current > 1);
  hasNext = () => (this.props.current < this.totalPages());
  changePage = page => (this.props.onPageChanged(page));

  render() {
    return (
      <div className="pagination">
        <div className="pagination_left">
          <a href="#" className={!this.hasPrev() ? 'hidden': ''}
             onClick={e => this.changePage(this.prevPage())}
          >Prev</a>
        </div>

        <div className="pagination_mid">
          <ul>
            <li className={!this.hasFirst() ? 'hidden' : ''}>
              <a href="#" onClick={e => this.changePage(1)}>1</a>
            </li>
            <li className={!this.hasFirst() ? 'hidden' : ''}>...</li>
            {
              this.pages().map((page, index) => {
                return (
                  <li key={index}>
                    <a href="#"
                       onClick={e => this.changePage(page)}
                       className={ this.props.current == page ? 'current' : '' }
                    >{ page }</a>
                  </li>
                );
              })
            }
            <li className={!this.hasLast() ? 'hidden' : ''}>...</li>
            <li className={!this.hasLast() ? 'hidden' : ''}>
              <a href="#" onClick={e => this.changePage(this.totalPages())}>{ this.totalPages() }</a>
            </li>
          </ul>
        </div>

        <div className="pagination_right">
          <a href="#" className={!this.hasNext() ? 'hidden' : ''}
             onClick={e => this.changePage(this.nextPage())}
          >Next</a>
        </div>
      </div>
    );
  }
}

export default Pagination
