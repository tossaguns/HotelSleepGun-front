<template>
  <div>
    <div class="bg-stone-100 md:px-12 md:py-12 min-h-screen">

      <div class="flex flex-col bg-white space-y-4 p-4 rounded-xl shadow-md max-w-xl mx-auto md:text-base text-xs">
        <div class="flex justify-end items-end my-6 space-y-2">
          <div class="flex items-center space-x-2">
            <!-- ธงชาติแสดงตามภาษาที่เลือก -->
            <img :src="flagMap[language]" :alt="language.toUpperCase()" class="w-12 h-12" />

            <!-- เลือกภาษา -->
            <select v-model="language" class="border rounded px-3 py-2 font-bold">
              <option value="th">TH</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>

        <div class="flex justify-center mb-4">
          <label class="text-xl font-bold">กรอกข้อมูลเข้าพัก</label>
        </div>

        <div class="border rounded-lg px-4 py-6 space-y-2">
          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>ชื่อ<span class="px-1 text-red-600">*</span></label>
            </div>
            <div class="w-3/4">
              <input type="text" v-model="firstnameCustomer" class="border rounded-md px-3 py-2"
                placeholder="กรอกชื่อผู้เข้าพัก" />
            </div>
          </div>

          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>นามสกุล <span class="px-1 text-red-600">*</span></label>
            </div>
            <div class="w-3/4">
              <input type="text" v-model="lastnameCustomer" class="border rounded-md px-3 py-2"
                placeholder="กรอกนามสกุลผู้เข้าพัก" />
            </div>
          </div>

          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>เพศ</label>
            </div>
            <div class="w-3/4">
              <select v-model="genderCustomer" class="border rounded-md p-1">
                <option disabled value="">เลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>โทร <span class="px-1 text-red-600">*</span></label>
            </div>
            <div class="w-3/4">
              <input type="text" v-model="phoneCustomer" class="border rounded-md px-3 py-2" placeholder="084XXXXXXX" />
            </div>
          </div>


          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>วันเกิด</label>
            </div>
            <div class="w-3/4">
              <input type="date" v-model="birthDateCustomer" class="border rounded-md px-3 py-2" />
            </div>
          </div>

          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>อายุ</label>
            </div>
            <div class="w-3/4">
              <input type="number" v-model="ageCustomer" class="border rounded-md px-3 py-2" placeholder="กรอกอายุ" />
            </div>
          </div>

          <div class="flex justify-between space-x-2 items-center">
            <div class="w-1/4">
              <label>email (ถ้ามี)</label>
            </div>
            <div class="w-3/4">
              <input type="email" v-model="emailCustomer" class="border rounded-md p-3 py-2" placeholder="axxxxxx@gmail.com" />
            </div>
          </div>

          <div class="flex space-x-2 items-center py-4">
            <label>จำนวนคนเข้าพัก<span class="px-1 text-red-600">*</span></label>
            <div class="flex items-center space-x-1">
              <button @click="decreaseCustomerGuests"
                class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">-</button>
              <input type="number" v-model="numberCustomerStay" class="border rounded-md p-1 w-20 text-center"
                placeholder="1" min="1" />
              <button @click="increaseCustomerGuests"
                class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
            </div>
          </div>

          <div class="my-3">
            <hr class="border" />
          </div>

          <div class="space-y-4 pt-6">
            <div>
              <label class="font-semibold">ประเภทเอกสารยืนยันตัวตน<span class="px-1 text-red-600">*</span></label>
            </div>
            <div class="space-x-4">
              <label>
                <input type="radio" value="idcard" v-model="selectedType" @change="clearDocumentData" />
                ใช้บัตรประชาชน
              </label>

              <label>
                <input type="radio" value="visa" v-model="selectedType" @change="clearDocumentData" />
                ใช้พาสปอร์ต
              </label>
            </div>

            <div v-if="selectedType === 'idcard'" class="space-y-2 bg-blue-50 p-3 rounded-md border border-blue-300">
              <div class="flex flex-col space-y-2">
                <label>เลขบัตรประชาชน</label>
                <input type="text" v-model="idenNumberCustomer" @blur="validateIdenNumber(idenNumberCustomer)"
                  class="border rounded-md p-1" placeholder="กรอกเลขบัตรประชาชน" maxlength="13" />
              </div>

              <div
                class="relative w-40 h-28 border-2 border-dashed border-blue-400 rounded flex items-center justify-center mt-2 cursor-pointer overflow-hidden">
                <input type="file" accept="image/*" class="absolute w-full h-full opacity-0 cursor-pointer"
                  @change="handleIdenImgUpload" />

                <img v-if="idenImgCustomer" :src="idenImgCustomer" alt="บัตรประชาชน"
                  class="absolute inset-0 w-full h-full object-cover" />

                <button v-if="idenImgCustomer" @click="idenImgCustomer = null"
                  class="absolute top-1 right-1 bg-white rounded-full text-red-500 hover:text-white hover:bg-red-500 w-6 h-6 flex items-center justify-center text-xs shadow">
                  ✕
                </button>
                <span v-if="!idenImgCustomer" class="text-blue-400 font-medium">เลือกรูป</span>
              </div>
            </div>

            <div v-if="selectedType === 'visa'" class="space-y-2 bg-amber-50 p-3 rounded-md border border-amber-300">
              <div class="flex flex-col space-y-2">
                <label>เลขพาสปอร์ต</label>
                <input type="text" v-model="passportNumberCustomer"
                  @blur="validatePassportNumber(passportNumberCustomer)" class="border rounded-md p-1"
                  placeholder="กรอกเลขพาสปอร์ต" />
              </div>

              <div
                class="relative w-40 h-28 border-2 border-dashed border-amber-400 rounded flex items-center justify-center mt-2 cursor-pointer overflow-hidden">
                <input type="file" accept="image/*" class="absolute w-full h-full opacity-0 cursor-pointer"
                  @change="handlePassportImgUpload" />

                <img v-if="passportImgCustomer" :src="passportImgCustomer" alt="พาสปอร์ต"
                  class="absolute inset-0 w-full h-full object-cover" />

                <button v-if="passportImgCustomer" @click="passportImgCustomer = null"
                  class="absolute top-1 right-1 bg-white rounded-full text-red-500 hover:text-white hover:bg-red-500 w-6 h-6 flex items-center justify-center text-xs shadow">
                  ✕
                </button>
                <span v-if="!passportImgCustomer" class="text-amber-400 font-medium">เลือกรูป</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center pb-12 pt-6">
          <button
            class="border bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-4 py-2">ส่งข้อมูล</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const language = ref('th') // default ภาษาไทย

