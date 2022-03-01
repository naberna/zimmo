import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  constructor(private http: HttpClient) {

  }
  form = new FormGroup({
    rate: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  showCommentArea: boolean = false;
  showSuccessMessage: boolean = false;
  rateClickable: boolean = true;
  errorMessageStatus: boolean = false;

  setRate(data: number) {
    this.showCommentArea = true;
    this.form.patchValue({ rate: data });
  }

  saveForm() {
    this.errorMessageStatus = true;
    if (this.form.valid) {
      this.errorMessageStatus = false;
      this.http.post<any>('https://reqres.in/api/posts', this.form.value).subscribe(data => { })
      this.showSuccessMessage = true;
      this.showCommentArea = false;
      this.rateClickable = false;
    }
    else {
      this.showCommentArea = true;
    }
  }
}
