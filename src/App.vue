<template>
  <div id="app" @click.capture="'capture';">
    
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
/* @import url('../public/css/base.css'); */
@import url("//at.alicdn.com/t/font_2210025_oy0iqql1dy.css");

* {
  margin: 0;
  padding: 0;
}

html,body {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  font-family: 'kaiti', 'songti', Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.4em;
  background-color: #f2f2f2;
}

#app {
  width: 100%;
  margin: 0 auto;
}

a {
  color: #000;
  text-decoration: none;
}

ul, ol, dl {
  list-style: none;
}

input {
  outline: none;
}
</style>
