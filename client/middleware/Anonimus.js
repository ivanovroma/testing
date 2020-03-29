export default function ({ store, redirect }) {
  if (store.getters['User/getCurrentUser'] == null) {
    return redirect('/signin')
  }
}
