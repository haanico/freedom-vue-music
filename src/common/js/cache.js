import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  arr.unshift(val)
  if (index > -1) {
    arr.splice(index+1, 1)
  }
  arr = arr.slice(0, maxLen)
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if(index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) =>{
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return  storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  const searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
