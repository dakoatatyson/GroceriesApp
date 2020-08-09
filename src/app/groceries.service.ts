import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CustomToastService } from './custom-toast.service';

@Injectable({
  providedIn: 'root',
})

export class GroceriesService {
  private platform: Platform;
  items: any = [];

  constructor(platform: Platform, private http: HttpClient, private toast: CustomToastService) { 
    this.platform = platform;
  }

  loadItems(){
    this.http.get('http://192.168.1.2:8080/api/groceries/')
    .subscribe(data => {
      this.items = data
    },error => {
      this.toast.presentErrorToast(`Could not retrive Grocery Items at this time.`);
    });
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.http.post('http://192.168.1.2:8080/api/groceries/', item)
    .subscribe(data => {
      this.loadItems();
    },error => {
      this.toast.presentErrorToast(`Could not create Grocery Item at this time.`);
    });
  }

  editItem(item, index) {
    this.http.put(`http://192.168.1.2:8080/api/groceries/${this.items[index]._id}`, item)
    .subscribe(data => {
      this.loadItems();
    },error => {
      this.toast.presentErrorToast(`Could not update Grocery Item at this time.`);
    });
  }

  deletItem(index) {
    this.http.delete(`http://192.168.1.2:8080/api/groceries/${this.items[index]._id}`)
    .subscribe(data => {
      this.loadItems();
    },error => {
      this.toast.presentErrorToast(`Could not delete Grocery Item at this time.`);
    });
  }
}
