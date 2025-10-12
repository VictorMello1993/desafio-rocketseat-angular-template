import { Component, inject, OnInit, Pipe } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { EnumProductStatus } from '../../interfaces/product-status-enum';
import { CommonModule, DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-products',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{
  products: IProductResponse[] = [];
  productStatus = EnumProductStatus;

  private readonly _productsService = inject(ProductsService);

  ngOnInit(): void {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data
      }
    });
  }

}
