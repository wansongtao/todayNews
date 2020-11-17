<template>
  <div id="app">
    
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
/* @import url('../public/css/base.css'); */
* {
  margin: 0;
  padding: 0;
}

html,body {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  font-family: 'kaiti', 'songti', sans-serif;
  font-size: 16px;
  line-height: 1.4em;
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
