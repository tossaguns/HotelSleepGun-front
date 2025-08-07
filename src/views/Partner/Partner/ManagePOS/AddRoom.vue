<template>

  <div class=" max-w-[3000px] mx-auto">
    <div class="flex justify-center md:justify-start py-4 md:py-0">
      <label class="text-3xl font-semibold">{{ props.isEditMode ? 'แก้ไขห้อง' : t('AddRoom') }}</label>
    </div>

    <div class="flex flex-col justify-center items-start mt-8">
      <div class=" flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">

        <div class="flex flex-col 2xl:justify-between w-full">
          <label class="text-xl font-semibold pb-2">{{ t('DetailRoom') }}</label>

          <div class="flex flex-col 2xl:flex-row justify-between 2xl:space-x-4 w-full">

            <div class="2xl:w-1/2 w-full space-y-4">
              <div :ref="el => (inputRefs.NumberRoom = el)">
                <FloatInput v-model="NumberRoom" id="NumberRoom" :label="t('RoomNumber')"
                  :class="highlightField === 'NumberRoom' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.NumberRoom" class="text-red-500 text-xs pl-2">{{ errors.NumberRoom }}</p>
              </div>

              <div :ref="el => (inputRefs.selectedTypeRoom = el)">
                <Dropdown v-model="selectedTypeRoom" :options="TypeRoom[0]?.items || []" id="selectedTypeRoom"
                  placeholder="เลือกประเภทห้อง"
                  :class="highlightField === 'selectedTypeRoom' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.selectedTypeRoom" class="text-red-500 text-xs pl-2">{{ errors.selectedTypeRoom }}
                </p>
              </div>

              <div :ref="el => (inputRefs.selectedTypeAir = el)">
                <Dropdown v-model="selectedTypeAir" :options="TypeAir[0]?.items || []" id="selectedTypeAir"
                  placeholder="เลือกประเภทพัดลม/เเอร์"
                  :class="highlightField === 'selectedTypeAir' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.selectedTypeAir" class="text-red-500 text-xs pl-2">{{ errors.selectedTypeAir }}
                </p>
              </div>


              <div :ref="el => (inputRefs.Price = el)">
                <InputNumber v-model="Price" id="Price" :label="t('Price_Label')"
                  :class="highlightField === 'Price' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.Price" class="text-red-500 text-xs pl-2">{{ errors.Price }}</p>
              </div>

              <!-- FIXME: เพิ่มค่าบริการต่อห้อง Service Charge และ Vat  ให้กด checkbox ถ้ากดจะคิดราคาห้องรวมค่าบริการต่อห้อง Service Charge และ Vat โดยรวมกับราคาห้องที่กรอกเลยเช่น กรอกราคาห้อง 1000 บาท จะดึงข้อมูล Service Charge และ Vat มาจาก aboutHotel.schema เเละหากService Charge 10% เเละ  vat 10% ให้ Service Charge 10% + vat 10% + ราคาห้อง base = 1000 บาท คือราคาห้องที่กรอก-->
              <div>
                <div class="space-y-2">
                  <div class="space-x-2">
                    <input type="checkbox" v-model="isServiceCharge" />
                    <label class="text-sm">คิดราคาห้องรวมค่าบริการต่อห้อง Service Charge {{ serviceCharge }}%</label>
                  </div>
                  <div class="space-x-2">
                    <input type="checkbox" v-model="isVat" />
                    <label class="text-sm">คิดราคาห้องรวมค่าภาษีมูลค่าเพิ่ม VAT {{ vat }}%</label>
                  </div>

                  <!-- แสดงข้อมูลเมื่อยังไม่ได้เลือก checkbox -->
                  <div v-if="!isServiceCharge && !isVat && Price > 0"
                    class="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    <p class="text-sm text-gray-600">
                      <strong>ข้อมูล Service Charge และ VAT:</strong><br>
                      Service Charge: {{ serviceCharge }}%<br>
                      VAT: {{ vat }}%<br>
                      <span class="text-xs text-gray-500">เลือก checkbox ด้านบนเพื่อคำนวณราคา base โดยหัก SC & VAT
                        ออกจากราคาที่กรอก</span>
                    </p>
                  </div>
                </div>

                <div v-if="isServiceCharge || isVat" class="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <h4 class="font-semibold text-blue-900 mb-2">การคำนวณราคา:</h4>
                  <div class="space-y-1 text-sm text-blue-800">
                    <div class="flex justify-between">
                      <span>ราคาที่กรอก (รวม SC & VAT):</span>
                      <span class="font-medium">{{ Price || 0 }} บาท</span>
                    </div>
                    <div v-if="isServiceCharge && serviceCharge > 0" class="flex justify-between">
                      <span>Service Charge ({{ serviceCharge }}%):</span>
                      <span class="font-medium">{{ calculatedServiceChargeAmount }} บาท</span>
                    </div>
                    <div v-if="isVat && vat > 0" class="flex justify-between">
                      <span>VAT ({{ vat }}%):</span>
                      <span class="font-medium">{{ calculatedVatAmount }} บาท</span>
                    </div>
                    <div class="flex justify-between border-t border-blue-300 pt-1">
                      <span class="font-semibold">ราคา Base (ไม่รวม SC & VAT):</span>
                      <span class="font-bold text-blue-900">{{ calculatedBasePrice }} บาท</span>
                    </div>
                    <div class="flex justify-between bg-blue-100 p-2 rounded">
                      <span class="font-semibold">รวมทั้งหมด:</span>
                      <span class="font-bold text-blue-900">{{ Price || 0 }} บาท</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="2xl:w-1/2 w-full space-y-4  2xl:mt-0 mt-4">
              <div :ref="el => (inputRefs.Stay = el)">
                <InputNumber v-model="Stay" id="Stay" :label="t('Stay_Label')"
                  :class="highlightField === 'Stay' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.Stay" class="text-red-500 text-xs pl-2">{{ errors.Stay }}</p>
              </div>

              <div :ref="el => (inputRefs.RoomDetail = el)">
                <FloatInputTextarea v-model="RoomDetail" id="RoomDetail" :label="t('RoomDetail_Label')"
                  :class="highlightField === 'RoomDetail' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.RoomDetail" class="text-red-500 text-xs pl-2">{{ errors.RoomDetail }}</p>
              </div>
            </div>
          </div>

          <div class="mb-4 mt-12">
            <label class="text-xl font-semibold">เลือกแท็กที่แสดง</label>
            <div class="border rounded-md p-4 bg-stone-50">
              <ChooseRoomType v-model="selectedTags" :options="tagOptions" />
              <div v-if="tags.length === 0" class="text-gray-500 text-sm italic mt-2">
                ยังไม่มีแท็กที่สร้างขึ้น
              </div>
              <p v-if="errors.selectedTags" class="text-red-500 text-xs pl-2 mt-1">{{ errors.selectedTags }}</p>
            </div>
          </div>

          <div class=" md:mt-8 mt-20 space-y-2">
            <label class="text-xl font-semibold">{{ t('SelectTypeRoom') }}</label>
            <div class="border rounded-md py-2">
              <ChooseRoomType v-model="selectedTypeRoomHotel" :options="RoomOptions" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10  w-full space-y-2">
        <label class="text-xl font-semibold">{{ t('AddImg') }}</label>
        <UploadImg :key="'UploadImgRoom'" v-model="uploadedImages" />
      </div>
    </div>

    <div class="flex justify-center items-center mb-12 mt-20 space-x-2">
      <ButtonCancel @click="handleCancel" />
      <ButtonReset @click="handleReset" />
      <ButtonSave @click="handleSave" :text="props.isEditMode ? 'อัปเดต' : 'บันทึก'" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ChooseRoomType from '@/components/element/ChooseRoomType.vue'


