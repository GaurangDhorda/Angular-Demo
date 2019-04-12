import { Component, OnInit } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products = products;
selectedProductName: string;
  constructor() {
  }

  ngOnInit() {
  }
  share(productname) {
    window.alert( productname + ' has been shared!');
    this.selectedProductName = productname;
  }
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
