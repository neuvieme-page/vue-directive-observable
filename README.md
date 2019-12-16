# vue-directive-observable

A simple Vue.js directive


## How to use

### Add a class

You can simply add a class which

``` javascript
<template>
  <div>
    <p class="myComponent" v-observable="'myComponent--visible'">
      I will appear only on intersecting
    </p>
    <p class="myComponent" v-observable="{
      threshold: 0.5,  // The intersection threshold (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Thresholds)
      multiple: true,  // The intersection will be called multiple time (default is false)
      callback: onIntersect,
    }">
      I will appear only on intersecting
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    onIntersect() {
      // Do something
    }
  }
}
</script>

<style>
.myComponent {
  opacity: 0;
  transition: 1s opacity;
}

.myComponent--visible {
  opacity: 1;
}
</style>
```





## How to install

#### Install via yarn or npm

``` bash
yarn add @neuviemepage/vue-directive-observable
```
OR 
``` bash
npm i @neuviemepage/vue-directive-observable
```

#### Then add plugin in your entry point

``` javascript
import VueObservable from "@neuviemepage/vue-directive-observable";
Vue.use(VueObservable);
```


