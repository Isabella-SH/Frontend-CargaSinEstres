import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTag({
      name: 'title',
      content: 'Carga Sin Estrés - Encuentra a los expertos en mudanzas y cargas'
    });

    this.meta.addTag({
      name: 'description',
      content: 'Encuentra a los mejores expertos en mudanza y carga que necesitas. Nuestra plataforma te conecta con profesionales de confianza para simplificar tu próxima mudanza. Cotiza, compara y elige la solución perfecta para tus necesidades de transporte en un solo lugar.'
    });

    this.meta.addTag({
      name: 'keywords',
      content: 'carga, mudanza, busqueda, empresas, embalaje, transporte, montaje, desmontaje'
    });

    this.meta.addTag({
      name: 'author',
      content: 'Valery Ayasta, Alan Galavis, Isabella Soriano, Eric Cuevas y Lucero Obispo'
    });
  }

}
