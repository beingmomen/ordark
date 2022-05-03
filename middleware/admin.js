export default function ({ store, redirect }) {
    if (store.getters.user.type == 'admin') {
      // console.warn('Skip admin Middleware! ')
      return // skip the middleware
    }else{
      return redirect('/orders')
    }
  }