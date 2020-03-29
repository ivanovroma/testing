export default function ({ store, redirect }) {
  if (store.getters['User/getCurrentUser'].role !== 'admin') {
    return redirect('/')
  }
}
