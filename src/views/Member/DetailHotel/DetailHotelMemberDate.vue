<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-[3000px] mx-auto text-stone-600">
        <div class="mt-8">

          <div class="flex flex-col lg:flex-row justify-between items-start px-6 space-x-3">

            <div class="relative lg:w-4/5 w-full">
              <!-- ภาพใหญ่ -->
              <img :src="selectedImage"
                class="2xl:h-[600px] lg:h-[450px] h-[400px] object-cover w-full md:rounded-2xl rounded-lg" />

              <!-- แถวภาพเล็ก -->
              <div
                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-xl w-[90%] max-w-[600px]">
                <div class="relative">
                  <!-- ปุ่มเลื่อนซ้าย -->
                  <button v-if="!isAtStart"
                    class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow px-2 py-1 z-10"
                    @click="scrollLeft">
                    ‹
                  </button>

                  <!-- ปุ่มเลื่อนขวา -->
                  <button v-if="!isAtEnd"
                    class="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow px-2 py-1 z-10"
                    @click="scrollRight">
                    ›
                  </button>

                  <!-- container ของ thumbnail -->
                  <div ref="thumbContainer" class="flex overflow-x-auto scrollbar-hide space-x-2 px-6 scroll-smooth"
                    @scroll="checkScroll">
                    <img v-for="(img, index) in images" :key="index" :src="img"
                      class="w-20 h-20 object-cover rounded-md cursor-pointer border-2 flex-shrink-0"
                      :class="selectedImage === img ? 'border-yellow-500' : 'border-transparent'"
                      @click="selectedImage = img" />
                  </div>
                </div>
              </div>
            </div>




            <div class="lg:w-2/5 hidden lg:block">
              <div>
                <div>
                  <iframe class="w-full 2xl:h-[200px] lg:h-[170px] rounded-2xl shadow" frameborder="0" style="border:0"
                    loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl">
                  </iframe>
                </div>

                <div class="border md:rounded-2xl rounded-lg h-[265px] 2xl:h-[385px] mt-4 shadow px-4">
                  <div class="flex justify-end item-end mt-2 text-xs space-x-2">
                    <label>ละติจูด : {{ latitude }}</label>
                    <label>ลองติจูด : {{ longitude }}</label>
                  </div>

                  <div class="mt-4">
                    <div class="hidden 2xl:block">
                      <div class="flex flex-col md:flex-row justify-between md:items-end 2xl:px-0 px-4 mt-4">
                        <div class="flex flex-col 2xl:px-0 px-4">
                          <div class=" flex space-x-3 md:justify-start justify-center items-center">
                            <img src="/images/icon/company_nav.png" class="w-8" />
                            <label class="md:text-2xl text-xl font-bold text-black">{{ hotelName }}</label>
                          </div>
                          <div class="md:pl-10 flex  justify-center items-center space-x-1">
                            <img src="/imgHotel/pin.png" class="lg:w-4 lg:h-4 w-3 h-3" />
                            <div>
                              <label class="lg:text-base md:text-sm text-xs">อำเภอ {{ subDistrict }}, จังหวัด {{
                                province
                              }}</label>
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-col justify-center items-center px-4 md:px-0 md:mt-0 mt-6">
                          <div class="">
                            <label class="text-xs font-bold text-white bg-amber-500/90 rounded-md px-4 py-1">รีวิว {{
                              review }}
                              4.5
                              ✩</label>
                          </div>

                          <div class="flex space-x-2 justify-center items-center">
                            <label class="text-sm text-stone-400">จำนวนรีวิว {{ }}</label>
                            <div v-for="(item, idx) in reviews" :key="idx" class="flex items-start space-x-4">
                              <div>
                                <span v-for="n in 5" :key="n" class="text-xl"
                                  :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="4xl:mt-12 2xl:mt-4 flex flex-col 4xl:flex-row 4xl:justify-between justify-start 4xl:items-center items-start px-4">
                      <div class="flex flex-col 2xl:text-base text-sm">
                        <div>
                          <i class="fa-regular fa-clock" style="color: #f2b32c;"></i>
                          <label class="pl-2 font-bold text-amber-500">เวลาทำการ</label>
                        </div>
                        <div class="flex flex-col pl-7 text-sm">
                          <label> check-in : {{ }}14.00 น.</label>
                          <label> check-out : {{ }}9.00 น.</label>
                        </div>
                      </div>

                      <div class="2xl:mt-4 mt-2  2xl:text-base text-sm">
                        <div class="space-x-2">
                          <i class="fa-solid fa-key" style="color: #4173c8;"></i>
                          <label class="text-blue-700/80 font-bold">นโยบายเก็บค่ามัดจำ</label>
                        </div>
                        <div class="flex flex-col pl-7">
                          <label>ราคา {{ }} THB</label>
                          <label>รายละเอียดมัดจำ {{ }}</label>
                        </div>
                      </div>


                      <div class="2xl:mt-4 mt-2 space-x-2  2xl:text-base text-sm">
                        <i class="fa-solid fa-bed" style="color: #5c5e61;"></i>
                        <label class="text-stone-600 font-bold">เตียงเสริม</label>
                        <div class="pl-5">
                          <div class="flex space-x-3">
                            <label>เตียงเด็ก</label>
                            <label>ราคา/คืน {{ }} THB</label>
                          </div>
                          <div class="flex space-x-3 ">
                            <label>เตียงปกติ</label>
                            <label>ราคา/คืน {{ }} THB</label>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="2xl:hidden">
            <div class="flex flex-col md:flex-row justify-between md:items-end px-4 mt-4">
              <div class="flex flex-col px-4">
                <div class=" flex space-x-3 md:justify-start justify-center items-center">
                  <img src="/images/icon/company_nav.png" class="w-8" />
                  <label class="md:text-2xl text-xl font-bold text-black">{{ hotelName }}</label>
                </div>
                <div class="md:pl-10 flex  justify-center items-center space-x-1">
                  <img src="/imgHotel/pin.png" class="lg:w-4 lg:h-4 w-3 h-3" />
                  <div>
                    <label class="lg:text-base md:text-sm text-xs">อำเภอ {{ subDistrict }}, จังหวัด {{ province
                    }}</label>
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-center items-center px-4 md:px-0 md:mt-0 mt-6">
                <div class="">
                  <label class="text-xs font-bold text-white bg-amber-500/90 rounded-md px-4 py-1">รีวิว {{ review }}
                    4.5
                    ✩</label>
                </div>

                <div class="flex space-x-2 justify-center items-center">
                  <label class="text-sm text-stone-400">จำนวนรีวิว {{ }}</label>
                  <div v-for="(item, idx) in reviews" :key="idx" class="flex items-start space-x-4">
                    <div>
                      <span v-for="n in 5" :key="n" class="text-xl"
                        :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="mt-12 mx-6">
            <div class="border-b flex justify-center items-center space-x-12 py-2">
              <button class="md:text-sm text-xs text-stone-500 hover:text-yellow-500">หน้าหลักโรงเเรม</button>
              <button class="md:text-sm text-xs text-stone-500 hover:text-yellow-500">ห้องพัก</button>
              <button class="md:text-sm text-xs text-stone-500 hover:text-yellow-500">รายละเอียดห้องพัก</button>
            </div>
          </div>




          <div class="mx-4 mt-4 p-4 rounded-lg">
            <div class="">
              <label class="text-lg font-bold">เกี่ยวกับโรงเเรม</label>
              <label class="block mt-2 indent-8 text-stone-400">{{
                }}ประเภทของห้องพักโรงแรมคือการจำแนกประเภทห้องพักที่มีให้บริการในโรงแรม การแบ่ง ‘ประเภท’
                ห้องพักจะช่วยให้แขกเข้าใจได้อย่างชัดเจนว่าพวกเขากำลังจองห้องพักลักษณะไหนในขณะวางแผนการท่องเที่ยว
                ประเภทห้องพักโรงแรมมีรูปแบบแตกต่างกันไปตามขนาด จำนวนและประเภทของเตียง สิ่งอำนวยความสะดวก
                และสิ่งที่แขกสามารถทำได้ภายในห้อง (เช่น ห้องที่อนุญาตให้สูบบุหรี่หรือไม่ให้สูบบุหรี่)
              </label>
            </div>
          </div>


          <div class="mt-8 lg:hidden">
            <div class="flex flex-col md:flex-row justify-between items-start px-6 md:space-x-3">
              <div
                class="md:w-[300px] w-full px-8 border rounded-2xl py-4 shadow flex md:flex-col flex-wrap justify-between items-center md:items-start">
                <div
                  class="flex flex-col 2xl:text-base text-sm justify-center md:justify-start items-center md:items-start w-full">
                  <div>
                    <i class="fa-regular fa-clock" style="color: #f2b32c;"></i>
                    <label class="pl-2 font-bold text-amber-500">เวลาทำการ</label>
                  </div>
                  <div class="flex flex-col md:pl-7 text-sm">
                    <label> check-in : {{ }}14.00 น.</label>
                    <label> check-out : {{ }}9.00 น.</label>
                  </div>
                </div>

                <div
                  class="2xl:mt-4 mt-6 md:mt-2 2xl:text-base text-sm flex flex-col justify-center md:justify-start items-center md:items-start w-full  ">
                  <div class="space-x-2">
                    <i class="fa-solid fa-key" style="color: #4173c8;"></i>
                    <label class="text-blue-700/80 font-bold">นโยบายเก็บค่ามัดจำ</label>
                  </div>
                  <div class="flex flex-col md:pl-7">
                    <label>ราคา {{ }} THB</label>
                    <label>รายละเอียดมัดจำ {{ }}</label>
                  </div>
                </div>


                <div
                  class="2xl:mt-4 mt-6 md:mt-2 space-x-2  2xl:text-base text-sm flex flex-col justify-center md:justify-start items-center md:items-start w-full">
                  <div class="space-x-2"> 
                    <i class="fa-solid fa-bed" style="color: #5c5e61;"></i>
                    <label class="text-stone-600 font-bold">เตียงเสริม</label>
                  </div>
                  <div class="pl-5">
                    <div class="flex space-x-3">
                      <label>เตียงเด็ก</label>
                      <label>ราคา/คืน {{ }} THB</label>
                    </div>
                    <div class="flex space-x-3 ">
                      <label>เตียงปกติ</label>
                      <label>ราคา/คืน {{ }} THB</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="md:w-2/3 w-full md:mt-0 mt-4">
                <iframe class="w-full h-[225px] rounded-2xl shadow" frameborder="0" style="border:0" loading="lazy"
                  allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl">
                </iframe>
                <div class="flex justify-center item-center mt-2 text-xs space-x-2">
                  <label>ละติจูด : {{ latitude }}</label>
                  <label>ลองติจูด : {{ longitude }}</label>
                </div>
              </div>
            </div>
          </div>



          <div class="px-4 mt-20">
            <label class="px-4 text-xl font-bold">ห้องพัก</label>
            <Roomlist v-for="(room, index) in rooms" :key="index" v-bind="room" @add-to-cart="handleAddToCart"
              @remove-from-cart="handleRemoveFromCart" />
          </div>


          <div class="mt-4 px-4 mb-10">
            <div
              class="flex flex-col md:flex-row md:justify-between items-center border rounded-t-lg py-5 space-y-3 md:space-y-0">

              <div class="md:w-1/2 flex justify-end items-end">
                <label class=" text-black font-bold">ราคารวม : <span class="text-3xl">THB {{ totalAll.toLocaleString()
                    }}</span></label>
              </div>

              <div class="md:w-1/2 flex flex-col justify-center items-center">
                <button
                  class="text-white text-xl font-bold bg-red-500 hover:bg-red-400 py-4 px-6 rounded-lg">จองห้องพัก</button>
              </div>

            </div>
            <div class="h-[10px] bg-yellow-300 rounded-b-lg"></div>
          </div>


          <div class="mx-4 border p-4 rounded-lg">
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/hotel.png" class="w-6 h-5" />
                <label class="font-bold">เกี่ยวกับที่พัก</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}ประเภทของห้องพักในโรงแรมมีบมบาทสำคัญในการตัดสินใจจองห้องพักของแขก
                  และแม้กระทั่งการตัดสินใจว่าจะจองหรือไม่
                  การเสนอห้องพักที่กลุ่มเป้าหมายของคุณต้องการจึงเป็นสิ่งสำคัญแต่ก็ควรมีตัวเลือกหลายรูปแบบสำหรับรองรับแขกคนอื่น
                  ๆ ด้วย ซึ่งจะช่วยเพิ่มอัตราการเข้าพักและรายได้ให้มากขึ้น</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconHotel" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-3">
                <img src="/images/icon/pin.png" class="w-5 h-5" />
                <label class="font-bold">ทำเลที่ตั้ง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}โรงแรมสมัยใหม่มักจะรองรับแขกหลากหลายประเภท
                  ตั้งแต่คู่รักไปจนถึงครอบครัว
                  ลายเพื่อตอบสนองความต้องการของแขกที่แตกต่างกัน</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconIocation" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/bed.png" class="w-6 h-5" />
                <label class="font-bold">สิ่งอำนวยความสะดวกภายในห้อง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}ห้องเดี่ยว ดับเบิ้ลรูม ห้องเตียงควีนไซซ์ ห้องสวีท?
                  ตัวเลือกประเภทของห้องพักที่สามารถมอบประสบการณ์การเข้าพักให้ตรงตามความต้องการของแขกยังมีมากกว่านี้อีก</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconRoom" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/pet.png" class="w-6 h-5" />
                <label class="font-bold">การรองรับสัตวืเลี้ยง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}บล็อกนี้ เราจะพาคุณไปเจาะลึกประเภทของพักโรงแรมฉบับสมบูรณ์
                  เพื่อให้โรงแรมของคุณสามารถกำหนดและวางกลยุทธ์การขายห้องพักออนไลน์ให้ประสบความสำเร็จได้มากยิ่งขึ้น</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconPet" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/food.png" class="w-6 h-5" />
                <label class="font-bold">มื้ออาหาร</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}เป็นห้องขนาดใหญ่ที่เหมาะสำหรับแขก 4 คน และมักจะมีเตียงคู่ 2
                  เตียง</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconFood" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
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
import Bar from "@components/BarMember.vue";
import Footer from "@components/Footer.vue";
import Gallery from "@components/element/Gallery.vue";
import Roomlist from "@components/element/RoomlistDate.vue";
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
const router = useRouter();


