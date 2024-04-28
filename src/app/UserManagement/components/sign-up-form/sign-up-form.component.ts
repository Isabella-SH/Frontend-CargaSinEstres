import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  constructor(private router: Router) {}
  selectedAccount: any = null;
  onAccountSelected(account: any) {
    this.selectedAccount = account;
  }
  account_types = [
    {
      id: '1',
      name: 'customer',
      img: 'assets/public-images/accountCustomer.jpg',
    },
    {
      id: '2',
      name: 'company',
      img: 'assets/public-images/accountCompany.jpg',
    },
  ];
  navigateToAccountForm() {
    const redirectUrl = this.selectedAccount.id === '1' ? '/client-form' : '/company-form';
    this.router.navigate([redirectUrl]);
  }
}
