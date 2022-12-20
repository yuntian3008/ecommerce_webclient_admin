export default function ({ $auth, redirect }) {
  if (!(($auth.hasScope('read-scopes') || $auth.hasScope('grant-permissions'))
    && ($auth.hasScope('create-administrators') ||
    $auth.hasScope('read-administrators') ||
    $auth.hasScope('read-update-administrators') ||
    $auth.hasScope('block-administrators')))
  )
    return redirect('/')
  }