const tags = ref([]);
const selectedTags = ref([]); // เก็บ tag ที่เลือก

// แปลง tags เป็นรูปแบบที่ ChooseRoomType ต้องการ
const tagOptions = computed(() => {
  return tags.value.map(tag => ({
    value: tag._id,
    label: tag.name
  }));
});

// เพิ่ม computed property สำหรับคำนวณราคา base
const calculatedBasePrice = computed(() => {
  if (!Price.value || Price.value <= 0) return 0;

  let totalPercentage = 0;
  if (isServiceCharge.value && serviceCharge.value > 0) {
    totalPercentage += serviceCharge.value;
  }
  if (isVat.value && vat.value > 0) {
    totalPercentage += vat.value;
  }

  if (totalPercentage === 0) return Price.value;

  // คำนวณราคา base โดยการหัก service charge และ VAT ออกจากราคารวม
  // สูตร: basePrice = totalPrice / (1 + totalPercentage/100)
  return Math.round(Price.value / (1 + totalPercentage / 100));
});

// เพิ่ม computed property สำหรับคำนวณ Service Charge Amount
const calculatedServiceChargeAmount = computed(() => {
  if (!isServiceCharge.value || !serviceCharge.value || !calculatedBasePrice.value) return 0;
  return Math.round(calculatedBasePrice.value * serviceCharge.value / 100);
});

