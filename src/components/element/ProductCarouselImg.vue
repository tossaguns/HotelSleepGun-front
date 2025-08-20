<template>
  <div class="relative overflow-hidden px-4 select-none">
    <!-- ปุ่มเลื่อนซ้าย -->
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2 disabled:opacity-50"
      @click="scrollLeft"
      :disabled="isAtStart"
    >
      &lt;
    </button>

    <!-- ปุ่มเลื่อนขวา -->
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2 disabled:opacity-50"
      @click="scrollRight"
      :disabled="isAtEnd"
    >
      &gt;
    </button>

    <!-- carousel -->
    <div
      ref="carouselContainer"
      class="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide"
      @scroll="checkScroll"
    >
      <div
        v-for="(item, index) in products"
        :key="index"
        class="flex-none cursor-pointer w-[310px]"
        @click="navigate(item)"
      >
        <img
          :src="getImagePath(item.image)"
          :alt="item.name || 'product image'"
          class="w-full h-48 object-cover rounded-lg shadow"
        />
        <div class="text-center mt-2 text-sm text-gray-700 truncate">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({ products: Array });
const emit = defineEmits(["navigate"]);

const carouselContainer = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const checkScroll = () => {
  const el = carouselContainer.value;
  if (!el) return;
  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
};

const scrollLeft = () => {
  carouselContainer.value?.scrollBy({ left: -320, behavior: "smooth" });
};

const scrollRight = () => {
  carouselContainer.value?.scrollBy({ left: 320, behavior: "smooth" });
};

onMounted(() => {
  checkScroll();
});

// ✅ โหลดรูปจาก public/imgHotel/imgprovince
const getImagePath = (filename) => {
  return `/imgHotel/imgprovince/${filename}`;
};

const navigate = (item) => {
  emit("navigate", item);
};
</script>

<style scoped>
/* ซ่อน scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
