import { Injectable, InputSignal } from '@angular/core';
import { CategoryToDelete } from '../interfaces/category-to-delete';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  allCategories: Category[] = [];
  parentCategories: Category[] = [];
  modifyIsTouched = false;
  createIsTouched = false;
  deleteIsTouched = false;
  categoryModified!: Category ;
  categoryToDelete!: CategoryToDelete;


  constructor() {
    this.getAllParentCategories();
    this.getAllCategories();
  }
  
  /**
   * Recupère toutes les catégories de la base de données
   */
  getAllCategories() {
    fetch("http://localhost:8000/api/get_all_categories",{
      method:"GET"
     })
     .then(response => response.json())
     .then(data => {
       this.allCategories = data;
       console.log(this.allCategories)
     })
     .catch(error => console.error(error));
  }

  /**
   * Recupère toutes les catégories qui n'ont pas de parents et actualise les données
  */
 getAllParentCategories(){
   fetch("http://localhost:8000/api/get_parents_categories",{
     method:"GET"
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      this.parentCategories = data;
      console.log(this.parentCategories)
    })
    .catch(error => console.error("OIZOIEZAOIEZAOIE",error));
  }
/**
 * Recupère une catégorie par son ID
 * @param id 
 * @returns 
 */
  getCategoryById(id: number){
    return new Promise<Category>((resolve, reject) => {
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
      this.categoryModified = data;
    })
    this.toogleModifyIsTouched();
  }

  /**
   * Modifie une catégorie en fonction de son ID
   * @param id 
   * @param name 
   * @param parent 
   */
  modifyCategorie(id: number, name?: string, parentId?: number | null)
  {
    return new Promise<void>((resolve, reject) => {
      if (parentId === 0) {
        parentId = null; // Si le parent est 0, on le remplace par null
      }
      console.log("Modification de la catégorie " + id + " avec le nom " + name + " et le parent " + parentId);
      fetch("http://localhost:8000/api/update_category/" + id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          parent_id: parentId
        })
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.getAllParentCategories();
        this.toogleModifyIsTouched();
        resolve(data);
      })
      .catch(error => reject(error));
    })
  }
  /**
   * Permet de faire busculer l'état de la variable createIsTouched
   */
  toggleCreateIsTouched() {
    this.createIsTouched = !this.createIsTouched;
  }

  checkIfCategoryNameExists(name : string){
    return new Promise<boolean>((resolve, reject) => {
      fetch("http://localhost:8000/api/check_if_category_name_exists/" + name, {
        method: "GET"
      })
      .then(response => response.json())
      .then(data => {
        if (data.message == "La catégorie existe déjà") resolve(true);
        else  resolve(false);
      })
      .catch(error => reject(error));
    })
  }

  /**
   * Crée une nouvelle catégorie
   * @param name 
   * @param parent 
   */
  createNewCategory(name: string, parent_id: number | null) {
    if (parent_id === 0) {
      parent_id = null; // Si le parent est 0, on le remplace par null
    }
    return new Promise((resolve, reject) => {
      const newCategory = {
        name: name,
        parent_id: parent_id
      }
      const options = {
        method : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          newCategory
        ])
      }
      fetch("http://localhost:8000/api/add_category",options)
      .then(response => response.json())
      .then(data => {
        this.getAllParentCategories();
        this.getAllCategories();
        this.toggleCreateIsTouched();
        resolve(data);
      })
      .catch(error => {
        console.error("Erreur lors de la création de la catégorie :", error);
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
    await fetch("http://localhost:8000/api/delete_category/" + this.categoryToDelete.id, {
      method: "DELETE"
    })
    .then(response =>{
      if (response.ok) {
        this.getAllParentCategories();
        this.toggleDeleteIsTouched();
        return response.json();
      }
      else{
        throw new Error("Erreur lors de la suppression de la catégorie");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression de la catégorie :", error);
      throw error;
    })
  }
}
