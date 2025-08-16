<template>
  <TemplateAdmin>
    <template #header>
      <label>Dashboard</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>

          <div class="bg-[url('/imgHotel/bgDashboardAdmin.jpg')] object-cover rounded-2xl mt-6">
            <div class="px-8 bg-stone-100/60 py-8 rounded-2xl ">
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div>
                  <div>
                    <label class="lg:text-4xl font-bold text-stone-500 text-3xl">DASHBOARD<span
                        class="text-black">ADMIN</span></label>
                  </div>
                  <div class="flex items-center space-x-2 mt-2">
                    <label class="text-stone-500 pl-2 lg:text-base md:text-sm text-xs">ยอดเข้าชม SLEEPGUN {{ }}
                      ครั้ง</label>
                  </div>
                </div>
                <div
                  class="space-x-2 flex md:justify-end md:items-end justify-center items-center md:mt-4 mt-10 lg:mt-0 px-4">
                  <input type="date" class="border px-4 py-2 rounded-lg bg-white/50" />
                  <button class="bg-green-900/60 text-white py-2 px-4 rounded-lg hover:bg-green-800">ค้นหา</button>
                </div>
              </div>

              <div class="flex flex-col xl:flex-row justify-between items-stretch xl:space-x-4 mt-8">

                <div class="xl:w-2/5 bg-green-800/70 shadow-lg rounded-xl ">
                  <div class="flex justify-between items-center w-full">
                    <div class="xl:w-4/5 w-full text-white py-4 px-4 flex flex-col justify-center items-center ">
                      <label class="drop-shadow-xl text-xl">คำขอสมัครสมาชิก</label>
                      <label class="font-bold text-3xl drop-shadow-xl">{{ }} 4</label>
                    </div>
                    <div class="xl:w-2/5 hidden xl:block">
                      <img src="/imgHotel/user.png" class="bg-green-800/40 px-4 py-4 rounded-full" />
                    </div>
                  </div>
                </div>

                <div
                  class="xl:w-1/5 bg-white/50  border xl:py-4 py-2 px-4 xl:rounded-xl flex flex-col justify-center items-center shadow-lg space-y-2 mx-4 xl:mx-0">
                  <label class="text-green-800 text-center">เป็นพาร์ทเนอร์กับเรา</label>
                  <label class="font-bold">{{ }}124</label>
                </div>

                <div
                  class="xl:w-1/5 bg-white/50  border xl:py-4 py-2 px-4 xl:rounded-xl flex flex-col justify-center items-center shadow-lg space-y-2  mx-4 xl:mx-0">
                  <label class="text-amber-600 text-center">รอการเเก้ไขข้อมูล</label>
                  <label class="font-bold">{{ }}14</label>
                </div>

                <div
                  class="xl:w-1/5 bg-white/50  border xl:py-4 py-2 px-4 xl:rounded-xl rounded-b-xl flex flex-col justify-center items-center shadow-lg space-y-2  mx-4 xl:mx-0">
                  <label class="text-red-700 text-center">ปฏิเสธเป็นพาร์ทเนอร์</label>
                  <label class="font-bold">{{ }}4</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-stretch mt-8 space-x-4">
            <div class="w-full border rounded-2xl px-4 py-4">
              <div>
                <div class="flex justify-between items-center">
                  <label class="text-stone-400">กราฟเเสดงยอดออเดอร์เเละรายได้</label>
                  <div class=" ">
                    <label>เริ่ม วัน{{  }} เดือน{{  }} ปี{{  }} - สิ้นสุด วัน{{  }} เดือน{{  }} ปี{{  }}</label>
                    <!-- <label>เริ่ม วัน{{  }} เดือน{{  }} ปี{{  }}</label> -->
                  </div>
                </div>
                <div class="h-[520px] w-full px-8 pt-8">
                    <Bar :data="chartDataBar" :options="chartOptionsBar" />
                </div>
              </div>

              <div class="mt-4">
                <div class="border py-4 px-4 rounded-xl h-auto">
                  <div class="flex justify-between items-center">
                    <label class="font-bold text-green-800/80">แสดงรายละเอียดข้อมูล</label>
                    <button class="text-sm underline underline-offset-2 text-stone-400 hover:text-stone-700">
                      ดูข้อมูลเพิ่มเติม
                    </button>
                  </div>

                  <!-- ใช้ grid แทน flex -->
                  <div class="grid grid-cols-4 gap-2 mt-4">
                    <div v-for="(item, index) in filledIncomes" :key="index"
                      class="flex flex-col justify-start border px-4 py-2 rounded-lg shadow h-[70px]">
                      <template v-if="item">
                        <label class="text-sm text-stone-500">
                          PromotionIncome :
                          <span class="text-stone-700 font-bold px-2">{{ item.promotion }}</span> THB
                        </label>
                        <label class="text-sm text-green-800/80">
                          % PartnerIncome :
                          <span class="font-bold px-2">{{ item.partner }}</span> THB
                        </label>
                      </template>
                      <template v-else>
                        <!-- ช่องว่าง (ไม่มีข้อมูล แต่ยังอยู่ใน grid) -->
                      </template>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div>
              <div>
                <div class="border rounded-2xl py-4 px-4 bg-stone-100/50">

                  <!-- เเสดงวันเมื่อเลือกข้อมู,รายวันเเต่ละวัน -->
                  <!-- <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายวัน</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-between items-center px-4 space-x-2">
                      <div class="w-1/3 bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-2xl text-green-700/60">{{ day }}1</label>
                      </div>
                      <div class="w-1/3 bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-xl text-green-700/60">{{ month }}NOV</label>
                      </div>
                      <div class="w-1/3 bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                      </div>
                    </div>
                  </div> -->

                  <!-- เเสดงวันเมื่อเลือกข้อมูลรายวันที่เลือกไว้ -->
                  <!-- <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายวัน</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-between items-center space-x-2">
                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">เริ่มต้น</label>
                        <div class="flex space-x-1 mt-2">
                          <div class=" flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ day }}1-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ month }}NOV-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>

                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">สิ้นสุด</label>
                        <div class="flex space-x-1 mt-2">
                          <div class=" flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ day }}8-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ month }}DEC-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->

                  <!-- เเสดงวันเมื่อเลือกข้อมู,รายเดือนเเต่ละเดือน -->
                  <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายเดือน</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-between items-center px-4 space-x-2">
                      <div class="w-1/2 bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-xl text-green-700/60">{{ month }}NOV</label>
                      </div>
                      <div class="w-1/2 bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                      </div>
                    </div>
                  </div>

                  <!-- เเสดงวันเมื่อเลือกข้อมูลรายเดือนที่เลือกไว้ -->
                  <!-- <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายเดือน</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-between items-center space-x-2">
                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">เริ่มต้น</label>
                        <div class="flex space-x-1 mt-2">
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ month }}NOV-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>

                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">สิ้นสุด</label>
                        <div class="flex space-x-1 mt-2">
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ month }}DEC-</label>
                          </div>
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->

                  <!-- เเสดงวันเมื่อเลือกข้อมูลรายปีเเต่ละปี -->
                  <!-- <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายปี</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-center items-center px-4">
                      <div class="w-full bg-white py-3 rounded-xl shadow-md flex justify-center">
                        <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                      </div>
                    </div>
                  </div> -->


                  <!-- เเสดงวันเมื่อเลือกข้อมูลรายปีที่เลือกไว้ -->
                  <!-- <div>
                    <div class="flex justify-between items-center text-sm">
                      <label class=" text-stone-400">ข้อมูลรายเดือน</label>
                      <button class="text-stone-400 underline underline-offset-2 hover:text-stone-600">ตัวเลือก</button>
                    </div>
                    <div class="mt-4 flex justify-between items-center space-x-2">
                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">เริ่มต้น</label>
                        <div class="flex mt-2">
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>

                      <div class="w-1/2 flex flex-col justify-center items-center bg-white py-3 rounded-xl shadow-md">
                        <label class="text-stone-400 text-sm font-bold">สิ้นสุด</label>
                        <div class="flex mt-2">
                          <div class="flex justify-center">
                            <label class="font-bold text-xl text-green-700/60">{{ year }}2025</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>

              <div class="max-w-sm bg-white p-6 rounded-2xl border mt-4">
                <div>
                  <h2 class="text-lg font-semibold">กราฟเเสดงรายการ</h2>
                  <p class="text-gray-500 text-sm">กราฟเเสดงการ Order SleepGun</p>

                  <div class="relative flex justify-center items-center mt-6 px-10">
                    <Doughnut :data="chartData" :options="chartOptions" />
                    <div class="absolute text-center">
                      <p class="text-2xl font-bold">{{ total.toLocaleString() }}</p>
                      <p class="text-gray-500 text-xs">Order SleepGun</p>
                    </div>
                  </div>

                  <!-- legend -->
                  <div class="mt-6 space-y-2">
                    <div v-for="item in mockData" :key="item.name" class="flex justify-between items-center">
                      <span class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full"
                          :class="item.name === 'เข้าพักสำเร็จ' ? 'bg-[#DDDFC2]' : item.name === 'ทำรายการไม่สำเร็จ' ? 'bg-[#97AC82]' : 'bg-[#688A65]'">
                        </span>
                        {{ item.name }}
                      </span>
                      <span class="flex items-center gap-2">
                        {{ item.value.toLocaleString() }}
                        <span class="text-stone-400 text-sm pl-4">Order</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border py-10 px-4 mt-4 rounded-2xl bg-green-800/80">
                <div class="flex justify-between">
                  <div class="flex items-center space-x-4">
                    <label class="font-bold text-lg text-white/80">รายได้ทั้งหมด</label>
                    <label class="text-xl font-bold text-white">{{ }}4,000,000 THB</label>
                  </div>
                  <div>
                    <img src="/imgHotel/coin.png" />
                  </div>
                </div>
              </div>

              <div class="border py-8 px-4 mt-4 rounded-2xl">
                <div class="flex justify-between items-stretch">
                  <div class="w-1/2 flex flex-col justify-center items-center ">
                    <label class="text-center text-sm text-stone-400">% เปิดห้องกับ SleepGun</label>
                    <div class="mt-4">
                      <label class="text-lg font-bold">{{ }} 45522 THB</label>
                    </div>
                  </div>

                  <div class="w-1/2 flex flex-col justify-center items-center border-l-2 ">
                    <label class="text-center text-sm text-stone-400">Partner ซื้อ Promotion</label>
                    <div class="mt-4">
                      <label class="text-lg font-bold">{{ }} 45522 THB</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6">
            <hr class="border" />
          </div>

          <div>
            <div>
              <div>
                <label class="text-sm text-stone-500"># อันดับโปรโมช่ันขายดี</label>
              </div>
              <div class="flex justify-between items-center space-x-3 py-2">
                <!-- เเสดง 5 promotion -->
                <div v-for="(promo, index) in topPromotions" :key="index"
                  class="bg-green-800/80 text-white py-1 px-4 w-full rounded-lg flex justify-center items-center space-x-2">
                  <!-- แสดงอันดับ -->
                  <span class="font-bold mr-2">#{{ index + 1 }}</span>
                  <label class="font-medium">{{ promo.promotionName }}</label>
                  <label>ขายได้ <span class="text-lg font-bold px-2">{{ promo.partnerUse }}</span> ครั้ง</label>
                </div>

                <!-- อันสุดท้ายเเสดง ... -->
                <div
                  class="bg-stone-300/70 text-white py-1 px-4 rounded-lg hover:bg-green-800 flex justify-center items-center w-[300px]">
                  <img src="/imgHotel/dot.png" class="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-stretch space-x-4 mt-8">

            <div class="w-1/3">
              <div class="px-8 bg-white py-8 rounded-2xl border h-full">
                <div class="flex flex-col">
                  <label class="text-lg font-semibold">กราฟเเสดงจำนวนผู้เข้าใช้งาน</label>
                  <label class="text-sm text-stone-400">กราฟเเสดงจำนวนผู้เข้าใช้งานกับ SleepGun</label>
                </div>

                <div class="">
                  <div class="flex justify-center items-center px-12">
                    <Doughnut :data="chartDatauser" :options="chartOptionsuser" />
                    <div class="absolute text-center mt-12">
                      <p class="text-gray-500 font-bold text-lg">SleepGun Web</p>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center mt-10">
                  <button
                    class="border py-1 px-8 rounded-lg text-stone-500 shadow hover:bg-stone-100 hover:text-stone-700">ดูข้อมูลเพิ่มเติม</button>
                </div>
              </div>
            </div>

            <div class="w-1/3 ">
              <div class="bg-[url('/imgHotel/bgDashboardAdmin.jpg')] object-cover rounded-2xl h-full ">
                <div class="px-8 bg-stone-200/30 py-8 rounded-2xl">
                  <div class="font-bold flex justify-center items-center space-x-4">
                    <label class="text-lg text-stone-500">
                      จังหวัดที่ทำรายได้ <span class="text-green-900/60 text-xl px-2">Sleep Gun</span> มากที่สุด
                    </label>
                  </div>

                  <!-- loop provinces -->
                  <div v-for="item in provinces" :key="item.number" class="bg-white/70 rounded-xl mt-4 shadow">
                    <div class="flex justify-between items-center px-4 py-5 ">
                      <div class="space-x-2">
                        <label># {{ item.number }}</label>
                        <label>{{ item.province }}</label>
                      </div>
                      <div class="space-x-4">
                        <label class="font-bold text-stone-500">{{ item.price.toLocaleString() }} / {{
                          item.partnerQuantity }}</label>
                        <label class="text-sm text-stone-500">THB/Partner</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-1/3">
              <div class="px-8 bg-stone-200/30 py-8 rounded-2xl">
                <div class="font-bold flex justify-center items-center space-x-4">
                  <label class="text-lg text-stone-400">
                    จัดอันดับบริษัทที่ทำรายได้ให้ <span class="text-stone-500 text-xl px-2">Sleep Gun</span>
                  </label>
                </div>

                <!-- loop companies -->
                <div v-for="company in companies" :key="company.numberRankCompany"
                  class="bg-white py-4 px-4 mt-4 rounded-xl shadow-md">
                  <div class="flex justify-between items-center">
                    <div class="flex space-x-2 items-center">
                      <label># {{ company.numberRankCompany }}</label>
                      <div class="flex items-center space-x-4 px-4">
                        <img :src="company.img" class="w-8 h-8 rounded-full" />
                        <label>{{ company.partnerCompany }}</label>
                      </div>
                    </div>
                    <div class="space-x-1">
                      <label class="font-bold">{{ company.priceCompany.toLocaleString() }}</label>
                      <label class="text-sm text-stone-500">THB</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>
  </TemplateAdmin>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, computed, onMounted } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

