import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Home_page from '@/components/Home_page'
import Sidebar from '@/components/utilities/Sidebar'
import useStateContext from '@/context/ContextProvider'
import { getCookie, deleteCookie } from "cookies-next"
import jwt from "jsonwebtoken";
import { useEffect } from 'react'






export default function Home({ user }) {

    const { openSidebar, setSignupUser, setCookieUser } = useStateContext();
    useEffect(() => {
        // setting logged-in user from cookie in contextAPI 
        setCookieUser(user);
    }, []);

    console.log(user);

    return (
        <div className={`flex w-screen h-screen gap-3 ${styles.container} ${styles.scrollBar}`} >
            <Head>
                <title>Gregor Private Club - GPC Golf</title>
                <meta name="description" content="Gregor Private Club - GPC Golf" />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            {openSidebar && user &&

                <Sidebar />

            }
            <Home_page user={user} page="contact_us" />
        </div>
    )
}




export const getServerSideProps = async function ({ req, res }) {
    const userToken = getCookie("userAccountToken", { req, res });
    if (!userToken) {
        return {
            props: { user: null },
        }
    } else {
        const user = jwt.verify(userToken, process.env.JWT_KEY)
        return {
            props: { user },
        }
    }
}