<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="flex">
          <div class="hidden lg:block">
            <BarProfileMember />
          </div>

          <div class="md:pl-6 px-6 mt-12 w-full">
            <label class="text-lg font-semibold"
              >เซอร์วิสเแม่บ้าน / ห้องพักปัจุบัน</label
            >

            <div class="mt-12">
              <div class="border p-6 rounded-lg shadow">
                <div
                  class="text-sm font-bold flex justify-between items-center"
                >
                  <label>หมายเลขห้องพัก {{}}</label>
                  <button
                    class="border p-2 rounded-lg shadow-md bg-blue-500 text-white hover:bg-blue-600"
                    @click="callMaid"
                  >
                    เรียกเเม่บ้าน
                  </button>
                </div>
                <div class="py-3">
                  <hr class="border" />
                </div>

                <div
                  class="flex flex-col justify-end items-end text-xs text-stone-400"
                >
                  <label
                    >SleepGunID:
                    <span class="font-bold">{{}} SP-202508-00023</span></label
                  >
                  <label
                    >Check-inID:
                    <span class="font-bold">{{}} CI-202508-00239</span></label
                  >
                </div>

                <div class="flex justify-between items-start">
                  <div class="pr-5">
                    <img
                      src="/imgHotel/Ask.png"
                      alt="รูปห้องพัก"
                      class="w-[220px] h-[160px] object-cover rounded-lg shadow-md"
                    />
                  </div>

                  <div class="w-full flex flex-col justify-between items-start">
                    <div class="flex flex-row w-full">
                      <div class="w-3/5 flex flex-col text-sm mt-5">
                        <label
                          >เลขห้อง<span class="px-2 font-bold"
                            >{{}}A309</span
                          ></label
                        >

                        <label
                          >เข้าพักจำนวน<span class="px-2 font-bold"
                            >{{}}2 คน
                          </span></label
                        >

                        <label>
                          ชื่อโรงเเรม<span class="px-2 font-bold"
                            >{{}}Hotel Sleep Gun</span
                          >
                        </label>

                        <label>
                          วันเวลาที่ check-in
                          <span class="px-2 font-bold"
                            >{{}}12/12/2023 14:00</span
                          >
                        </label>

                        <label>
                          เข้าพักระหว่างวันที่
                          <span class="px-2 font-bold"
                            >{{}}12/12/2023 - 15/12/2023</span
                          >
                        </label>
                      </div>

                      <div class="w-2/5 flex flex-col text-sm mt-5">
                        <label class="font-bold">ค่าบริการเสริม</label>
                        <div class="pl-3">
                          <div class="flex justify-between">
                            <label>ค่าเตียงเสริม</label>
                            <label class="font-bold">{{}}200 บาท</label>
                          </div>
                          <div class="flex justify-between">
                            <label>ค่ามัดจำ</label>
                            <label class="font-bold">{{}}100 บาท</label>
                          </div>
                          <div class="flex justify-between">
                            <label>ค่าเข้าพักก่อนเวลา</label>
                            <label class="font-bold">{{}}50 บาท</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="border-t w-full mt-3 pt-3 text-sm">
                      <label
                        >ชื่อผู้จอง
                        <span class="font-bold pl-1 pr-3"
                          >{{}} ok,lgsjgpo koa</span
                        ></label
                      >

                      <label
                        >เบอร์โทร
                        <span class="font-bold pl-1 pr-3"
                          >{{}} 09889987387</span
                        ></label
                      >

                      <label
                        >ยืนยันตัวตนโดย
                        <span class="font-bold pl-1 pr-3"
                          >{{}} บัตรประชาชน/ พาสปอร์ท</span
                        ></label
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- เงื่อนไขแสดงบริการแม่บ้าน -->
              <div
                v-if="showServiceSection"
                class="border p-4 rounded-b-lg shadow mx-3"
              >
                <label class="font-bold text-stone-400"
                  >บริการเเม่บ้าน/ทำความทสะอาด</label
                >
                <div class="mt-12 flex justify-center items-stretch space-x-4">
                  <button
                    class="border px-4 py-2 rounded-lg
      font-bold
      border-blue-400
      hover:bg-blue-100
      text-blue-400
      transition
      "
                    :class=" [
      cleaningMode === 'now' ? 'bg-blue-500 text-white shadow' : '',
      isStepLocked ? 'opacity-60 cursor-not-allowed' : ''
    ]"
                    @click="cleaningMode = 'now'"
                    :disabled="isStepLocked"
                  >
                    <div class="flex flex-col">
                      <label class="font-bold">ทำความสะอาดตอนนี้</label>
                      <label class="text-xs text-amber-400">ใช้เวลาอย่างน้อย 30 นาที</label>
                    </div>
                  </button>
                  <button
                    class="border px-4 py-2 rounded-lg
      font-bold
      border-blue-400
      hover:bg-blue-200
      text-blue-400
      transition
      "
                    :class=" [
      cleaningMode === 'schedule' ? 'bg-blue-500 text-white shadow' : '',
      isStepLocked ? 'opacity-60 cursor-not-allowed' : ''
    ]"
                    @click="cleaningMode = 'schedule'"
                    :disabled="isStepLocked"
                  >
                    ตั้งเวลาทำความสะอาด
                  </button>
                </div>

                <div class="mt-6 border px-4 py-4 rounded-lg">
                  <label class="text-sm font-bold">สถานะการเรียกเเม่บ้าน</label>
                  <div class="bg-stone-100 rounded-lg mt-10 p-4">
                    <!-- แสดงตามโหมดที่เลือก -->
                    <div v-if="cleaningMode === 'now'">
                      <!-- TODO: เเสดงข้อมูลตามสเต็ป เมื่อกด ทำความสะอาดตอนนี้ -->
                      <!-- ...ขั้นตอนทำความสะอาดตอนนี้... -->
                      <!-- (คัดลอกส่วนเดิมที่อยู่ใน TODO: เเสดงข้อมูลตามสเต็ป เมื่อกด ทำความสะอาดตอนนี้) -->

                      <div
                        v-if="maidNowStep === 0"
                        class="flex justify-center items-center"
                      >
                        <button
                          class="px-6 py-4 rounded-lg text-white bg-green-500 font-bold hover:bg-green-600"
                          @click="handleCallMaidNow"
                          :disabled="isStepLocked"
                        >
                          เรียกเเม่บ้าน
                        </button>
                      </div>
                      <!-- ขั้นตอนที่ 1-4 ตามที่คุณมีอยู่ -->
                      <!-- 1 กำลังเรียกเเม่บ้าน(Assign เแจ้งเตือนไปยังเเม่บ้าน) -->
                      <div v-else>
                        <div class="mt-10 flex justify-center items-center">
                          <div
                            class="flex flex-col items-center bg-yellow-200/80 px-6 py-4 rounded-full"
                          >
                            <label class="text-sm pb-3">ขั้นตอนที่ 1</label>
                            <label class="text-xl font-bold"
                              >กำลังเรียกเเม่บ้าน . . .</label
                            >
                            <label class="text-yellow-600"
                              >กำลังรอเเม่บ้านตอบรับ</label
                            >
                          </div>
                        </div>

                        <!-- 2 เเม่บ้านกำลังเดินทางมาทำความสะอาด(Assign เแม่บ้านกดตอบรับ) -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-blue-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 2</label>
                              <label class="text-xl font-bold"
                                >เเม่บ้านกำลังเดินทาง</label
                              >
                              <label class="text-blue-600"
                                >กรุณารอเแม่บ้านมาถึง</label
                              >
                            </div>
                            <div
                              class="mt-6 flex flex-col justify-center items-center"
                            >
                              <img
                                src="/imgHotel/employee.jpg"
                                alt="รูปเเม่บ้าน"
                                class="w-[120px] h-[120px] object-cover rounded-lg shadow-md"
                              />
                              <div
                                class="mt-4 flex flex-col text-sm text-center"
                              >
                                <label>
                                  เเม่บ้าน:
                                  <span class="font-bold"
                                    >{{}} สมหญิง ipkk</span
                                  >
                                </label>
                                <label>
                                  ตำเเหน่ง:
                                  <span class="font-bold">{{}} เแม่บ้าน</span>
                                </label>
                                <label>
                                  เบอร์โทร:
                                  <span class="font-bold">{{}} 9879362357</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- 3 เเม่บ้านมาถึงเเล้ว กำลังทำความสะอาด(เแม่บ้านกด เริ่มต้นทำความสะอาด) -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-rose-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 3</label>
                              <label class="text-xl font-bold"
                                >เเม่บ้านมาถึงเเล้ว กำลังทำความสะอาด</label
                              >
                              <label class="text-rose-600"
                                >กรุณารอเแมบ้านทำความสะอาด</label
                              >
                            </div>
                          </div>
                        </div>

                        <!-- 4.เเม่บ้านทำความสะอาดเสร็จสิ้น (เแม่บ้านกด
                  เสร็จสิ้นการทำความสะอาด) -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-green-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 4</label>
                              <label class="text-xl font-bold"
                                >เเม่บ้านทำความสะอาดเสร็จสิ้น</label
                              >
                              <label class="text-sm"
                                >เวลาเริ่มงาน
                                {{}} - เวลาทำความสะอาดเสร็จ {{
                                }}</label
                              >
                              <label class="text-green-600"
                                >ขอบคุณที่ใช้บริการค่ะ</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--TODO: เเสดงข้อมูลตามสเต็ป เมื่อกด ตั้งเวลาทำความสะอาด -->
                    <div v-else-if="cleaningMode === 'schedule'">
                      <!-- ถ้ายังไม่ได้บันทึกเวลา -->
                      <div v-if="!savedTime">
                        <!-- 1 ตั้งเวลาให้เแม่บ้านมาทำความสะอาด -->
                        <div class="flex justify-center items-center">
                          <div class="p-6 max-w-md mx-auto space-y-6">
                            <h2 class="text-xl font-bold text-gray-700">
                              ตั้งเวลาแม่บ้านทำความสะอาด
                            </h2>
                            <div
                              class="p-4 border rounded-lg bg-white shadow-sm"
                            >
                              <label
                                class="block font-semibold text-gray-600 mb-2"
                              >
                                เลือกเวลาแม่บ้านเข้ามาทำความสะอาด
                              </label>
                              <select
                                v-model="cleaningTime"
                                class="border rounded px-3 py-2 w-full"
                              >
                                <option disabled value="">
                                  -- เลือกเวลา --
                                </option>
                                <option
                                  v-for="time in timeSlots"
                                  :key="time"
                                  :value="time"
                                >
                                  {{ time }}
                                </option>
                              </select>
                            </div>
                            <div class="flex justify-end">
                              <button
                                @click="saveCleaningTime"
                                class="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
                                :disabled="!cleaningTime || isStepLocked"
                              >
                                บันทึกเวลา
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- ถ้าบันทึกเวลาแล้ว -->
                      <div v-else>
                        <!-- แสดงเวลาที่ตั้งไว้ -->
                        <div
                          class="p-4 border rounded-lg bg-gray-50 text-gray-700"
                        >
                          <h3 class="font-semibold mb-2">
                            📋 เวลาทำความสะอาดที่ตั้งไว้เวลา
                            <span>{{ savedTime }}</span>
                          </h3>
                        </div>
                        <!-- ขั้นตอนที่ 2-5 -->
                        <!-- 2 กำลังเรียกเแม่บ้าน -->
                        <div class="mt-10 flex justify-center items-center">
                          <div
                            class="flex flex-col items-center bg-yellow-200/80 px-6 py-4 rounded-full"
                          >
                            <label class="text-sm pb-3">ขั้นตอนที่ 2</label>
                            <label class="text-xl font-bold"
                              >กำลังเรียกเแม่บ้าน . . .</label
                            >
                            <label class="text-yellow-600"
                              >กำลังรอเแม่บ้านตอบรับ</label
                            >
                          </div>
                        </div>
                        <!-- 3 เแม่บ้านกำลังเดินทาง -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-blue-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 3</label>
                              <label class="text-xl font-bold"
                                >เแม่บ้านกำลังเดินทาง</label
                              >
                              <label class="text-blue-600"
                                >กรุณารอเแม่บ้านมาถึง</label
                              >
                            </div>
                            <div
                              class="mt-6 flex flex-col justify-center items-center"
                            >
                              <img
                                src="/imgHotel/employee.jpg"
                                alt="รูปเแม่บ้าน"
                                class="w-[120px] h-[120px] object-cover rounded-lg shadow-md"
                              />
                              <div
                                class="mt-4 flex flex-col text-sm text-center"
                              >
                                <label>
                                  เเม่บ้าน:
                                  <span class="font-bold"
                                    >{{}} สมหญิง ipkk</span
                                  >
                                </label>
                                <label>
                                  ตำเเหน่ง:
                                  <span class="font-bold">{{}} เแม่บ้าน</span>
                                </label>
                                <label>
                                  เบอร์โทร:
                                  <span class="font-bold">{{}} 9879362357</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- 4 เเม่บ้านมาถึงเเล้ว กำลังทำความสะอาด -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-rose-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 4</label>
                              <label class="text-xl font-bold"
                                >เแม่บ้านมาถึงเเล้ว กำลังทำความสะอาด</label
                              >
                              <label class="text-rose-600"
                                >กรุณารอเแม่บ้านทำความสะอาด</label
                              >
                            </div>
                          </div>
                        </div>
                        <!-- 5 เแม่บ้านทำความสะอาดเสร็จสิ้น -->
                        <div>
                          <div
                            class="mt-10 flex flex-col justify-center items-center"
                          >
                            <div
                              class="flex flex-col items-center bg-green-200/80 px-6 py-4 rounded-full"
                            >
                              <label class="text-sm pb-3">ขั้นตอนที่ 5</label>
                              <label class="text-xl font-bold"
                                >เแม่บ้านทำความสะอาดเสร็จสิ้น</label
                              >
                              <label class="text-sm"
                                >เวลาเริ่มงาน
                                {{}} - เวลาทำความสะอาดเสร็จ {{}}</label
                              >
                              <label class="text-green-600"
                                >ขอบคุณที่ใช้บริการค่ะ</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="text-center text-stone-400">
                        กรุณาเลือกบริการทำความสะอาด
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-end items-center">
                    <button
                      class="border border-red-400 text-red-400 px-4 py-2 rounded-lg hover:bg-red-400 hover:text-white"
                      @click="openCancelPopup"
                      :disabled="!isStepLocked"
                    >
                      ยกเลิกบริการทำความสะอาด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <!-- ...existing code... -->
    <div
      v-if="showCancelPopup"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-[350px]">
        <h2 class="font-bold text-lg mb-4">เหตุผลที่ยกเลิกบริการ</h2>
        <textarea
          v-model="cancelReason"
          rows="4"
          class="w-full border rounded px-3 py-2 mb-4"
          placeholder="กรุณาเขียนเหตุผลที่ต้องการยกเลิกบริการ"
        ></textarea>
        <div class="flex justify-end space-x-2">
          <button
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            @click="closeCancelPopup"
          >
            ยกเลิก
          </button>
          <button
            class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            :disabled="!cancelReason"
            @click="confirmCancel"
          >
            ยืนยันการยกเลิก
          </button>
        </div>
      </div>
    </div>
    <!-- ...existing code... -->
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/Footer.vue";
import BarProfileMember from "@components/BarProfileMember.vue";
import { useRouter } from "vue-router";
import FloatInput from "@/components/element/FloatInput.vue";
const router = useRouter();

