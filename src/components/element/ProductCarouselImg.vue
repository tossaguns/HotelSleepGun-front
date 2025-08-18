<template>
  <div class="relative overflow-hidden px-4">
    <!-- ปุ่มเลื่อนซ้าย -->
    <button class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2 disabled:opacity-50"
            @click="prev" :disabled="currentIndex === 0">
      &lt;
    </button>

    <!-- ปุ่มเลื่อนขวา -->
    <button class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2 disabled:opacity-50"
            @click="next" :disabled="currentIndex + visibleItems >= products.length">
      &gt;
    </button>

    <!-- carousel -->
    <div ref="carouselContainer" class="overflow-hidden">
      <div class="flex transition-transform duration-300"
           :style="{ transform: `translateX(-${currentIndex * (itemWidth + gap)}px)` }">
        <div v-for="(item, index) in products" :key="index"
             class="flex-none cursor-pointer"
             :style="{ width: itemWidth + 'px', marginRight: gap + 'px' }"
             @click="navigate(item)">
          <img :src="getImagePath(item.image)" :alt="item.name || 'product image'"
               class="w-full h-48 object-cover rounded-lg shadow" />
          <div class="text-center mt-2 text-sm text-gray-700 truncate">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ products: Array });
const emit = defineEmits(['navigate']);

const currentIndex = ref(0);
const visibleItems = ref(1);
const itemWidth = 310; // ความกว้าง fix ของแต่ละกล่อง
const gap = 16;        // ระยะห่างระหว่างกล่อง
const carouselContainer = ref(null);

const updateVisibleItems = () => {
  const width = carouselContainer.value?.offsetWidth || window.innerWidth;
  visibleItems.value = Math.floor(width / (itemWidth + gap));
  // ถ้า currentIndex เกินของใหม่ ปรับให้ไม่เกิน
  if (currentIndex.value + visibleItems.value > props.products.length) {
    currentIndex.value = Math.max(0, props.products.length - visibleItems.value);
  }
};

onMounted(() => {
  updateVisibleItems();
  window.addEventListener('resize', updateVisibleItems);
});

const next = () => {
  if (currentIndex.value + visibleItems.value < props.products.length) {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

const getImagePath = (filename) => {
  return new URL(`/public/imgHotel/imgprovince/${filename}`, import.meta.url).href;
};

const navigate = (item) => {
  emit('navigate', item);
};
</script>
