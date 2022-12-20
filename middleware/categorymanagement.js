export default function ({ $auth, redirect }) {
  if (!$auth.hasScope('category-management'))
    return redirect('/')
  }
