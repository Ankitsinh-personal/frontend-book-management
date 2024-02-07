import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails, GetBookByIdResponse } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { ToastrMessageService } from 'src/app/shared/services/toastr-message.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookId!: number;
  bookDetails!: BookDetails;
  constructor(
    private _bookService: BookService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastrMessageService: ToastrMessageService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.bookId = params['id'];
    });
    this.getBookDetails();
  }

  getBookDetails() {
    this._bookService.getBookDetailsById(this.bookId).subscribe((res: GetBookByIdResponse) => {
      this.bookDetails = res.book
    }, (error: any) => {
      this._toastrMessageService.showError(error.error?.message)
      this._router.navigate(['../']);
    })
  }
}
