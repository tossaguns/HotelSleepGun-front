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

            <div class="hidden xl:block">
              <button class="border py-2 px-5 rounded-lg">เเสดง ID ของ Check-in
                / Check-out / SleepGun-web ในรายการ</button>
            </div>
          </div>


          <div class="flex justify-center item-center mt-8 space-x-4">
            <button class="bg-red-600 text-white py-2 px-4 rounded-lg font-bold">PDF</button>
            <button class="bg-green-600 text-white py-2 px-4 rounded-lg font-bold">Excel</button>
          </div>


          <div class="flex flex-col">
            <label>ยอด Order ทั้งหมด : {{ }}</label>
            <label>
              <label>เเบ่งเป็น</label>
              <label>walkin : {{ }} Order</label>
              <label>Sleepgun : {{ }} Order</label>
            </label>
          </div>



          <div class="mt-8 ">
            <div>
              <!-- เเสดงจำนวน order  ที่ได้หลังจากทำการฟิวเตอร์ -->
              <label class="font-bold">มีทั้งหมด {{ }}124 Order</label>
            </div>
            <div class="bg-white border w-full rounded-lg px-4 py-2 shadow-md">
              <div class="flex flex-col xl:flex-row justify-between items-center">
                <div class="xl:w-8/12 w-full flex justify-end  xl:justify-start items-end xl:items-start">
                  <label>ลำดับล่าสุด {{ }}</label>
                  <div class="flex flex-col lg:flex-row xl:items-center lg:space-x-8 2xl:space-x-0">
                    <div class="2xl:w-[400px] flex justify-end xl:justify-start">
                      <label>Order Stay ID : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <!-- ดึงวันเวลาที่ check-out มา -->
                      <label>วันที่เวลาที่ทำการเสร็จสิ้น : วันที่ {{ }}, เวลา {{ }}</label>
                    </div>
                  </div>
                </div>

                <div class="">
                  <hr class="border" />
                </div>

                <div class="xl:w-4/12 w-full mt-4 xl:mt-0">
                  <div class="flex xl:justify-end xl:items-end">
                    <label>
                      <span class="text-amber-400 text-sm">ตึก {{ }}</span>
                      <span class="text-green-600 text-sm">ชั้น {{ }}</span>
                      <span class="font-bold pl-6">ห้อง {{ }}</span>
                    </label>
                  </div>

                  <div>
                    <div class="flex 2xl:justify-end 2xl:items-end my-2">
                      <hr class="border 2xl:w-[300px] w-full" />
                    </div>
                  </div>

                  <div class="flex xl:flex-col flex-row xl:justify-end xl:items-end">
                    <label>ชื่อลูกค้า : ชือ่ {{ }} นามสกุล{{ }}</label>
                    <div class="space-x-4">
                      <label>เบอร์ผู้จอง {{ }}</label>
                      <label>จำนวนคนเข้าพัก {{ }} คน</label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="border mt-4 px-4 py-2 rounded-lg space-y-2">
                  <div class="flex flex-col lg:flex-row justify-center 2xl:items-center space-x-4 2xl:space-x-0">
                    <div class="2xl:w-[400px]">
                      <label>Order Check-in ID : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>check-in All : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>วันที่เวลาที่ทำการ : วันที่ {{ }}, เวลา {{ }}</label>
                    </div>
                  </div>

                  <div class="flex flex-col lg:flex-row justify-center 2xl:items-center space-x-4 2xl:space-x-0">
                    <div class="2xl:w-[400px]">
                      <label>Order Check-out ID : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>check-out All : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>วันที่เวลาที่ทำการ : วันที่ {{ }}, เวลา {{ }}</label>
                    </div>
                  </div>

                  <div class="flex flex-col lg:flex-row justify-center 2xl:items-center space-x-4 2xl:space-x-0">
                    <div class="2xl:w-[400px]">
                      <label>Order SleepGunBooking ID : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>SleepGunBooking All : {{ }}</label>
                    </div>
                    <div class="2xl:w-[400px]">
                      <label>วันที่เวลาที่ทำการ : วันที่ {{ }}, เวลา {{ }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="border mx-3 rounded-b-lg">
              <div class="flex flex-col lg:flex-row justify-between items-start px-4 py-6 ">
                <div class="lg:w-4/5">
                  <div class="space-x-2">
                    <label>สถานะ : </label>
                    <!-- สาถนะการเข้าพัก กำลังเข้าพัก bg-amber /เข้าพักเสร็จสิ้น bg-green -->
                    <label class="border py-1 px-4 rounded-lg bg-green-500 text-white">เข้าพักเสร็จสิ้น</label>
                    <!-- สาถนะการเข้าพัก SleepGun bg-amber /walkin bg-green -->
                    <label class="border py-1 px-4 rounded-lg bg-amber-400 text-white font-bold">SleepGun</label>
                  </div>

                  <div class="mt-6">
                    <label class="font-bold">ข้อมูลห้อง</label>

                    <div class="flex flex-wrap space-x-4">
                      <div class="space-x-4">
                        <label>ห้อง {{ }}</label>
                        <label>ตึก {{ }}</label>
                        <label>ชั้น {{ }}</label>
                      </div>
                      <div>
                        <!-- ประเภทห้องสวีส ห้องเดี่ยว ... -->
                        <label>ประเภทห้อง <span>{{ }}</span></label>
                        <!-- ห้อง พัดลม/เเอร์ -->
                        <label>ห้อง <span>{{ }}</span></label>
                      </div>
                      <div>
                        จำนวนคนเข้าพักได้สูงสุดต่อห้อง {{ }}
                      </div>
                    </div>
                  </div>


                  <div class="flex flex-col 3xl:flex-row">
                    <div class="mt-6 3xl:w-[700px]">
                      <label class="font-bold">คำนวน Check-in</label>
                      <div>
                        <div class="flex flex-col">
                          <div class="flex flex-wrap">
                            <label>ราคาห้องไม่รวม Service Charge <span class="font-bold">{{ }}</span> บาท</label>
                          </div>
                          <div class="flex flex-wrap">
                            <label>ราคา Service Charge {{ }} % = <span class="font-bold">{{ }}</span> บาท ,</label>
                            <label>ราคา Vat {{ }} % = <span class="font-bold">{{ }}</span> บาท</label>
                          </div>
                          <div class="flex flex-wrap py-2">
                            <div class="flex-col">
                              <div class="">
                                <!-- ถ้ามีให้ bg-green/ถ้าไม่มี ให้ bg-red -->
                                <label>เตียงเสริม : <span class="bg-green-500 text-white px-4 rounded-lg">มี{{
                                    }}</span></label>
                              </div>
                              <div class="px-4">
                                <!-- มีเตียงเด็ก/เตียงธรรมดา หรือถ้ากด 2 อันให้เเสดงเตียงเด็กเเละเตียงธรรมดา -->
                                <label>ประเภท : <span class="font-bold">{{ }}</span> , ราคา/คืน {{ }} บาท = ราคารวม {{
                                  }}
                                  บาท</label>
                                <label>ประเภท : <span class="font-bold">{{ }}</span> , ราคา/คืน {{ }} บาท = ราคารวม {{
                                  }}
                                  บาท</label>
                              </div>
                            </div>
                          </div>
                          <div class="flex flex-wrap">
                            <label>ค่ามัดจำ <span class="font-bold">{{ }}</span> บาท</label>
                          </div>
                          <div class="flex flex-wrap">
                            <label>ค่าเข้าพักก่อนเวลา <span class="font-bold">{{ }}</span> บาท</label>
                          </div>
                        </div>
                      </div>

                      <div class="mt-6">
                        <div>
                          <label class="font-bold">เพิ่มรายการ (เฉพาะ SleepGun)</label>
                          <div class="px-4 flex flex-wrap">
                            <!-- มีเตียงเด็ก/เตียงธรรมดา หรือถ้ากด 2 อันให้เเสดงเตียงเด็กเเละเตียงธรรมดา -->
                            <label>ประเภท : <span class="font-bold">{{ }}</span> , ราคา/คืน {{ }} บาท = ราคารวม {{ }}
                              บาท</label>
                            <label>ประเภท : <span class="font-bold">{{ }}</span> , ราคา/คืน {{ }} บาท = ราคารวม {{ }}
                              บาท</label>
                          </div>
                          <div class="flex flex-wrap">
                            <label>ราคา check-in ก่อนเวลา : {{ }} บาท</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6">
                      <label class="font-bold">คำนวน check-out</label>
                      <!-- เเสดง div ตามสถานะ :  มีเลท/ ตรงเวลา / ยกเลิก  -->
                      <!-- เลท -->
                      <div>
                        <label>สถานะการเข้าพัก : <span class="bg-red-500 text-white px-4 rounded-lg">เลท</span></label>
                        <div class="flex flex-wrap">
                          <label>ราคา Check-out เลท/ชม {{ }} = ราคารวม {{ }} บาท</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>เหตุผลที่ check-out เลท : {{ }}</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>ค่าเสียหายภายในห้อง : {{ }} บาท</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>เหตุผลที่เก็บค่าเสียหาย : {{ }}</label>
                        </div>
                      </div>
                      <!-- ตรงเวลา -->
                      <div>
                        <label>สถานะการเข้าพัก : <span
                            class="bg-green-500 text-white px-4 rounded-lg">ตรงเวลา</span></label>
                        <div class="flex flex-wrap">
                          <label>ค่าเสียหายภายในห้อง : {{ }} บาท</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>เหตุผลที่เก็บค่าเสียหาย : {{ }}</label>
                        </div>
                      </div>
                      <!-- ยกเลิก -->
                      <div>
                        <label>สถานะการเข้าพัก : <span
                            class="bg-amber-400 text-white px-4 rounded-lg">ยกเลิก</span></label>
                        <div class="flex flex-wrap">
                          <label>เปลี่ยนไปยังห้องพัก หมายเลข {{ }} ตึก {{ }} ชั้น {{ }}</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>เหตุผลที่เปลี่ยนห้อง : {{ }}</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>ค่าเสียหายภายในห้อง : {{ }} บาท</label>
                        </div>
                        <div class="flex flex-wrap">
                          <label>เหตุผลที่เก็บค่าเสียหาย : {{ }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:hidden my-6 w-full">
                  <hr class="border" />
                </div>

                <div class="lg:w-[400px] xl:w-[600px]  w-full lg:border-l px-4">
                  <div class="bg-stone-100 p-2 ">
                    <label>ราคาห้องที่ลูกค้าจ่าย check-in : {{ }} บาท</label>

                    <div class="mt-4">
                      <!-- จ่ายคืนค่ามัดจำมี คืน กับ ไม่คืน -->
                      <!-- คืน -->
                      <div>
                        <div>
                          <label>สถานะการคืนค่ามัดจำ {{ }} บาท</label>
                        </div>
                        <div>
                          <label>ราคาที่จ่ายคืนค่ามัดจำ : {{ }} บาท</label>
                        </div>
                      </div>


                      <!-- ไม่คืน -->
                      <div>
                        <div>
                          <label>สถานะการคืนค่ามัดจำ {{ }} บาท</label>
                        </div>
                        <div>
                          <label>เหตุผลที่ไม่คืนค่ามัดจำ : {{ }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <label>ค่าเสียหายภายในห้อง {{ }} บาท</label>
                    </div>
                    <div class="flex flex-wrap">
                      <label>เหตุผลที่เก็บค่าเสียหาย : {{ }}</label>
                    </div>

                    <div class="mt-4">
                      <label class="text-lg font-bold">รวมราคาที่ได้จากห้องนี้ : {{ }}</label>
                    </div>

                  </div>


                  <div class="my-4">
                    <hr class="border" />
                  </div>

                  <div>
                    <div>
                      <label>ชื่อผู้จอง : ชื่อ{{ }} นามสกุล{{ }}</label>
                    </div>
                    <div>
                      <label>เบอร์โทร : {{ }}</label>
                    </div>
                    <div>
                      <label>เพศ : {{ }}</label>
                    </div>

                    <!-- มี บัตรประชาชน /วีซ่า -->
                    <div>
                      <label>ใช้ {{ }} ในการยืนยันตัวตน</label>
                      <div>
                        <label>
                          หมายเลข : {{ }}
                        </label>
                        <div class="flex justify-center items-center">
                          <img src="/imgHotel/delete.png" class="w-[300px] h-[120px] border rounded-lg" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label>วันเกิด : {{ }}</label>
                    </div>
                    <div>
                      <label>อายุ : {{ }}</label>
                    </div>
                    <div>
                      <label>Email : {{ }}</label>
                    </div>
                    <div>
                      <label>จำนวนคนเข้าพัก {{ }} คน</label>
                    </div>
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