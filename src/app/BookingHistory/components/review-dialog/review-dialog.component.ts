import { Component, Inject, ViewChild } from '@angular/core';
import { CargaSinEstresDataService } from 'src/app/services/carga-sin-estres-data.service';
import { Review } from 'src/app/models/review.model';
import { NgForm } from '@angular/forms';
import { ActiveReservationsComponent } from '../active-reservations/active-reservations.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {
  reviewForm: FormGroup;
  reviewData!: any;
  companyId!: any;
  rating: number = 0;

  userId: string = '';
  userType: string = '';
  nameCompany: any;
  logoCompany: any;
  company: any;

  constructor(private fb: FormBuilder, private companyDataService: CargaSinEstresDataService, private router: Router, private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar){
    this.reviewData = {} as any;

    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      comment: ['', Validators.required],
    })
  }


  ngOnInit(): void {
    this.companyId = this.data.company.company.id;
    
    this.userType = this.data.userType;
    this.userId = this.data.userId;

    this.getInitialValues();
  }

  getInitialValues(){
    this.companyDataService.getCompanyById(this.companyId).subscribe((response: any) => {
      this.nameCompany = response.name;
      this.logoCompany = response.photo;
      this.company=response;
    });
  }

  //add
  sendReview() {
    const formData = this.reviewForm.value;
    const ratingValue = formData.rating === null ? 0 : formData.rating;
    const commentValue = formData.comment === null ? "..." : formData.comment;
  
    const reviewData = {
      rating: ratingValue,
      comment: commentValue,
    }
  
    this.companyDataService.addReview(this.companyId, reviewData).subscribe((response: any) => {
      if (!Array.isArray(this.data.element)) {
        this.data.element = [];
      }
      this.data.element = this.data.element.map((o: any) => {
        if (o.id === response.id) {
          return response;
        }
        return o;
      });

      this._snackBar.open('Se creo la reseña de la empresa exitosamente', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
      });
    });
  
    this.reviewForm.reset();
  }

}
