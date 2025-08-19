<!-- components/ProductCarousel.vue -->
<template>
  <div class="relative overflow-hidden px-4">
    <!-- ปุ่ม prev/next -->
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/40 shadow-lg rounded-full py-4 px-2 disabled:opacity-50"
      @click="prev"
      :disabled="currentIndex === 0"
    >
      &lt;
    </button>

    <button
      class="absolute right-0 top-1/2  transform -translate-y-1/2 z-10 bg-white/40 shadow-lg rounded-full py-4 px-2 disabled:opacity-50"
      @click="next"
      :disabled="currentIndex + visibleItems >= products.length"
    >
      &gt;
    </button>

    <!-- carousel -->
    <div class="overflow-hidden ">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * (itemWidth + gap)}px)` }"
      >
        <div
          v-for="(item, index) in products"
          :key="index"
          class="flex-none"
          :style="{ width: itemWidth + 'px', marginRight: gap + 'px' }"
        >
          <div class="border rounded-3xl p-4 flex flex-col h-full relative bg-white drop-shadow-sm">
            <img
              :src="'https://primefaces.org/cdn/primevue/images/product/' + item.image"
              :alt="item.name"
              class="w-full h-40 object-cover rounded-2xl mb-2"
            />
            <!-- Status -->
            <span
              class="absolute left-6 top-6 text-xs text-white px-2 py-1 rounded-xl"
              :class="statusColor(item.inventoryStatus)"
            >
              {{ item.inventoryStatus }}
            </span>

            <div class="font-bold mb-1">{{ item.name }}</div>
            <div class="flex justify-between items-center mb-2">
              <div class="font-semibold text-xl">THB {{ item.price }}</div>
              <button class="text-gray-600 hover:text-black">
                <i class="pi pi-shopping-cart"></i>
              </button>
            </div>
            <div class="text-stone-400 truncate mt-auto">{{ item.detail }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

// ความกว้างของแต่ละ item
const itemWidth = 310;
const gap = 16; // ระยะห่างระหว่าง item

const currentIndex = ref(0);
const visibleItems = ref(1);

// คำนวณจำนวน item ที่เห็นตามหน้าจอ
const updateVisibleItems = () => {
  const width = window.innerWidth;
  visibleItems.value = Math.floor(width / (itemWidth + gap));
};

onMounted(() => {
  updateVisibleItems();
  window.addEventListener('resize', updateVisibleItems);
});

// ปุ่ม next/prev
const next = () => {
  if (currentIndex.value + visibleItems.value < props.products.length) {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1;
};

// กำหนดสีสถานะ
const statusColor = (status) => {
  switch (status) {
    case 'แนะนำ':
      return 'bg-green-500';
    case 'แคมเปญ':
      return 'bg-yellow-500';
    case 'ลดราคา':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};
</script>

<style scoped>
/* ทำให้ scrollbar ของ carousel ไม่แสดงถ้าจำเป็น */
</style>