// mock data (จำลองจาก backend)
const incomes = ref([
  { promotion: 500, partner: 200 },
  { promotion: 800, partner: 350 },
  { promotion: 300, partner: 150 },
  { promotion: 700, partner: 400 },
  { promotion: 600, partner: 300 },
  { promotion: 900, partner: 450 },
  { promotion: 200, partner: 100 },
  { promotion: 1000, partner: 500 },
  { promotion: 1200, partner: 600 },
  { promotion: 400, partner: 180 },
  // มี 10 ช่อง ขาดอีก 2 ช่อง
])

// ให้มี 12 ช่องเสมอ ถ้าไม่ครบจะเติม null
const filledIncomes = computed(() => {
  const data = [...incomes.value]
  while (data.length < 12) {
    data.push(null)
  }
  return data
})

const provinces = ref([
  { number: 1, province: "กรุงเทพมหานคร", price: 125000, partnerQuantity: 24 },
  { number: 2, province: "เชียงใหม่", price: 102500, partnerQuantity: 18 },
  { number: 3, province: "ภูเก็ต", price: 89500, partnerQuantity: 15 },
  { number: 4, province: "ชลบุรี", price: 76500, partnerQuantity: 12 },
  { number: 5, province: "ขอนแก่น", price: 65400, partnerQuantity: 9 },
]);

