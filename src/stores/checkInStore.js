import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { CheckInOrderService } from '@/service/CheckInOrderService';

export const useCheckInStore = defineStore("checkIn", () => {
  // ข้อมูล Check-in Order
  const checkInOrderId = ref('');
  const orderAll = ref(0);
  const orderDate = ref('');
  const orderTime = ref('');
  const orderBy = ref('');

  // ข้อมูลลูกค้า
  const customerData = ref({
    firstname: '',
    lastname: '',
    gender: '',
    birthDate: '',
    age: 0,
    phone: '',
    email: '',
    numberOfGuests: 1,
    idenNumber: '',
    idenImg: '',
    passportNumber: '',
    passportImg: ''
  });

  // รายการห้องที่เลือก
  const selectedRooms = ref([]);

  // ข้อมูลพนักงาน
  const employeeData = ref({
    id: null,
    firstname: '',
    lastname: '',
    name: '',
    employeeCode: '',
    position: ''
  });

  // ข้อมูล aboutHotel สำหรับคำนวณราคา
  const aboutHotelData = ref(null);

  // สถานะการโหลด
  const isLoading = ref(false);

  // Computed properties
  const totalRooms = computed(() => selectedRooms.value.length);
  
  const totalPrice = computed(() => {
    return selectedRooms.value.reduce((total, room) => {
      let roomTotal = room.basePrice || 0;
      
      // เพิ่มค่ามัดจำ
      if (room.deposit) {
        roomTotal += room.deposit;
      }
      
      // เพิ่มค่าเตียงเสริม
      if (room.extraBedPrice) {
        roomTotal += room.extraBedPrice;
      }
      
      // เพิ่มค่าเข้าพักก่อนเวลา
      if (room.earlyCheckInPrice) {
        roomTotal += room.earlyCheckInPrice;
      }
      
      return total + roomTotal;
    }, 0);
  });

  // ฟังก์ชันคำนวณราคาตาม aboutHotel
  const calculateRoomPrices = (room) => {
    if (!aboutHotelData.value) return room;

    const updatedRoom = { ...room };
    
    // คำนวณค่ามัดจำ
    if (aboutHotelData.value.cashPledge && aboutHotelData.value.cashPledge.price) {
      updatedRoom.deposit = aboutHotelData.value.cashPledge.price;
    }

    // คำนวณค่าเตียงเสริม
    if (room.isAddBed && aboutHotelData.value.typeBedPrice) {
      let extraBedTotal = 0;
      
      if (room.isAddBedChild && room.numberAddBedChild > 0) {
        extraBedTotal += (room.numberAddBedChild * (aboutHotelData.value.typeBedPrice.child || 200));
      }
      
      if (room.isAddBedNormal && room.numberAddBedNormal > 0) {
        extraBedTotal += (room.numberAddBedNormal * (aboutHotelData.value.typeBedPrice.normal || 300));
      }
      
      updatedRoom.extraBedPrice = extraBedTotal;
    } else {
      updatedRoom.extraBedPrice = 0;
    }

    // คำนวณค่าเข้าพักก่อนเวลา (อัตโนมัติตามเวลา)
    const earlyCheckInHours = calculateEarlyCheckInHours();
    if (earlyCheckInHours > 0 && aboutHotelData.value.checkInEarlyPricePerHour) {
      updatedRoom.earlyCheckInPrice = earlyCheckInHours * aboutHotelData.value.checkInEarlyPricePerHour;
      updatedRoom.isEarlyCheckIn = true; // ตั้งค่าให้เป็น true เมื่อเป็นเวลาก่อนเช็คอิน
    } else {
      updatedRoom.earlyCheckInPrice = 0;
      updatedRoom.isEarlyCheckIn = false; // ตั้งค่าให้เป็น false เมื่อถึงเวลาเช็คอินแล้ว
    }

    // คำนวณราคารวม
    updatedRoom.totalPrice = (updatedRoom.basePrice || 0) + 
                            (updatedRoom.deposit || 0) + 
                            (updatedRoom.extraBedPrice || 0) + 
                            (updatedRoom.earlyCheckInPrice || 0);

    return updatedRoom;
  };

  // ฟังก์ชันคำนวณชั่วโมงการเข้าพักก่อนเวลา
  const calculateEarlyCheckInHours = () => {
    // ใช้เวลาจาก aboutHotel.schema หรือใช้ค่าเริ่มต้น 14:00
    const checkInTimeStr = aboutHotelData.value?.checkInForm || "14:00";
    
    // แปลงเวลาเช็คอินเป็น Date object
    const [hours, minutes] = checkInTimeStr.split(':').map(Number);
    const standardCheckInTime = new Date();
    standardCheckInTime.setHours(hours, minutes || 0, 0, 0);
    
    // เวลาปัจจุบัน
    const currentTime = new Date();
    
    // คำนวณความแตกต่างของเวลา
    const timeDiff = standardCheckInTime.getTime() - currentTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    // ถ้าเวลาปัจจุบันเกินเวลาเช็คอินมาตรฐาน ให้คืนค่า 0
    if (hoursDiff <= 0) {
      return 0;
    }
    
    // คืนค่าชั่วโมงที่เข้าพักก่อนเวลา (ปัดขึ้นเป็นทศนิยม 1 ตำแหน่ง)
    return Math.max(0, Math.round(hoursDiff * 10) / 10);
  };

  // ฟังก์ชันดึงเวลาปัจจุบันในรูปแบบ HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // ฟังก์ชันดึงข้อมูล aboutHotel
  const loadAboutHotelData = async (partnerId) => {
    try {
      console.log('🔄 Loading aboutHotel data for partnerId:', partnerId);
      const response = await CheckInOrderService.getAboutHotelByPartnerId(partnerId);
      console.log('📥 Service response:', response);
      
      if (response.success) {
        aboutHotelData.value = response.data;
        console.log('✅ Loaded aboutHotel data:', aboutHotelData.value);
        
        // อัปเดตราคาของห้องที่เลือกอยู่แล้ว
        selectedRooms.value = selectedRooms.value.map(room => calculateRoomPrices(room));
      } else {
        console.warn('⚠️ Service response not successful:', response);
      }
    } catch (error) {
      console.error('❌ Error loading aboutHotel data:', error);
      // ตั้งค่า default values เพื่อให้แอปทำงานได้
      aboutHotelData.value = {
        serviceCharge: 0,
        vat: 0,
        cashPledge: { price: 0 },
        checkInEarlyPricePerHour: 100,
        typeBedPrice: { child: 200, normal: 300 },
        checkInForm: "14:00",
        checkInTo: "ไม่ระบุ",
        checkOutForm: "12:00",
        checkOutTo: "ไม่ระบุ"
      };
    }
  };

  // ฟังก์ชันสร้าง Check-in Order ID
  const generateCheckInOrderId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${year}${month}`;
    
    // ตัวอย่าง: CIN-202508-001 (จะต้องดึงจาก API จริง)
    checkInOrderId.value = `CIN-${yearMonth}-001`;
  };

  // ฟังก์ชันอัปเดตเวลาแบบ real-time
  const updateTime = () => {
    const now = new Date();
    orderTime.value = now.toLocaleTimeString('th-TH');
  };

  // ฟังก์ชันอัปเดตวันที่
  const updateDate = () => {
    const now = new Date();
    orderDate.value = now.toLocaleDateString('th-TH');
  };

  // ฟังก์ชันคำนวณอายุ
  const calculateAge = () => {
    if (customerData.value.birthDate) {
      const birthDate = new Date(customerData.value.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        customerData.value.age = age - 1;
      } else {
        customerData.value.age = age;
      }
    }
  };

  // ฟังก์ชันเพิ่มห้อง
  const addRoom = (room) => {
    // ตรวจสอบว่าห้องนี้ถูกเพิ่มไปแล้วหรือไม่
    const existingRoom = selectedRooms.value.find(r => r._id === room._id);
    if (existingRoom) {
      console.warn('ห้องนี้ถูกเลือกไปแล้ว');
      return false;
    }

    // เพิ่มห้องใหม่พร้อมข้อมูลเริ่มต้น
    const newRoom = {
      ...room,
      numberOfGuests: 1,
      isAddBed: false,
      isEarlyCheckIn: false,
      isAddBedChild: false,
      isAddBedNormal: false,
      numberAddBedChild: 0,
      numberAddBedNormal: 0,
      basePrice: room.price || 0,
      deposit: 0,
      extraBedPrice: 0,
      earlyCheckInPrice: 0,
      totalPrice: room.price || 0
    };

    // คำนวณราคาตาม aboutHotel
    const calculatedRoom = calculateRoomPrices(newRoom);
    selectedRooms.value.push(calculatedRoom);
    return true;
  };

  // ฟังก์ชันลบห้อง
  const removeRoom = (roomId) => {
    const index = selectedRooms.value.findIndex(room => room._id === roomId);
    if (index !== -1) {
      selectedRooms.value.splice(index, 1);
      return true;
    }
    return false;
  };

  // ฟังก์ชันอัปเดตข้อมูลห้อง
  const updateRoom = (roomId, updates) => {
    const roomIndex = selectedRooms.value.findIndex(room => room._id === roomId);
    if (roomIndex !== -1) {
      const updatedRoom = { ...selectedRooms.value[roomIndex], ...updates };
      // คำนวณราคาใหม่หลังจากอัปเดต
      const calculatedRoom = calculateRoomPrices(updatedRoom);
      selectedRooms.value[roomIndex] = calculatedRoom;
      return true;
    }
    return false;
  };

  // ฟังก์ชันอัปเดตข้อมูลลูกค้า
  const updateCustomerData = (updates) => {
    customerData.value = { ...customerData.value, ...updates };
    
    // คำนวณอายุอัตโนมัติเมื่อวันเกิดเปลี่ยน
    if (updates.birthDate) {
      calculateAge();
    }
  };

  // ฟังก์ชันตั้งค่าข้อมูลพนักงาน
  const setEmployeeData = (employee) => {
    employeeData.value = {
      id: employee.id || employee._id,
      firstname: employee.firstname || '',
      lastname: employee.lastname || '',
      name: `${employee.firstname || ''} ${employee.lastname || ''}`.trim(),
      employeeCode: employee.employeeCode || '',
      position: employee.positionEmployee || ''
    };
    
    orderBy.value = employeeData.value.name;
  };

  // ฟังก์ชันตั้งค่าข้อมูลพนักงานจาก auth store
  const setEmployeeDataFromAuth = (authUser) => {
    if (authUser && authUser.role === 'employee') {
      employeeData.value = {
        id: authUser._id || authUser.id,
        firstname: authUser.firstname || '',
        lastname: authUser.lastname || '',
        name: `${authUser.firstname || ''} ${authUser.lastname || ''}`.trim(),
        employeeCode: authUser.employeeCode || '',
        position: authUser.positionEmployee || ''
      };
      
      orderBy.value = employeeData.value.name;
    }
  };

  // ฟังก์ชันรีเซ็ตข้อมูล
  const resetData = () => {
    // ไม่รีเซ็ต checkInOrderId, orderAll, orderDate, orderTime, orderBy เพื่อให้ข้อมูล Order ยังคงอยู่
    // ไม่รีเซ็ต employeeData เพื่อให้ข้อมูลพนักงานยังคงอยู่
    
    customerData.value = {
      firstname: '',
      lastname: '',
      gender: '',
      birthDate: '',
      age: 0,
      phone: '',
      email: '',
      numberOfGuests: 1,
      idenNumber: '',
      idenImg: '',
      passportNumber: '',
      passportImg: ''
    };
    
    selectedRooms.value = [];
    // ไม่รีเซ็ต aboutHotelData เพื่อให้การตั้งค่าของโรงแรมยังคงอยู่
  };

  // ฟังก์ชันเริ่มต้นข้อมูล
  const initializeData = async (partnerId) => {
    generateCheckInOrderId();
    updateDate();
    updateTime();
    
    // โหลดข้อมูล aboutHotel ถ้ามี partnerId
    if (partnerId) {
      await loadAboutHotelData(partnerId);
    }
    
    // อัปเดตเวลาทุกวินาที
    setInterval(updateTime, 1000);
  };

  return {
    // State
    checkInOrderId,
    orderAll,
    orderDate,
    orderTime,
    orderBy,
    customerData,
    selectedRooms,
    employeeData,
    isLoading,
    aboutHotelData,

    // Computed
    totalRooms,
    totalPrice,

    // Actions
    generateCheckInOrderId,
    updateTime,
    updateDate,
    calculateAge,
    addRoom,
    removeRoom,
    updateRoom,
    updateCustomerData,
    setEmployeeData,
    setEmployeeDataFromAuth,
    resetData,
    initializeData,
    loadAboutHotelData,
    calculateRoomPrices,
    calculateEarlyCheckInHours,
    getCurrentTime
  };
}); 