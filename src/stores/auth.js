import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";
import router from "../routes";

export const useAuthStore = defineStore("auth", () => {
    const user = ref({
        id: null,
        title: "",
        fullName: "",
        username: "",
        role: "",
        partnerId: "",
    });

    const token = ref(localStorage.getItem("token") || null);
    const isAuthenticated = ref(!!token.value);

    const initializeAuth = () => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (savedUser && token) {
                try {
                    isAuthenticated.value = true;
                    user.value = JSON.parse(savedUser);
                    console.log("Auth initialized from localStorage:", user.value);
                } catch (error) {
                    console.error("Error parsing saved user data:", error);
                    // Clear invalid data
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    user.value = {
                        id: null,
                        title: "",
                        fullName: "",
                        username: "",
                        role: "",
                        partnerId: "",
                    };
                    isAuthenticated.value = false;
                }
            }
        }
    };

    function login(userData) {
        try {
            if (!userData) {
                console.error("Invalid login data:", userData);
                throw new Error("Invalid login response");
            }

            console.log("Login response data:", userData);

            // เช็ค status ก็ต่อเมื่อ role === 'partner'
            if (userData.status === "รอยืนยัน" || userData.status === "ไม่ยืนยัน" ) {
                Swal.fire({
                    title: "การเข้าถึงถูกปฏิเสธ",
                    text: 'สถานะของคุณคือ "รอยืนยัน" กรุณารอการยืนยันจากเจ้าหน้าที่',
                    icon: "warning",
                    confirmButtonText: "ตกลง",
                }).then(() => {
                    logout();
                });
                return false;
            }

            // ตรวจสอบว่า userData เป็น API response หรือ user object โดยตรง
            let userObject, tokenValue, roleValue;
            
            if (userData.user && userData.token && userData.role) {
                // เป็น API response
                userObject = userData.user;
                tokenValue = userData.token;
                roleValue = userData.role;
            } else {
                // เป็น user object โดยตรง (สำหรับ legacy code)
                userObject = userData;
                tokenValue = userData.token || null;
                roleValue = userData.role || "";
            }

            console.log("Extracted user object:", userObject);
            console.log("Token:", tokenValue);
            console.log("Role:", roleValue);

            // แมปข้อมูล user ให้ตรงกับ response ที่คาดไว้
            user.value = {
                id: userObject._id || null,
                partnerId: userObject.partnerId || null,
                title: userObject.title || "",
                fullName: userObject.fullName || userObject.firstname + " " + userObject.lastname || "",
                username: userObject.username || "",
                role: roleValue,
                personalPhone: userObject.personalPhone || "",
                personalEmail: userObject.personalEmail || "",
            };

            token.value = tokenValue;
            localStorage.setItem("token", token.value);
            localStorage.setItem("user", JSON.stringify(user.value));

            isAuthenticated.value = true;

            console.log("Auth store user after login:", user.value);

            switch (user.value.role) {
                case "partner":
                    router.push("/partner");
                    break;
                case "admin":
                    router.push("/admin");
                    break;
                default:
                    router.push("/e-market");
            }

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            logout();
            return false;
        }
    }

    function logout() {
        // เซ็ต user กลับเป็น object ว่าง ไม่ใช่ null
        user.value = {
            id: null,
            title: "",
            fullName: "",
            username: "",
            role: "",
            partnerId: "",
        };
        token.value = null;
        isAuthenticated.value = false;

        localStorage.clear();
        router.push("/");
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        initializeAuth,
    };
});
