<template>
  <div class="h-full flex flex-col">
    <div class=" lg:text-sm text-xs text-stone-400">
      <div class="flex justify-between items-center">
        <div class="flex justify-center items-center pb-4">
          <button @click="resetData">
            <div class="flex items-center rounded-md shadow py-2 px-4">
              <img src="/imgHotel/deletered.png" alt="" class="w-6 h-6">
              <label class="text-red-600 ml-2">รีเซ็ทข้อมุล</label>
            </div>
          </button>
        </div>
        <div class="flex flex-col justify-end items-end">
          <!-- id check-out ใช้ COUT-yyyymm-xxxx -->
          <div class="font-bold flex flex-col">
            <label>Order Check-Out ID : {{ checkOutOrderId }} </label>
            <label>Order check-Out All : {{ orderCheckoutAll }}</label>
          </div>
          <label>Date Check-out : {{ orderDate }}, {{ orderTime }}</label>
          <label>Order check-Out by : {{ orderCheckoutBy || 'ไม่ระบุ' }}</label>
        </div>
      </div>
      <div class="my-4">
        <hr class="border" />
      </div>
      <div class="flex justify-between items-start">
        <div class="flex flex-col">
          <label>Order Check-in ID : {{ checkOutOrderId }} </label>
          <label>Date Check-in : {{ orderDateCheckin }} , {{ orderTimeCheckin }}</label>
        </div>
        <div class="flex flex-col justify-end items-end">
          <label>Order check-in All : {{ ordercheckinAll }}</label>
          <label>Order by : {{ orderCheckinBy || 'ไม่ระบุ' }}</label>
        </div>
      </div>
    </div>

    <div class="my-2">
      <hr class="border" />
    </div>

    <!-- แสดงข้อมูลการตั้งค่าของโรงแรม -->
    <div v-if="checkInStore.aboutHotelData" class="bg-amber-50 p-3 rounded-md mb-3 border-amber-400 border">
      <h3 class="font-bold text-amber-800 mb-2">การตั้งค่าของโรงแรม</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span class="font-medium">ค่ามัดจำ:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.cashPledge?.price?.toLocaleString() || 0 }}
            บาท</span>
        </div>
        <div>
          <span class="font-medium">check-out เลท:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.checkInEarlyPricePerHour?.toLocaleString() || 0
          }} บาท/ชั่วโมง</span>
        </div>

        <div>
          <span class="font-medium">Service Charge:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.serviceCharge || 0 }}%</span>
        </div>
        <div>
          <span class="font-medium">VAT:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.vat || 0 }}%</span>
        </div>
        <div>
          <span class="font-medium">เวลาเช็คอิน:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.checkInForm || "" }} - {{
            checkInStore.aboutHotelData.checkInTo || "ไม่ระบุ" }}</span>
        </div>
        <div>
          <span class="font-medium">เวลาเช็คเอาท์:</span>
          <span class="text-amber-600">{{ checkInStore.aboutHotelData.checkOutForm || "" }} - {{
            checkInStore.aboutHotelData.checkOutTo || "ไม่ระบุ" }}</span>
        </div>
      </div>
    </div>


    <!-- Content Area with Scroll -->
    <div class="flex-1 overflow-y-auto">
      <!-- กรอกข้อมูลผู้เข้าพัก -->
      <div class="flex flex-col space-y-3 bg-stone-100 p-4 rounded-md">
        <label class="text-lg font-bold">ข้อมูลผู้เข้าพัก</label>

        <div class="flex space-x-2 items-center">
          <label>ชื่อผู้เข้าพัก : {{ firstnameCustomer }} {{ lastnameCustomer }}</label>
        </div>

        <div class="flex space-x-2 items-center">
          <label>เพศ : {{ genderCustomer }}</label>
        </div>

        <div class="flex space-x-2 items-center">
          <label>เบอร์โทรศัพท์ : {{ phoneCustomer }}</label>
        </div>


        <div>
          <label>ยืนยันตัวตนโดยใช้ : {{ selectedType }}</label>
        </div>

        <div>
          <label>หมายเลข : {{ }}</label>
        </div>

        <div>
          <!-- เเสดงรูป -->
          <label>รุป : </label>
          <div class="flex justify-center items-center">
            <img src="/imgHotel/sea.jpg" alt="รูปยืนยันตัวตน"
              class="w-[300px] h-[180px] object-cover border rounded-lg" />
          </div>
        </div>



        <div class="flex space-x-2 items-center">
          <label>วันเกิด : {{ birthDateCustomer }}</label>
        </div>

        <div class="flex space-x-2 items-center">
          <label>อายุ : {{ ageCustomer }}</label>
        </div>

        <div class="flex space-x-2 items-center">
          <label>email : {{ emailCustomer }}</label>
        </div>

        <div class="flex space-x-2 items-center">
          <label>จำนวนคนเข้าพัก : {{ numberCustomerStay }}</label>
        </div>
      </div>

      <div class="my-2">
        <hr class="border" />
      </div>
      <!-- ข้อมูลรายการห้องที่เลือก -->
      <div v-if="selectedRooms.length > 0">
        <label class="text-lg font-bold px-4">ห้องที่เลือก ({{ totalRooms }} ห้อง)</label>

        <!-- แสดงรายการห้องที่เลือก -->
        <div v-for="(room, index) in selectedRooms" :key="room._id" class="border border-red-300 rounded-md p-2 mt-3"
          :class="room.status === 'SleepGunWeb' ? 'bg-amber-100' : ''">
          <div class="flex justify-between items-center lg:text-sm text-xs text-red-600 ">
            <label>รายการที่ {{ index + 1 }}</label>
            <div>
              <label>วันที่เข้าพัก : {{ new Date().toLocaleDateString('th-TH') }}</label>
              <label class="ml-2">จำนวนวัน : 1 วัน</label>
            </div>
          </div>

          <div class="my-2">
            <hr class="border" />
          </div>

          <div>
            <div class="flex justify-between items-start">
              <div class="w-1/2">
                <Tooltip position="top" class="relative">
                  <template #trigger>
                    <button
                      class="absolute top-4 left-2 px-3  rounded-full shadow-lg bg-white z-10 text-lg font-bold ">!</button>
                  </template>

                  <template #content>
                    <!-- <div class="text-sm font-semibold bg-stone-600 rounded-lg text-white">
                    <div class="p-4">
                      <h3 class="text-lg font-bold pb-3">ห้อง {{ room.roomNumber }}</h3>
                      <h3 class="text-lg font-bold pb-3">ราคา{{ room.roomPrice }}</h3>

                      <div class="flex items-start flex-col mb-4">
                        <span class="font-bold">ประเภท:</span>
                        <span :class="getTypeBadgeClass(room.typeRoom)" class=" px-2 py-1 rounded text-xs font-medium">
                          {{ room.typeRoom?.mainName || room.typeRoom }}
                        </span>
                        <span class="">{{ room.typeRoom?.name || room.typeRoom }}, </span>
                        <span class="">{{ room.air ||
                          'ไม่มีแอร์' }}</span>
                      </div>

                      <div v-if="room.stayPeople" class="flex items-center">
                        <span class="font-medium">จำนวนคน:</span>
                        <span class="ml-2">{{ room.stayPeople }} คน</span>
                      </div>

                      <div v-if="room.roomDetail" class="flex items-center">
                        <span class="font-medium">รายละเอียด:</span>
                        <span class="ml-2 text-xs">{{ room.roomDetail }}</span>
                      </div>

                      ลักษณะห้องพัก 
                      <div v-if="room.typeRoomHotel && room.typeRoomHotel.length > 0" class="flex flex-wrap gap-1">
                        <span v-for="tag in room.typeRoomHotel" :key="tag._id"
                          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {{ tag.name }}
                        </span>
                      </div>

                      ข้อมูลตึกและชั้น 
                      <div class="text-xs mt-2">
                        <span v-if="room.buildingId">ตึก {{ getBuildingName(room.buildingId) }}</span>
                        <span v-if="room.floor">, ชั้น {{ room.floor }}</span>
                      </div>

                      <div class="my-4">
                        <hr class="border border-gray-200" />
                      </div>

                      <div class="flex items-center space-x-2">
                        <label class="text-xs font-medium ">สถานะห้อง:</label>
                        <div v-if="statusRoomEditable">
                          <select v-model="room.statusRoom"
                            @change="updateRoomStatus(room._id, 'statusRoom', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1">
                            <option value="ว่าง">ว่าง</option>
                            <option value="ไม่ว่าง">ไม่ว่าง</option>
                            <option value="กำลังทำความสะอาด">กำลังทำความสะอาด</option>
                          </select>
                        </div>
                        <label v-else>{{ room.statusRoom }}</label>
                      </div>

                      สถานะการเข้าพัก 
                      <div class="flex items-center space-x-2">
                        <label class="text-xs font-medium ">สถานะ:</label>
                        <div v-if="statusEditable">
                          <select v-model="room.status"
                            @change="updateRoomStatus(room._id, 'status', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1"
                            :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                            <option value="SleepGunWeb"
                              :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                              SleepGunWeb {{ room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5 ?
                              '(โควต้าเต็ม)'
                              :
                              '' }}
                            </option>
                            <option value="Walkin">Walkin</option>
                          </select>
                        </div>
                        <label v-else>{{ room.status }}</label>
                      </div>


                      สถานะโปรโมชั่น (แสดงเฉพาะเมื่อเป็น SleepGunWeb) 
                      <div v-if="room.status === 'SleepGunWeb'" class="rounded">
                        <div class="flex items-center space-x-2 mb-2">
                          <label class="text-xs font-medium ">สถานะโปรโมชั่น:</label>
                          <label>{{ room.statusPromotion }}</label>
                        </div>
                      </div>

                    </div>
                  </div> -->
                  </template>
                </Tooltip>

                <div class="mb-4">
                  <img :src="room.images?.[0]?.preview || '/imgHotel/sea.jpg'" :alt="`ห้อง ${room.roomNumber}`"
                    class="w-full h-28 object-cover rounded-md" />
                </div>
              </div>

              <div class="w-1/2 flex flex-col justify-end items-end ">
                <div class="flex  mb-6">
                  <button @click="removeRoom(room._id)" class="rounded-full p-2 shadow-md">
                    <img src="/imgHotel/deletered.png" alt="" class="w-6 h-6" />
                  </button>
                </div>

                <div class="flex justify-center items-center flex-col w-full">
                  <div>
                    <label class="font-bold">ห้อง {{ room.roomNumber }}</label>
                  </div>
                  <div>
                    <label class="text-lg font-bold">ราคา {{ room.totalPrice?.toLocaleString() ||
                      room.basePrice?.toLocaleString() }} THB</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-stone-400">
              <div class="flex flex-col my-2">
                <label>เข้าพักห้องนี้จำนวนกี่คน : {{ room.numberOfGuests }}</label>

                <!-- แสดงจำนวนคนสูงสุดที่สามารถเข้าพักได้ -->
                <div class="text-xs text-gray-600 mt-1">
                  <span>สูงสุด {{ room.stayPeople || 'ไม่จำกัด' }} คน</span>
                  <span v-if="room.numberOfGuests > (room.stayPeople || 10)" class="text-red-600 ml-2">
                    ⚠️ เกินจำนวนที่แนะนำ
                  </span>
                </div>
              </div>


              <!-- แสดงข้อมูลราคาห้อง -->
              <div class="my-4 p-3 bg-gray-50 rounded-md border border-gray-200 ">
                <h4 class="font-semibold mb-2">รายละเอียดราคาห้อง:</h4>

                <!-- ราคาปกติ -->
                <div>
                  <label class="text-sm font-medium">ค่าห้องปกติ: {{ room.basePrice?.toLocaleString() || 0 }}
                    บาท</label>
                </div>


                <div>
                  <label class="text-sm font-medium">+ ราคารวม: {{
                    room.basePrice?.toLocaleString() || 0
                  }} บาท (รวม SC & VAT แล้ว)</label>
                </div>

                <!-- ค่ามัดจำ -->
                <div>
                  <label class="text-sm font-medium">+ ค่ามัดจำ: {{ room.deposit?.toLocaleString() || 0 }} บาท</label>
                </div>

                <div class="mt-2 flex flex-col text-sm font-medium">
                  <label>+ ราคาที่เพิ่มเตียงเด็กรวม : {{ (room.numberAddBedChild *
                    (checkInStore.aboutHotelData?.typeBedPrice?.child
                      || 0))?.toLocaleString() || 0 }}
                    บาท</label>
                  <label>+ ราคาที่เพิ่มเตียงธรรมดารวม : {{ (room.numberAddBedNormal *
                    (checkInStore.aboutHotelData?.typeBedPrice?.normal || 0))?.toLocaleString() || 0 }}
                    บาท</label>
                </div>

                <div class=" text-sm font-medium">
                  <label>+ ราคาเข้าพักก่อนเวลา: {{ (checkInStore.calculateEarlyCheckInHours() *
                    (checkInStore.aboutHotelData?.checkInEarlyPricePerHour || 100))?.toLocaleString() }} บาท</label>
                </div>
              </div>
            </div>

            <div>
              <div class="border rounded-md p-2 bg-amber-50 border-amber-400 mt-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                    <span class="text-amber-800 text-xs">!</span>
                  </div>
                  <label class="text-amber-800 font-semibold">แจ้งเตือน: Check-out เลท</label>
                </div>
                <div class="mt-1 text-sm text-amber-700">
                  <p>เวลาปัจจุบัน: {{ checkInStore.getCurrentTime() }}</p>
                  <p>เวลา Check-Out : {{ }}</p>
                  <p>Check-Out เลท: {{ checkInStore.calculateEarlyCheckInHours() }} ชั่วโมง</p>
                  <p class="font-bold">ราคาเพิ่ม: {{ (checkInStore.calculateEarlyCheckInHours() *
                    (checkInStore.aboutHotelData?.checkInEarlyPricePerHour || 100))?.toLocaleString() }} บาท</p>
                </div>
              </div>
            </div>

            <div class="mt-4 bg-red-50 py-2 px-4 rounded-lg border border-red-500">
              <label class="text-red-600">เลือกรายการที่ต้องการ Check-out</label>
              <div class="flex items-center space-x-2">
                <input type="checkbox" class="border py-1 px-3" />
                <label>ต้องการเรียกค่าเสียหายหรือไม่</label>
              </div>
            </div>
            <div class=" bg-red-100  rounded-b-lg mx-3 py-4 px-3 flex flex-col">
              <label>ราคาค่าเสียหาย <span><input type="number" class="bg-white border rounded-lg py-2 px-4 w-[100px]"
                    placeholder="ราคา" /></span> บาท</label>
              <div class="mt-2">
                <label>เหตุผลที่ต้องชำระค่าเสียหาย </label>
                <span><textarea type="text" class="bg-white border rounded-lg w-full py-2 px-4"
                    placeholder="พิมพ์เหตุผล..." /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto flex-shrink-0">
      <div class="mt-20">
        <div class="my-4">
          <label class="font-bold">จำนวนคนทั้งหมด</label>
          <div>
            <!-- ดึงจำนวนคนตามจำนวนห้องที่ checkinn ทั้งหมด -->
            <label>จำนวนคนที่ Check-in ตอนนี้ <span><input type="number" class="border rounded-lg w-[100px] px-4 py-2"
                  placeholder="จำนวนคน" /></span> คน</label>
            <!-- คำนวนจากจำนวนคนเข้าพัก เเละคนที่ออกไปตอน check-out ว่าคนเหลือเท่าไหร่ เเละหักลบจากการจองรอบเดียวกันของคนจองคนเดียวกัน -->
            <label>จำนวนคนคงเหลือที่เข้าพักด้วยกัน {{ }} คน</label>
          </div>
        </div>

        <div class="border rounded-md p-4 bg-red-500 text-white flex flex-col">
          <label class="text-lg font-bold mb-3">สรุปราคา ({{ totalRooms }} รายการ)</label>

          <!-- รายละเอียดราคา -->
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>รวมราคาห้องที่จ่ายตอน check-in:</span>
              <span>{{ }} บาท</span>
            </div>

            <hr class="border-white/30 my-2">

            <div class="flex justify-between">
              <span>ค่ามัดจำ:</span>
              <span>{{ }} บาท</span>
            </div>

            <hr class="border-white/30 my-2">

            <div class="flex justify-between">
              <span>ราคาค่า check-out เลท:</span>
              <span>{{ }} บาท</span>
            </div>
            <div class="flex justify-between">
              <span>ราคาค่า เสียหายภายในห้อง:</span>
              <span>{{ }} บาท</span>
            </div>

            <hr class="border-white/30 my-2">

            <!-- เเสดงตามค่าคำนวนที่ได้ มีค่า + เเละ - -->
            <!-- เเสดงเมื่อค่าเป็น +  -->
            <div class="pt-12 space-y-2">
              <div class="flex justify-between text-xl font-bold  text-black bg-green-100 py-3 px-4 rounded-lg">
                <span>ราคาที่ต้องจ่ายคืนให้ลูกค้า:</span>
                <span class="text-green-600">{{ }} บาท</span>
              </div>
              <!-- เเสดงเมื่อค่าเป็น -  -->
              <div class="flex justify-between text-xl font-bold text-black bg-red-100 py-3 px-4 rounded-lg">
                <span>ราคาที่ลูกค้าตอ้งจ่ายเพิ่ม:</span>
                <span class="text-red-600">{{ }} บาท</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button 
              class="bg-white text-lg font-bold text-red-600 px-4 py-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Check-Out
            </button>
          </div>
        </div>
       
        <div class="flex justify-center items-center">
          <img src="/imgHotel/checkinHotel.jpg" alt="" class="h-[160px] rounded-md p-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from "@/components/element/Tooltip.vue";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useCheckInStore } from '@/stores/checkInStore';
