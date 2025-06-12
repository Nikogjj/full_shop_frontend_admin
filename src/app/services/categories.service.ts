import { Injectable } from '@angular/core';
import { ResponseGetAllCategories } from '../interfaces/response-get-all-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: ResponseGetAllCategories[] = [];
  modifyIsTouched = false;
  categoriesModified!: ResponseGetAllCategories ;


  constructor() {
    this.getAllCategories();
  }

  getAllCategories(){
      fetch("http://192.168.10.136:8000/api/get_categories",{
        method:"GET"
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.categories = data;
      })
      .catch(error => console.error(error));
  }

  getCategoryById(id: number){
    return new Promise<ResponseGetAllCategories>((resolve, reject) => {
      fetch("http://192.168.10.136:8000/api/get_category/" + id,{
        method: "GET"
      })
      .then(response => response.json())
      .then(data => {resolve(data);})
      .catch(error => reject(error));
    });
  }

  convertDate(date : string){
    date = date.replace("T", " ");
    date = date.replace("Z", "");
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("fr-FR", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'});
  }

  toogleModifyIsTouched(){
    this.modifyIsTouched = !this.modifyIsTouched;
  }

  async test(id : number){
    await this.getCategoryById(id)
    .then(data => {
      this.categoriesModified = data;
      console.log(this.categoriesModified);
    })
    this.toogleModifyIsTouched();
    console.log(id);
  }
}
