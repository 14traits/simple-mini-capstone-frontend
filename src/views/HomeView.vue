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
      currentProduct: {},
      editProductParams: {},
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    indexProducts: function () {
      axios.get("products.json").then((response) => {
        this.products = response.data;
        console.log("All Products", this.products);
      });
    },
    createProduct: function () {
      axios
        .post("products.json", this.newProductParams)
        .then((response) => {
          console.log("Product Created!", response.data);
          this.products.push(response.data);
          this.$refs.anyName.reset();
        })
        .catch((error) => console.log(error.response));
    },
    showProduct: function (product) {
      console.log(product);
      this.currentProduct = product;
      this.editProductParams = product;
      document.querySelector("#product-description").showModal();
    },
    updateProduct: function (product) {
      axios.patch("products/" + product.id, this.editProductParams).then((response) => {
        console.log("Product Updated!", response.data);
      });
    },
    destroyProduct: function (product) {
      axios.delete("products/" + product.id).then((response) => {
        console.log("Product Destroyed!", response.data);
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
      });
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
      <button v-on:click="showProduct(product)">more info!</button>
    </div>

    <dialog id="product-description">
      <form method="dialog">
        <!-- <h1>{{ currentProduct.name }} - information:</h1>
        <p>Description: {{ currentProduct.description }}</p>
        <p>Price: ${{ currentProduct.price }}</p> -->

        <h1>Edit Product</h1>
        <p>
          Product Name:
          <input type="text" v-model="editProductParams.name" />
        </p>
        <p>
          Price:
          <input type="text" v-model="editProductParams.price" />
        </p>
        <p>
          Description:
          <input type="text" v-model="editProductParams.description" />
        </p>
        <p>
          Image URL:
          <input type="text" v-model="editProductParams.image_url" />
        </p>
        <button>Close</button>
        <button v-on:click="updateProduct(currentProduct)">Update</button>
        <button v-on:click="destroyProduct(currentProduct)">Delete</button>
      </form>
    </dialog>

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
