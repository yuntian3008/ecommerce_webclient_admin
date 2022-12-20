export default function ({ $auth, redirect }) {
  if (!($auth.hasScope('read-orders')
    && $auth.hasScope('read-order-items')
    && ($auth.hasScope('cancel-orders') ||
    $auth.hasScope('package-orders') ||
    $auth.hasScope('ship-orders') ||
    $auth.hasScope('to-complete-orders'))))
    return redirect('/')
  }
