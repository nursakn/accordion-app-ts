<template>
  <section>
    <Accordion class="mb-16">
      <AccordionItem>
        <template v-slot:title> Блок 1 </template>
        <template>Описание</template>
      </AccordionItem>
      <AccordionItem>
        <template v-slot:title> Блок 2 </template>
        <template>Описание</template>
      </AccordionItem>
      <AccordionItem>
        <template v-slot:title> Блок 3 </template>
        <template>Описание</template>
      </AccordionItem>
    </Accordion>
    <AccordionItemV2>
      <template v-slot:title> Блок 3 </template>
      <template>Описание</template>
    </AccordionItemV2>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Accordion from "../components/Accordion.vue";
import AccordionItem from "../components/AccordionItem.vue";
import AccordionItemV2 from "../components/AccordionItemV2.vue";
@Component({
  components: {
    Accordion,
    AccordionItem,
    AccordionItemV2,
  },
})
export default class Simple extends Vue {}
</script>

<style></style>