const companies = ref([
  { numberRankCompany: 1, partnerCompany: "Hotel Siam Group", priceCompany: 250000, img: "/imgHotel/employee.jpg" },
  { numberRankCompany: 2, partnerCompany: "North Star Resorts", priceCompany: 198500, img: "/imgHotel/EN.png" },
  { numberRankCompany: 3, partnerCompany: "Ocean View Villas", priceCompany: 175200, img: "/imgHotel/TH.png" },
  { numberRankCompany: 4, partnerCompany: "Skyline Hotels", priceCompany: 142800, img: "/imgHotel/sea.jpg" },
  { numberRankCompany: 5, partnerCompany: "Green Leaf Stay", priceCompany: 118700, img: "/imgHotel/delete.png" },
]);

// mock backend data
const mockData = ref([
  { name: "เข้าพักสำเร็จ", value: 2487, prevMonth: 2440 },
  { name: "ทำรายการไม่สำเร็จ", value: 1828, prevMonth: 1785 },
  { name: "ยกเลิก", value: 2514, prevMonth: 2480 },
]);
const topPromotions = computed(() => promotions.value.slice(0, 5));

const promotions = ref([
  { promotionName: "Summer Sale 50%", partnerUse: 1245 },
  { promotionName: "Weekend Special", partnerUse: 987 },
  { promotionName: "Early Bird Discount", partnerUse: 876 },
  { promotionName: "Member Exclusive", partnerUse: 654 },
]);

