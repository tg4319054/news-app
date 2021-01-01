<template>
  <div class="md-layout md-alignment-center" style="margin: 5em 0">

      <!-- Headline Markup -->
    <div class="md-layout-item md-size-75 md-small-size-80 md-xsmall-size-100" style="padding: 0 2rem 10rem">
      <md-card>
        <md-card-media style="height: 300px" md-ratio="16:9">
          <img :src="headline.urlToImage" :alt="headline.title">
        </md-card-media>

          <md-card-header>
            <div class="md-title">
              <a :href="headline.url" target="_blank" rel="noopener noreferrer">{{headline.title}}</a>
            </div>
            <div>
              {{headline.source.name}}
              <md-icon>book</md-icon>
            </div>
            <span class="md-subhead" v-if="headline.author">
              {{headline.author}}
              <md-icon>face</md-icon>
            </span>
          </md-card-header>

          <md-card-content>{{headline.content}}</md-card-content>
      </md-card>

      <!-- Comment Form -->
      <form v-if="user" @submit.prevent="sendComment">
        <md-field>
          <label>Enter your comment</label>
          <md-textarea v-model="text" :disable="loading || !user"></md-textarea>
          <md-icon>description</md-icon>
        </md-field>
        <md-button v-if="user" class="md-primary md-raised" type="submit" :disable="loading || !user">Send Comment</md-button>
      </form>
      <md-field v-if="!user" class="none">
        <p class="label">
          You can only see the comments of others. <br/>
          To write comment please login or register.
        </p>
        <br/>
        <div class="box">
          <md-button class="md-primary" to="/login">Login</md-button>
          <md-button class="md-primary" to="/register">Register</md-button>
        </div>
      </md-field>

      <!-- Comments -->
      <md-list class="md-triple-line">
        <md-list-item v-for="comment in headline.comments" :key="comment.id">
          <md-avatar><img :src="comment.user.avatar" :alt="comment.user.username"></md-avatar>
            <div class="md-list-item-text">
              <span>{{comment.user.username}}</span>
              <span>{{comment.publishedAt | commentTimeToNow}}</span>
              <p>{{comment.text}}</p>
            </div>

            <md-badge class="md-primary" md-position="bottom" :md-content="comment.likes" />
            <md-button @click="likeComment(comment.id)" class="md-icon-button" :disabled="loading || !user">
              <md-icon>thumb_up</md-icon>
            </md-button>
        </md-list-item>
      </md-list>

      <!-- Back Button -->
      <md-button class="md-fixed md-fab-bottom-right md-fab md-primary" @click="$router.go(-1)">
        <md-icon>arrow_back</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4';

export default {

  data() {
    return {
      text: '',
    }
  },

  async fetch({ store, params }) {
    await store.dispatch("loadHeadline", params.slug);
  },
  computed: {
    headline() {
      return this.$store.getters.headline;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    async sendComment() {
      const comment = {
        id: uuidv4(),
        text: this.text,
        user: this.getCommentUserData(),
        publishedAt: Date.now(),
        likes: 0,
      };
      await this.$store.dispatch('sendComment', comment);
      this.text = ''
    },

    async likeComment(commentId) {
      await this.$store.dispatch('likeComment', commentId);
    },

    getCommentUserData() {
      const commentUserData = {...this.user};
      commentUserData["username"] = commentUserData["email"].split("@")[0];
      return commentUserData
    },
  }


};
</script>

<style scoped lang="scss">
.md-triple-line {
  margin-top: 3rem;
}

.label {
  margin: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.7);
}
.md-field {
  display: block;
}
.box {
  text-align: center;
}
</style>