// เพิ่ม computed property สำหรับคำนวณ VAT Amount
const calculatedVatAmount = computed(() => {
  if (!isVat.value || !vat.value || !calculatedBasePrice.value) return 0;
  return Math.round(calculatedBasePrice.value * vat.value / 100);
});

// เพิ่ม computed property สำหรับคำนวณราคารวมทั้งหมด
const calculatedTotalPrice = computed(() => {
  return calculatedBasePrice.value + calculatedServiceChargeAmount.value + calculatedVatAmount.value;
});

// ฟังก์ชันสำหรับดึงข้อมูล aboutHotel
const fetchAboutHotelData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('ไม่พบ token');
      return;
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/about-hotel', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ No aboutHotel data found, using defaults');
        serviceCharge.value = 0;
        vat.value = 0;
        return;
      }
      throw new Error('ไม่สามารถดึงข้อมูล aboutHotel ได้');
    }

    const data = await response.json();

    if (data.success && data.data) {
      serviceCharge.value = data.data.serviceCharge || 0;
      vat.value = data.data.vat || 0;
      console.log('✅ AboutHotel data loaded:', { serviceCharge: serviceCharge.value, vat: vat.value });
    } else {
      console.log('⚠️ No aboutHotel data found, using defaults');
      serviceCharge.value = 0;
      vat.value = 0;
    }
  } catch (error) {
    console.error('❌ Error fetching aboutHotel data:', error);
    serviceCharge.value = 0;
    vat.value = 0;
  }
};

// ฟังก์ชันสำหรับคำนวณสีข้อความที่เหมาะสมกับพื้นหลัง
function getContrastColor(hexColor) {
  // แปลง hex เป็น RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // คำนวณความสว่าง
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // ส่งคืนสีขาวหรือดำตามความสว่าง
  return brightness > 128 ? '#000000' : '#ffffff';
}

// Define props
const props = defineProps({
  selectedFloor: {
    type: String,
    default: ''
  },
  selectedBuildingId: {
    type: String,
    default: ''
  },
  editRoomData: {
    type: Object,
    default: null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
});


// Debug: ตรวจสอบ props ที่ได้รับ
console.log('🏠 AddRoom props received:', {
  selectedFloor: props.selectedFloor,
  selectedBuildingId: props.selectedBuildingId
});

// // ตัวแปรสำหรับเก็บข้อมูลตึก
// const buildings = ref([]);

// // ฟังก์ชันสำหรับดึงชื่อตึกจาก buildingId
// const getBuildingName = (buildingId) => {
//   // ตรวจสอบว่า buildings.value เป็น array หรือไม่
//   if (!Array.isArray(buildings.value)) {
//     return `ไม่พบตึก (ID: ${buildingId}) - ข้อมูลตึกไม่ถูกต้อง`;
//   }

//   const building = buildings.value.find(b => b._id === buildingId);

//   if (building) {
//     return building.nameBuilding;
//   } else {
//     // ลองหาแบบอื่นๆ
//     const buildingByString = buildings.value.find(b => String(b._id) === String(buildingId));
//     if (buildingByString) {
//       return buildingByString.nameBuilding;
//     }

//     return `ไม่พบตึก (ID: ${buildingId})`;
//   }
// };

// // ฟังก์ชันสำหรับดึงข้อมูลตึกทั้งหมด
// const getAllBuildings = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('ไม่พบ token');
//     }

//     const response = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('ไม่สามารถดึงข้อมูลตึกได้');
//     }

//     const data = await response.json();

//     // ตรวจสอบและแปลงข้อมูลให้เป็น array
//     if (Array.isArray(data)) {
//       return data;
//     } else if (data && Array.isArray(data.buildings)) {
//       return data.buildings;
//     } else if (data && Array.isArray(data.data)) {
//       return data.data;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error('❌ Error fetching buildings:', error);
//     return [];
//   }
// };

// Define emits
const emit = defineEmits(['room-saved', 'roomData']);

// Debug
console.log('🚀 AddRoom component mounted');

// ตัวแปรสำหรับเก็บข้อมูลห้อง
const roomData = ref({});

// ฟังก์ชันสำหรับดึงข้อมูลห้องตาม id
const fetchRoomData = async (roomId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/rooms/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลห้องได้');
    }

    const data = await response.json();
    roomData.value = data;

    // กรอกข้อมูลลงในฟิลด์ต่างๆ
    NumberRoom.value = data.roomNumber || '';

    // กรอกข้อมูล typeRoom - ตรวจสอบว่าเป็น object หรือ string
    if (data.typeRoom) {
      if (typeof data.typeRoom === 'object' && data.typeRoom._id) {
        selectedTypeRoom.value = data.typeRoom._id;
      } else {
        selectedTypeRoom.value = data.typeRoom;
      }
    }

    selectedTypeAir.value = data.air || null;
    Price.value = data.price || null;
    Stay.value = data.stayPeople || null;
    RoomDetail.value = data.roomDetail || '';

    // กรอกข้อมูล typeRoomHotel - แปลงเป็น array ของ ID
    if (data.typeRoomHotel && Array.isArray(data.typeRoomHotel)) {
      selectedTypeRoomHotel.value = data.typeRoomHotel.map(item => {
        if (typeof item === 'object' && item._id) {
          return item._id;
        }
        return item;
      });
    } else {
      selectedTypeRoomHotel.value = [];
    }

    // กรอกข้อมูลแท็ก - แปลงเป็น array ของ ID
    if (data.tag && Array.isArray(data.tag)) {
      selectedTags.value = data.tag.map(item => {
        if (typeof item === 'object' && item._id) {
          return item._id;
        }
        return item;
      });
    } else {
      selectedTags.value = [];
    }

    // กรอกข้อมูลรูปภาพ
    uploadedImages.value = data.images || [];

    console.log('✅ Room data loaded for editing:', data);
  } catch (error) {
    console.error('❌ Error fetching room data:', error);
  }
};

