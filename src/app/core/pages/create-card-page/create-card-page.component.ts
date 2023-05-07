import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { DateValidator } from '../../utils/date-validator.util';

@Component({
  selector: 'app-create-card-page',
  templateUrl: './create-card-page.component.html',
  styleUrls: ['./create-card-page.component.scss'],
})
export class CreateCardPageComponent implements OnInit {
  formGroup!: FormGroup;

  title!: FormControl;

  description!: FormControl;

  imgLink!: FormControl;

  videoLink!: FormControl;

  date!: FormControl;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const URL_REGEX =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.description = new FormControl('', [Validators.maxLength(255)]);
    this.imgLink = new FormControl('', [
      Validators.required,
      Validators.pattern(URL_REGEX),
    ]);
    this.videoLink = new FormControl('', [
      Validators.required,
      Validators.pattern(URL_REGEX),
    ]);
    this.date = new FormControl('', [Validators.required, DateValidator()]);

    this.formGroup = new FormGroup({
      title: this.title,
      description: this.description,
      imgLink: this.imgLink,
      videoLink: this.videoLink,
      date: this.date,
    });
  }

  onCreate() {
    if (this.formGroup.valid) {
      const card = this.formGroup.value;
      localStorage.setItem('card', JSON.stringify(card));
      this.formGroup.reset();
      this.router.navigate(['/']);
    }
  }
}
