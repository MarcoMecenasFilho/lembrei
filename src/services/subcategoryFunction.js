import { bebidas, carnes, frios, higiene, hotifruti,
  laticinios, limpeza, mercearia, padaria, petshop, utilidades} from '../services/datas'

const subcategoryObj = {
  categoria: [],
  Bebidas: bebidas,
  Carnes: carnes,
  Frios: frios,
  Higiene: higiene,
  Hortifruti: hotifruti,
  Laticínios: laticinios, 
  Limpeza: limpeza,
  Mercearia: mercearia, 
  Padaria: padaria, 
  PetShop: petshop, 
  Utilidades_Domésticas: utilidades,
  Outros: [],
}


export default function subCategory(category) {
  return subcategoryObj[category];
}