// ฟังก์ชันโหลดข้อมูลห้องสำหรับแก้ไข
const loadRoomDataForEdit = (roomData) => {
  if (!roomData) return;

  console.log('📝 Loading room data for edit:', roomData);

  // กรอกข้อมูลลงในฟิลด์ต่างๆ
  NumberRoom.value = roomData.roomNumber || '';

  // กรอกข้อมูล typeRoom - ตรวจสอบว่าเป็น object หรือ string
  if (roomData.typeRoom) {
    if (typeof roomData.typeRoom === 'object' && roomData.typeRoom._id) {
      selectedTypeRoom.value = roomData.typeRoom._id;
    } else {
      selectedTypeRoom.value = roomData.typeRoom;
    }
  }

  // กรอกข้อมูล air
  selectedTypeAir.value = roomData.air || null;
  Price.value = roomData.price || null;
  Stay.value = roomData.stayPeople || null;
  RoomDetail.value = roomData.roomDetail || '';

  // กรอกข้อมูล typeRoomHotel - แปลงเป็น array ของ ID
  if (roomData.typeRoomHotel && Array.isArray(roomData.typeRoomHotel)) {
    selectedTypeRoomHotel.value = roomData.typeRoomHotel.map(item => {
      if (typeof item === 'object' && item._id) {
        return item._id;
      }
      return item;
    });
  } else {
    selectedTypeRoomHotel.value = [];
  }

  // กรอกข้อมูลแท็ก - แปลงเป็น array ของ ID
  if (roomData.tag && Array.isArray(roomData.tag)) {
    selectedTags.value = roomData.tag.map(item => {
      if (typeof item === 'object' && item._id) {
        return item._id;
      }
      return item;
    });
  } else {
    selectedTags.value = [];
  }

  // กรอกข้อมูลรูปภาพ
  uploadedImages.value = roomData.images || [];

  // กรอกข้อมูล service charge และ VAT
  isServiceCharge.value = roomData.isServiceChargeIncluded || false;
  isVat.value = roomData.isVatIncluded || false;

  console.log('✅ Room data loaded for editing');
  console.log('📋 Loaded data:', {
    NumberRoom: NumberRoom.value,
    selectedTypeRoom: selectedTypeRoom.value,
    selectedTypeAir: selectedTypeAir.value,
    selectedTypeRoomHotel: selectedTypeRoomHotel.value,
    selectedTags: selectedTags.value,
    isServiceCharge: isServiceCharge.value,
    isVat: isVat.value
  });
};




// ตัวแปรสำหรับเก็บข้อมูลตึก
const buildings = ref([]);

// ฟังก์ชันสำหรับดึงชื่อตึกจาก buildingId
const getBuildingName = (buildingId) => {
  const building = buildings.value.find(b => b._id === buildingId);
  return building ? building.nameBuilding : 'ไม่พบตึก';
};

