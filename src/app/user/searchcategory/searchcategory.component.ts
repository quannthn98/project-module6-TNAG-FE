import { Component, OnInit } from '@angular/core';
import {Userdto} from "../../model/userdto";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/user.service";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-searchcategory',
  templateUrl: './searchcategory.component.html',
  styleUrls: ['./searchcategory.component.css']
})
export class SearchcategoryComponent implements OnInit {
  categories: Category[] = [];
  userDto: Userdto[] = [];
  categoryId: number;
  nameCategory: string;


  constructor(private httpClient: HttpClient, private userService: UserService, private categorySevice: CategoryService) {
    this.getUserDtoByCategoryId();
    this.getAllCategories();
  }

  ngOnInit() {
  }

  getUserDtoByCategoryId() {
    this.userService.getUserByCategory(this.categoryId).subscribe((data: any) => {
      console.log(data);
      this.userDto = data;
    }, error => {
      console.log(error);
    });
  }

  changeCategory(id: number) {
    this.categoryId = id;
    this.getUserDtoByCategoryId();
    this.getNameCategory();
  }

  getAllCategories(){
    this.categorySevice.getAll().subscribe((data:any) => {
      console.log(data);
      this.categories = data.content;
    },error => {
      console.log(error);
    } )
  }
  getNameCategory(){
    for(let i=0 ; i< this.categories.length; i++){
      if(this.categories[i].id == this.categoryId ){
        this.nameCategory = this.categories[i].name
        break;
      }
    }
  }

}