const images = [
  "/imgHotel/sea.jpg",
  "/imgHotel/imgprovince/Bangkok.jpg",
  "/imgHotel/imgprovince/ChiangMai.jpg",
  "/imgHotel/imgprovince/Phuket.jpg",
  "/imgHotel/imgprovince/Bangkok.jpg",
  "/imgHotel/imgprovince/ChiangMai.jpg",
  "/imgHotel/imgprovince/Phuket.jpg",
  "/imgHotel/imgprovince/Bangkok.jpg",
  "/imgHotel/imgprovince/ChiangMai.jpg",
  "/imgHotel/imgprovince/Phuket.jpg",
  "/imgHotel/imgprovince/Bangkok.jpg",
  "/imgHotel/imgprovince/ChiangMai.jpg",
  "/imgHotel/imgprovince/Phuket.jpg",
];

const selectedImage = ref(images[0]);
const thumbContainer = ref(null);

const isAtStart = ref(true);
const isAtEnd = ref(false);

const scrollLeft = () => {
  thumbContainer.value?.scrollBy({ left: -200, behavior: "smooth" });
};
const scrollRight = () => {
  thumbContainer.value?.scrollBy({ left: 200, behavior: "smooth" });
};

const checkScroll = () => {
  const el = thumbContainer.value;
  if (!el) return;

  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
};