// ฟังก์ชันสำหรับดึงข้อมูลตึกทั้งหมด
const getAllBuildings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลตึกได้');
    }

    const data = await response.json();
    buildings.value = data.buildings || data.data || [];
  } catch (error) {
    console.error('❌ Error fetching buildings:', error);
  }
};

// Define emits


import FloatInput from '@/components/element/FloatInput.vue'
import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'

import InputNumber from "@/components/element/InputNumber.vue";
import UploadImg from "@/components/element/UploadImg.vue";
import Dropdown from "@/components/element/Dropdown.vue";
import ButtonSave from "@/components/element/ButtonSave.vue";
import ButtonReset from "@/components/element/ButtonReset.vue";
import ButtonCancel from "@/components/element/ButtonCancel.vue";
import { watch } from 'vue'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'

const { t } = useI18n()

const selectedRoom = ref([])
const RoomOptions = ref([])

const router = useRouter()
const inputRefs = reactive({})
const RoomTypeGroupedOptions = ref([])
const TypeRoom = ref([])
const TypeAir = ref([])
const selectedTypeRoom = ref(null)
const selectedTypeAir = ref(null)
const NumberRoom = ref('')
const Stay = ref('')
const RoomDetail = ref('')
const Price = ref('')

const errors = ref({
  NumberRoom: '',
  selectedTypeRoom: '',
  selectedTypeAir: '',
  Price: '',
  Stay: '',
  RoomDetail: '',
  selectedTags: '',
})

const highlightField = ref('')
const typeRoomHotelOptions = ref([])
const selectedTypeRoomHotel = ref([])
const uploadedImages = ref([]) // เก็บข้อมูลรูปภาพที่อัปโหลด

// เพิ่มตัวแปรสำหรับ service charge และ VAT
const serviceCharge = ref(0)
const vat = ref(0)
const isServiceCharge = ref(false)
const isVat = ref(false)

function scrollToFirstErrorWithAnimation() {
  const firstErrorKey = Object.keys(errors.value).find((key) => errors.value[key])
  const el = inputRefs[firstErrorKey]

  if (el) {
    nextTick(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      highlightField.value = firstErrorKey
      setTimeout(() => {
        highlightField.value = ''
      }, 1000)
    })
  }
}

watch(NumberRoom, (val) => {
  if (val.trim()) errors.value.NumberRoom = ''
})
watch(selectedTypeRoom, (val) => {
  if (val) errors.value.selectedTypeRoom = ''
})
watch(selectedTypeAir, (val) => {
  if (val) errors.value.selectedTypeAir = ''
})
watch(Price, (val) => {
  if (val) errors.value.Price = ''
})
watch(Stay, (val) => {
  if (val) errors.value.Stay = ''
})
watch(RoomDetail, (val) => {
  if (val.trim()) errors.value.RoomDetail = ''
})

watch(selectedTags, (val) => {
  if (val && val.length > 0) errors.value.selectedTags = ''
})

// Watch สำหรับ props editRoomData
watch(() => props.editRoomData, (newVal) => {
  if (newVal && props.isEditMode) {
    console.log('🔄 Edit room data changed:', newVal);
    loadRoomDataForEdit(newVal.roomData);
  }
}, { immediate: true });

