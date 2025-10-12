import { Component, inject, OnInit, Pipe } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { EnumProductStatus } from '../../interfaces/product-status-enum';
import { CommonModule, DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt);

@Component({
  selector: 'app-products',
  imports: [DecimalPipe, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];
  productStatus = EnumProductStatus;

  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl('')
  })

  private readonly _productsService = inject(ProductsService);

  ngOnInit(): void {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data
        this.filteredProducts = response.data
      }
    });
  }

  filterProducts(){
    const title = this.filterForm.value.title?.toLowerCase()
    const status = this.filterForm.value.status?.toLowerCase()

    this.filteredProducts = this.products.filter((product) =>
    (!title || product.title.toLowerCase().includes(title)) &&
    (!status || product.status.toLowerCase().includes(status)))
  }

  clearFilter(){
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');

    this.filteredProducts = this.products;
  }

}
