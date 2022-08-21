import { Component, OnInit } from '@angular/core';
// @ts-ignore
/*import {Produit} from "../models/produit";*/
import {HttpClient} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, NgForm} from "@angular/forms";
import {Type} from "../type/type.component";



// @ts-ignore
export class Produit {
  constructor(
    public id: number,
    public nom: string,
    public prix: string,
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

  type: Type[] = [];
  khd!:string
  produit!: Produit;

  closeResult!: string;
  rform!: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getProduits()
    this.getType()
    //this.khd="salut"
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

    let khd = {
      nom: f.value.nom,
      prix: f.value.prix,
      type: {
      id: f.value.type_id
    }
    }
    console.log(f.value.type_id);
    const url = 'http://localhost:8080/produits/add';
    this.httpClient.post(url, khd)
      .subscribe((result) => {
        console.log("SAMA REPONSE : ",khd)
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }



  send() {
    console.log(this.rform.value);
  }


  getType() {
    this.httpClient.get<any>('http://localhost:8080/types').subscribe(
      response => {
        this.type = response;

      //  console.log("salut",this.types);
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