async function handleSave() {
  const isValid = validateForm()
  if (!isValid) {
    scrollToFirstErrorWithAnimation()
    return
  }
  const tagInfo = selectedTags.value.length > 0
    ? `\nแท็กที่เลือก: ${selectedTags.value.map(tagId =>
      tags.value.find(t => t._id === tagId)?.name || 'Unknown'
    ).join(', ')}`
    : '\nไม่มีแท็กที่เลือก';

  const result = await Swal.fire({
    title: 'ยืนยันการบันทึกข้อมูล?',
    text: `คุณต้องการบันทึกข้อมูลนี้ใช่หรือไม่${tagInfo}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;
  confirmSave();
}

async function handleReset() {
  // ถ้าเป็นโหมดแก้ไข ให้รีเซ็ทเป็นข้อมูลเดิมจากฐานข้อมูล
  if (props.isEditMode && props.editRoomData) {
    const result = await Swal.fire({
      title: 'ยืนยันการรีเซ็ตข้อมูล?',
      text: 'คุณต้องการรีเซ็ทข้อมูลกลับเป็นข้อมูลเดิมจากฐานข้อมูลใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    })

    if (!result.isConfirmed) return;

    // โหลดข้อมูลเดิมจากฐานข้อมูล
    await fetchRoomData(props.editRoomData.roomId);

    Swal.fire({
      icon: 'info',
      title: 'รีเซ็ตข้อมูลเรียบร้อย',
      text: 'ข้อมูลได้ถูกรีเซ็ทกลับเป็นข้อมูลเดิมจากฐานข้อมูลแล้ว',
      showConfirmButton: false,
      timer: 1500
    })
    return;
  }

  // ถ้าเป็นโหมดเพิ่มใหม่ ให้รีเซ็ทเป็นค่าว่าง
  const tagInfo = selectedTags.value.length > 0
    ? `\nแท็กที่เลือก: ${selectedTags.value.map(tagId =>
      tags.value.find(t => t._id === tagId)?.name || 'Unknown'
    ).join(', ')} จะถูกล้างด้วย`
    : '';

  const result = await Swal.fire({
    title: 'ยืนยันการรีเซ็ตข้อมูล?',
    text: `คุณต้องการรีเซ็ตข้อมูลกลับเป็นค่าว่างใช่หรือไม่${tagInfo}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;

  NumberRoom.value = ''
  selectedTypeRoom.value = null
  selectedTypeAir.value = null
  Price.value = null
  Stay.value = null
  RoomDetail.value = ''
  selectedRoom.value = []
  selectedTypeRoomHotel.value = []
  selectedTags.value = [] // รีเซ็ตแท็กที่เลือก
  isServiceCharge.value = false
  isVat.value = false
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    selectedTypeAir: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
    selectedTags: '',
  }
  highlightField.value = ''
  Swal.fire({
    icon: 'info',
    title: 'รีเซ็ตข้อมูลเรียบร้อย',
    text: 'ข้อมูลทั้งหมดรวมถึงแท็กที่เลือกได้ถูกล้างแล้ว',
    showConfirmButton: false,
    timer: 1500
  })
}

function handleCancel() {
  // รีเซ็ตค่าทั้งหมด
  NumberRoom.value = '';
  selectedTypeRoom.value = null;
  selectedTypeAir.value = null;
  Price.value = null;
  Stay.value = null;
  RoomDetail.value = '';
  selectedRoom.value = [];
  selectedTypeRoomHotel.value = [];
  selectedTags.value = []; // รีเซ็ตแท็กที่เลือก
  uploadedImages.value = [];
  isServiceCharge.value = false;
  isVat.value = false;
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    selectedTypeAir: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  };
  highlightField.value = '';

  // ส่ง event ไปยัง parent component เพื่อปิด Dialog
  emit('room-saved', null);
}

// 👉 เก็บสถานะ popup save
const showConfirmSave = ref(false)

