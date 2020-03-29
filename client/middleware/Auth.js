export default function ({ store, redirect }) {
  if (store.getters['User/getCurrentUser']) {
    return redirect('/')
  }
}
