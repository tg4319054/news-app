const pkg = require('./package')

module.exports = {
  mode: 'spa',
  router: {
    middleware: "check-auth"
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {rel:'stylesheet', href:'//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#9ccc65', height: '10px' },

  /*
  ** Global CSS
  */
  css: [
    { src: 'vue-material/dist/vue-material.min.css' , lang: 'css'},
    { src: '~/assets/theme.scss', lang: 'scss'}
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-material'},
    { src: '~/plugins/axios'},
    { src: '~/plugins/vuelidate'},
    { src: '~plugins/firestore'},
    { src: '~plugins/time-filters'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    credentials: true,
    proxy: true
  },

  proxy: {
    "/api/": {
      target: "https://newsapi.org/v2/",
      pathRewrite: { "^/api/":""}
    },
    "/register/": {
      target:
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8KnzsyO26S4HyYMFSQIwpZ-94lty8H3k",
      pathRewrite: {"^/register/":""}
    },
    "/login/": {
      target:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8KnzsyO26S4HyYMFSQIwpZ-94lty8H3k",
      pathRewrite: {"^/login/":""}
    }
  },

  env: {
    NEWS_API_KEY: "169fd72592c64bf6bb575923ca38413a"
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
