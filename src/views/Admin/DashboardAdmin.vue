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

                <div class="xl:w-2/5 bg-green-800/50 shadow-lg rounded-xl ">
                  <div class="flex justify-between items-center w-full">
                    <div class="xl:w-4/5 w-full text-white py-4 px-4 flex flex-col justify-center items-center ">
                      <label class="drop-shadow-xl text-xl">คำขอสมัครสมาชิก</label>
                      <label class="font-bold text-3xl drop-shadow-xl">{{ }} 4</label>
                    </div>
                    <div class="xl:w-2/5 hidden xl:block">
                      <img src="/imgHotel/user.png" class="bg-green-800/20 px-4 py-4 rounded-full" />
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

          <div class="flex justify-between items-stretch mt-8">
            <div class="w-full text-red-800 text-3xl font-bold flex justify-center items-center">
              <label>กราฟ...</label>
            </div>

            <div>
              <div class="max-w-sm bg-white p-6 rounded-2xl border">
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

              <div class="border py-8 px-4 mt-4 rounded-2xl bg-green-800/50">
                <div class="flex justify-between">
                  <div class="flex items-center space-x-4">
                    <label class="font-bold text-lg text-green-900/70">รายได้รวม</label>
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
              <div class="flex justify-between items-center">
                <label class="text-sm text-stone-500"># อันดับโปรโมช่ันขายดี</label>
                <label
                  class="text-sm text-stone-500 px-2 underline underline-offset-2 hover:text-stone-700">เเสดงเพิ่มเติม</label>
              </div>
              <div class="flex justify-between items-center space-x-3 py-2">
                <!-- เเสดง 5 promotion -->
                <div v-for="(promo, index) in topPromotions" :key="index"
                  class="bg-green-900/60 text-white py-1 px-4 w-full rounded-lg flex justify-center items-center space-x-2">
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

          <div class="flex justify-between items-center space-x-4 mt-8">

            <div class="w-1/3">
              <div class="bg-[url('/imgHotel/bgDashboardAdmin.jpg')] object-cover rounded-2xl ">
                <div class="px-8 bg-stone-200/30 py-8 rounded-2xl">
                  <div class="font-bold flex justify-center items-center space-x-4">
                    <label class="text-lg text-stone-500">จังหวัดที่ทำรายได้ <span
                        class="text-green-900/60 text-xl px-2">Sleep Gun</span> มากที่สุด</label>
                  </div>

                  <div class="mt-4 mx-6">
                    <hr class="border-4 border-white/60" />
                  </div>
                </div>

              </div>
            </div>


            <div class="w-1/3"></div>
            <div class="w-1/3"></div>
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



</script>