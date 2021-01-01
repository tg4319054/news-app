<template>
  <div class="md-layout md-alignment-center" style="margin: 4em 0">
    <!-- Top Navigation -->
    <md-toolbar class="fixed-toolbar" elevation="1">
      <md-button @click="showLeftSidePanel = true" class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <nuxt-link class="md-primary md-title" to="/">
        News App
      </nuxt-link>

      <div class="md-toolbar-section-end">
        <div class="box">
          <template v-if="isAuthenticated">
            <md-button>
              <md-avatar><img :src="user.avatar" :alt="user.email"></md-avatar>
            </md-button>
            <md-button class="w-18" @click="logoutUser">Logout</md-button>
          </template>

          <template v-else>
            <md-button class="w-18"  to="/login">Login</md-button>
            <md-button class="w-18"  to="/register">Register</md-button>
          </template>
          <md-button class="md-primary w=18" @click="showSearchDialog = true">Search</md-button>
          <md-button class="md-accent categories w-20" @click="showRightSidePanel = true">Categories</md-button>
        </div>
      </div>
    </md-toolbar>

    <!-- Search Dialog -->
    <md-dialog :md-active.sync="showSearchDialog">
      <md-dialog-title>Search Headlines</md-dialog-title>

      <div class="md-layout" style="padding: 1em">
        <md-field>
          <label>Search Term(s)</label>
          <md-input v-model="query" placeholder="Use quotes for exact matches, AND / OR / NOT for multiple terms" maxlength="30"></md-input>
        </md-field>
        <md-datepicker v-model="fromDate" md-immediately><label>Select starting date (optional)</label></md-datepicker>
        <md-datepicker v-model="toDate" md-immediately><label>Select ending date (optional)</label></md-datepicker>
      </div>

      <md-dialog-actions>
        <md-button class="md-accent" @click="showSearchDialog = false">Cancel</md-button>
        <md-button class="md-primary" @click="searchHeadlines">Search</md-button>
      </md-dialog-actions>
    </md-dialog>


    <!-- Personal News Feed (Left Drower) -->
    <md-drawer class="md-fixed" :md-active.sync="showLeftSidePanel">
      <md-toolbar md-elevation="1">
        <span class="md-title">Personal Feed</span>
      </md-toolbar>

      <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

      <template v-if="isAuthenticated">
          <md-button>
            <md-avatar><img :src="user.avatar" :alt="user.email"></md-avatar>
              {{user.email}}
          </md-button>
       </template>

      <!-- Default Markup (if Feed Empty) -->
      <md-empty-state class="md-primary" v-if="feed.length === 0 && !user" md-icon="bookmarks" md-label="Nothing in Feed" md-description="Login to bookmark headlines">
        <md-button to='/login' class="md-primary md-raised">Login</md-button>
      </md-empty-state>

      <md-empty-state v-else-if="feed.length === 0" class="md-accent" md-icon="bookmark_outline" md-label="Nothing in Feed" md-description="Anything you bookmark will be safely stored here"></md-empty-state>


      <!-- Feed Content (if Feed Not Empty) -->
      <md-list class="md-triple-line" v-for="headline in feed" :key="headline.id">
        <md-list-item>
          <md-avatar><img :src="headline.urlToImage" :alt="headline.title"></md-avatar>

            <div class="md-list-item-text">
              <span><a :href="headline.url" target="_blank" rel="noopener noreferrer">{{headline.title}}</a></span>
              <span>{{headline.source.name}}</span>
              <span @click="saveHeadline(headline)">View Comments</span>
            </div>

            <md-button @click="removeHeadlineFromFeed(headline)" class="md-icon-button md-list-action">
              <md-icon class="md-accent">delete</md-icon>
            </md-button>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </md-list>
    </md-drawer>

    

    <!-- News Categories (Right Drower) -->
    <md-drawer class="md-right" md-fixed :md-active.sync="showRightSidePanel">
      <md-toolbar :md-elevation="1">
        <span class="md-title">News Categories</span>
      </md-toolbar>

      <md-progress-bar v-if="loading" md-mode='indeterminate'></md-progress-bar>

      <md-list>
        <md-subheader class="md-primary">Categories</md-subheader>

        <md-list-item v-for="(newsCategory, index) in newsCategories" :key="index" @click="loadCategory(newsCategory.path)">
          <md-icon :class="newsCategory.path === category ? 'md-primary' : ''">{{newsCategory.icon}}</md-icon>
          <span class="md-list-item-text">{{newsCategory.name}}</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <!-- App Content -->
    <div class="md-layout-item md-size-95">
      <md-content class="md-layout md-gutter" style="background: #007998; padding:1rem">
        <ul v-for="headline in headlines" 
            key="headline.id" 
            class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-card style="margin-top: 1em" md-with-hover>
              <md-ripple>
                <md-card-media md-ratio="16:9">
                  <img :src="headline.urlToImage" :alt="headline.title">
                </md-card-media>

                <md-card-header>
                  <div class="md-title">
                    <a :href="headline.url" target="_blank">{{headline.title}}</a>
                  </div>
                  <div @click="loadSource(headline.source.id)">
                    {{headline.source.name}}
                    <md-icon class="small-icon">book</md-icon>
                  </div>
                  <div class="md-subheader" v-if="headline.author">
                    {{headline.author}}
                    <md-icon class="small-icon">face</md-icon>
                  </div>
                  <div class="md-subheader">
                    {{headline.publishedAt | publishedTimeToNow}}
                    <md-icon class="small-icon">alarm</md-icon>
                  </div>
                </md-card-header>

                <md-card-content>{{headline.description}}</md-card-content>

                <md-card-actions>
                  <md-button v-if="user" @click="addHeadlineToFeed(headline)" class="md-icon-button" :class="isInFeed(headline.title)">
                    <md-icon>bookmark</md-icon>
                  </md-button>
                  <md-button v-if="!user" @click="showSnackbar = true" class="md-icon-button">
                    <md-icon>bookmark</md-icon>
                  </md-button>
                  <md-button @click="saveHeadline(headline)" class="md-icon-button">
                    <md-icon>message</md-icon>
                  </md-button>
                </md-card-actions>
              </md-ripple>
            </md-card>
        </ul>
      </md-content>
    </div>

    <md-snackbar :md-active.sync="showSnackbar">
        Login to bookmark headlines
    </md-snackbar>

  </div>