import { useAuthStore } from '@/stores/auth';
import { CheckInOrderService } from '@/service/CheckInOrderService';

const selectedType = ref('idcard'); // ✅ Default = ใช้บัตรประชาชน

// ฟังก์ชันล้างข้อมูลเมื่อเปลี่ยนประเภทเอกสาร
const clearDocumentData = () => {
  if (selectedType.value === 'idcard') {
    passportNumberCustomer.value = '';
    passportImgCustomer.value = '';
  } else {
    idenNumberCustomer.value = '';
    idenImgCustomer.value = '';
  }
};

const handleIdenImgUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // ตรวจสอบประเภทไฟล์
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
      return;
    }
    // สร้าง URL สำหรับ preview
    const fileUrl = URL.createObjectURL(file);
    idenImgCustomer.value = fileUrl;
    console.log('บัตรประชาชน:', file);
  }
};

const handlePassportImgUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // ตรวจสอบประเภทไฟล์
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
      return;
    }
    // สร้าง URL สำหรับ preview
    const fileUrl = URL.createObjectURL(file);
    passportImgCustomer.value = fileUrl;
    console.log('พาสปอร์ต:', file);
  }
};

// ฟังก์ชันตรวจสอบเลขบัตรประชาชน
const validateIdenNumber = (value) => {
  if (value && value.length !== 13) {
    alert('เลขบัตรประชาชนต้องมี 13 หลัก');
    return false;
  }
  return true;
};