// ตัวแปรข้อมูลโรงแรม
const hotelName = ref('BlackListHOtel');
const latitude = ref('1245.1574');
const longitude = ref('15.149');
const address = ref('12/8');
const subDistrict = ref('sujoikuol');
const district = ref('dyujyrtiko');
const province = ref('dyjuk');
const zipcode = ref('54878');
const checkinTime = ref('14.00 - 20.00');
const checkoutTime = ref('9.00 - 12.00');

const mapUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.725152370527!2d100.52318681534138!3d13.736717401027756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992e2dc0db0d%3A0x78e9f0aa1d401c6c!2z4LiB4Li44Lih4LiE4Lij4Li04Lip4Lix4LiU4Lij4Liw4Lia4Li54LiZ4LiiIOC4l-C4quC4suC4geC4seC4meC4suC4geC4peC4seC4lOC4hOC4meC4reC4mQ!5e0!3m2!1sth!2sth!4v1620278354921!5m2!1sth!2sth'

const rooms = ref([])
const selectedRooms = ref([])

function handleAddToCart(room) {
  // ถ้ามี roomCode นี้อยู่แล้ว ให้ update total
  const idx = selectedRooms.value.findIndex(r => r.roomCode === room.roomCode)
  if (idx === -1) {
    selectedRooms.value.push(room)
  } else {
    selectedRooms.value[idx].total = room.total
  }
}
function handleRemoveFromCart(room) {
  selectedRooms.value = selectedRooms.value.filter(r => r.roomCode !== room.roomCode)
}