</template>

<script>
export default {

  data () {
    return {
      showRightSidePanel:false,
      showLeftSidePanel:false,
      showSearchDialog: false,
      showSnackbar: false,
      newsCategories:[
        { name: 'Top Headlines', path:'', icon: 'today'},
        { name: 'Technology', path:'technology', icon: 'keyboard'},
        { name: 'Buisiness', path:'buisiness', icon: 'send'},
        { name: 'Entertainment', path:'entertainment', icon: 'weekend'},
        { name: 'Health', path:'health', icon: 'fastfood'},
        { name: 'Science', path:'science', icon: 'fingerprint'},
        { name: 'Sports', path:'sports', icon: 'golf_course'},
      ],
      query: '',
      fromDate: '',
      toDate: '',
      sortBy: '',
    }
  },

  /* async asyncData({ app }) {
    const topHeadLines = await app.$axios.$get('/api/top-headlines?country=us');
    return { headlines: topHeadLines.articles }
  } */
  
  async fetch({ store }) {
    await store.dispatch('loadHeadLines', `/api/top-headlines?country=${store.state.country}&category=${store.state.category}`);
    await store.dispatch('loadUserFeed')
  },

  /* watch: {
    async country() {
      await this.$store.dispatch('loadHeadLines', `/api/top-headlines?country=${this.country}&category=${this.category}`);
    }
  }, */

  computed: {
    headlines() {
      return this.$store.getters.headlines;
    },
    feed(){
      return this.$store.getters.feed;
    },
    category() {
      return this.$store.getters.category;
    },
    country() {
      return this.$store.getters.country;
    },
    source() {
      return this.$store.getters.source;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  methods: {
    async loadCategory(category) {
      this.$store.commit('setCategory', category);
      await this.$store.dispatch('loadHeadLines', `/api/top-headlines?country=${this.country}&category=${this.category}`)
    },

    async changeCountry(country) {
      this.$store.commit('setCountry', country);
      await this.$store.dispatch('loadHeadLines', `/api/top-headlines?country=${this.country}&category=${this.category}`)
    },

    async loadSource(sourceId) {
      if (sourceId) {
        this.$store.commit('setSource', sourceId);
        await this.$store.dispatch('loadHeadLines', `/api/top-headlines?sources=${this.source}`);
      }
    },

    async searchHeadlines() {
      await this.$store.dispatch('loadHeadLines', `/api/everything?q=${this.query}&from=${this.dateToISOString(this.fromDate)}&to=${this.dateToISOString(this.toDate)}&sortBy=${this.sortBy}`);
      this.showSearchDialog = false;
    },

    async addHeadlineToFeed(headline) {
      if (this.user) {
        await this.$store.dispatch('addHeadlineToFeed', headline);
      }
    },

    async removeHeadlineFromFeed(headline) {
      await this.$store.dispatch('removeHeadlineFromFeed', headline);
    },

    async saveHeadline(headline) {
      await this.$store.dispatch("saveHeadline", headline).then(() => {
        this.$router.push(`/headlines/${headline.slug}`);
      });
    },

    logoutUser() {
      this.$store.dispatch('logoutUser');
    },

    isInFeed(title) {
      const inFeed = this.feed.findIndex(headline => headline.title === title) > -1;
      return inFeed ? 'md-primary' : '';
    },

    dateToISOString(date) {
      if (date) {
        return new Date(date).toISOString();
      }
    }


  },
}
</script>

<style scoped lang="scss"></style>


<style scoped lang="scss">

$breakpoint: 768px;
$tablet-breakpoint: 1000px;

@mixin max-screen($break-point) {
  @media screen and (max-width: $break-point) {
    @content;
  }
}

@mixin min-screen($break-point) {
  @media screen and (min-width: $break-point) {
    @content;
  }
}

@mixin screen($break-point-min, $break-point-max) {
  @media screen and (min-width: $break-point-min) and (max-width: $break-point-max) {
    @content;
  }
}

@mixin pc {
  @include min-screen($tablet-breakpoint) {
    @content;
  }
}

@mixin tablet {
  @media screen and (min-width: $breakpoint) and (max-width: $tablet-breakpoint - 1px) {
    @content;
  }
}

@mixin sp {
  @include max-screen($breakpoint - 1px) {
    @content;
  }
}

@mixin sp_5s {
  @include max-screen(341 - 1px) {
    @content;
  }
}

//1240px(タブレットサイズ)以下適用
@mixin less-tb {
  @include max-screen($tablet-breakpoint - 1px) {
    @content;
  }
}

//768px(スマホサイズ)以上適用
@mixin more-sp {
  @include min-screen($breakpoint) {
    @content;
  }
}

.small-icon {
    font-size: 18px !important;
}

.fixed-toolbar {
  position: fixed;
  top: 0;
  z-index: 5;
  @include sp {
    display: block;
  }
}
.md-title {
  line-height: 2.49rem;
}

.md-toolbar-section-end {
  display: block;

  .box {
    display: flex;
    justify-content: flex-end;

    @include sp {
      justify-content: space-evenly;
    }
  }
  .md-button {
    min-width: initial;
  }
  .w-18 {

    @include sp {
      width: 21%;
    }
  }
  .w-20 {
    @include sp {
      width: 27%;
    }
  }
}




</style>