// ฟังก์ชันตรวจสอบเลขพาสปอร์ต
const validatePassportNumber = (value) => {
  if (value && value.length < 6) {
    alert('เลขพาสปอร์ตต้องมีอย่างน้อย 6 หลัก');
    return false;
  }
  return true;
};

// Define emits
const emit = defineEmits(['showPaymentModal']);

// Initialize stores
const checkInStore = useCheckInStore();
const authStore = useAuthStore();

// ตรวจสอบ auth store เมื่อ component เริ่มต้น
authStore.initializeAuth();

// ข้อมูล Check-in Order (ใช้จาก store)
const checkInOrderId = computed(() => checkInStore.checkInOrderId);
const orderAll = computed(() => checkInStore.orderAll);
const orderDate = computed(() => checkInStore.orderDate);
const orderTime = computed(() => checkInStore.orderTime);
const orderBy = computed(() => checkInStore.orderBy);

// ข้อมูลลูกค้า (ใช้จาก store)
const customerData = computed(() => checkInStore.customerData);
const firstnameCustomer = computed({
  get: () => customerData.value.firstname,
  set: (value) => checkInStore.updateCustomerData({ firstname: value })
});
const lastnameCustomer = computed({
  get: () => customerData.value.lastname,
  set: (value) => checkInStore.updateCustomerData({ lastname: value })
});
const genderCustomer = computed({
  get: () => customerData.value.gender,
  set: (value) => checkInStore.updateCustomerData({ gender: value })
});
const birthDateCustomer = computed({
  get: () => customerData.value.birthDate,
  set: (value) => checkInStore.updateCustomerData({ birthDate: value })
});
const ageCustomer = computed(() => customerData.value.age);
const phoneCustomer = computed({
  get: () => customerData.value.phone,
  set: (value) => checkInStore.updateCustomerData({ phone: value })
});
const numberCustomerStay = computed({
  get: () => customerData.value.numberOfGuests,
  set: (value) => checkInStore.updateCustomerData({ numberOfGuests: parseInt(value) || 1 })
});
const emailCustomer = computed({
  get: () => customerData.value.email,
  set: (value) => checkInStore.updateCustomerData({ email: value })
});

