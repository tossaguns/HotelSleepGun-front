<template>
  <TemplateAdmin>
    <template #header>
      <label>SleepGun</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>
          <div>
            <label class="text-xl font-bold">ข้อมูลส่วนของ SleepGun</label>
          </div>
          <div class="space-x-2 flex justify-end items-end px-4">
            <input type="date" class="border py-2 px-4" />
            <button class="bg-blue-500 text-white rounded-lg py-2 px-4">ค้นหา</button>
          </div>

          <div class="space-x-2 flex justify-center items-center">
            <button class="text-white bg-red-600 rounded-lg py-2 px-4 font-bold hover:bg-red-700">PDF</button>
            <button class="text-white bg-green-600 rounded-lg py-2 px-4 font-bold hover:bg-green-700">Excel</button>
          </div>

          <div class="mt-8">
            <div class="flex justify-between items-stretch space-x-3">

              <div class="w-2/6 border px-4 py-4 rounded-lg shadow-md">
                <div class="font-bold">
                  <label>ยอดเข้าชมเว็บไซต์ SleepGun {{ }} ครั้ง</label>
                </div>
                <div class="mt-4">
                  <label>ห้องที่ partner เปิดกับ sleepGun ทั้งหมด : <span class="font-bold text-lg">{{ }}
                      ห้อง</span></label>
                </div>
                <div class="mt-4 flex flex-col">
                  <label>mamber เข้าพักกับ SleepGun : {{ }} ครั้ง</label>
                  <label>เป็นสมาชิก Tossagun ที่เข้าพัก : {{ }} คัร้ง</label>
                </div>
              </div>


              <div class="w-2/6 border px-4 py-4 rounded-lg shadow-md">
                <div class="h-full flex flex-col justify-center items-center">
                  <div class="py-4">
                    <label class="text-xl font-bold">รายได้ทั้งหมด {{ }} THB</label>
                  </div>

                  <div class="flex flex-col justify-center items-center text-stone-400">
                    <label>รายได้จาก % Partner {{ }} THB</label>
                    <label>รายได้จากโปรโมชั่น {{ }} THB</label>
                  </div>
                </div>
              </div>


              <div class="w-2/6 border py-4 px-4 rounded-lg shadow-md">
                <div class="flex flex-col h-full justify-center items-center space-y-2">
                  <label>ยอดรายจ่ายที่ต้องจ่ายให้ Partner อาทิตย์นี้</label>
                  <label class="text-xl font-bold">{{ }} THB</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center items-center mt-10 space-x-2">
            <button
              class=" py-2 px-4 rounded-lg text-amber-500 underline underline-offset-2 border shadow-md font-bold hover:bg-amber-500 hover:text-white">Partner</button>
            <button
              class=" py-2 px-4 rounded-lg text-stone-500 underline underline-offset-2 border shadow-md font-bold hover:bg-stone-500 hover:text-white">Member</button>
          </div>


          <div class="flex justify-center items-center space-x-2 mt-8">
            <button class="bg-green-500 text-white py-2 px-4 rounded-lg">เข้าพักเสร็จสิ้น</button>
            <button class="bg-amber-500 text-white py-2 px-4 rounded-lg">กำลังเข้าพัก</button>
            <button class="bg-stone-500 text-white py-2 px-4 rounded-lg">รอดำเนินการ(รอโอนเงิน)</button>
            <button class="bg-red-500 text-white py-2 px-4 rounded-lg">ยกเลิกการจอง</button>
          </div>

          <!-- Member -->
          <div>
            <div class="bg-stone-50 rounded-lg mt-8 py-2 px-4 pb-8">
              <div class="mt-10 px-4">
                <div class="flex justify-between items-center px-4 text-sm text-stone-400">
                  <div class="w-1/12 flex justify-center items-center"><label>ลำดับ</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>โปรไฟล์</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>ชื่อ</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>เบอร์โทร</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>อีเมล</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>เข้าพักที่</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>ราคา</label></div>
                  <div class="w-2/12 flex justify-center items-center"><label>ข้อมูล Partner</label></div>
                </div>

                <div class="border rounded-lg shadow-md px-4 py-3 mt-2 bg-white">
                  <div class="flex justify-between items-center">
                    <div class="w-1/12 flex justify-center items-center">
                      <label>ลำดับ {{ }}</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <img src="/imgHotel/sea.jpg" alt="โปรไฟล์" class="w-14 h-14 rounded-full object-cover" />
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <label>ชื่อ {{ }} นามสกุล {{ }}</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <label>เบอร์โทร {{ }}</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <label>อีเมล {{ }}</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <label>ชื่อโรงเเรมที่เข้าพัก {{ }}</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <label>ราคา {{ }} THB</label>
                    </div>
                    <div class="w-2/12 flex justify-center items-center">
                      <button class="text-stone-500 font-bold border shadow py-2 px-4 rounded-lg ">ข้อมูลการจอง</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-b-lg p-6 mx-8 shadow">
                <div>
                  <div class="flex justify-between items-center space-x-2">
                    <div class="w-1/2 flex justify-between items-center">
                      <div class="w-1/2 flex flex-col justify-center items-center space-y-3">
                        <img src="/imgHotel/sea.jpg" alt="รูปบัตรประชาชน" class="h-40 w-60 object-cover rounded-lg" />

                      </div>
                      <div class="w-1/2 flex flex-col justify-center items-start px-4">

                        <label>ชื่อ : <span class="font-bold text-lg">ชื่อ {{ }} นามสกุล {{ }} 11setg</span></label>
                        <label>เบอร์โทร : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                        <label>เพศ : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                        <label>อีเมล : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                        <label>อายุ : {{ }} 12</label>
                        <label>วันเกิด : {{ }} 15/2/2025</label>
                        <label>ยืนยันตัวตนโดยใช้ : <span class="font-bold text-lg">{{ }} บัตรประชาชน</span></label>
                        <label>หมายเลข : <span class="font-bold text-lg">{{ }} บัตรประชาชน</span></label>

                      </div>
                    </div>

                    <div class="w-1/2 ">
                    <!-- มี 3 สถานะมี กำลังเข้าพัก bg-amber/ เข้าพักเสร็จสิ้น bg-green/ รอดำเนินการ(รอโอนเงิน) bg-stone/ยกเลิกการจอง bg-red -->
                      <div class="flex justify-end items-end">
                        <label class="bg-amber-500 text-white py-1 px-4 rounded-lg">สถานะ : {{ }} กำลังเข้าพัก</label>
                      </div>

                      <div class="flex flex-col">
                        <label>ชื่อโรงเเรมที่เข้าพัก : {{  }}</label>
                        <label>จังหวัด : {{  }}</label>
                        <label>หมายเลขห้องพัก : {{  }}</label>
                      </div>

                      <div class="text-lg px-4 py-4">
                        <div class="flex flex-col justify-center items-center border p-4 rounded-lg">
                          <div>
                            <label class="font-bold text-xl">ราคาที่จ่ายเเล้ว {{ }} บาท /</label>
                          </div>
                          <div class="flex justify-between items-center w-full mt-6">
                            <div class="w-1/3 flex flex-col justify-center items-center">
                              <label class="text-blue-600">ราคาห้อง</label>
                              <label class="font-bold">{{ }} THB</label>
                            </div>
                            <div class="w-1/3 flex flex-col justify-center items-center">
                              <label class="text-amber-600">ราคามัดจำ</label>
                              <label class="font-bold">{{ }} THB</label>
                            </div>
                            <div class="w-1/3 flex flex-col justify-center items-center">
                              <label class="text-stone-600">โอนผ่านธนาคาร</label>
                              <label class="font-bold">ธนาคาร : {{ }}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div class="px-6 py-4">
                    <hr class="border" />
                  </div>

                  <div class="flex justify-end items-end px-6 space-x-2">
                    <button class="bg-red-500 text-white py-2 px-4 rounded-lg font-bold">ดูข้อมูล partner</button>
                    <button class="bg-stone-500 text-white py-2 px-4 rounded-lg font-bold">ดูข้อมูล Member</button>
                  </div>
                </div>
              </div>
            </div>







            <!-- partner -->
            <div>
              <div class="bg-stone-50 rounded-lg mt-8 py-2 px-4 pb-8">
                <div class="mt-10 px-4">
                  <div class="flex justify-between items-center px-4 text-sm text-stone-400">
                    <div class="w-1/12 flex justify-center items-center"><label>ลำดับ</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>โลโก้</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>ชื่อบริษัท</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>ชื่อโรงเเรม</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>จังหวัด</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>โควต้าห้อง SleepGun</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>ราคาที่ซื้อ</label></div>
                    <div class="w-2/12 flex justify-center items-center"><label>ข้อมูล Partner</label></div>
                  </div>

                  <div class="border rounded-lg shadow-md px-4 py-3 mt-2 bg-white">
                    <div class="flex justify-between items-center">
                      <div class="w-1/12 flex justify-center items-center">
                        <label>ลำดับ {{ }}</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <img src="/imgHotel/sea.jpg" class="w-14 h-14 rounded-full object-cover" />
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <label>ชื่อบริษัท {{ }}</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <label>ชื่อโรงเเรม {{ }}</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <label>จังหวัด {{ }}</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <label>โควต้าห้อง {{ }} ห้อง</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <label>รายได้ {{ }} THB</label>
                      </div>
                      <div class="w-2/12 flex justify-center items-center">
                        <button class="text-amber-500 font-bold border shadow py-2 px-4 rounded-lg ">ข้อมูลใช้งาน
                          SleepGun</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-b-lg p-6 mx-8 shadow">
                  <div>
                    <div class="flex justify-between items-center space-x-2">
                      <div class="w-2/6 flex justify-between items-center">
                        <div class="w-1/2 flex justify-center items-center">
                          <img src="/imgHotel/sea.jpg" class="w-44 h-40 object-cover rounded-lg" />
                        </div>
                        <div class="w-1/2 flex flex-col justify-center items-start">
                          <label>ชื่อบริษัท : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                          <label>ชื่อโรงเเรม : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                          <label>จังหวัด : <span class="font-bold text-lg">{{ }} 11setg</span></label>
                        </div>
                      </div>

                      <div class="w-4/6 py-4">
                        <div class="text-lg px-4 flex justify-between items-stretch space-x-4">
                          <div class="w-2/5 flex flex-col justify-center items-center border rounded-lg ">
                            <label>ห้องทั้งหมด <span class="font-bold text-lg px-2">{{ }}6385</span> ห้อง</label>
                            <label>โควต้า SleepGun <span class="font-bold text-lg px-2">{{ }}8745</span> ห้อง</label>
                          </div>

                          <div class="w-3/5 flex flex-col justify-center items-center border p-4 rounded-lg">
                            <label class="font-bold text-xl">รายได้รวม {{ }} บาท</label>
                            <div class="flex justify-between items-center w-full mt-6">
                              <div class="w-1/2 flex flex-col justify-center items-center">
                                <label class="text-blue-600">Walkin</label>
                                <label class="font-bold">{{ }} THB</label>
                              </div>
                              <div class="w-1/2 flex flex-col justify-center items-center">
                                <label class="text-amber-600">SleepGun</label>
                                <label class="font-bold">{{ }} THB</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-8 px-4">
                      <div class="flex justify-between items-start">
                        <div class="w-1/3 px-2">
                          <label>ยอดเข้าชม SleepGun {{ }} ครั้ง</label>

                          <div class="mt-4 flex flex-col">
                            <label>member ที่เข้าใช้งานการจองกับ SleepGun {{ }} ครั้ง</label>
                            <label>member ที่เป็นสมาชิกกับ Tossagun ใช้งาน {{ }} ครั้ง</label>
                          </div>

                          <div class="mt-4 flex flex-col">
                            <label>จอง SleepGun สำเร้จ {{ }} ครั้ง</label>
                            <label>จอง SleepGun ไม่สำเร็จ {{ }} ครั้ง</label>
                            <label>ยกเลิกการจอง SleepGun {{ }} ครั้ง</label>
                          </div>
                        </div>

                        <div class="w-1/3 pl-4 border-l">
                          <label class="font-bold">โปรโมชั่นที่ใช้งานมีทั้งหมด {{ }} โปรโมชั่น</label>
                          <div class="mt-4 space-x-2">
                            <!-- เเบ่งเป็น promotion ที่กำลังใช้งานให้มี bg-blue-500/ promotion ที่ใช้เเต่หมดอายุเเล้วใก้เเสดง bg-stone-500 -->
                            <label class="bg-blue-500 text-white rounded-lg px-4">pro1</label>
                            <label class="bg-stone-500 text-white rounded-lg px-4">pro2</label>
                          </div>
                        </div>

                        <div class="w-1/3 pl-4 border-l">
                          <label class="font-bold text-lg">ยอดเงินที่ได้จาก SleepGunWeb : {{ }} THB</label>
                          <div class="flex flex-col mt-4">
                            <label>ยอดเงินที่อยู่ในเว็บ SleepGun : {{ }} THB</label>
                            <label>ยอดเงินที่จ่ายาพาร์ทเนอร์เเล้ว : {{ }} THB</label>
                          </div>

                          <div class="flex flex-col justify-end items-end">
                            <label class="text-stone-400 text-sm">เรทการจ่ายเงินทุกอาทิตย์</label>
                            <button
                              class="text-blue-500 font-bold underline underline-offset-2 shadow-md py-2 px-4 border rounded-lg">ประวัติการจ่ายเงิน</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="px-6 py-4">
                      <hr class="border" />
                    </div>

                    <div class="flex justify-end items-end px-6">
                      <button class="bg-red-500 text-white py-2 px-4 rounded-lg font-bold">ดูข้อมูล partner</button>
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
</script>