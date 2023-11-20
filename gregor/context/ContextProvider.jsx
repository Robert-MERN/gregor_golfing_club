import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import cryptojs from "crypto-js";
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';


const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const router = useRouter();

    const [landing_page_form, set_landing_page_form] = useState("signin");



    const handle_landing_page_form = (target) => {
        set_landing_page_form(target);
    };


    const [openSidebar, setOpenSidebar] = useState(true);
    const handleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }
    const [sidebarTabs, setSidebarTabs] = useState("Mail Sender");
    const switchSidebarTabs = (target) => {
        setSidebarTabs(target);
    }

    const defaultModals = {
        select_players_modal: false,
        edit_campaign_modal: false,
        logout_modal: false,
        subscription_status_modal: false,
        add_edit_guests_fees_modal: false,
        restrict_hours_modal: false,
        delete_booking_modal: false,
        delete_member_modal: false,
        renewal_subscription_modal: false,
        unblock_member_modal: false,
        block_member_modal: false,
        account_status_modal: false,
        unrestrict_slot_modal: false,
    };
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    };
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    };


    // loading state and error toastify for all api calls
    const [APIloading, setAPIloading] = useState(false);

    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
    }


    // booking sessions for golf
    const default_fees_structure = {
        fees_structure: [
            {
                title: "fee_1_hour",
                guest_1: 10
            },
            {
                title: "fee_2_hour",
                guest_1: 20,
                guest_2: 35,
                guest_3: 45,
                guest_4: 55,
            },
            {
                title: "fee_4_hour",
                guest_1: 40,
                guest_2: 60,
                guest_3: 90,
                guest_4: 120,
            }
        ]
    }

    const [fees_structure, set_fees_structure] = useState(default_fees_structure)
    const [players_slots, set_players_slots,] = useState(null);
    const [selected_players, set_selected_players] = useState(null);
    const formatDateToISO = (dateObject) => {
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');

        // Create the ISO 8601 formatted string
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        return isoString;
    };
    const [booking_date, set_booking_date] = useState(new Date());
    const [booking_date_for_admin, set_booking_date_for_admin] = useState(new Date());

    const [booked_events, set_booked_events] = useState([])
    const [bay_field, set_bay_field] = useState("bay-1")
    const [bay_field_for_admin, set_bay_field_for_admin] = useState("bay-1")
    const [snackbar_alert, set_snackbar_alert] = useState({
        open: false,
        message: "",
        severity: "warning"
    });



    // user retreived from cookies
    const [cookieUser, setCookieUser] = useState(null);


    // logging in api
    const handleLoginAPI = async (user, redirect_url) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/login", user);
            router.push("/home");
            toast.success(res.data.message, { ...toastConfig, toastId: "loginSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "loginFailure" });
        } finally {
            setAPIloading(false)
        }
    }


    // getting al members - Admin
    const [all_members, set_all_members] = useState([])
    const handle_get_all_members_API = async (set_members, single_user, id, userId, set_members_2) => {
        set_members([]);
        if (set_members_2) set_members_2([]);
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/get-all-members?single_user=${single_user}&id=${id}`, { id: userId });
            set_members(res.data);
            if (set_members_2) set_members_2(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "fetchingAllUsersFaliure" });
        } finally {
            setAPIloading(false)
        }
    }

    // Adding New Member api
    const handle_add_member_API = async (user, id, default_state_func) => {
        setAPIloading(true);
        try {
            const res = await axios.post(`/api/add-member?id=${id}`, user);
            toast.success(res.data.message, { ...toastConfig, toastId: "signupSuccess" });
            default_state_func();
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "signupFailure" });
        } finally {
            setAPIloading(false)
        }
    }



    // updating user api
    const handleUpdateUserAPI = async (obj, setUpdatingStatus, passwordStateRevert, admin, editMember) => {
        setAPIloading(true);
        try {
            const res = await axios.put(`/api/updateUser/?userId=${cookieUser.id}&editMember=${editMember}`, obj);
            if (setUpdatingStatus) setUpdatingStatus(false);
            if (!admin) {
                setCookieUser(res.data.updatedUser);
                passwordStateRevert();
            }
            handle_get_all_members_API(set_all_members, "", cookieUser.id, "");
            toast.success(res.data.message, { ...toastConfig, toastId: "userUpdateSuccesfull" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userUpdateFailure" });
        } finally {
            setAPIloading(false);
        }
    };

    // Deleting User - Only Admin

    const [member_delete_id, set_member_delete_id] = useState("");
    const handle_delete_member = async (set_members, userId, adminId) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/delete-member?userId=${userId}&adminId=${adminId}`);
            toast.info(res.data.message, { ...toastConfig, toastId: "deleteMemberSuccess" });
            handle_get_all_members_API(set_members, "", adminId, "");
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "deleteMemberFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // getting account/subscription status
    const [account_status_message, set_account_status_message] = useState("")
    const handle_get_account_status = async (id, open) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/get-account-status?id=${id}`);
            if (!res.data.success && res.data.message) {
                set_account_status_message(res.data.message);
                open("account_status_modal");
            } else if (res.data.success && res.data.message) {
                toast.warn(res.data.message, { ...toastConfig, toastId: "getAccountStatusSuccess" });
                open("select_players_modal");
            } else if (res.data.success && !res.data.message) {
                open("select_players_modal");
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAccountStatusFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // sending Mail API
    const handleSendingMail = async (data, reverse_states) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/sendMail", data);
            toast.success(res.data.message, { ...toastConfig, toastId: "sendMailSuccess" });
            reverse_states();
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendMailFailure" });
        } finally {
            setAPIloading(false)
        }
    }








    // Get All Bookings for view API
    const handle_get_all_bookings = async (userId, bay, calendar_date) => {
        setAPIloading(true)
        try {
            const res = await axios.get(`/api/get_all_bookings?bay_field=${bay}&userId=${userId}&calendar_date=${calendar_date ? formatDateToISO(calendar_date).substring(0, 10) : ""}`);
            set_booked_events(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAllBookingsFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // Get Only User Bookings API
    const [single_user_booking_user_view, set_single_user_booking_user_view] = useState([])
    const handle_get_user_bookings = async (userId) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/get_user_bookings?userId=${userId}`);
            set_single_user_booking_user_view(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getUserBookingsFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Get All Users Bookings API for Admin- view

    const [all_users_booking_admin_view, set_all_users_booking_admin_view] = useState([])
    const handle_get_all_user_bookings = async (userId, restricted) => {
        setAPIloading(true);
        set_all_users_booking_admin_view([]);
        try {
            const res = await axios.get(`/api/get_all_users_bookings?userId=${userId}&restricted=${restricted}`);
            set_all_users_booking_admin_view(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAllBookingsFailure" });
        } finally {
            setAPIloading(false);
        }
    }


    // Delete User Bookings - Only Admin - API
    const [booking_delete_id, set_booking_delete_id] = useState("");

    const handle_delete_user_booking_admin = async (bookingId, userId, restricted) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/delete_user_booking?userId=${userId}&bookingId=${bookingId}&reqId=${userId}`);
            if (!res.data.status) {
                toast.warn(res.data.message, { ...toastConfig, toastId: "cantDeleteUserBooking" });
            } else {
                toast.info(res.data.message, { ...toastConfig, toastId: "deleteUserBookingSuccess" });
                handle_get_all_user_bookings(cookieUser.id, restricted);
                handle_get_user_bookings(cookieUser.id);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "deleteUserBookingsFailure" });
        } finally {
            setAPIloading(false);
            set_booking_delete_id("");
        }
    }

    // Creating and Validating Booking API
    const handle_create_booking = async (data, calendar_date, restriction) => {
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/validate-booking`, data);

            if (res.data.status) {
                const res = await axios.post(`/api/create-event?restriction=${Boolean(restriction)}&requesterId=${cookieUser.id}`, data);
                if (res.data.status) {
                    handle_get_all_bookings(cookieUser.id, bay_field, calendar_date);
                    return toast.success(res.data.message, { ...toastConfig, toastId: "createBookingSuccess" });
                }
                return set_snackbar_alert({
                    open: true,
                    message: res.data.message,
                });
            }
            return set_snackbar_alert({
                open: true,
                message: res.data.message,
            })
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "createBookingFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // handle update guests fees
    const handle_update_guests_fees = async (id, data, create) => {
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/update_guests_fees?userId=${id}&create=${create}`, data);
            set_fees_structure(res.data.data);
            toast.info(res.data.message, { ...toastConfig, toastId: "updateGuestsFees" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "updateGuestsFees" });
        } finally {
            setAPIloading(false);
        }
    }

    // handle get guests's fees
    const handle_get_guests_fees = async (userId, range_hour) => {
        setAPIloading(true)
        try {
            const res = await axios.get(`/api/get_guests_fees?userId=${userId}&range_hour=${range_hour}`);
            if (range_hour) {
                set_players_slots(res.data)
            } else {
                set_fees_structure(res.data);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "get_guests_fees_failure" });
        } finally {
            setAPIloading(false)
        }
    }


    return (
        <StateContext.Provider
            value={{

                landing_page_form, handle_landing_page_form,

                handleSidebar, openSidebar, switchSidebarTabs, sidebarTabs,

                handle_add_member_API, handleLoginAPI, handleUpdateUserAPI, handle_get_all_members_API, handle_delete_member, all_members, set_all_members, member_delete_id, set_member_delete_id,

                account_status_message, set_account_status_message, handle_get_account_status,

                APIloading, setAPIloading, setCookieUser, cookieUser,

                handleSendingMail,

                modals, openModal, closeModal,

                handle_update_guests_fees, handle_get_guests_fees, fees_structure, set_fees_structure, players_slots, handle_get_user_bookings,
                single_user_booking_user_view, set_single_user_booking_user_view,
                handle_get_all_user_bookings, handle_delete_user_booking_admin,
                booking_delete_id, set_booking_delete_id, all_users_booking_admin_view,


                selected_players, set_selected_players, booked_events,
                handle_create_booking, handle_get_all_bookings,
                set_booked_events, booking_date, set_booking_date,
                bay_field, set_bay_field, snackbar_alert, set_snackbar_alert,
                bay_field_for_admin, set_bay_field_for_admin, booking_date_for_admin, set_booking_date_for_admin



            }}
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;