export default function ({ store, redirect }) {
    if (store.getters.loggedIn) {
      // console.warn('Skip authentication Middleware! ')
      return // skip the middleware
    }else{
      return redirect('/login') 
    }
  }