// แผนที่ภาษา -> รูปธง
const flagMap = {
  th: '/imgHotel/TH.png',
  en: '/imgHotel/EN.png'
}

//=========เลือก บัตร ปปช /วีซ่า ===============
// เลือกประเภทเอกสาร
const selectedType = ref('idcard')

// บัตรประชาชน
const idenNumberCustomer = ref('')
const idenImgCustomer = ref(null)

function handleIdenImgUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      idenImgCustomer.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// พาสปอร์ต
const passportNumberCustomer = ref('')
const passportImgCustomer = ref(null)

function handlePassportImgUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      passportImgCustomer.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function validateIdenNumber(val) {
  console.log("ตรวจเลขบัตร:", val)
}
function validatePassportNumber(val) {
  console.log("ตรวจพาสปอร์ต:", val)
}

// เพิ่มตัวแปรวันเกิดและอายุ
const birthDateCustomer = ref('');
const ageCustomer = ref('');

// คำนวณอายุเมื่อเลือกวันเกิด
watch(birthDateCustomer, (newVal) => {
  if (newVal) {
    const today = new Date();
    const birthDate = new Date(newVal);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    ageCustomer.value = age;
  } else {
    ageCustomer.value = '';
  }
});

const numberCustomerStay = ref(1);

function increaseCustomerGuests() {
  numberCustomerStay.value++;
}

function decreaseCustomerGuests() {
  if (numberCustomerStay.value > 1) {
    numberCustomerStay.value--;
  }
}

</script>




<style scoped>
.flag-icon {
  width: 1.5em;
  height: 1em;
}
</style>