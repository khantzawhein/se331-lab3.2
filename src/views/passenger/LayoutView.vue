<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Passenger} from "../../types";
import PassengerService from "../../services/PassengerService.ts";
import router from "../../routes";

const props = defineProps<{
  id: string
}>()

const passenger = ref<Passenger>()

watchEffect(() => {
  PassengerService.getPassenger(props.id).then(res => {
    if (res.status === 204) {
      return router.push({name: 'not-found', params: {resource: 'passenger'}})
    }
    passenger.value = res.data
  }).catch(() => {
    router.push({name: 'network-error'})
  })
})

</script>

<template>
  <div>
    <nav class="text-center mt-4">
      <router-link :to="{name: 'passenger-detail-view'}" exact-active-class="text-blue-500" exact>Details</router-link>
      |
      <router-link :to="{name: 'passenger-airline-view'}" exact-active-class="text-blue-500" exact>Airline</router-link>
    </nav>
    <router-view :passenger="passenger"></router-view>
  </div>
</template>

<style scoped>

</style>