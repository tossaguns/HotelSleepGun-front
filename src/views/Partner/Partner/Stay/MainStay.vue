<template>
  <TemplatePartner>
    <template #header>
      <label>รายการเข้าพัก</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>

          <div class="flex flex-col lg:flex-row justify-center items-center lg:space-x-6 lg:space-y-2 space-y-2">
            <div class="flex items-center space-x-2">
              <label>ค้นหาวันที่ : </label>
              <input type="date" class="border py-2 px-4 rounded-lg" />
              <button class="bg-blue-500 text-white py-1 px-4 rounded-lg">ค้นหา</button>
            </div>
            <div class="flex items-center space-x-2">
              <label>ค้นหาคำ : </label>
              <input type="text" class="border py-2 px-4 rounded-lg" placeholder="ชื่อลูกค้า/ห้อง/ตึก/ชั้น/..." />
              <button class="bg-green-500 text-white py-1 px-4 rounded-lg">ค้นหา</button>
            </div>
          </div>


          <div class="flex justify-center items-center mt-8 space-x-5">
            <div class="relative inline-block text-left" ref="dropdownRef">
              <!-- ปุ่ม -->
              <button @click="toggleDropdownOrder"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                เรียง row เเบบไหน ▼
              </button>
              <!-- รายการ dropdown -->
              <div v-if="isOpenOrder"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div class="py-1">
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตาม order check-in
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตาม order check-out
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตาม order SleepGun
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตามฉบับ check-in
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตามฉบับ check-out
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงตามฉบับ SleepGun
                  </a>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left" ref="dropdownRef">
              <!-- ปุ่ม -->
              <button @click="toggleDropdownNewOld"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                รูปเเบบการเรียง ▼
              </button>
              <!-- รายการ dropdown -->
              <div v-if="isOpenNewOld"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div class="py-1">
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงจากเก่า > ใหม่
                  </a>
                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    เรียงจาก ใหม่ > เก่า
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div class="flex justify-center item-center mt-8 space-x-4">
            <button class="bg-red-600 text-white py-2 px-4 rounded-lg font-bold">PDF</button>
            <button class="bg-green-600 text-white py-2 px-4 rounded-lg font-bold">Excel</button>
          </div>



          <div>
            <div class="bg-white border w-full rounded-lg mt-8 px-4 py-2">
              <div class="flex flex-col 2xl:flex-row justify-between items-center">
                <div class="2xl:w-8/12">
                  <label>ลำดับล่าสุด {{ }}</label>
                  <div class="flex items-center">
                    <div class="w-[400px]">
                      <label>Order Check-in ID : {{ }}</label>
                    </div>
                    <div class="w-[400px]">
                      <label>check-in All : {{ }}</label>
                    </div>
                    <div class="w-[400px]">
                      <label>วันที่เวลาที่ทำการ : วันที่ {{ }}, เวลา {{ }}</label>
                    </div>
                  </div>
                </div>

                <div class="">
                  <hr class="border" />
                </div>

                <div class="2xl:w-4/12">
                  <div class="flex  2xl:justify-end 2xl:items-end">
                    <label>ห้อง {{ }} ตึก {{ }} ชั้น {{ }}</label>
                  </div>

                  <div class="hidden 2xl:block">
                    <div class="flex justify-end items-end my-2">
                      <hr class="border w-[300px]" />
                    </div>
                  </div>

                  <div class="flex 2xl:flex-col flex-row 2xl:justify-end 2xl:items-end">
                    <label>ชื่อลูกค้า : ชือ่ {{ }} นามสกุล{{ }}</label>
                    <label>เบอร์ผู้จอง {{ }}</label>
                    <label>จำนวนคนเข้าพัก {{ }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpenOrder = ref(false);
const dropdownRefOrder = ref(null);

const toggleDropdownOrder = () => {
  isOpenOrder.value = !isOpenOrder.value;
};

// ปิด dropdown เมื่อคลิคนอก
const handleClickOutsideOrder = (event) => {
  if (dropdownRefOrder.value && !dropdownRefOrder.value.contains(event.target)) {
    isOpenOrder.value = false;
  }
};


const isOpenNewOld = ref(false);
const dropdownRefNewOld = ref(null);

const toggleDropdownNewOld = () => {
  isOpenNewOld.value = !isOpenNewOld.value;
};

// ปิด dropdown เมื่อคลิคนอก
const handleClickOutsideNewOld = (event) => {
  if (dropdownRefNewOld.value && !dropdownRefNewOld.value.contains(event.target)) {
    isOpenNewOld.value = false;
  }
};


onMounted(() => {
  document.addEventListener("click", handleClickOutsideOrder);
  document.addEventListener("click", handleClickOutsideNewOld);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideOrder);
  document.removeEventListener("click", handleClickOutsideNewOld);
});
</script>