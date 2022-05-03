export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters.loggedIn) {
    // console.warn('Skip guest Middleware! ')
    return;
  }else{

    return redirect("/dashboard");
  }
}
