import React from 'react'
import useStateContext from '@/context/ContextProvider';
import App_navbar from './utilities/App_navbar'
import Golfing_bays_bookings from './booking_pages/Golfing_bays_bookings';
import Navbar from './utilities/Navbar';
import Contact_us from './website/Contact_us';
import Edit_profile from './website/Edit_profile';
import My_bookings from './booking_pages/My_bookings';
import Become_member from './website/Become_member';
import About from './website/About';
import styles from "@/styles/Home.module.css";
import Golfing_bays_bookings_admin from "./admin_pages/Golfing_bays_bookings_admin";
import All_bookings from './admin_pages/All_bookings';
import Add_new_member from "./auth_pages/forms_auth/Add_member";
import All_members from './admin_pages/All_members';

const HomePage = ({ page, user }) => {
    const { } = useStateContext();

   
    return (
        <div className={`flex-[7] bg-[#1F2822] transition-all h-screen ${styles.scrollBar}`} >
            {user ?

                <App_navbar />
                :
                <Navbar />
            }
            {page === "golfing_bays_bookings" ?
                <Golfing_bays_bookings />
                : page === "edit_profile" ?
                    <Edit_profile />
                    : page === "contact_us" ?
                        <Contact_us user={user} />
                        : page === "about" ?
                            <About user={user} />
                            : page === "my_bookings" ?
                                <My_bookings />
                                : page === "become-member" ?
                                    <Become_member user={user}  />
                                    : page === "golfing_bays_bookings_admin" ? <Golfing_bays_bookings_admin />
                                        : page === "add_new_member" ?
                                            <Add_new_member />
                                            : page === "all_members" ?
                                                <All_members />
                                                :
                                                <All_bookings />
            }
        </div>
    )
}

export default HomePage