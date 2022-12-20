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
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      async fetchDateTimeData(id: number) {
        try {
          if (isNaN(id)) {
            return;
          }

          this.goldPrice = await GetGoldPriceAsync(id);
        }
        catch (e) {
          console.log(e);
        }
      },
      async fetchData() {
        const id = Number(this.$route.params.id);
        await this.fetchDateTimeData(id);
        fetchInterval = window.setInterval(async () => {
          await this.fetchDateTimeData(id);
        }, 30000);
      }
    },
    watch: {
      $route(to, from) {
        this.fetchData();
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
        <div class="red-text content">{{ addThousandSeparators(goldPrice.buy) }}</div>
      </b-col>
      <b-col class="text-center">
        <div class="yellow-text title">GIÁ BÁN</div>
        <div class="red-text content">{{ addThousandSeparators(goldPrice.sell) }}</div>
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

  .content {
    margin-top: -5px;
  }
</style>
