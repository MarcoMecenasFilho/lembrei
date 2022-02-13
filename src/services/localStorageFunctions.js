export function setLocalStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))

}

export  function InicialLocalStore(setId, setList, setPurchasedProducts) {
  if(localStorage.getItem("list")) {
    const listLocal = JSON.parse(localStorage.getItem('list'))
    setList(listLocal.buyList)
    setId(listLocal.id)
  }
    if(!localStorage.getItem('checkbox-items')) {
      setLocalStore('checkbox-items', [])
    }
    const checkList = JSON.parse(localStorage.getItem("checkbox-items"))
    setPurchasedProducts(checkList)
  }
