import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



/**
 * Generated class for the PartybookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partybooking',
  templateUrl: 'partybooking.html',
})
export class PartybookingPage {

  private payment: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.payment = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("[^ @]*@[^ @]*")],
      contact: ['', Validators.required],
      noOfPersons: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      budgetPerPerson: ['', Validators.required],
      requirements: ['', Validators.required],
      location: ['', Validators.required],
      meals: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartybookingPage');
  }

}
