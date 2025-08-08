<template>
  <TemplateEmployee>
    <template #header>
      <label>จองกับ SleepGun</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>
          <label class="text-2xl font-bold">จองกับ SleepGun</label>
        </div>
        <div class="max-w-7xl mx-auto mt-8">
          <div class="md:p-6">
            <div class="flex justify-between items-center mb-4">
              <button @click="prevMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                ◀ เดือนก่อนหน้า
              </button>
              <h2 class="md:text-xl text-sm font-bold cursor-pointer text-amber-600" @click="openMonthYearPicker">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </h2>
              <button @click="nextMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                เดือนถัดไป ▶
              </button>
            </div>

            <!-- ปฏิทิน -->
            <div class="grid grid-cols-7 gap-2 text-center">
              <div class="font-bold text-amber-600" v-for="d in days" :key="d">{{ d }}</div>
              <div v-for="day in calendarDays" :key="day.date + Math.random()"
                class="border p-2 rounded-md relative cursor-pointer hover:bg-maber-50 min-h-[60px]"
                @click="selectDate(day)">
                <div class="text-sm font-semibold text-right">{{ day.day }}</div>
                <div v-if="day.bookings.length" class="mt-1 text-xs bg-amber-100 text-amber-800 rounded px-1 truncate">
                  {{ day.bookings[0].title }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div class="">
              <div class="flex flex-col md:flex-row justify-end items-center md:space-x-2">
                <div class="space-x-2 mb-2 md:mb-0">
                  <input type="text" class="border rounded-md p-2" placeholder="ค้นหาห้องพัก.." />
                  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">ค้นหา</button>
                </div>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">ล้างค้นหา</button>
              </div>
            </div>

            <div class="my-12">
              <div class="flex justify-center items-center space-x-4">
                <button class="bg-stone-400 text-white py-2 px-4 hover:bg-green-500 rounded-md">กำลังดำเนินการ</button>
                <button class="bg-stone-400 text-white py-2 px-4 hover:bg-red-500 rounded-md">ยกเลิก</button>
                <button
                  class="bg-stone-400 text-white py-2 px-4 hover:bg-amber-500 rounded-md">ทำรายการไม่สำเร็จ</button>
              </div>
            </div>

            <div class="mt-8">
              <label class="text-xl font-bold">รายการจองกับ sleepGun</label>
            </div>

            <div>
              <label>สถานะ : {{ }}</label>
            </div>

            <div class="mt-8">
              <div>
                <label class="font-bold">วันที่ : {{ }}</label>
              </div>

              <div class="mt-4">
                <div class="lg:text-base md:text-sm text-xs px-3">
                  <div
                    class="flex flex-col xl:flex-row xl:justify-between items-center border w-full  rounded-lg shadow-md p-4 bg-white">

                    <div class="xl:w-5/6 w-full bg-white p-4 rounded-md mr-2 border-r-2 border-stone-300">
                      <div>

                        <div class="flex flex-col md:flex-row justify-between items-start mb-4">
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

                        <div class="mb-4">
                          <hr class="border"/>
                        </div>

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

                        <div class="px-4">
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
                            <label class="font-bold">ค่ามัดจำ : <span class="font-normal">ค่าจุญเเจ ({{ depositKey }})
                              </span></label>
                          </div>

                        </div>
                      </div>

                      <div>
                        <hr class="my-4 " />
                      </div>

                      <div>
                        <div class="flex item-center space-x-2">
                          <label class="text-xs">ข้อมูลผู้เข้าพัก</label>
                          <img src="/imgHotel/warn.png" class="w-4 h-4 bg-stone-200 rounded-full" />
                        </div>
                        <div class="flex space-x-3">
                          <div>
                            <label class="font-bold">ชื่อผู้ทำการจอง : </label>
                            <label>{{ customerName }}</label>
                          </div>
                          <div>
                            <label class="font-bold">จำนวนคนที่เข้าพักทั้งหมด : </label>
                            <label>{{ numberOfPeople }}</label>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="xl:w-2/6 w-full mt-6 xl:mt-0 text-stone-500 ">
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

                      <div class="mt-8 flex space-x-2 items-center px-6">
                        <div class="w-full">
                          <div>
                            <button
                              class=" text-red-500 border bg-white border-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white w-full"
                              @click="openChangeRoomModal">
                              เปลี่ยนห้องพัก
                            </button>
                          </div>

                          <div class="mt-2">
                            <button
                              class="bg-green-500 text-white px-4 py-4 rounded-lg hover:bg-green-600 w-full mt-2 ">
                              <div class="flex flex-col">
                                <label class=" font-bold text-xl">Check-in</label>

                                <div>
                                  <label>วันที่ : {{ currentDate }} </label>
                                  <label> ({{ currentTime }})</label>
                                </div>
                              </div>
                            </button>
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
      </div>
    </template>
  </TemplateEmployee>

  <!-- เหตุผลในการเปลี่ยนห้องพัก-->
  <div v-if="showChangeRoomModal"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col md:text-base text-xs">
      <div class="flex  justify-between items-center p-4 border-b">
        <div class="flex items-center">
          <button @click="goBackToFirstModal" class="mr-3 text-blue-500 hover:text-blue-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h2 class="lg:text-lg text-base font-bold">เหตุผลที่ทำการเปลี่ยนห้องพัก</h2>
        </div>
        <button @click="closeChangeRoomModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div>
          <label class="font-bold">เหตุผลที่ทำการเปลี่ยนห้องพัก</label>
          <div class="mt-2">
            <textarea v-model="reasonChangeRoom" class="border rounded-md p-2 w-full"
              placeholder="เหตุผลที่ทำการเปลี่ยนห้องพัก.."></textarea>
          </div>
        </div>

        <div>
          <hr class="my-4" />
        </div>

        <div class="mt-4">
          <div>
            <button @click="goToPOS" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">ไปยัง POS
              Hotel</button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal เลือกเดือนและปี -->
  <div v-if="showMonthYearPicker" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-xs relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500" @click="closeMonthYearPicker">
        ✕
      </button>
      <h3 class="text-lg font-bold mb-4">เลือกเดือนและปี</h3>
      <div class="mb-4">
        <label class="block mb-1">ปี</label>
        <input type="number" v-model="tempYear" class="border rounded px-2 py-1 w-full" min="2000" max="2100" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">เดือน</label>
        <select v-model="tempMonth" class="border rounded px-2 py-1 w-full">
          <option v-for="(m, idx) in monthNames" :key="idx" :value="idx">{{ m }}</option>
        </select>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" @click="selectMonthYear">
        เลือก
      </button>
      <button
        class="mt-2 py-2 rounded hover:bg-gray-500 w-full text-xs underline underline-offset-2 hover:text-blue-500"
        @click="goToToday">
        กลับไปหน้าปัจจุบัน
      </button>
    </div>
  </div>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';



const router = useRouter();
function goToPOS() {
  router.push('/mainpos')
}

function goToSlip() {
  router.push('/slip')
}
function goToReceipt() {
  router.push('/receipt')
}
function goToReceiptVat() {
  router.push('/receiptvat')
}


const status = ref('SleepGun')  // เปลี่ยนเป็น 'Walkin' หรือค่าอื่นได้

const showDetails = ref(false)

const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const selectedDate = ref('')
const selectedBookings = ref([])
const showModal = ref(false)
const showMonthYearPicker = ref(false)
const tempYear = ref(currentYear.value)
const tempMonth = ref(currentMonth.value)

const currentTime = ref('')
const currentDate = ref('')
// ฟังก์ชันอัปเดตเวลา

const updateDateTime = () => {
  const now = new Date()

  // วันที่แบบไทย
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  currentDate.value = `${day}/${month}/${year}`

  // เวลา
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}
let timeInterval = null

// ข้อมูลจำลองสำหรับห้องพักที่เปิดในเว็บไซต์ sleepgunweb.com (3 รายการ)
const roomsWeb = ref([
  {
    id: 1,
    roomNumber: '101',
    typeRoom: 'Deluxe',
    price: 2500,
    status: 'Available'
  },
  {
    id: 2,
    roomNumber: '102',
    typeRoom: 'Standard',
    price: 1800,
    status: 'Available'
  },
  {
    id: 3,
    roomNumber: '103',
    typeRoom: 'Suite',
    price: 3500,
    status: 'Available'
  }
])

// ข้อมูลจำลองสำหรับห้องพักที่มีอยู่ในระบบ (5 รายการ)
const roomsSystem = ref([
  {
    id: 1,
    roomNumber: '201',
    typeRoom: 'Deluxe',
    price: 2500,
    status: 'Available'
  },
  {
    id: 2,
    roomNumber: '202',
    typeRoom: 'Standard',
    price: 1800,
    status: 'Available'
  },
  {
    id: 3,
    roomNumber: '203',
    typeRoom: 'Suite',
    price: 3500,
    status: 'Available'
  },
  {
    id: 4,
    roomNumber: '204',
    typeRoom: 'Family',
    price: 2800,
    status: 'Available'
  },
  {
    id: 5,
    roomNumber: '205',
    typeRoom: 'Economy',
    price: 1200,
    status: 'Available'
  }
])

// ตัวแปรสำหรับ modal เปลี่ยนห้องพัก
const showChangeRoomModal = ref(false)
const showChangeRoomModal2 = ref(false) // เพิ่มตัวแปรสำหรับ modal ที่ 2

// ตัวแปรสำหรับเหตุผลเปลี่ยนห้องพัก
const reasonChangeRoom = ref('')


function openChangeRoomModal() {
  showChangeRoomModal.value = true
}

function closeChangeRoomModal() {
  showChangeRoomModal.value = false
}

function goBackToFirstModal() {
  showChangeRoomModal2.value = false
  showChangeRoomModal.value = true
}


// ฟังก์ชันอัปเดตเวลาเรียลไทม์
function updateCurrentTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// ✅ ตัวอย่างข้อมูลจำลอง
const bookings = ref([
  {
    date: '2025-07-26',
    title: 'คุณสมชาย',
    customerName: 'สมชาย ใจดี',
    roomNumber: '101',
    checkIn: '14:00',
    checkOut: '12:00',
    price: 2500,
    note: '',
    status: 'booked',
  },
  {
    date: '2025-07-27',
    title: 'คุณณัฐวุฒิ',
    customerName: 'ณัฐวุฒิ แสงทอง',
    roomNumber: '201',
    checkIn: '13:00',
    checkOut: '11:30',
    price: 3100,
    note: 'ต้องการเตียงเสริม',
    status: 'checked-in',
  },
  {
    date: '2025-07-28',
    title: 'คุณสุรีย์',
    customerName: 'สุรีย์ สมหวัง',
    roomNumber: '105',
    checkIn: '15:00',
    checkOut: '12:00',
    price: 2800,
    note: '',
    status: 'booked',
  },
  {
    date: '2025-08-01',
    title: 'คุณเจน',
    customerName: 'เจนจิรา ลมดี',
    roomNumber: '303',
    checkIn: '12:00',
    checkOut: '10:00',
    price: 3300,
    note: 'มีสัตว์เลี้ยง',
    status: 'booked',
  },
  {
    date: '2025-08-02',
    title: 'คุณภัทร',
    customerName: 'ภัทร เมืองใหม่',
    roomNumber: '204',
    checkIn: '13:30',
    checkOut: '11:00',
    price: 4000,
    note: '',
    status: 'checked-out',
  }
])

const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const startDay = date.getDay()

  const days = []

  for (let i = 0; i < startDay; i++) {
    days.push({ day: '', date: '', bookings: [] })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const dayBookings = bookings.value.filter(b => b.date === dateStr)
    days.push({ day: i, date: dateStr, bookings: dayBookings })
  }

  return days
})