// ฟิลด์ใหม่สำหรับข้อมูลบัตรประชาชนและพาสปอร์ต
const idenNumberCustomer = computed({
  get: () => customerData.value.idenNumber,
  set: (value) => checkInStore.updateCustomerData({ idenNumber: value })
});

const idenImgCustomer = computed({
  get: () => customerData.value.idenImg,
  set: (value) => checkInStore.updateCustomerData({ idenImg: value })
});

const passportNumberCustomer = computed({
  get: () => customerData.value.passportNumber,
  set: (value) => checkInStore.updateCustomerData({ passportNumber: value })
});

const passportImgCustomer = computed({
  get: () => customerData.value.passportImg,
  set: (value) => checkInStore.updateCustomerData({ passportImg: value })
});

// รายการห้องที่เลือก (ใช้จาก store)
const selectedRooms = computed(() => checkInStore.selectedRooms);
const totalRooms = computed(() => checkInStore.totalRooms);
const totalPrice = computed(() => checkInStore.totalPrice);

// คำนวณราคาต่างๆ
const totalBasePrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.basePrice || 0);
  }, 0);
});

const totalDeposit = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.deposit || 0);
  }, 0);
});

const totalExtraBedPrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.extraBedPrice || 0);
  }, 0);
});

const totalEarlyCheckInPrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.earlyCheckInPrice || 0);
  }, 0);
});

