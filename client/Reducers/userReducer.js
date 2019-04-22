
const userReducer = (state = {}, action) => {
    let newState = deepCopy(state)
  
    switch (action.type) {
      case 'UPDATE_USER':
  
        newState = action.value
        return newState
      case 'REMOVE_USER':
        newState= {}
        return newState
    
      default:
        return newState
    }
  }
  export default userReducer
  
  function deepCopy (value) {
    return JSON.parse(JSON.stringify(value))
  }