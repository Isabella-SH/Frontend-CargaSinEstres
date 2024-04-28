import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-landing',
  templateUrl: './toolbar-landing.component.html',
  styleUrls: ['./toolbar-landing.component.scss']
})

export class ToolbarLandingComponent {
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  constructor(private router: Router) { }

  pageLanding(){
    this.router.navigateByUrl('/landing-page');
  }

  pageLandingServices(){
    this.router.navigateByUrl('/landing-page#services');
  }

  pageLandingAboutUs(){
    this.router.navigateByUrl('/landing-page#aboutus');
  }

  pageLandingPlans(){
    this.router.navigateByUrl('/landing-page#plans');
  }

  pageLandingTestimonials(){
    this.router.navigateByUrl('/landing-page#testimonials');
  }

  pageContact(){
    this.router.navigateByUrl('/contact');
  }

  pageLoginForm(){
    this.router.navigateByUrl('/login');
  }
  pageSignUpForm(){
    this.router.navigateByUrl('/sign-up');
  }
}
