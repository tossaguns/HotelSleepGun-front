<template>
  <TemplatePartner>
    <template #header>
      <label>จองกับ SleepGun</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto lg:px-8">
        <div>
          <div class="my-12">
            <div class="flex justify-center items-center space-x-4">
              <button class="bg-stone-400 text-white py-2 px-4 hover:bg-green-500 rounded-md">กำลังดำเนินการ</button>
              <button class="bg-stone-400 text-white py-2 px-4 hover:bg-red-500 rounded-md">ยกเลิก</button>
              <button class="bg-stone-400 text-white py-2 px-4 hover:bg-amber-500 rounded-md">ทำรายการไม่สำเร็จ</button>
              <button class="bg-stone-400 text-white py-2 px-4 hover:bg-blue-500 rounded-md">รายการทั้งหมด</button>
            </div>
            <div class="space-x-2 flex justify-center items-center mt-6">
              <label>import to : </label>
              <button class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg">PDF</button>
              <button class="bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Excel</button>
            </div>
          </div>



          <div>
            <label>สถานะ : {{ }}</label>
          </div>

          <div class="mt-8">
            <div>
              <label class="font-bold">วันที่ : {{ }}</label>
            </div>

            <div class="mt-4">
              <div
                class="bg-amber-50 px-6 py-2 flex flex-col lg:flex-row lg:justify-between justify-start lg:items-center items-start border rounded-lg shadow-md">
                <div class="flex flex-col justify-start items-start">
                  <label>ลำดับ {{ }}</label>
                  <label>order SleepGun ID : {{ }}</label>
                  <div class="flex flex-col lg:flex-row lg:space-x-4">
                    <div>
                      <label class="font-bold">หมายเลขห้องพัก {{ }}</label>
                      <label>ตึก {{ }} ชั้น {{ }}</label>
                    </div>
                    <label>ชื่อผู้เข้าพัก {{ }}</label>
                    <label>เบอร์โทร {{ }}</label>
                  </div>
                </div>

                <div>
                  <label>วันเวลา check-in : {{ }}</label>
                </div>
              </div>


              <div class="lg:text-base md:text-sm text-xs px-3 ">
                <div class="border rounded-b-lg  p-4 bg-white">
                  <div class="flex flex-col md:flex-row justify-between items-start mb-2">
                    <div class="mt-2 flex w-full items-center space-x-2">
                      <label class="bg-amber-400 py-2 px-4 text-white rounded-md shadow-md">SleepGunWeb</label>
                      <!-- มี 3 สถานะ มีกำลังดำเนินการ/ยกเลิก/จองไม่สำเร็จ -->
                      <label>สถานะการจอง :<span :class="[
                        'text-white py-2 px-4 rounded-md shadow-md',
                        bookingStatus === 'กำลังดำเนินการ' ? 'bg-green-500' :
                          bookingStatus === 'ยกเลิก' ? 'bg-red-500' :
                            bookingStatus === 'ทำรายการไม่สำเร็จ' ? 'bg-amber-500' : 'bg-gray-400'
                      ]">
                          {{ bookingStatus }}
                        </span></label>
                    </div>

                    <div class="w-full flex justify-end items-end space-x-2 flex-col text-stone-400">
                      <div>
                        <label class="font-bold">วันที่เข้าพัก : </label>
                        <label>{{ dateCheckInSleepGunWebStart }} - {{ dateCheckInSleepGunWebEnd }}</label>
                      </div>

                      <div>
                        <label class="font-bold">Order SleepGun Booking id : </label>
                        <label>{{ }}</label>
                      </div>
                      <div>
                        <label class="font-bold">Order SleepGun All : </label>
                        <label>{{ }}</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <hr class="border" />
                  </div>

                  <div class="flex flex-col lg:flex-row xl:justify-between items-center w-full ">
                    <div class="lg:w-4/6  2xl:w-5/6  w-full px-4 mr-2 border-r my-2">
                      <div>
                        <div class="mb-4 text-stone-400">
                          <div>
                            <label class="font-bold">วันเวลาที่จอง : </label>
                            <label>วัน : {{ }} , เวลา : {{ }}</label>
                          </div>
                          <div>
                            <label class="font-bold">วันเวลาที่จ่ายเงิน : </label>
                            <label>วัน : {{ }} , เวลา : {{ }}</label>
                          </div>
                          <div>
                            <label class="font-bold">วันเวลาที่ยกเลิกการจอง : </label>
                            <label>วัน : {{ }} , เวลา : {{ }}</label>
                          </div>
                        </div>
                      </div>


                      <div class="flex flex-col 2xl:flex-row">
                        <div class="2xl:w-[500px]">
                          <div>
                            <div class="flex item-center space-x-2">
                              <label class="text-xs">ข้อมูลห้องพักทั้งหมด</label>
                              <img src="/imgHotel/warn.png" class="w-4 h-4 bg-stone-200 rounded-full" />
                            </div>
                            <div>
                              <label class="font-bold">หมายเลขห้อง : </label>
                              <label>{{ roomNumber }}</label>
                            </div>
                            <div>
                              <label class="font-bold">ประเภทห้องพัก : </label>
                              <label>{{ typeRoom }}</label>
                            </div>
                            <div>
                              <label class="font-bold">เข้าพักสูงสุดได้ : </label>
                              <label>{{ maxStayPeople }} คน</label>
                            </div>
                          </div>

                          <div class="mt-4 space-y-1">
                            <div>
                              <label class="font-bold">คำนวนราคา</label>
                            </div>

                            <div>
                              <div class="flex flex-col">
                                <label>ราคาห้องไม่รวม serviceCharge : {{ }} บาท</label>
                                <label>ราคา serviceCharge {{ }} % : {{ }} บาท , ราคา vat {{ }} % : {{ }} </label>
                              </div>

                              <div>
                                <label class="font-bold">เตียงเสริม : </label>
                                <label :class="hasUseExtraBed ? 'bg-green-500 text-white px-2 rounded' : ''">
                                  {{ hasUseExtraBed ? 'ใช้งาน' : 'ไม่ใช้งาน' }}
                                </label>
                                <div class="px-4">
                                  <label> ประเภท : {{ typeExtraBed }} ,ราคา / คืน : {{
                                    priceExtraBedByDay }} บาท</label>
                                </div>
                              </div>

                              <div>
                                <label class="font-bold">ค่ามัดจำ : <span class="font-normal">ค่าจุญเเจ ({{ depositKey
                                }})
                                  </span></label>
                              </div>
                            </div>
                          </div>

                          <div class="2xl:hidden">
                            <hr class="my-4 " />
                          </div>
                        </div>

                        <div class="flex flex-col 3xl:flex-row">
                          <div class="3xl:w-[400px]">
                            <div class="flex item-center space-x-2">
                              <label class="text-xs">ข้อมูลผู้เข้าพัก</label>
                              <img src="/imgHotel/warn.png" class="w-4 h-4 bg-stone-200 rounded-full" />
                            </div>
                            <div class="flex flex-col">
                              <div>
                                <label class="font-bold">ชื่อผู้ทำการจอง : </label>
                                <label>{{ customerfirstName }} {{ customerlastName }}</label>
                              </div>
                              <div>
                                <label class="font-bold">เพศ : </label>
                                <label>{{ }}</label>
                              </div>
                              <div>
                                <label class="font-bold">เบอร์โทร : </label>
                                <label>{{ }}</label>
                              </div>
                              <div>
                                <label class="font-bold">วันเกิด : </label>
                                <label>{{ }}</label>
                              </div>
                              <div>
                                <label class="font-bold">อายุ : </label>
                                <label>{{ }}</label>
                              </div>
                              <div>
                                <label class="font-bold">อีเมล : </label>
                                <label>{{ }}</label>
                              </div>
                              <div>
                                <label class="font-bold">จำนวนคนที่เข้าพักทั้งหมด : </label>
                                <label>{{ numberOfPeople }}</label>
                              </div>
                            </div>
                          </div>

                          <div class="3xl:mt-4">
                            <div class="flex flex-col">
                              <!-- มีบัตรประชาชน เเละ วีซ่า -->
                              <label class="font-bold">ยืนยันตัวตนโดย : {{ }}</label>
                              <label>หมายเลข :{{ }}</label>
                              <div class="px-4 py-2">
                                <img src="/imgHotel/delete.png" alt="รูปบัตร" class="w-[150px] h-[80px] border" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="lg:w-2/6  w-full mt-6 xl:mt-0 text-stone-500 ">
                      <div class="flex flex-col space-y-2 justify-center items-center px-6">
                        <div>
                          <label class="font-bold">ราคาห้องปกติ : </label>
                          <label>{{ priceRoomOld }} บาท</label>
                        </div>
                        <div>
                          <label class="font-bold">ราคาห้องที่ลดราคาเเล้ว : </label>
                          <label>{{ priceRoomNew }} บาท</label>
                        </div>
                        <div class="flex flex-col pt-6 justify-center items-center space-y-2">
                          <label class="font-bold">ราคารวมที่ต้องชำระ</label>
                          <label class="font-bold lg:text-3xl text-xl text-black"> {{ priceRoomTotal }}บาท</label>
                        </div>
                      </div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import Swal from 'sweetalert2'

</script>
