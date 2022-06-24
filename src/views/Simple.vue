<template>
  <section>
    <Accordion>
      <AccordionItem :index="1" :editable="false">
        <template v-slot:title> Блок 1 </template>
        <template>Описание</template>
      </AccordionItem>
      <AccordionItem :index="2" :editable="false">
        <template v-slot:title> Блок 2 </template>
        <template>Описание</template>
      </AccordionItem>
      <AccordionItem :index="3" :editable="false">
        <template v-slot:title> Блок 3 </template>
        <template>Описание</template>
      </AccordionItem>
    </Accordion>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Accordion from "../components/Accordion.vue";
import AccordionItem from "../components/AccordionItem.vue";
@Component({
  components: {
    Accordion,
    AccordionItem,
  },
})
export default class Simple extends Vue {}
</script>

<style></style>
