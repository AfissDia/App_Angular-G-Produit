import { Component, OnInit } from '@angular/core';
import {Type} from "../models/type";
// @ts-ignore
import {Produit} from "../models/produit";
import {HttpClient} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";


// @ts-ignore
export class Produit {
  constructor(
    public id: number,
    public nom: string,
    public prix: string,
    //public type_id: number,
    public type: Type
  ) {
  }
}
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits!: Produit[];
  types: Type[] = [];

  closeResult!: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getProduits()
    this.getType()
  }

  getProduits() {
    this.httpClient.get<any>('http://localhost:8080/produits').subscribe(
      response => {
        console.log(response);
        this.produits = response;
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ProduitComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/produits/add';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        console.log(f.value)
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  getType() {
    this.httpClient.get<any>('http://localhost:8080/types').subscribe(
      response => {
        this.types = response;
      }
    );
  }

  openDetails(targetModal: any, produit: Produit) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    document.getElementById('fnom').setAttribute('value', produit.nom);
    // @ts-ignore
    document.getElementById('pprix').setAttribute('value', produit.prix);
    // @ts-ignore
    document.getElementById('tid').setAttribute('value', produit.type.nom);
  }

}
