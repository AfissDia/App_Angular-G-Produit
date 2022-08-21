import { Component, OnInit } from '@angular/core';
// @ts-ignore

import {HttpClient} from "@angular/common/http";

// @ts-ignore
export class Type {
  constructor(
    public id: number,
    public nom: string
  ) {
  }
}
@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
types!: Type[]
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  this.getTypes()
  }

  getTypes(){
    this.httpClient.get<any>('http://localhost:8080/types').subscribe(
      response => {
        console.log(response);
        this.types = response;
      }
    );
  }
}
