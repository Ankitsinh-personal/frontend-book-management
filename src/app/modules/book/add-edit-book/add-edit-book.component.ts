import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/shared/enums/messages.enum';
import { BookDetails } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  addEditBookForm!: FormGroup;
  messages = Message;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDetails,
  ) { }

  ngOnInit(): void {
    this.addEditBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required]],
    });

    if (this.data) {
      this.addEditBookForm.patchValue(this.data);
    }
    this.addEditBookForm.updateValueAndValidity();
  }

  onSubmit() {
    this.dialogRef.close(this.addEditBookForm.value);
  }
}
