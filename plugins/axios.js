// // axios.js plugin
export default function ({ $axios, store, $toast }) {

  $axios.onRequest(config => {
    store.dispatch('loading/setLoadingStatus', {
      url: config.url,
      method: config.method,
      state: true
    })
  })

  $axios.onError(error => {
    store.dispatch('loading/setLoadingStatus', {
      url: error.config.url,
      method: error.config.method,
      state: false
    })
    if (error.response) {
      switch (error.response.status) {
        case 401:
          $toast.global.myError({
            message: error.response.data.message
          })
          break;
        case 422:
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            $toast.global.myError({
              message: `${value}`
            })
          })
          break;
        case 404:
          $toast.global.myError({
            message: error.response.data.message
          })
          break;
        case 500:
            $toast.global.myError({
              message: 'Máy chủ xảy ra lỗi, vui lòng thử lại sau'
            })
            break;


        default:
            $toast.global.myError({
              message: `[${error.response.status}] ${error.response.data}`
            })
          break;
      }
    }
    else
    $toast.global.myError({
      message: 'Lỗi không xác định'
    })
  })

  $axios.onResponse(response => {
    store.dispatch('loading/setLoadingStatus', {
      url: response.config.url,
      method: response.config.method,
      state: false
    })
  })

}