// total
const total = computed(() => mockData.value.reduce((sum, item) => sum + item.value, 0));

// chart datasets
const chartData = computed(() => ({
  labels: mockData.value.map(i => i.name),
  datasets: mockData.value.map((item, index) => ({
    label: item.name,
    data: [item.value, total.value - item.value],
    backgroundColor: index === 0 ? ["#DDDFC2", "#F5F5F5"]
      : index === 1 ? ["#97AC82", "#F5F5F5"]
        : ["#688A65", "#F5F5F5"],
    circumference: 360,
    rotation: -90,
    cutout: index === 0 ? "70%" : index === 1 ? "55%" : "40%",
    borderWidth: 0,
  })),
}));

// chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString()}`,
      },
    },
  },
};

// ข้อมูล
const chartDatauser = {
  labels: ["Partner", "Member", "MemberSleepGun"],
  datasets: [
    {
      data: [400, 1200, 80],
      backgroundColor: ["#688A65", "#DDDFC2", "#97AC82"],
      borderWidth: 1,
    },
  ],
}

const chartOptionsuser = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  rotation: -90,
  circumference: 180,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  },
}






import { BarElement, CategoryScale, LinearScale, Title } from "chart.js"
import { Bar } from "vue-chartjs"

ChartJS.register(BarElement, CategoryScale, LinearScale, Title)

// สร้าง labels (สูงสุด 12 เดือน)
const barLabels = Array.from({ length: 12 }, (_, i) => `เดือน ${i + 1}`)

// เตรียมข้อมูลจาก filledIncomes (ถ้ามี null ให้เป็น 0)
const promotionDataBar = computed(() =>
  filledIncomes.value.map((d) => (d ? d.promotion : 0))
)
const partnerDataBar = computed(() =>
  filledIncomes.value.map((d) => (d ? d.partner : 0))
)

// Chart Data
const chartDataBar = computed(() => ({
  labels: barLabels,
  datasets: [
    {
      label: "Promotion Income",
      data: promotionDataBar.value,
      backgroundColor: "#688A65",
      borderRadius: 6,
    },
    {
      label: "Partner Income",
      data: partnerDataBar.value,
      backgroundColor: "#DDDFC2",
      borderRadius: 6,
    },
  ],
}))

// Chart Options
const chartOptionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      stacked: false,
      ticks: {
        font: { size: 12 },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => value + " THB", // ใส่หน่วยเป็นราคา
      },
    },
  },
}
</script>
