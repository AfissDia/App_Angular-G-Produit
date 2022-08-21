

// @ts-ignore
import {Type} from "./type";

export interface Produit {
  id: number;
  nom: string;
  prix: string;
  type_id: number;
  type: Type;
}
