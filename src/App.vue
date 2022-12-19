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
        fetchInterval = setInterval(async () => {
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
  <table>
    <tr>
      <td>GIÁ MUA</td>
      <td>{{ goldPrice.buy }}</td>
    </tr>
    <tr>
      <td>GIÁ BÁN</td>
      <td>{{ goldPrice.sell }}</td>
    </tr>
  </table>
</template>

<style scoped>

</style>
