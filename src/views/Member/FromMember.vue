<template>
  <div>
    <div class="flex flex-col space-y-3 bg-stone-100 p-4 rounded-md">
      <label class="text-lg font-bold">ข้อมูลผู้เข้าพัก</label>

      <div class="flex space-x-2 items-center">
        <label>ชื่อผู้เข้าพัก</label>
        <input type="text" v-model="firstnameCustomer" class="border rounded-md p-1" placeholder="กรอกชื่อผู้เข้าพัก" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>นามสกุลผู้เข้าพัก</label>
        <input type="text" v-model="lastnameCustomer" class="border rounded-md p-1"
          placeholder="กรอกนามสกุลผู้เข้าพัก" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>เพศ</label>
        <select v-model="genderCustomer" class="border rounded-md p-1">
          <option disabled value="">เลือกเพศ</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
        </select>
      </div>

      <div class="flex space-x-2 items-center">
        <label>เบอร์โทรศัพท์</label>
        <input type="text" v-model="phoneCustomer" class="border rounded-md p-1" placeholder="กรอกเบอร์โทรศัพท์" />
      </div>

      <div class="space-y-4">
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


        <div v-if="selectedType === 'idcard'" class="space-y-2  bg-blue-50 p-3 rounded-md border border-blue-300">
          <label>เลขบัตรประชาชน</label>
          <input type="text" v-model="idenNumberCustomer" @blur="validateIdenNumber(idenNumberCustomer)"
            class="border rounded-md p-1" placeholder="กรอกเลขบัตรประชาชน" maxlength="13" />
          <input type="file" @change="handleIdenImgUpload" class="mt-2" />
          <!-- แสดงรูปภาพที่อัปโหลดแล้ว -->
          <div v-if="idenImgCustomer" class="mt-2">
            <label class="text-sm font-medium text-blue-700">รูปบัตรประชาชน:</label>
            <img :src="idenImgCustomer" alt="บัตรประชาชน" class="w-32 h-20 object-cover rounded border mt-1" />
          </div>
        </div>
        <div v-if="selectedType === 'visa'" class="space-y-2  bg-amber-50 p-3 rounded-md border border-amber-300">
          <label>เลขพาสปอร์ต</label>
          <input type="text" v-model="passportNumberCustomer" @blur="validatePassportNumber(passportNumberCustomer)"
            class="border rounded-md p-1" placeholder="กรอกเลขพาสปอร์ต" />
          <input type="file" @change="handlePassportImgUpload" class="mt-2" />
          <!-- แสดงรูปภาพที่อัปโหลดแล้ว -->
          <div v-if="passportImgCustomer" class="mt-2">
            <label class="text-sm font-medium text-amber-700">รูปพาสปอร์ต:</label>
            <img :src="passportImgCustomer" alt="พาสปอร์ต" class="w-32 h-20 object-cover rounded border mt-1" />
          </div>
        </div>
      </div>

      <div class="flex space-x-2 items-center">
        <label>วันเกิด</label>
        <input type="date" v-model="birthDateCustomer" class="border rounded-md p-1" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>อายุ</label>
        <input type="number" v-model="ageCustomer" class="border rounded-md p-1" placeholder="กรอกอายุ" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>email (ถ้ามี)</label>
        <input type="email" v-model="emailCustomer" class="border rounded-md p-1" placeholder="กรอกอีเมล" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>จำนวนคนเข้าพัก</label>
        <div class="flex items-center space-x-1">
          <button @click="decreaseCustomerGuests"
            class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">-</button>
          <input type="number" v-model="numberCustomerStay" class="border rounded-md p-1 w-20 text-center"
            placeholder="1" min="1" />
          <button @click="increaseCustomerGuests"
            class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
        </div>

      </div>
    </div>
</template>