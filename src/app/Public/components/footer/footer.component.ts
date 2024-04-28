import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  pageClientForm(){
    this.router.navigateByUrl('/client-form');
  }

  pageCompanyForm(){
    this.router.navigateByUrl('/company-form');
  }

}