const reviews = ref([
  {
    rating: 5,
  }
])


const totalAll = computed(() => selectedRooms.value.reduce((sum, r) => sum + (r.total || 0), 0))

const iconHotel = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconIocation = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconRoom = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconPet = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconFood = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]


// ใช้ mock data ตัวอย่าง
const mockRooms = [
  {
    roomCode: 'A001',
    roomType: 'ห้องธรรมดา',
    maxGuests: 2,
    description: 'ห้องพักเรียบง่ายพร้อมสิ่งอำนวยความสะดวกพื้นฐาน',
    originalPrice: 1500,
    discountPrice: 1200,
    facilities: [
      { icon: '/images/icon/bed.png', label: 'เตียงนุ่มสบาย' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Fi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A002',
    roomType: 'ห้องวิวทะเล',
    maxGuests: 3,
    description: 'สัมผัสวิวทะเลสวยจากระเบียงส่วนตัว',

    discountPrice: 2500,
    facilities: [
      { icon: '/images/icon/sea.png', label: 'วิวทะเล' },
      { icon: '/images/icon/aircon.png', label: 'แอร์เย็นฉ่ำ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A003',
    roomType: 'ห้องสวีท',
    maxGuests: 4,
    description: 'ห้องพักหรูหราสำหรับครอบครัวหรือคู่รัก',

    discountPrice: 4200,
    facilities: [
      { icon: '/images/icon/bathtub.png', label: 'อ่างอาบน้ำ' },
      { icon: '/images/icon/tv.png', label: 'ทีวีจอใหญ่' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A004',
    roomType: 'ห้องแฟมิลี่',
    maxGuests: 5,
    description: 'กว้างขวางเหมาะสำหรับครอบครัวใหญ่',
    originalPrice: 4500,
    discountPrice: 3900,
    facilities: [
      { icon: '/images/icon/kitchen.png', label: 'ครัวในตัว' },
      { icon: '/images/icon/parking.png', label: 'ที่จอดรถ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A005',
    roomType: 'ห้องโรแมนติก',
    maxGuests: 2,
    description: 'เหมาะสำหรับคู่รัก ต้องการความเป็นส่วนตัว',

    discountPrice: 2400,
    facilities: [
      { icon: '/images/icon/heart.png', label: 'บรรยากาศโรแมนติก' },
      { icon: '/images/icon/music.png', label: 'เสียงเพลงเบาๆ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
]

onMounted(() => {
  checkScroll();
  rooms.value = mockRooms
  // หรือดึงจาก backend:
  // axios.get('/api/rooms').then(res => rooms.value = res.data)
})
</script>


<style>
/* ซ่อน scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>