function selectDate(day) {
  if (!day.date) return
  selectedDate.value = day.date
  selectedBookings.value = [...day.bookings]
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}


function openMonthYearPicker() {
  tempYear.value = currentYear.value
  tempMonth.value = currentMonth.value
  showMonthYearPicker.value = true
}
function closeMonthYearPicker() {
  showMonthYearPicker.value = false
}
function selectMonthYear() {
  currentYear.value = tempYear.value
  currentMonth.value = tempMonth.value
  showMonthYearPicker.value = false
}

function goToToday() {
  const today = new Date()
  tempYear.value = today.getFullYear()
  tempMonth.value = today.getMonth()
  currentYear.value = tempYear.value
  currentMonth.value = tempMonth.value
  showMonthYearPicker.value = false
}


// ข้อมูลจำลองสำหรับรายละเอียดการ Check-in
const dateCheckInSleepGunWebStart = ref('2025-07-26')
const dateCheckInSleepGunWebEnd = ref('2025-07-28')
const roomNumber = ref('101')
const typeRoom = ref('Deluxe Room')
const maxStayPeople = ref(4)
const proofBooking = ref('Booking ID: SGW-2025-001234')
const hasUseExtraBed = ref(true)
const typeExtraBed = ref('เตียงเสริมเดี่ยว')
const priceExtraBedByDay = ref(500)
const depositKey = ref(1000)
const depositRoom = ref(2000)
const depositTotal = computed(() => depositKey.value + depositRoom.value)
const customerName = ref('คุณสมชาย ใจดี')
const numberOfPeople = ref(3)
const priceRoomOld = ref(3500)
const priceRoomNew = ref(2800)
const priceRoomTotal = computed(() => {
  let total = priceRoomNew.value + depositTotal.value
  if (hasUseExtraBed.value) {
    total += priceExtraBedByDay.value
  }
  return total
})


onMounted(() => {
  updateDateTime() // อัปเดตวันเวลา ครั้งแรก
  timeInterval = setInterval(updateDateTime, 1000) // อัปเดตทุกวินาที
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

</script>