// คำนวณ Service Charge และ VAT สำหรับแต่ละห้อง
const calculateRoomServiceCharge = (room) => {
  const serviceChargePercent = checkInStore.aboutHotelData?.serviceCharge || 0;
  const basePrice = room.basePrice || 0;
  return Math.round((serviceChargePercent * basePrice) / 100);
};

const calculateRoomVat = (room) => {
  const vatPercent = checkInStore.aboutHotelData?.vat || 0;
  const basePrice = room.basePrice || 0;
  return Math.round((vatPercent * basePrice) / 100);
};

// คำนวณราคา base (ไม่รวม SC & VAT) สำหรับห้องที่มีการกำหนด
const calculateRoomBasePrice = (room) => {
  if (room.isServiceChargeIncluded || room.isVatIncluded) {
    let totalPercentage = 0;
    if (room.isServiceChargeIncluded) {
      totalPercentage += checkInStore.aboutHotelData?.serviceCharge || 0;
    }
    if (room.isVatIncluded) {
      totalPercentage += checkInStore.aboutHotelData?.vat || 0;
    }

    if (totalPercentage > 0) {
      // คำนวณราคา base โดยการหัก service charge และ VAT ออกจากราคารวม
      return Math.round(room.basePrice / (1 + totalPercentage / 100));
    }
  }
  return room.basePrice || 0;
};

