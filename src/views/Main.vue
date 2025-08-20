<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen ">
      <div class=" text-stone-600">
        <div>
          <div>

            <div class="relative">
              <img src="/imgHotel/sea.jpg" class="h-[400px] w-full object-cover" />

              <!-- overlay ครึ่งล่าง + เบลอเนื้อหาข้างหลัง -->
              <div class="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2
              w-full max-w-5xl h-2/3 bg-stone-200/40 backdrop-blur-sm z-40
              flex justify-center items-center lg:rounded-3xl border-2 border-white/30 shadow-md">
                <div class="flex flex-col justify-center items-center">
                  <label class="font-bold md:text-7xl  text-5xl  text-white">
                    SLEEPGUN
                  </label>
                  <div
                    class="mt-8 flex flex-col md:flex-row md:justify-between justify-center items-center md:space-x-2 xl:text-xl lg:text-base text-sm space-y-2 md:space-y-0">
                    <input type="text"
                      class="px-4 md:py-4 py-2 rounded-lg shadow-lg w-[280px] lg:w-[280px] md:w-[230px]"
                      placeholder="ค้นหาที่ตั้งที่พัก" />
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



            <div class="max-w-[3000px] mx-auto">

              <!-- ✅ ส่วน hotelTypes -->
              <div class="relative mb-12 mt-20">
                <!-- ปุ่มเลื่อนซ้าย -->
                <button v-if="showLeftHotel" @click="scrollLeftHotel"
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:flex">
                  ◀
                </button>

                <!-- ปุ่มเลื่อนขวา -->
                <button v-if="showRightHotel" @click="scrollRightHotel"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:flex">
                  ▶
                </button>

                <!-- แถบเลื่อน -->
                <div ref="scrollHotelTypes"
                  class="overflow-x-auto flex md:gap-4 py-4 md:px-12 scroll-smooth touch-pan-x hide-scrollbar"
                  @scroll="checkScrollHotel">
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

              <div class="mb-12">
                <!-- หน้าโปรโมชั่น Hotel -->
                <div class="px-4 py-12 bg-stone-100">
                  <div class="flex justify-center items-center my-8">
                    <h2 class="md:text-2xl px-6 font-bold">TOP 10 ที่พักรีวิวยอดเยี่ยม</h2>
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



              <div class="mb-20 relative">
                <div class="p-4">
                  <h2 class="md:text-xl px-6 font-bold">ข่าวสาร</h2>

                  <!-- ปุ่มซ้าย -->
                  <button v-if="showLeftNews" @click="scrollLeftNews"
                    class="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:flex">
                    ◀
                  </button>

                  <!-- ปุ่มขวา -->
                  <button v-if="showRightNews" @click="scrollRightNews"
                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:flex">
                    ▶
                  </button>

                  <!-- Container -->
                  <div ref="scrollNews"
                    class="flex overflow-x-auto hide-scrollbar space-x-4 scroll-smooth touch-pan-x px-4"
                    @scroll="checkScrollNews">

                    <div
                      class="flex-none border-2 rounded-2xl md:w-[800px] md:h-[260px] w-[350px] h-[300px] md:shadow-md">
                      <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="md:w-1/2 w-full">
                          <img src="/imgHotel/sea.jpg"
                            class="md:[mask-image:radial-gradient(circle_at_left,white_60%,transparent_90%)] [mask-image:radial-gradient(circle_at_top,white_40%,transparent_90%)] md:[mask-repeat:no-repeat] w-full md:h-[258px] h-[120px] object-cover rounded-2xl" />
                        </div>
                        <div class="md:w-1/2 px-4 md:mt-0 mt-4">
                          <div class="flex flex-col justify-center items-center ">
                            <label
                              class="md:text-xs text-xxs text-amber-500 bg-amber-100 md:py-2 py-1 px-4 rounded-full font-bold">PARTNER
                              SLEEPGUN</label>
                            <label class="md:text-2xl text-xl font-bold pt-2 md:pb-4">สมัครสมาชิกพาร์ทเนอร์</label>
                            <label class="text-sm text-center text-stone-400">สมัครสมาชิกพาร์ทเนอร์ รับฟรีระบบคิดเงิน
                              pos</label>
                            <div class="md:pt-8 pt-6">
                              <button
                                class="text-white bg-amber-400 px-4 py-2 rounded-lg hover:bg-amber-500 md:text-base text-sm">สมัครสมาชิก</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex-none border-2 rounded-2xl md:w-[800px] md:h-[260px] w-[350px] h-[300px] md:shadow-md">
                      <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="md:w-1/2 w-full">
                          <img src="/imgHotel/sea.jpg"
                            class="md:[mask-image:radial-gradient(circle_at_left,white_60%,transparent_90%)] [mask-image:radial-gradient(circle_at_top,white_40%,transparent_90%)] md:[mask-repeat:no-repeat] w-full md:h-[258px] h-[120px] object-cover rounded-2xl" />
                        </div>
                        <div class="md:w-1/2 px-4 md:mt-0 mt-4">
                          <div class="flex flex-col justify-center items-center ">
                            <label
                              class="md:text-xs text-xxs text-stone-500 bg-stone-100 md:py-2 py-1 px-4 rounded-full font-bold">MEMBER
                              SLEEPGUN</label>
                            <label class="md:text-2xl text-xl font-bold pt-2 md:pb-4">สมัครสมาชิกเมมเบอร์</label>
                            <label class="text-sm text-center text-stone-400">สมัครสมาชิกเมมเบอร์
                              ใช้งานสิทธิพิเศษต่างๆ
                              ได้ทันที</label>
                            <div class="md:pt-8 pt-6">
                              <button
                                class="text-white bg-stone-400 px-4 py-2 rounded-lg hover:bg-stone-500 md:text-base text-sm">สมัครสมาชิก</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex-none border-2 rounded-2xl md:w-[800px] md:h-[260px] w-[350px] h-[300px] md:shadow-md">
                      <div class="flex flex-col md:flex-row justify-between items-center">
                        
                        <div class="md:w-3/5 px-4 md:mt-0 mt-4">
                          <div class="flex flex-col justify-center items-center ">
                            <label class="md:text-3xl text-2xl font-bold pt-2 md:pb-4">สอบถาม</label>
                            <label class="text-center text-stone-400">สอบถามข้อสงสัยต่างๆ กับ Admin SleepGun</label>
                            <div class="md:mt-8 mt-6 w-full px-6">
                              <button
                                class=" bg-white border-2 border-amber-400 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-white md:text-base text-sm text-amber-400 font-bold underline underline-offset-2 w-full shadow-md">สอบถาม</button>
                            </div>
                          </div>
                        </div>

                        <div class="w-2/5 flex justify-center items-center">
                          <img src="/imgHotel/Ask.png" class="md:w-[300px] md:h-[250px] h-[170px] object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- คำถามที่พบบ่อย -->
              <div>
                <div>

                </div>
              </div>


            </div>
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
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue"
import { ProductService } from '@/service/ProductService';
import { useRouter } from 'vue-router';
const router = useRouter();


