import { bebidas, carnes, frios} from '../services/datas'

const subcategoryObj = {
  categoria: [],
  Bebidas: bebidas,
  Carnes: carnes,
  Frios: frios,
  Higiene: ["a545","sds4545d", "asasasas"],
  Hortifruti: ["akiki","skikikdsd", "asasasas"],
  Laticínios: ["kikika","sdt5t5tsd", "asasasas"], 
  Limpeza: ["aikik","sdsd", "asasasas"],
  Matinais: ["aiki","sdsd", "asasast4555as"], 
  Mercearia: ["akiki","sdt5t5tsd", "asasaikiksas"], 
  Padaria: ["a67rftyr","sdst5t5d", "asasasas"], 
  PetShop: ["ajtyu5676","sdst5t5d", "asasasas"], 
  Utilidades_Domésticas: ["a","sdskiikd", "asaikikisasas"],
  Outros: [],
}


export default function subCategory(category) {
  return subcategoryObj[category];
}