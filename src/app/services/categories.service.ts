import { Injectable, InputSignal } from '@angular/core';
import { CategoryToDelete } from '../interfaces/category-to-delete';
import { Category } from '../interfaces/category';
import { ResponseGetCateById } from '../interfaces/response-get-cate-by-id';
import { ResponseModifyCate } from '../interfaces/response-modify-cate';
import { ResponseCheckCateExists } from '../interfaces/response-check-cate-exists';
import { ResponseCreateCate } from '../interfaces/response-create-cate';
import { ResponseDeleteCate } from '../interfaces/response-delete-cate';
import { ResponseGetCateByName } from '../interfaces/response-get-cate-by-name';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  allCategories: Category[] = [];
  searchCategories: Category[] = [];
  modifyIsTouched = false;
  createIsTouched = false;
  deleteIsTouched = false;
  categoryModified!: Category ;
  categoryToDelete!: CategoryToDelete;


  constructor() {
    this.getAllCategories();
  }
  
  /**
   * Recupère toutes les catégories de la base de données
   */
  async getAllCategories() {
    await fetch("http://localhost:8000/api/get_all_categories",{
      method:"GET"
     })
     .then(response => response.json())
     .then(data => {
       this.allCategories = data.categories;
       console.log(data);
       console.log(data.categories);
     })
     .catch(error => console.error(error));
  }

/**
 * Recupère une catégorie par son ID
 * @param id 
 * @returns 
 */
  getCategoryById(id: number){
    return new Promise<ResponseGetCateById>((resolve, reject) => {
      fetch("http://localhost:8000/api/get_category/" + id,{
        method: "GET"
      })
      .then(response => response.json())
      .then(data => {resolve(data);})
      .catch(error => reject(error));
    });
  }

  /**
   * Converti une date au format français
   * @param date 
   * @returns 
   */
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

  /**
   * Permet de faire busculer l'état de la variable modifyIsTouched 
   * (active ou désactive l'interface de modification)
   */
  toogleModifyIsTouched(){
    this.modifyIsTouched = !this.modifyIsTouched;
    if(this.modifyIsTouched == false){
      this.categoryModified = {} as Category;
    }
  }

  /**
   * Affiche les données d'une catégorie dans l'interface de modification
   * @param id 
   */
  async displayDataCategorie(id : number){
    await this.getCategoryById(id)
    .then(data => {
      console.log(data.categorie.updated_at)
      if (data.message == "La catégorie a bien été trouvée") {
        this.categoryModified = {
          id: data.categorie.id,
          name: data.categorie.name,
          created_at: this.convertDate(data.categorie.created_at),
          updated_at: this.convertDate(data.categorie.updated_at)
        };
        this.toogleModifyIsTouched();
        console.log(this.categoryModified);
      }
      else{
        console.error(data.message);
      }
    })
    .catch(error => console.error(error));
  }

  /**
   * Modifie une catégorie en fonction de son ID
   * @param id 
   * @param name 
   * @param parent 
   */
  modifyCategorie(id: number, name: string)
  {
    return new Promise<ResponseModifyCate>((resolve, reject) => {
      fetch("http://localhost:8000/api/update_category/" + id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
        })
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    })
  }
  /**
   * Permet de faire busculer l'état de la variable createIsTouched
   */
  toggleCreateIsTouched() {
    this.createIsTouched = !this.createIsTouched;
  }

  /**
   * Vérifie si le nom de la catégorie existe déjà dans la base de données
   * @param name 
   * @returns 
   */
  checkIfCategoryNameExists(name : string){
    return new Promise<ResponseCheckCateExists>((resolve, reject) => {
      fetch("http://localhost:8000/api/check_if_category_name_exists/" + name, {
        method: "GET"
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    })
  }

  /**
   * Crée une nouvelle catégorie
   * @param name 
   * @param parent 
   */
  createNewCategory(name: string) {
    return new Promise<ResponseCreateCate>((resolve, reject) => {
      const options = {
        method : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : name
        })
      }
      fetch("http://localhost:8000/api/add_category",options)
      .then(response => response.json())
      .then(data => {
        this.getAllCategories();
        this.toggleCreateIsTouched();
        resolve(data);
      })
      .catch(error => {
        reject(error)
      });
    });
  }

  /**
   * Permet de faire busculer l'état de la variable deleteIsTouched
   */
  toggleDeleteIsTouched(){
    this.deleteIsTouched = !this.deleteIsTouched;
    if (this.deleteIsTouched == false) {
      this.categoryToDelete.id = 0;
      this.categoryToDelete.nom = "";
    }
  }

  /**
   * Affiche les données d'une catégorie à supprimer
   * @param id 
   */
  async displayDataToDelete(infos : (InputSignal<number> | InputSignal<string>)[]) {
    this.categoryToDelete = {
      id: infos[0]() as number,
      nom: infos[1]() as string
    };
    this.toggleDeleteIsTouched();
  }

  /**
   * Supprime une catégorie de la base de données
   * @param id 
   * @returns 
   */
  async deleteCategory() {
    return new Promise<ResponseDeleteCate>(async (resolve, reject) => {
      fetch("http://localhost:8000/api/delete_category/" + this.categoryToDelete.id, {
        method: "DELETE"
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data)})
      .catch(error => {
        reject(error);
      });
    })
  }

  searchCategoriesByName(name: string) {
    return new Promise<ResponseGetCateByName>((resolve, reject) => {
      fetch("http://localhost:8000/api/get_categories_by_name/" + name, {
        method: "GET"
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        reject(error);
      });
    });
  }

}