// คำนวณราคารวมสำหรับห้องที่ไม่รวม Service Charge และ VAT
const calculateRoomTotalPriceWithoutSCVAT = (room) => {
  // ใช้ราคารวมจริงจาก store ที่รวมค่ามัดจำ ค่าเตียง และค่าเข้าพักก่อนเวลาแล้ว
  const totalPrice = room.totalPrice || room.basePrice || 0;
  const deposit = room.deposit || 0;
  const extraBedPrice = room.extraBedPrice || 0;
  const earlyCheckInPrice = room.earlyCheckInPrice || 0;

  // คำนวณราคารวม = ราคารวมจาก store + ค่ามัดจำ + ค่าเตียง + ค่าเข้าพักก่อนเวลา
  return totalPrice + deposit + extraBedPrice + earlyCheckInPrice;
};

// คำนวณ Service Charge จากราคารวม (สำหรับห้องที่ไม่ได้รวม SC & VAT)
const calculateRoomServiceChargeFromTotal = (room) => {
  const serviceChargePercent = checkInStore.aboutHotelData?.serviceCharge || 0;
  const totalPrice = calculateRoomTotalPriceWithoutSCVAT(room) || 0;
  return Math.round((serviceChargePercent * totalPrice) / 100);
};

// คำนวณ VAT จากราคารวม (สำหรับห้องที่ไม่ได้รวม SC & VAT)
const calculateRoomVatFromTotal = (room) => {
  const vatPercent = checkInStore.aboutHotelData?.vat || 0;
  const totalPrice = calculateRoomTotalPriceWithoutSCVAT(room) || 0;
  return Math.round((vatPercent * totalPrice) / 100);
};

const subtotal = computed(() => {
  return totalBasePrice.value + totalDeposit.value + totalExtraBedPrice.value + totalEarlyCheckInPrice.value;
});

const tax = computed(() => {
  return subtotal.value * 0.07; // ภาษี 7%
});

const grandTotal = computed(() => {
  return subtotal.value + tax.value;
});

// คำนวณจำนวนคนเข้าพัก
const totalGuestsInRooms = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (parseInt(room.numberOfGuests) || 1);
  }, 0);
});

const remainingGuests = computed(() => {
  const customerGuests = parseInt(numberCustomerStay.value) || 1;
  return customerGuests - totalGuestsInRooms.value;
});

const isGuestCountValid = computed(() => {
  return remainingGuests.value >= 0;
});

// ตัวแปรสำหรับติดตามการกดปุ่ม Check-in
const checkInAttempted = ref(false);

// ฟังก์ชันลบห้อง
const removeRoom = (roomId) => {
  checkInStore.removeRoom(roomId);
};

// ฟังก์ชันอัปเดตข้อมูลห้อง
const updateRoomData = (roomId, updates) => {
  // ตรวจสอบจำนวนคนเข้าพัก
  if (updates.numberOfGuests !== undefined) {
    const room = selectedRooms.value.find(r => r._id === roomId);
    if (room) {
      const maxGuests = room.stayPeople || 10;
      if (updates.numberOfGuests > maxGuests) {
        alert(`ห้องนี้รองรับได้สูงสุด ${maxGuests} คน`);
        return;
      }
      if (updates.numberOfGuests < 1) {
        alert('จำนวนคนเข้าพักต้องไม่น้อยกว่า 1 คน');
        return;
      }
    }
  }

  checkInStore.updateRoom(roomId, updates);
};

