<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  background: #f3f3f3;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0c1218;
}
a:hover {
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-thumb {
  background: #4b619e;
}
.auth {
  padding: 60px;
}
.auth-input {
  border-bottom: 1px solid black;
}
.auth-input:focus {
  border-bottom: 2px solid #7e98df;
}
.auth .card {
  border-radius: 20px;
  max-width: 500px;
}
.text-blue {
  color: #7e98df;
}
.text-gray {
  color: #848484;
}
input {
  border: none;
  background: none;
}
input:focus {
  outline: none;
}
button {
  border-radius: 10px;
  padding: 3px 12px;
  margin: 0 10px;
  background: none;
  border: none;
}
.button:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button:focus {
  outline: none;
}
.button-white :hover {
  background-color: #b6b6b6;
}
.button-blue :hover {
  background-color: #4b619e;
}
.button-white {
  background-color: #ffffff;
  border: 2px solid #7e98df;
  color: #7e98df;
}
.button-blue {
  background-color: #7e98df;
  border: 2px solid #7e98df;
  color: #ffffff;
}
.border-blue {
  border-right: 1px solid #7e98df;
}
</style>
