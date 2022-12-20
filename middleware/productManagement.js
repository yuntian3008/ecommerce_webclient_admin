export default function ({ $auth, redirect }) {
  if (!$auth.hasScope('product-management'))
    return redirect('/')
  }
