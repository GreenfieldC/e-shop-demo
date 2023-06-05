import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$: Observable<any>;

  constructor(private apiService: ApiService) {
    this.products$ = this.apiService.getProducts;
    this.apiService.getProducts.subscribe((data) => {
      console.log(data);
    });
  }
}
