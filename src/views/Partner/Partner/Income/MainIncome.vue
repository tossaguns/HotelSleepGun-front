<template>
  <TemplatePartner>
    <template #header>
      <label>รายได้รวม</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div class="mt-6">
          <div class="space-x-2 flex justify-center items-center flex-wrap ">
            <div class="mt-2">
              <label>กรอกข้อมูลเพื่อค้นหา : </label>
            </div>
            <input type="date" class="border px-4 py-2 rounded-lg border-stone-600 mt-2" />
            <button
              class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-500 hover:text-white mt-2">Walkin</button>
            <button
              class="border border-amber-600 text-amber-600 px-4 py-2 rounded-lg font-bold hover:bg-amber-500 hover:text-white mt-2">SleepGun</button>
            <button
              class="border border-amber-500 text-amber-500 px-4 py-2 rounded-lg font-bold hover:bg-amber-300 hover:text-white mt-2">กำลังเข้าพัก</button>
            <button
              class="border border-green-600 text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-green-500 hover:text-white mt-2">เข้าพักเสร็จสิ้น</button>
            <button
              class="border border-rose-500 text-rose-500 px-4 py-2 rounded-lg font-bold hover:bg-rose-400 hover:text-white mt-2">เป็นสมาชิกกับ SleepGun</button>
            <div class="px-10 mt-2">
              <button class="px-4 py-2 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-600">ค้นหา</button>
            </div>
          </div>

          <div class="flex flex-col xl:flex-row justify-center items-center mt-12 xl:space-x-2">
            <div class="flex space-x-2 md:w-[500px] w-full justify-center">
              <div
                class="group md:w-[250px] w-full border-2 px-4 py-6 rounded-lg border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                <div class="flex flex-col justify-center items-center">
                  <label class="text-lg font-bold text-blue-500 group-hover:text-white">
                    รายได้ Walkin
                  </label>
                  <label class="font-bold">
                    40000{{ }}
                    <span class="text-amber-500 font-thin group-hover:text-amber-200">
                      (ค่ามัดจำ +850{{ }})
                    </span>

                  </label>
                </div>
              </div>

              <div
                class="group md:w-[250px] w-full border-2 px-4 py-6 rounded-lg border-amber-500 hover:bg-amber-400 hover:text-white cursor-pointer">
                <div class="flex flex-col justify-center items-center">
                  <label class="text-lg font-bold text-amber-500 group-hover:text-white">
                    รายได้ SleepGun
                  </label>
                  <label class="font-bold">
                    40000{{ }}
                    <span class="text-amber-500 font-thin group-hover:text-amber-50">
                      (ค่ามัดจำ +850{{ }})
                    </span>

                  </label>
                </div>
              </div>
            </div>

            <div
              class="md:w-[500px] w-full xl:mt-0 mt-2 group  border-2 px-4 py-6 rounded-lg border-green-500 hover:bg-green-600 hover:text-white cursor-pointer">
              <div class="flex flex-col justify-center items-center">
                <label class="text-lg font-bold text-green-600 group-hover:text-white">
                  รายได้ทั้งหมด
                </label>
                <label class="font-bold">
                  40000{{ }}
                  <span class="text-amber-500 font-thin group-hover:text-amber-200">
                    ( ค่ามัดจำ +850{{ }})
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-end px-4 mt-12 space-x-2">
            <div>
              <label>Export To : </label>
            </div>
            <button class="font-bold text-white bg-red-500 rounded-lg py-2 px-4">PDF</button>
            <button class="font-bold text-white bg-green-500 rounded-lg py-2 px-4">Excel</button>
          </div>


          <!-- เเสดงเมื่อกดเลือกรายได้ sleepGun -->
          <div class="bg-amber-50 border border-amber-400 rounded-lg px-4 py-2 mt-6">
            <label class="text-amber-600 font-bold text-lg">SLEEPGUN</label>
            <div class="mt-2 mx-4 flex justify-between items-center">
              <div>
                <div>
                  รายได้ คงเหลือในเว็บ : {{ }}
                </div>
                <div>
                  รายได้ที่ได้รับเเล้ว: {{ }}
                </div>
              </div>

              <div>
                <button class="px-4 py-1 bg-amber-500 rounded-lg text-white font-bold">ดูข้อมูลการเงิน</button>
              </div>
            </div>
          </div>

          <div class="my-12 flex justify-center items-center">
            <label class="text-4xl font-bold text-red-600">เเสดงกราฟ...</label>
          </div>

          <div class="bg-stone-50 rounded-lg p-4 mt-6">
            <div>
              <label class="font-bold">วันที่ {{ }}</label>
              <div class="mt-2 p-4 bg-white rounded-lg mx-2 shadow-md ">
                <div class="flex justify-between items-center">
                  <div class="space-x-1">
                    <!-- สถานะการเข้าพัก walkin bg-blue/SleepGun bg-amber -->
                    <label class="bg-blue-600 text-white px-2 rounded-lg">สถานะการเข้าพัก : walkin{{ }}</label>
                    <!-- สถานะ เข้าพักเสร็จสิ้น bg-green/กำลังเข้าพัก bg-amber -->
                    <label class="bg-green-600 text-white px-2 rounded-lg">สถานะ : เข้าพักเสร็จสิ้น{{ }}</label>
                    <!-- สถานะ เป็นสมาชิกกับ SleepGun เเสดงเมื่อทำการกรอกข้อมูลหมายเลขโทรศัพท์สำหรับเป็นสมาชิก -->
                    <label class="bg-rose-600 text-white px-2 rounded-lg">สถานะ : เป็นสมาชิกกับ SleepGun{{ }}</label>
                  </div>
                  <div>
                    <label>Order Stay ID : {{ }}</label>
                  </div>
                </div>

                <div class="mt-4 flex justify-between items-start">
                  <div class="flex flex-col">
                    <label>เลขห้องพัก {{ }}</label>
                    <div class="space-x-4">
                      <label>ชื่อผู้เข้าพัก{{ }}</label>
                      <label>เบอร์โทร {{ }}</label>
                    </div>
                  </div>

                  <div class="flex justify-end items-center space-x-12">
                    <div>
                      <label class="text-stone-400 text-sm">ราคาสุดท้าย : <span
                          class="font-bold text-xl text-stone-800">+ 4000{{ }} THB</span></label>
                    </div>
                    <div>
                      <button class="bg-stone-200 py-1 px-4 rounded-lg">ดูข้อมูล</button>
                    </div>
                  </div>
                </div>
              </div>


              <!-- FIXME: สถานะ กำลังเข้าพัก ให้เเสดงตามรูปเเบบนี้ -->

              <div class="mt-2 p-4 bg-white rounded-lg mx-2 shadow-md">
                <div class="flex justify-between items-center">
                  <div class="space-x-1">
                    <!-- สถานะการเข้าพัก walkin bg-blue/SleepGun bg-amber -->
                    <label class="bg-blue-600 text-white px-2 rounded-lg">สถานะการเข้าพัก : walkin{{ }}</label>
                    <!-- สถานะ เข้าพักเสร็จสิ้น bg-green/กำลังเข้าพัก bg-amber -->
                    <label class="bg-amber-500 text-white px-2 rounded-lg">สถานะ : กำลังเข้าพัก{{ }}</label>
                  </div>
                  <div>
                    <label>Order Stay ID : {{ }}</label>
                  </div>
                </div>

                <div class="mt-4 flex justify-between items-start">
                  <div class="flex flex-col">
                    <label>เลขห้องพัก {{ }}</label>
                    <div class="space-x-4">
                      <label>ชื่อผู้เข้าพัก{{ }}</label>
                      <label>เบอร์โทร {{ }}</label>
                    </div>
                  </div>

                  <div class="flex justify-end items-center space-x-12">
                    <div>
                      <label class="text-stone-400 text-sm">ราคาไม่รวมค่าเสียหาย/ค่า check-out เลท
                        <span class="font-bold text-xl text-stone-800">+ 4000{{ }} THB</span></label>
                      <span class="text-amber-500"> (ค่ามัดจำ +{{ }} 150 ) </span>
                    </div>
                    <div>
                      <button class="bg-stone-200 py-1 px-4 rounded-lg">ดูข้อมูล</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8 mt-2 flex justify-end items-end px-4">
                <label class="text-lg text-red-400 underline underline-offset-4">รายได้รวมวันนี้ วันที่ {{ }} : ราคา {{
                  }}40000 <span class="text-sm">(ค่ามัดจำ + {{ }}200)</span> บาท</label>
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
import { ref, computed, onMounted } from 'vue';
</script>