function confirmSave() {
  console.log('confirmSave called');
  console.log('🏠 Props data:', {
    selectedFloor: props.selectedFloor,
    selectedBuildingId: props.selectedBuildingId,
    isEditMode: props.isEditMode,
    editRoomData: props.editRoomData
  });
  console.log('🏷️ Selected tags:', {
    selectedTags: selectedTags.value,
    tagNames: selectedTags.value.map(tagId =>
      tags.value.find(t => t._id === tagId)?.name || 'Unknown'
    ),
    tagsCount: selectedTags.value.length
  });

  // สร้าง FormData
  const formData = new FormData();
  formData.append('roomNumber', NumberRoom.value);
  formData.append('typeRoom', typeof selectedTypeRoom.value === 'object' ? selectedTypeRoom.value.value : selectedTypeRoom.value);
  formData.append('air', typeof selectedTypeAir.value === 'object' ? selectedTypeAir.value.value : selectedTypeAir.value);
  formData.append('price', Price.value);
  formData.append('stayPeople', Stay.value);
  formData.append('roomDetail', RoomDetail.value);
  formData.append('floor', props.selectedFloor); // เพิ่ม floor field
  formData.append('buildingId', props.selectedBuildingId); // เพิ่ม buildingId field

  // เพิ่ม service charge และ VAT flags
  formData.append('isServiceCharge', isServiceCharge.value);
  formData.append('isVat', isVat.value);

  // แนบ typeRoomHotel เป็น array
  selectedTypeRoomHotel.value.forEach(id => formData.append('typeRoomHotel', id));

  // เพิ่ม tag ที่เลือก - ส่งเป็น array ของ tag IDs
  if (selectedTags.value && selectedTags.value.length > 0) {
    selectedTags.value.forEach(tagId => {
      formData.append('tag', tagId);
    });
  }

  // เพิ่มไฟล์รูปภาพ
  uploadedImages.value.forEach((file, index) => {
    formData.append('imgrooms', file);
  });

  const token = localStorage.getItem('token');
  console.log('token:', token);
  // Debug: log ข้อมูล formData ที่จะส่งไป backend
  console.log('📦 FormData entries:');
  for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }
  console.log('🏷️ Tags being sent:', selectedTags.value);

  // กำหนด URL และ method ตามโหมด
  const url = props.isEditMode && props.editRoomData
    ? `http://localhost:9999/HotelSleepGun/pos/rooms/${props.editRoomData.roomId}`
    : 'http://localhost:9999/HotelSleepGun/pos/rooms';

  const method = props.isEditMode && props.editRoomData ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = {};
      }
      console.log('API response:', res.status, data);
      showConfirmSave.value = false;
      if (res.ok) {
        const tagNames = selectedTags.value.map(tagId =>
          tags.value.find(t => t._id === tagId)?.name || 'Unknown'
        ).join(', ');

        await Swal.fire({
          icon: 'success',
          title: props.isEditMode ? 'อัปเดตข้อมูลห้องสำเร็จ' : 'บันทึกข้อมูลห้องสำเร็จ',
          text: selectedTags.value.length > 0 ? `แท็กที่เลือก: ${tagNames}` : 'ไม่มีแท็กที่เลือก',
          showConfirmButton: false,
          timer: 2000
        });

        // ส่งข้อมูลห้องที่บันทึกสำเร็จไปยัง parent component
        const roomData = {
          roomNumber: NumberRoom.value,
          typeRoom: typeof selectedTypeRoom.value === 'object' ? selectedTypeRoom.value.value : selectedTypeRoom.value,
          air: typeof selectedTypeAir.value === 'object' ? selectedTypeAir.value.value : selectedTypeAir.value,
          price: Price.value,
          stayPeople: Stay.value,
          roomDetail: RoomDetail.value,
          floor: props.selectedFloor, // เพิ่ม floor field
          buildingId: props.selectedBuildingId, // เพิ่ม buildingId field
          typeRoomHotel: selectedTypeRoomHotel.value,
          tag: selectedTags.value, // เพิ่ม tag ที่เลือก
          tagNames: selectedTags.value.map(tagId =>
            tags.value.find(t => t._id === tagId)?.name || 'Unknown'
          ), // เพิ่มชื่อแท็ก
          images: uploadedImages.value
        };

        // ส่งข้อมูลห้องที่บันทึกสำเร็จไปยัง parent component
        emit('room-saved', roomData);

        console.log('✅ Room saved with data:', {
          ...roomData,
          selectedTags: selectedTags.value,
          tagsCount: selectedTags.value.length,
          selectedTagNames: selectedTags.value.map(tagId =>
            tags.value.find(t => t._id === tagId)?.name || 'Unknown'
          )
        });

        // รีเซ็ตค่าทั้งหมดหลังจากบันทึกสำเร็จ
        NumberRoom.value = '';
        selectedTypeRoom.value = null;
        selectedTypeAir.value = null;
        Price.value = null;
        Stay.value = null;
        RoomDetail.value = '';
        selectedRoom.value = [];
        selectedTypeRoomHotel.value = [];
        selectedTags.value = []; // รีเซ็ตแท็กที่เลือก
        uploadedImages.value = [];
        isServiceCharge.value = false;
        isVat.value = false;
        errors.value = {
          NumberRoom: '',
          selectedTypeRoom: '',
          selectedTypeAir: '',
          Price: '',
          Stay: '',
          RoomDetail: '',
          selectedTags: '',
        };
        highlightField.value = '';
      } else {
        console.error('❌ API Error:', data);
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: data.message || 'ไม่สามารถบันทึกข้อมูลห้องได้',
          confirmButtonText: 'ตกลง'
        });
      }
    })
    .catch(async (err) => {
      console.error('❌ API error:', err);
      showConfirmSave.value = false;
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
        confirmButtonText: 'ตกลง'
      });
    });
}


