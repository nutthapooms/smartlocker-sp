import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemRequest, ContainerDTO, ItemDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  fileData: File = null;
  itemRequest: ItemRequest = new ItemRequest();
  item: ItemDTO = new ItemDTO();
  subcategoryId: string;
  categoryId: string;
  itemId: string;
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }


  ngOnInit() {

    this.subcategoryId = this.route.snapshot.paramMap.get('subcategoryId');
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.itemRequest.subcategoryId = this.subcategoryId
    if(this.itemId != null) {
      this.http.get<ItemDTO>(`http://52.163.226.37/api/admin/items/${this.itemId}`).subscribe(data => {
        console.log(data)
        this.item = data;
        this.itemRequest.name = this.item.name
        this.itemRequest.attachments = this.item.images
      })
    }
  }

  onFileSelected(event) {
    if(event.target.files.length > 0)
     {
      this.fileData = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post<number>('http://localhost/api/admin/images/', formData)
        .subscribe(res => {
          this.itemRequest.attachments.push(res);
          console.log(`Added image id ${res} to request model`, this.itemRequest)
        })
     }
   }

   submitForm() {
    let endpoint: string;
    if(this.itemId != null) {
      endpoint = `http://52.163.226.37/api/admin/items/${this.itemId}`
     } else {
      endpoint = `http://52.163.226.37/api/admin/items`
     }

    this.http.post<any>(endpoint, this.itemRequest).subscribe(data => {
      this.router.navigate(['/categories',this.categoryId,'subcategories', this.subcategoryId,'items'])
    })
  }
  back() {
    this.location.back();
  }

}