// ฟังก์ชันรีเซ็ทข้อมูล
const resetData = () => {
  if (confirm('คุณต้องการรีเซ็ทข้อมูลทั้งหมดหรือไม่?')) {
    checkInStore.resetData();
    checkInAttempted.value = false; // รีเซ็ตสถานะการกดปุ่ม Check-in
    selectedType.value = 'idcard'; // รีเซ็ตประเภทเอกสาร
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนคนเข้าพักของลูกค้า
const increaseCustomerGuests = () => {
  const currentValue = parseInt(numberCustomerStay.value) || 1;
  numberCustomerStay.value = currentValue + 1;
};

const decreaseCustomerGuests = () => {
  const currentValue = parseInt(numberCustomerStay.value) || 1;
  if (currentValue > 1) {
    numberCustomerStay.value = currentValue - 1;
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนคนเข้าพักของห้อง
const increaseRoomGuests = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberOfGuests) || 1;
    const maxGuests = room.stayPeople || 10; // จำนวนคนสูงสุดที่แนะนำ

    if (currentValue < maxGuests) {
      updateRoomData(roomId, { numberOfGuests: currentValue + 1 });
    } else {
      alert(`ห้องนี้รองรับได้สูงสุด ${maxGuests} คน`);
    }
  }
};

const decreaseRoomGuests = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberOfGuests) || 1;
    if (currentValue > 1) {
      updateRoomData(roomId, { numberOfGuests: currentValue - 1 });
    }
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนเตียงเด็ก
const increaseChildBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedChild) || 0;
    updateRoomData(roomId, { numberAddBedChild: currentValue + 1 });
  }
};

const decreaseChildBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedChild) || 0;
    if (currentValue > 0) {
      updateRoomData(roomId, { numberAddBedChild: currentValue - 1 });
    }
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนเตียงธรรมดา
const increaseNormalBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedNormal) || 0;
    updateRoomData(roomId, { numberAddBedNormal: currentValue + 1 });
  }
};

const decreaseNormalBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedNormal) || 0;
    if (currentValue > 0) {
      updateRoomData(roomId, { numberAddBedNormal: currentValue - 1 });
    }
  }
};

// ฟังก์ชันตรวจสอบว่าปัจจุบันเป็นเวลาก่อนเวลาเช็คอินหรือไม่
const isBeforeCheckInTime = () => {
  return checkInStore.calculateEarlyCheckInHours() > 0;
};

