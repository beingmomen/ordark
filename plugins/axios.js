export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
    config.headers['Accept'] = 'application/json';
      // console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
        // console.error("Error: ", error)
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        redirect('/400')
      }
    })
  }
  