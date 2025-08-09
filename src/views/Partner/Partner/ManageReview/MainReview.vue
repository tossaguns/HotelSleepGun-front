<template>
  <TemplatePartner>
    <template #header>
      <label>รีวิวที่พัก</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex flex-col xl:flex-row justify-between item-start">
          <div class="xl:w-2/5">
            <div class="border mt-8 mx-4 rounded-lg shadow-md py-6 px-4">
              <div class="flex justify-end items-end mb-4">
                <button class="bg-red-500 text-white font-bold px-4 py-1 rounded-md">เเสดงความเห็นทั้งหมด</button>
              </div>

              <label>เลือกห้องที่เปิดใน sleepGun
                เพื่อดูรีวิวเเต่ละห้อง(เเสดงทั้งห้องที่เคยเปิดเเล้วเเละห้องปัจจุบัน)</label>

              <div class="mt-6">
                <button class="w-full hover:bg-amber-100 border rounded-md">
                  <div class="p-3 flex justify-between items-center">
                    <div class="2xl:w-1/2 w-1/3 flex justify-center items-center">
                      <img src="/imgHotel/sea.jpg" alt="รูปห้อง" class="w-[250px] h-[120px] object-cover rounded-md" />
                    </div>

                    <div class="2xl:w-1/2 w-2/3 px-4">
                      <div class="font-bold mb-4 flex flex-col">
                        <label>เลขห้อง : {{ }}</label>
                        <label> เข้าพักล่าสุด : วันที่ {{ }}</label>
                      </div>
                      <div class="flex flex-col">
                        <label>ค่าเฉลี่ยรีวิว : {{ }}</label>
                        <label>จำนวนรีวิว : {{ }}</label>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="xl:w-3/5 mt-6 xl:mt-0">
            <Review :reviews="reviewsForHotel" />
          </div>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import Review from "@components/Review.vue";
import axios from 'axios'

// ข้อมูลตัวอย่าง 10 รายการ
const reviewsForHotel = [
  {
    name: "สมชาย",
    rating: 5,
    roomType: "ห้องสวีท",
    dateStay: 2,
    monthStay: "มกราคม",
    yearStay: 2024,
    detail: "ห้องพักสะอาดมาก บริการดีเยี่ยม ประทับใจสุดๆ",
    dateReview: "10/01/2024"
  },
  {
    name: "อรทัย",
    rating: 4,
    roomType: "ห้องวิวทะเล",
    dateStay: 1,
    monthStay: "กุมภาพันธ์",
    yearStay: 2024,
    detail: "วิวสวย อาหารเช้าอร่อย แต่ที่จอดรถน้อยไปหน่อย",
    dateReview: "15/02/2024"
  },
  {
    name: "ปกรณ์",
    rating: 3,
    roomType: "ห้องธรรมดา",
    dateStay: 3,
    monthStay: "มีนาคม",
    yearStay: 2024,
    detail: "ห้องโอเคตามราคา แต่แอร์เสียงดังไปนิด",
    dateReview: "20/03/2024"
  },
  {
    name: "ศิริพร",
    rating: 5,
    roomType: "ห้องแฟมิลี่",
    dateStay: 2,
    monthStay: "เมษายน",
    yearStay: 2024,
    detail: "เหมาะกับครอบครัวมาก เด็กๆชอบสระว่ายน้ำ",
    dateReview: "05/04/2024"
  },
  {
    name: "ณัฐวุฒิ",
    rating: 4,
    roomType: "ห้องโรแมนติก",
    dateStay: 1,
    monthStay: "พฤษภาคม",
    yearStay: 2024,
    detail: "บรรยากาศดี เหมาะกับคู่รัก",
    dateReview: "12/05/2024"
  },
  {
    name: "จิราภรณ์",
    rating: 2,
    roomType: "ห้องธรรมดา",
    dateStay: 1,
    monthStay: "มิถุนายน",
    yearStay: 2024,
    detail: "ห้องเล็กไปหน่อย และเสียงดังจากข้างนอก",
    dateReview: "18/06/2024"
  },
  {
    name: "วีระชัย",
    rating: 5,
    roomType: "ห้องสวีท",
    dateStay: 2,
    monthStay: "กรกฎาคม",
    yearStay: 2024,
    detail: "หรูหราสมราคา อาหารเช้าหลากหลาย",
    dateReview: "25/07/2024"
  },
  {
    name: "สุภาวดี",
    rating: 4,
    roomType: "ห้องวิวทะเล",
    dateStay: 2,
    monthStay: "สิงหาคม",
    yearStay: 2024,
    detail: "วิวทะเลสวยมาก พนักงานบริการดี",
    dateReview: "02/08/2024"
  },
  {
    name: "กิตติ",
    rating: 3,
    roomType: "ห้องแฟมิลี่",
    dateStay: 3,
    monthStay: "กันยายน",
    yearStay: 2024,
    detail: "ห้องกว้างขวาง แต่ Wi-Fi ช้า",
    dateReview: "10/09/2024"
  },
  {
    name: "พิมพ์ใจ",
    rating: 5,
    roomType: "ห้องโรแมนติก",
    dateStay: 1,
    monthStay: "ตุลาคม",
    yearStay: 2024,
    detail: "ประทับใจมาก จะกลับมาอีกแน่นอน",
    dateReview: "20/10/2024"
  }
];
</script>
