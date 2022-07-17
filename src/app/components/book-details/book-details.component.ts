import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  getId:any;
  updateForm: any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudApi:CrudService) {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudApi.getBook(this.getId).subscribe(res=>{
        this.updateForm.setValue({
          name: res['name'],
          author: res['author'],
          genre: res['genre']
        })
      });
      this.updateForm = this.formBuilder.group({
        name: [''],
        author: [''],
        genre:['']

      })

    }
  

  ngOnInit(): void { }
  onUpdate(){
    this.crudApi.updateBook(this.getId, this.updateForm.value).subscribe(res=>{
      console.log("Data updated successfull")
      this.ngZone.run(()=>{this.router.navigateByUrl('/books-list')})
    },(err)=>{
      console.log(err)
    
    })
  }

}

