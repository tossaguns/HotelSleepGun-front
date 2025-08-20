<template>
  <div class="relative overflow-hidden px-4 select-none">
    <!-- ปุ่ม prev -->
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/40 shadow-lg rounded-full py-4 px-2 disabled:opacity-50"
      @click="scrollLeft" :disabled="isAtStart">
      &lt;
    </button>

    <!-- ปุ่ม next -->
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/40 shadow-lg rounded-full py-4 px-2 disabled:opacity-50"
      @click="scrollRight" :disabled="isAtEnd">
      &gt;
    </button>

    <!-- carousel -->
    <div ref="carouselContainer" class="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide"
      @scroll="checkScroll">
      <div v-for="(item, index) in products" :key="index" class="flex-none w-[310px]">
        <div class="border rounded-3xl p-4 flex flex-col h-full relative bg-white drop-shadow-sm">
          <img :src="defaultImage" :alt="item.name" class="w-full h-40 object-cover rounded-2xl mb-2" />
          <!-- Status -->
          <span class="absolute left-6 top-6 text-xs text-white px-2 py-1 rounded-xl"
            :class="statusColor(item.inventoryStatus)">
            {{ item.inventoryStatus }}
          </span>

          <div class="flex justify-between items-center">
            <div class="font-bold mb-1">{{ item.name }}</div>
            <button class="text-gray-600 hover:text-black">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
          <div class="font-semibold text-xl mb-2 text-black">THB {{ item.price }}</div>
          <div class="text-stone-400 truncate mt-auto">{{ item.detail }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";



const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

// รูปเริ่มต้นสำหรับทุก item
const defaultImage = "/imgHotel/sea.jpg";

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

// สีสถานะ
const statusColor = (status) => {
  switch (status) {
    case "แนะนำ":
      return "bg-green-500";
    case "แคมเปญ":
      return "bg-yellow-500";
    case "ลดราคา":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};
</script>

<style scoped>
/* ซ่อน scrollbar แต่ยัง scroll ได้ */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>