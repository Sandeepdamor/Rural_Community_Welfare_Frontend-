export class PaginationManager {
  SHOW_BUTTON = 5;

  pageNumber = 0;
  pageSize = 0;
  totalElements = 0;
  totalPages = 0;
  numberOfElements_currentPage = 0;
  last = false;
  first = false;
  showButtons = [0];

  public setPageData(data: any) {
    this.first = data.first;
    this.last = data.last;
    this.numberOfElements_currentPage = data.numberOfElements;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.pageable.pageNumber;
    this.pageSize = data.pageable.pageSize;
    
    this.setButtons();
  }

  setButtons() {
    if (this.totalPages < this.SHOW_BUTTON) {
      this.fillButtons(1, this.totalPages);
    } // show all buttons
    else if (this.totalPages - this.pageNumber >= this.SHOW_BUTTON) {
      let st = this.pageNumber;
      while (st % this.SHOW_BUTTON != 0) {
        st--;
      }
      this.fillButtons(st + 1, st + this.SHOW_BUTTON);
    } else {
      let st = this.pageNumber;
      while (st % this.SHOW_BUTTON != 0) {
        st--;
      }

      // for page end
      if (st + this.SHOW_BUTTON > this.totalPages)
        this.fillButtons(st + 1, st + this.totalPages);
      else this.fillButtons(st + 1, st + this.SHOW_BUTTON);
    }
  }

  fillButtons(st: any, end: any) {
    this.showButtons = [];
    for (let i = st; i <= end; i++)
      if (i <= this.totalPages) this.showButtons.push(i);
  }
}