const hotelTypes = ref([
  { name: 'โรงเเรม ', image: '/imgHotel/EN.png' },
  { name: 'หอพัก', image: '/imgHotel/EN.png' },
  { name: 'บ้านพัก', image: '/imgHotel/EN.png' },
  { name: 'บังกะโล', image: '/imgHotel/EN.png' },
  { name: 'รัสอร์ท', image: '/imgHotel/EN.png' },
  { name: 'พูวิลล่า', image: '/imgHotel/EN.png' },
  { name: 'หอพักนักศึกษา', image: '/imgHotel/EN.png' },
  { name: 'อพาท์เม้น', image: '/imgHotel/EN.png' },
  { name: 'บ้านเดี่นว', image: '/imgHotel/EN.png' },
  { name: 'เต้นท์', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม K', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม L', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม M', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม N', image: '/imgHotel/EN.png' },
  { name: 'โรงเเรม O', image: '/imgHotel/EN.png' },
]);




/* ------------------- HotelTypes ------------------- */
const scrollHotelTypes = ref(null)
const showLeftHotel = ref(false)
const showRightHotel = ref(false)

const checkScrollHotel = () => {
  const el = scrollHotelTypes.value
  if (!el) return
  showLeftHotel.value = el.scrollLeft > 0
  showRightHotel.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}
const scrollLeftHotel = () => {
  scrollHotelTypes.value?.scrollBy({ left: -300, behavior: "smooth" })
}
const scrollRightHotel = () => {
  scrollHotelTypes.value?.scrollBy({ left: 300, behavior: "smooth" })
}

/* ------------------- News ------------------- */
const scrollNews = ref(null)
const showLeftNews = ref(false)
const showRightNews = ref(false)

const checkScrollNews = () => {
  const el = scrollNews.value
  if (!el) return
  showLeftNews.value = el.scrollLeft > 0
  showRightNews.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}
const scrollLeftNews = () => {
  scrollNews.value?.scrollBy({ left: -400, behavior: "smooth" })
}
const scrollRightNews = () => {
  scrollNews.value?.scrollBy({ left: 400, behavior: "smooth" })
}

/* ------------------- Lifecycle ------------------- */
onMounted(() => {
  nextTick(() => {
    checkScrollHotel()
    checkScrollNews()
    window.addEventListener("resize", checkScrollHotel)
    window.addEventListener("resize", checkScrollNews)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScrollHotel)
  window.removeEventListener("resize", checkScrollNews)
})



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

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>