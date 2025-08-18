<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class=" text-stone-600">
        <div>
          <div>

            <div class="relative">
              <img src="/imgHotel/sea.jpg" class="h-[400px] w-full object-cover" />

              <!-- overlay ครึ่งล่าง + เบลอเนื้อหาข้างหลัง -->
              <div class="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2
              w-full max-w-5xl h-2/3 bg-stone-200/40 backdrop-blur-sm z-40
              flex justify-center items-center lg:rounded-2xl border-2 border-white/30 shadow-md">
                <div class="flex flex-col justify-center items-center">
                  <label class="font-bold md:text-7xl  text-5xl  text-white">
                    SLEEPGUN
                  </label>
                  <div
                    class="mt-8 flex flex-col md:flex-row md:justify-between justify-center items-center md:space-x-2 xl:text-xl lg:text-base text-sm space-y-2 md:space-y-0">
                    <input type="text"
                      class="px-4 md:py-4 py-2 rounded-lg shadow-lg w-[280px] lg:w-[280px] md:w-[230px]"
                      placeholder="ค้นหา..." />
                    <input type="date"
                      class="px-4 md:py-4 py-2 rounded-lg shadow-lg w-[280px] lg:w-[280px] md:w-[230px]" />
                    <input type="text"
                      class="px-4 md:py-4 py-2 rounded-lg shadow-lg w-[280px] lg:w-[280px] md:w-[230px]"
                      placeholder="เข้าพักจำนวน" />
                  </div>
                </div>
              </div>
            </div>

            <div class="max-w-7xl mx-auto mt-28">
              <div
                class="flex justify-between items-center lg:px-20 md:px-10 px-0 md:mx-20 mx-4 bg-amber-50 py-4 rounded-xl mt-6  shadow border border-yellow-400">
                <div class="w-3/4  flex flex-row md:justify-start justify-center items-center md:space-x-3">
                  <div class="bg-yellow-300/80 md:p-2 p-1 rounded-full">
                    <img src="/imgHotel/gift.png" class="md:h-[48px] h-[32px] bg-yellow-200 p-1 rounded-full" />
                  </div>
                  <div class="flex flex-col md:px-4 justify-start items-start px-2">
                    <label class="lg:text-2xl md:text-xl text-stone-500 font-bold">เข้าสู่ระบบ Register</label>
                    <label
                      class="lg:text-base md:text-sm text-xxs text-stone-500 ">กรุณาเข้าสู่ระบบเพื่อรับสิทธิพิเศษต่างๆ</label>
                  </div>
                </div>
                <div class="w-1/4 flex md:justify-end md:items-end justify-center items-center">
                  <button
                    class="bg-white text-amber-400 font-bold py-2 md:px-6 px-3 rounded-lg hover:bg-stone-50 shadow md:text-base text-xs">เข้าสู่ระบบ</button>
                </div>
              </div>
            </div>

            <div class="mb-12 mt-20">
              <div class="overflow-x-auto flex md:gap-4 py-4 md:px-12 scroll-smooth touch-pan-x hide-scrollbar">
                <div v-for="(item, index) in hotelTypes" :key="index"
                  class="flex-none md:w-32 w-24 flex flex-col items-center cursor-pointer">
                  <button class="flex flex-col items-center">
                    <img :src="item.image" class="md:w-16 md:h-16 w-10 h-10 rounded-full border shadow-md" />
                    <div class="py-1 text-center">
                      <label class="text-stone-400 text-sm">{{ item.name }}</label>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-12 mt-20">
              <!-- หน้าโปรโมชั่น Hotel -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ที่พักรีวิวยอดเยี่ยม</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarousel :products="products" />
              </div>
            </div>

            <div class="mb-12">
              <!-- หน้าเเนะนำ hotel -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ที่พักแนะนำ</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarousel :products="products" />
              </div>
            </div>

            <div class="mb-12 mt-20">
              <!-- หน้าโปรโมชั่น Hotel -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ที่พักราคาโปรโมชั่น</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarousel :products="products" />
              </div>
            </div>


            <div class="mb-4">
              <!-- หน้าหมวดหมู่จังหวัด -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">จังหวัดยอดฮิต</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarouselImg :products="province" @navigate="handleNavigate" />
              </div>
            </div>

            <!-- เดี๋ยวค่อยทำต่อ
            <div>
               หน้ารีวิว
            </div> -->

          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarHotelTossagun.vue";
import CalendarRangePicker from "@/components/element/CalendarRangePicker.vue";
import InputNumber from "@/components/element/InputNumber.vue";
import SearchInput from "@/components/element/SearchInput.vue";
import Footer from "@components/Footer.vue";
import ProductCarousel from '@/components/element/ProductCarousel.vue';
import ProductCarouselImg from '@/components/element/ProductCarouselImg.vue';
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useRouter } from 'vue-router';
const router = useRouter();


const hotelTypes = ref([
  { name: 'โรงเเรม A', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม B', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม C', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม D', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม E', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม F', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม G', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม H', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม I', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม J', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม K', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม L', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม M', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม N', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม O', image: '/imgHotel/EN.png' },
]);

















const searchKeyword = ref('');
const products = ref([]); // ✅ เพิ่มตัวแปรนี้ เพื่อหลีกเลี่ยง undefined

const onSearch = (val) => {
  console.log('ค้นหา:', val);
};

const province = ref([
  { image: 'Bangkok.jpg', slug: 'sea', name: 'กรุงเทพ' },
  { image: 'ChiangMai.jpg', slug: 'mountain', name: 'เชียงใหม่' },
  { image: 'Chonburi.jpg', slug: 'city', name: 'ภูเก็ต' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ชลบุรี' },
  { image: 'Phuket.jpg', slug: 'city', name: 'ลำปาง' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ขอนเเก่น' },
  { image: 'Phuket.jpg', slug: 'city', name: 'เพชรบุรี' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ระนอง' },
  { image: 'Phuket.jpg', slug: 'city', name: 'สงขลา' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ตราด' },
]);

const handleNavigate = (item) => {
  router.push(`/hotel/${item.slug}`);
};



onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  const result = await ProductService.getProductsSmall();
  products.value = result.slice(0, 9); // หรือใช้ทั้งหมดก็ได้
});
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>