// ฟังก์ชัน Check-in
const handleCheckIn = async () => {
  try {
    // ตั้งค่าสถานะการกดปุ่ม Check-in
    checkInAttempted.value = true;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!firstnameCustomer.value || !lastnameCustomer.value || !phoneCustomer.value) {
      alert('กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน (ชื่อ นามสกุล เบอร์โทรศัพท์)');
      return;
    }

    // ตรวจสอบข้อมูลเอกสาร
    if (selectedType.value === 'idcard') {
      if (idenNumberCustomer.value && !validateIdenNumber(idenNumberCustomer.value)) {
        return;
      }
    } else if (selectedType.value === 'visa') {
      if (passportNumberCustomer.value && !validatePassportNumber(passportNumberCustomer.value)) {
        return;
      }
    }

    if (selectedRooms.value.length === 0) {
      alert('กรุณาเลือกห้องอย่างน้อย 1 ห้อง');
      return;
    }

    // ตรวจสอบจำนวนคนเข้าพัก
    if (remainingGuests.value < 0) {
      const customerName = `${firstnameCustomer.value || ''} ${lastnameCustomer.value || ''}`.trim();
      alert(`จำนวนคนที่เข้าพักในห้องเกินกว่าที่ลูกค้าต้องการ\nลูกค้า: ${customerName || 'ไม่ระบุ'}\nลูกค้าต้องการ: ${numberCustomerStay.value} คน\nเข้าพักในห้อง: ${totalGuestsInRooms.value} คน\nเกิน: ${Math.abs(remainingGuests.value)} คน`);
      return;
    }

    if (remainingGuests.value > 0) {
      const customerName = `${firstnameCustomer.value || ''} ${lastnameCustomer.value || ''}`.trim();
      const confirmMessage = `จำนวนคนที่เข้าพักยังไม่ครบถ้วน\nลูกค้า: ${customerName || 'ไม่ระบุ'}\nลูกค้าต้องการ: ${numberCustomerStay.value} คน\nเข้าพักในห้อง: ${totalGuestsInRooms.value} คน\nเหลือ: ${remainingGuests.value} คน\n\nคุณต้องการดำเนินการต่อหรือไม่?`;
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    // ส่งข้อมูลไปยัง MainPOS component เพื่อแสดง popup การชำระเงิน
    const checkInData = {
      customerData: {
        ...customerData.value,
        // เพิ่มข้อมูลชื่อเต็มสำหรับการแสดงผล
        fullName: `${customerData.value.firstname || ''} ${customerData.value.lastname || ''}`.trim(),
        // เพิ่มข้อมูลเอกสาร
        documentInfo: selectedType.value === 'idcard' ? {
          type: 'บัตรประชาชน',
          number: customerData.value.idenNumber,
          image: customerData.value.idenImg
        } : {
          type: 'พาสปอร์ต',
          number: customerData.value.passportNumber,
          image: customerData.value.passportImg
        }
      },
      selectedRooms: selectedRooms.value,
      totalRooms: totalRooms.value,
      totalBasePrice: totalBasePrice.value,
      totalDeposit: totalDeposit.value,
      totalExtraBedPrice: totalExtraBedPrice.value,
      totalEarlyCheckInPrice: totalEarlyCheckInPrice.value,
      subtotal: subtotal.value,
      tax: tax.value,
      grandTotal: grandTotal.value,
      employeeData: checkInStore.employeeData,
      orderBy: orderBy.value,
      documentType: selectedType.value
    };

    // เรียก event เพื่อส่งข้อมูลไปยัง parent component
    emit('showPaymentModal', checkInData);

  } catch (error) {
    console.error('Error during check-in:', error);
    alert(`เกิดข้อผิดพลาดในการ Check-in: ${error.message}`);
  }
};

// ตัวแปรสำหรับ timer
let priceUpdateTimer = null;

// ฟังก์ชันอัปเดตราคาอัตโนมัติตามเวลา
const updatePricesBasedOnTime = () => {
  if (selectedRooms.value.length > 0) {
    selectedRooms.value.forEach(room => {
      checkInStore.updateRoom(room._id, {});
    });
  }
};

// เริ่มต้นเมื่อ component mount
onMounted(async () => {
  // ข้อมูลจะถูกเริ่มต้นจาก store แล้ว
  console.log('CheckInOrder component mounted');
  console.log('Auth Store User:', authStore.user);

  // ตรวจสอบและรอให้ auth store พร้อม
  if (!authStore.user || !authStore.user.partnerId) {
    console.warn('Auth user not ready, waiting...');
    // รอสักครู่แล้วลองใหม่
    setTimeout(async () => {
      console.log('Retrying auth user check:', authStore.user);
      if (authStore.user && authStore.user.partnerId) {
        await initializeCheckInData();
      }
    }, 1000);
    return;
  }

  await initializeCheckInData();
});



// ฟังก์ชันเริ่มต้นข้อมูล Check-in
const initializeCheckInData = async () => {
  try {
    // ตั้งค่าข้อมูลพนักงานจาก auth store
    if (authStore.user && authStore.user.role === 'employee') {
      checkInStore.setEmployeeDataFromAuth(authStore.user);
    }

    // โหลดข้อมูล aboutHotel ถ้ามี partnerId
    if (authStore.user && authStore.user.partnerId) {
      console.log('Loading aboutHotel data for partnerId:', authStore.user.partnerId);
      await checkInStore.initializeData(authStore.user.partnerId);
      console.log('AboutHotel data loaded:', checkInStore.aboutHotelData);
    } else {
      console.warn('No partnerId found in auth user');
    }

    // เริ่มต้น timer สำหรับอัปเดตราคาตามเวลา (ทุก 1 นาที)
    priceUpdateTimer = setInterval(updatePricesBasedOnTime, 60000);
  } catch (error) {
    console.error('Error initializing check-in data:', error);
  }
};


// ใช้ watch เพื่อติดตามการเปลี่ยนแปลงของ auth user
watch(() => authStore.user, async (newUser) => {
  if (newUser && newUser.partnerId && !checkInStore.aboutHotelData) {
    console.log('Auth user changed, initializing check-in data');
    await initializeCheckInData();
  }
}, { immediate: true });

// ทำความสะอาด timer เมื่อ component unmount
onUnmounted(() => {
  if (priceUpdateTimer) {
    clearInterval(priceUpdateTimer);
  }
});
</script>