import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms' ;
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private carService: CartService, private formBuilder: FormBuilder) { }
items;
checkOutForms;

  ngOnInit() {
    this.items = this.carService.getItems();
    this.checkOutForms = this.formBuilder.group({
                                                 name: '', address: ''
                                                });
  }
onSubmit(customerData){
  console.warn('your order has been submittee ', customerData );
  this.items = this.carService.clearCart();
  this.checkOutForms.reset();
}
}
