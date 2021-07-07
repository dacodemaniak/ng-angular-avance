import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Sort } from './../../_helpers/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Input() appSort!: any[];

  constructor(
    private renderer: Renderer2,
    private targetElement: ElementRef
  ) { }

  @HostListener('click') sortTable() {
    // Créer une instance de l'utilitaire Sort
    const sort = new Sort();

    // Récupérer la référence native de l'objet cliqué
    const element = this.targetElement.nativeElement;

    element.style.color = 'red';

    // Récupération des data-* de l'élément natif
    const order = element.getAttribute('data-order');
    const type = element.getAttribute('data-type');
    const property = element.getAttribute('data-name');

    // Exécuter la fonction de tri
    this.appSort.sort(sort.startSort(property, order, type));

    // Basculer l'ordre de tri sur l'élément concerné
    if (order === 'desc') {
      element.setAttribute('data-order', 'asc');
    } else {
      element.setAttribute('data-order', 'desc');
    }

  }
}
