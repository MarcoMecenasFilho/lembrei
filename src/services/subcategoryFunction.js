const subcategoryObj = {
  categoria: [],
  Bebidas: ["aasasasas","sdsd", "asasakikikikisas", "Outros"],
  Carnes: ["3434a","sdsd", "asasasas"],
  Frios: ["a67u67u","sdsd", "asasasa445454s"],
  Higiene: ["a545","sds4545d", "asasasas"],
  Hortifruit: ["akiki","skikikdsd", "asasasas"],
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