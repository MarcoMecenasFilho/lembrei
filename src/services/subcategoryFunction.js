import { bebidas, carnes, frios, higiene, hotifruti,
  laticinios, limpeza, mercearia, padaria, petshop, casa} from '../services/datas'

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
  Casa: casa,
  Outros: [],
}


export default function subCategory(category) {
  return subcategoryObj[category];
}