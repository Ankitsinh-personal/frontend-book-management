import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessageService } from 'src/app/shared/services/toastr-message.service';
import { BookService } from 'src/app/shared/services/book.service';
import { ToolTips } from 'src/app/shared/enums/tool-tips.enum';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BookDataSource, BookDetails, GetBookRequest, GetBookResponse } from 'src/app/shared/interfaces/book';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Config } from 'src/app/shared/constants/config';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = ['srNo', 'bookName', 'author', 'description', 'price', 'action'];
  toolTip = ToolTips;
  totalRecords: number = 0
  bookDataSource: BookDataSource[] = [];
  pagination: PageEvent = Config.pagination;

  constructor(
    private _bookService: BookService,
    private _router: Router,
    public dialog: MatDialog,
    private _toastrMessageService: ToastrMessageService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    let params: GetBookRequest = {
      pageIndex: this.pagination.pageIndex + 1,
      perPage: this.pagination.pageSize,
      sortField: 'id',
      sortOrder: 'DESC'
    }
    this._bookService.getBooks(params).subscribe((res: GetBookResponse) => {
      this.bookDataSource = res.results;
      this.totalRecords = res.totalCount
    }, (error: HttpErrorResponse) => {
      this._toastrMessageService.showError(error.error?.message)
    })
  }

  openBookDetails(id: number) {
    this._router.navigate(['/books', id]);
  }

  editBookDetails(row: BookDetails) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      panelClass: 'penalClass',
      data: row
    });

    dialogRef.afterClosed().subscribe((result: BookDetails) => {
      if (result) {
        this._bookService.updateBookDetails(row.id, result).subscribe((res) => {
          this._toastrMessageService.showSuccess('book updated successfully');
          this.getBooks();
        }, (error: HttpErrorResponse) => {
          this._toastrMessageService.showError('Book update error');
        })
      }
    });
  }

  deleteBookDetails(row: BookDetails) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'penalClass',
      data: row.bookName
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._bookService.deleteBookDetailsById(row.id).subscribe((res) => {
          this._toastrMessageService.showSuccess('Book details deleted successfully');
          this.getBooks();
        }, (error) => {
          this._toastrMessageService.showError('Book details deleted error');
        })
      }
    });
  }

  openAddBookDialog() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      panelClass: 'penalClass'
    });

    dialogRef.afterClosed().subscribe((result:BookDataSource) => {
      if (result) {
        this._bookService.addBook(result).subscribe((res) => {
          this._toastrMessageService.showSuccess('Book added successfully');
          this.getBooks();
        }, (error) => {
          this._toastrMessageService.showError('Adding book error');
        })
      }
    });
  }

  pageChange(event: PageEvent) {
    this.pagination = event
    this.getBooks();
  }
}
