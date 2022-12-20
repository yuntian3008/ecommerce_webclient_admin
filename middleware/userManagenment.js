export default function ({ $auth, redirect }) {
  if (!($auth.hasScope('read-users') || $auth.hasScope('block-users')))
    return redirect('/')
  }