const showCancelPopup = ref(false);
const cancelReason = ref("");
import { ref } from "vue";

const maidNowStep = ref(0);
const cleaningTime = ref("");
const savedTime = ref("");
const cleaningMode = ref(""); // now | schedule | ""
const showServiceSection = ref(false);

const isStepLocked = ref(false); // <--- เพิ่มตัวแปรนี้

const openCancelPopup = () => {
  showCancelPopup.value = true;
};

const closeCancelPopup = () => {
  showCancelPopup.value = false;
  cancelReason.value = "";
};

const confirmCancel = () => {
  closeCancelPopup();
  showServiceSection.value = false;
  cleaningMode.value = "";
  maidNowStep.value = 0;
  savedTime.value = "";
  cleaningTime.value = "";
  isStepLocked.value = false; // <--- ปลดล็อกปุ่ม
};

// สร้างช่วงเวลาเฉพาะ 09:00-12:00 และ 13:00-17:00
const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += 30) {
      if (hour === endHour && min > 0) continue;
      const h = hour.toString().padStart(2, "0");
      const m = min.toString().padStart(2, "0");
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
};

const timeSlots = [...generateTimeSlots(9, 11), ...generateTimeSlots(13, 16)];

const saveCleaningTime = () => {
  savedTime.value = cleaningTime.value;
  cleaningTime.value = "";
  cleaningMode.value = "schedule";
  isStepLocked.value = true; // <--- ล็อกปุ่ม
};

const callMaid = () => {
  showServiceSection.value = true;
  cleaningMode.value = "";
  maidNowStep.value = 0;
  savedTime.value = "";
  isStepLocked.value = false;
};

const handleCallMaidNow = () => {
  maidNowStep.value = 1;
  isStepLocked.value = true; // <--- ล็อกปุ่ม
};
</script>
