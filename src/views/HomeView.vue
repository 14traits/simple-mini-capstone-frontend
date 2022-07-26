<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to a hacked Vue.js!",
      yoda: "Do or do not; there is no try!",
      count: 0,
      products: [],
      newProductParams: {},
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    indexProducts: function () {
      axios.get("http://localhost:3000/products.json").then((response) => {
        this.products = response.data;
        console.log("All Products", this.products);
      });
    },
    createProduct: function () {
      axios
        .post("http://localhost:3000/products.json", this.newProductParams)
        .then((response) => {
          console.log("Product Created!", response.data);
          this.products.push(response.data);
          this.$refs.anyName.reset();
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h3>{{ yoda }}</h3>
    <div>
      Name:
      <input type="text" v-model="newProductParams.name" />
      Description:
      <input type="text" v-model="newProductParams.description" />
      Price:
      <input type="text" v-model="newProductParams.price" />
      Image_url:
      <input type="text" v-model="newProductParams.image_url" />
      <button v-on:click="createProduct()">Create</button>
    </div>
    <div v-for="product in products" v-bind:key="product.id">
      <h4>{{ product.name }}:</h4>
      <p>${{ product.price }}</p>
      <p><img :src="product.image_url" /></p>
    </div>
    <button @click="count++">Add 1</button>
    <h2>
      Count is:
      <count>{{ count }}!</count>
    </h2>
  </div>
</template>

<style>
count {
  color: green;
  font-style: italic;
}
</style>
