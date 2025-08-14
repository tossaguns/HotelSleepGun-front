<template>
  <TemplatePartner>
    <template #header>
      <label>Dashboard</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>

          <div class="flex justify-between items-center px-6 py-4 border rounded-lg shadow-md">
            <div class="space-x-2">
              <label class="text-2xl font-bold">DASHBOARD</label>
              <button @click="$router.push('/profile')">
                ( ชื่อโรงแรม {{ hotelName }} )
              </button>
            </div>
            <div class="space-x-2">
              <input type="date" class="border px-4 py-2 rounded-lg" />
              <button class="bg-blue-500 text-white py-2 px-4 rounded-lg">ค้นหา</button>
            </div>
          </div>

          <div class="flex justify-end items-end mt-8">
            <label @click="$router.push('/managehotel')" class=" text-amber-600 underline underline-offset-2">เวลา
              Check-in = {{ }} น. / เวลา Check-out =
              {{ }} น.</label>
          </div>



          <div class="mt-2 mb-12">
            <div class="flex justify-between items-center">
              <div class="w-3/4">
                <div class="text-red-600 text-6xl font-bold flex justify-center items-center">
                  กราฟ...
                </div>
              </div>

              <div class="w-1/4">
                <div class="flex flex-col justify-center items-center bg-white shadow-lg py-6 px-4 w-full rounded-lg">
                  <div class="flex flex-col justify-center items-center">
                    <label class="pt-4 text-stone-400">ยอดเข้าพักทั้งหมด</label>
                    <div class="mt-3 mb-4">
                      <div class="bg-amber-100 py-4 px-4 rounded-full ">
                        <div class=" bg-amber-300/70 py-8 px-2 rounded-full flex flex-col justify-center items-center">
                          <label class="text-2xl font-bold">{{ }}129 ครั้ง</label>
                          <label>รายได้ {{ }}80000 THB </label>
                        </div>
                      </div>
                    </div>
                    <label>จำนวนคนเข้าพักทั้งหมด <span class="font-bold">{{ }}254</span> คน</label>
                  </div>

                  <div class="my-8 w-full px-6">
                    <hr class="border" />
                  </div>


                  <div class="flex flex-col justify-center items-center">
                    <label class="text-blue-600">ยอด Walkin</label>
                    <div class="mt-6 flex flex-col justify-center items-center ">
                      <label class="text-lg font-bold  ">{{ }} 86 Order</label>
                      <label class="">รายได้ {{ }} 60,520 THB</label>
                    </div>
                  </div>

                  <div class="my-8 w-full px-6">
                    <hr class="border" />
                  </div>

                  <div class="flex flex-col justify-center items-center">
                    <label class="text-amber-600">ยอด SleepGun</label>
                    <div class="mt-6  mb-4 flex flex-col justify-center items-center">
                      <label class="text-lg font-bold ">{{ }} 41 Order</label>
                      <label class="">รายได้ {{ }} 10,520 THB</label>
                    </div>
                    <label class="text-stone-400">ยอดเข้าชมหน้าเว็บ {{ }} ครั้ง</label>
                  </div>

                  <div @click="$router.push('/mainreview')" class="border py-3 px-8 mt-6 rounded-lg  shadow-md">
                    <div class="flex space-x-3">
                      <label class="font-bold">รีวิว</label>
                      <div class="space-x-6">
                        <label class="font-bold text-amber-600">{{ }}3.5 ดาว</label>
                        <!-- เเสดงดาวที่ได้จกรีวิว -->
                        <label>***{{ }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>















          <div class="flex justify-between items-center mt-4 space-x-2">
            <div @click="$router.push('/mainincome')" class="w-2/5">
              <div class="bg-[url('/imgHotel/bgleaf.png')] object-cover rounded-lg shadow-md">
                <div class="bg-black/40 rounded-lg">
                  <div class="flex flex-col py-6 px-4 text-white text-lg justify-center items-center">
                    <div>
                      <label>รายได้จาก SleepGun = <span class="font-bold">{{ }}1000 THB</span></label>
                    </div>
                    <div>
                      <label>รายได้จาก Walkin = <span class="font-bold">{{ }}1000 THB</span></label>
                    </div>
                    <div class="mt-6 bg-amber-500/90 px-6 py-3 w-full rounded-md flex justify-between items-center">
                      <div>
                        <label>รายได้รวมทั้งหมด</label>
                      </div>
                      <div>
                        <label class="font-bold text-lg">{{ }}20,000 THB</label>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div @click="$router.push('/mainstay')" class="w-3/5">
              <div class="bg-stone-50 rounded-lg shadow-md py-4 px-8 border">
                <div class="my-2">
                  <label class="font-bold text-stone-500">สรุปยอดเข้าพัก</label>
                </div>
                <div class="flex justify-between items-center space-x-3">
                  <div class="w-1/3 flex flex-col justify-center items-center">
                    <div
                      class="bg-stone-200 border border-stone-500 px-4 py-2 rounded-t-lg w-full flex justify-center items-center space-x-3 font-bold">
                      <label class=" text-amber-600 ">กำลังเข้าพัก</label>
                      <label>{{ }}4 Order</label>
                    </div>
                    <div class="bg-white border-stone-500 border rounded-b-lg w-full ">
                      <div class="flex justify-between items-center px-4 py-1">
                        <label>WALKIN </label>
                        <label>{{ }} Order</label>
                      </div>

                      <div class="flex justify-between items-center px-4 py-1 border-t border-stone-500">
                        <label>SleepGun </label>
                        <label>{{ }} Order</label>
                      </div>
                    </div>
                  </div>

                  <div class="w-1/3 flex flex-col justify-center items-center">
                    <div
                      class="bg-stone-200 border border-stone-500 px-4 py-2 rounded-t-lg w-full flex justify-center items-center space-x-3 font-bold">
                      <label class=" text-green-600 ">เข้าพักสำเร็จ</label>
                      <label>{{ }}4 Order</label>
                    </div>
                    <div class="bg-white border-stone-500 border rounded-b-lg w-full ">
                      <div class="flex justify-between items-center px-4 py-1">
                        <label>WALKIN </label>
                        <label>{{ }} Order</label>
                      </div>

                      <div class="flex justify-between items-center px-4 py-1 border-t border-stone-500">
                        <label>SleepGun </label>
                        <label>{{ }} Order</label>
                      </div>
                    </div>
                  </div>

                  <div class="w-1/3 flex flex-col justify-center items-center">
                    <div
                      class="bg-stone-200 border border-stone-500 px-4 py-2 rounded-t-lg w-full flex justify-center items-center space-x-3 font-bold">
                      <label class=" text-red-600 ">ยกเลิก</label>
                      <label>{{ }}4 Order</label>
                    </div>
                    <div class="bg-white border-stone-500 border rounded-b-lg w-full ">
                      <div class="flex justify-between items-center px-4 py-1">
                        <label>WALKIN </label>
                        <label>{{ }} Order</label>
                      </div>

                      <div class="flex justify-between items-center px-4 py-1 border-t border-stone-500">
                        <label>SleepGun </label>
                        <label>{{ }} Order</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




          <div class="flex justify-between items-center mt-4 space-x-2">
            <div @click="$router.push('/mainpromotion')" class="w-1/3 border rounded-lg py-1 px-4 shadow-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
from-[#fde68a]
to-[#f59e0b]  cursor-pointer">
              <label class="text-sm text-white">Promotion</label>
              <div class="my-4">
                <div class="flex flex-col justify-center items-center">
                  <label class="font-bold">โปรโมชั่นที่กำลังใช้งานอยู่ : <span class="text-2xl font-bold px-4"> 4{{ }}
                    </span></label>
                  <label class="text-sm pt-2">โปรโมชั่นที่เคยใช้งานเล้วทั้งหมด {{ }} โปรโมชั่น</label>
                </div>
              </div>
            </div>

            <div @click="$router.push('/mainmanageemployee')"
              class="w-1/3 border rounded-lg py-1 px-4 shadow-md bg-stone-800 text-white cursor-pointer">
              <label class="text-sm ">Employee</label>
              <div class="my-4">
                <div class="flex justify-between items-center w-full">
                  <div class="w-1/2 flex flex-col justify-center items-center border-r-2 border-stone-400">
                    <label class="text-blue-300">จำนวน Partner</label>
                    <label class="text-xl font-bold pt-2">8 {{ }} คน</label>
                  </div>
                  <div class="w-1/2 flex flex-col justify-center items-center">
                    <label class="text-rose-300">จำนวน Employee</label>
                    <label class="text-xl font-bold pt-2">22 {{ }} คน</label>
                  </div>
                </div>
              </div>
            </div>

            <div @click="$router.push('/mainmanagepos')"
              class="w-1/3 border rounded-lg py-1 px-4 shadow-md bg-stone-700 cursor-pointer">
              <label class="text-sm text-white">Room</label>
              <div class="my-4">
                <div class="flex flex-col justify-center items-center">
                  <label class="font-bold text-white">มีตึก <span class="text-2xl font-bold px-4">{{ }}4</span> ตึก
                    <span class="text-2xl font-bold px-4">{{ }}102</span> ห้อง</label>
                  <label class="text-amber-400">โควต้า SleepGun <span class="font-bold text-lg">{{ }}5</span>
                    ห้อง</label>
                </div>
              </div>
            </div>
          </div>






          <div class="mt-12">
            <div>

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