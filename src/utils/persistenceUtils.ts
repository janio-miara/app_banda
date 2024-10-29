const setItem = (key: string, item: string) => {
  localStorage.setItem(key, item)
}

const getItem = (key: string) => localStorage.getItem(key)
const deleteItem = (key: string) => localStorage.removeItem(key)

// Função para salvar um objeto no localStorage
const setItemObjetc = (key: string, item: any) => {
  const serializedItem = JSON.stringify(item)
  localStorage.setItem(key, serializedItem)
}

// Função para recuperar um objeto do localStorage
const getItemObjetc = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null // Verifica se o item existe e faz a desserialização
}

export { setItem, getItem, deleteItem, getItemObjetc, setItemObjetc }
