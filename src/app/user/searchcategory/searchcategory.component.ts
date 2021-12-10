import {Component, OnInit} from '@angular/core';
import {Userdto} from '../../model/userdto';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../service/user.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-searchcategory',
  templateUrl: './searchcategory.component.html',
  styleUrls: ['./searchcategory.component.css']
})
export class SearchcategoryComponent implements OnInit {
  categories: Category[] = [];
  userDto: Userdto[] = [];
  categoryId;
  nameCategory: string;
  searchText;

  constructor(private httpClient: HttpClient, private userService: UserService, private categorySevice: CategoryService) {
    this.getAllCategories();
    // const categories1 =  this.getAllCategoriesToPromise().content;
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

  getAllCategories() {
    this.categorySevice.getAll().subscribe((data: any) => {
      console.log(data);
      this.categories = data.content;
      if (this.userService.searchedMerchant.length !== 0) {
        const searchedValue = this.userService.searchedMerchant;
        for (let i = 0; i < this.userService.searchedMerchant.length; i++) {
          const merchant = {
            id: searchedValue[i].id,
            name: searchedValue[i].merchantProfile.name,
            address: searchedValue[i].merchantProfile.address,
            thumbnail: searchedValue[i].merchantProfile.thumbnail
          };
          this.userDto.push(merchant);
        }
      } else {
        if (this.userService.selectedCategoryId !== undefined) {
          this.categoryId = this.userService.selectedCategoryId;
        } else {
          this.categoryId = this.categories[0].id;
        }
        this.getUserDtoByCategoryId();
      }
    }, error => {
      console.log(error);
    });
  }

  getAllCategoriesToPromise(): any {
    return this.categorySevice.getAll().toPromise();
  }

  getNameCategory() {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === this.categoryId) {
        this.nameCategory = this.categories[i].name;
        break;
      }
    }
  }

}
