<script lang="ts">
  import { defineComponent } from 'vue';
  import { GetGoldPriceAsync } from './ApiRequest';

  let fetchInterval: number;

  export default defineComponent({
    data() {
      return {
        goldPrice: {
          sell: 0,
          buy: 0
        }
      }
    },
    methods: {
      addThousandSeparators(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      async fetchDateTimeData() {
        try {
          this.goldPrice = await GetGoldPriceAsync();
        }
        catch (e) {
          console.log(e);
        }
      },
      async fetchData() {
        await this.fetchDateTimeData();
        fetchInterval = window.setInterval(async () => {
          await this.fetchDateTimeData();
        }, 30000);
      }
    },
    async mounted() {
      await this.fetchData();
    },
    beforeUnmount() {
      clearInterval(fetchInterval);
    }
  })
</script>

<template>
  <b-container class="container">
    <b-row>
      <b-col class="text-center" style="border-right: 1px solid white">
        <div class="yellow-text title">GIÁ MUA</div>
        <div class="red-text">{{ addThousandSeparators(goldPrice.buy) }}</div>
      </b-col>
      <b-col class="text-center">
        <div class="yellow-text title">GIÁ BÁN</div>
        <div class="red-text">{{ addThousandSeparators(goldPrice.sell) }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
  .yellow-text {
    color: yellow;
  }

  .red-text {
    color: red;
    font-size: 30px;
  }

  .container {
    background-color: black;
    max-width: 300px;
  }

  .title {
    margin-top: 5px;
  }
</style>