function validateForm() {
  let isValid = true

  // ล้าง error เดิม
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  }

  if (!NumberRoom.value.trim()) {
    errors.value.NumberRoom = t('NumberRoom_Error')
    isValid = false
  }

  if (!selectedTypeRoom.value) {
    errors.value.selectedTypeRoom = t('selectedTypeRoom_Error')
    isValid = false
  }

  if (!selectedTypeAir.value) {
    errors.value.selectedTypeAir = 'กรุณาเลือกประเภทพัดลม/แอร์'
    isValid = false
  }

  if (!Price.value) {
    errors.value.Price = t('Price_Error')
    isValid = false
  }

  if (!Stay.value) {
    errors.value.Stay = t('Stay_Error')
    isValid = false
  }

  if (!RoomDetail.value.trim()) {
    errors.value.RoomDetail = t('RoomDetail_Error')
    isValid = false
  }

  if (!selectedTypeRoomHotel.value.length) {
    errors.value.selectedTypeRoomHotel = 'กรุณาเลือกลักษณะห้องอย่างน้อย 1 รายการ'
    isValid = false
  }

  // ตรวจสอบว่าเลือกแท็กหรือไม่ (ถ้าต้องการให้เป็น required)
  // if (!selectedTags.value.length) {
  //   errors.value.selectedTags = 'กรุณาเลือกแท็กอย่างน้อย 1 รายการ'
  //   isValid = false
  // }



  console.log('validateForm errors:', JSON.parse(JSON.stringify(errors.value)), 'isValid:', isValid);



  return isValid
}


onMounted(async () => {
  // โหลดข้อมูล Service Charge และ VAT จาก aboutHotel
  await fetchAboutHotelData();

  // โหลดข้อมูลตึก
  try {
    const fetchedBuildings = await getAllBuildings();
    buildings.value = fetchedBuildings;
  } catch (error) {
    console.error('❌ Error loading buildings:', error);
  }

  // ถ้าเป็นโหมดแก้ไข ให้โหลดข้อมูลห้อง
  if (props.isEditMode && props.editRoomData) {
    console.log('📝 Edit mode detected, loading room data...');
    console.log('📋 Edit room data:', props.editRoomData);
    loadRoomDataForEdit(props.editRoomData.roomData);
  }

  // ดึงข้อมูล dropdown ตัวแรก แบบเดิม
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    const data = await res.json()

    RoomOptions.value = data.map(item => ({
      label: item.name,
      value: item._id
    }))
  } catch (e) {
    console.error('โหลดข้อมูล room type ไม่สำเร็จ:', e)
  }

  // ดึงข้อมูล typeRoom แบบ array ปกติ
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoom/getAll')
    const data = await res.json()

    TypeRoom.value = [
      {
        label: 'ประเภทห้องทั้งหมด',
        code: 'all',
        items: data.map(type => ({
          label: type.name,
          value: type._id
        }))
      }
    ]
  } catch (e) {
    console.error('โหลดข้อมูล room type ไม่สำเร็จ:', e)
  }

  // ดึงข้อมูล typeRoomHotel ทั้งหมด
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    const data = await res.json()
    typeRoomHotelOptions.value = data.map(item => ({
      label: item.name,
      value: item._id
    }))
  } catch (e) {
    console.error('โหลดข้อมูล typeRoomHotel ไม่สำเร็จ:', e)
  }

  // ดึงข้อมูล TypeAir
  try {
    TypeAir.value = [
      {
        label: 'ประเภทพัดลม/แอร์ทั้งหมด',
        code: 'all',
        items: [
          { label: 'ห้องแอร์', value: 'ห้องเเอร์' },
          { label: 'ห้องพัดลม', value: 'ห้องพัดลม' },
          { label: 'ห้องแอร์และพัดลม', value: 'ห้องเเอร์และพัดลม' }
        ]
      }
    ]
  } catch (e) {
    console.error('โหลดข้อมูล TypeAir ไม่สำเร็จ:', e)
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('ไม่พบ token');
      return;
    }

    const res = await fetch('http://localhost:9999/HotelSleepGun/pos/tags', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('API response for tags:', data);

    if (data.success && Array.isArray(data.data)) {
      tags.value = data.data;
      console.log('✅ Tags loaded successfully:', tags.value);
    } else {
      console.error('❌ Invalid tags data structure:', data);
      tags.value = [];
    }
  } catch (e) {
    console.error('❌ Error loading tags:', e);
    tags.value = [];

    // แสดงข้อความแจ้งเตือนถ้าเป็น authentication error
    if (e.message && e.message.includes('token')) {
      await Swal.fire({
        icon: 'warning',
        title: 'เซสชันหมดอายุ',
        text: 'กรุณาเข้าสู่ระบบใหม่',
        confirmButtonText: 'ตกลง'
      });
    }
  }

  // โหลดข้อมูล aboutHotel หลังจากดึงข้อมูล tags
  await fetchAboutHotelData();

})
</script>
