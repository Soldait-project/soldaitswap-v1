export const getAuthToken = () => {
    if (localStorage.getItem('accessToken')) {
      return localStorage.getItem('accessToken')
    }
    return ''
  }
  
 
  