import useStateContext from "@/context/ContextProvider";
import styles from "@/styles/Home.module.css";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import SubjectIcon from '@mui/icons-material/Subject';
import { useEffect, useState } from "react";


function Become_member({ user }) {
    const { openSidebar, set_show_navbar_BG, handle_sending_mail } = useStateContext();

    const controlNavbar = () => {
        const scrollVal = document.getElementById("member-page").scrollTop;
        if (scrollVal < 100) {
            set_show_navbar_BG(false);
        } else {
            set_show_navbar_BG(true);

        }
    }

    useEffect(() => {
        controlNavbar();
    }, []);

    const default_form_state = {
        email: '',
        fullName: '',
        subject: '',
        message: '',
        errors: {
            email: '',
            fullName: '',
            subject: '',
            message: '',
        },
    };
    const [formState, setFormState] = useState({
        email: '',
        fullName: '',
        subject: '',
        message: '',
        errors: {
            email: '',
            fullName: '',
            subject: '',
            message: '',
        },
    });
    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'fullName':
                if (!value) {
                    error = 'Please enter your name';
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'subject':
                if (!value) {
                    error = 'Please enter the subject';
                } else if (value.length > 16) {
                    error = 'Is too long (maximum is 16 characters).'
                }
                break;
            case 'message':
                if (!value) {
                    error = "can't be blank";
                }
                break;

            default:
                break;
        }
        return error;
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            handle_sending_mail(formState, () => setFormState(default_form_state));

        }
    }


    return (
        <div id="member-page" onScroll={controlNavbar} className={`${styles.scrollBar} ${user ? "h-[calc(100vh-60px)] lg:pt-6 pt-24" : "h-screen pt-[100px]"} flex flex-col items-center  px-[20px]  ${openSidebar ? "lg:px-[40px]" : "lg:px-[120px] w-screen"} overflow-y-auto  transition-all duration-300`}>

            <h1 className="text-stone-100 text-[20px] lg:text-[28px] font-medium text-center mb-1 lg:w-[750px] transition-all" >Join the Greens: Become a Proud Member Today!</h1>
            <p className='text-[13px] lg:text-[17px] text-stone-400 lg:w-[750px] text-center mt-3 transition-all' >Welcome to the Gregor Golfing Club, where your golfing dreams come to life! We invite you to become a part of our exclusive golfing family. Our club is not just about playing golf; it's about forging lasting connections, honing your skills, and basking in the joy of the game.</p>

            <div className={`${openSidebar && user ? "lg:w-full" : "lg:w-[900px]"} mt-16 px-[20px]`}>

                <h2 className='font-bold text-zinc-100 mt-3' >Why Choose Gregor Golfing Club?</h2>
                <ol className='list-outside list-disc mb-4' >
                    <li className='text-[13px] lg:text-[15px] text-zinc-300 font-medium py-2' >
                        🏌️‍♂️ Exceptional Courses: Immerse yourself in the natural beauty of our meticulously designed golf courses, offering challenges for every level of golfer.
                    </li>
                    <li className='text-[13px] lg:text-[15px] text-zinc-300 font-medium py-2' >
                        🤝 Community Spirit: Join a community of passionate golfers who share your enthusiasm for the sport, making memories both on and off the fairways.
                    </li>
                    <li className='text-[13px] lg:text-[15px] text-zinc-300 font-medium py-2' >
                        🌟 Exclusive Events: Gain access to a calendar filled with exclusive member-only tournaments, events, and social gatherings.
                    </li>
                    <li className='text-[13px] lg:text-[15px] text-zinc-300 font-medium py-2' >
                        ⛳ Expert Instruction: Elevate your game with top-notch coaching from our experienced golf professionals.
                    </li>
                    <li className='text-[13px] lg:text-[15px] text-zinc-300 font-medium py-2' >
                        🍽️ Fine Dining: Enjoy exquisite dining experiences at our club's restaurants, where you can savor delectable meals in a relaxing atmosphere.
                    </li>

                </ol>
            </div>

            <h1 className="text-stone-100 text-[18px] lg:text-[22px] font-semibold text-center mb-1 lg:w-[650px] mt-12" >Become a Member and Swing into Excellence!</h1>
            <p className='text-[12px] lg:text-[16px] text-stone-400 lg:w-[650px] text-center' >Your golfing adventure begins here. Fill up the form below to explore our GPC-Golf and start enjoying the greens like never before.</p>


            <div className='flex-1 flex flex-col justify-center my-8'>
                <form onSubmit={handleSubmit} className='w-full h-full bg-stone-100 rounded-md px-[10px] py-4 md:p-6 flex flex-col gap-4' >
                    <FormControl size="small">
                        <OutlinedInput
                            placeholder='Full Name*'
                            name="fullName"
                            error={Boolean(formState.errors.fullName)}
                            value={formState.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonOutlinedIcon className='text-stone-400 lg:scale-100 scale-75' />
                                </InputAdornment>
                            }
                        />
                        {formState.errors.fullName && <FormHelperText error>{formState.errors.fullName}</FormHelperText>}
                    </FormControl>

                    <FormControl size="small">
                        <OutlinedInput
                            placeholder='Subject*'
                            name="subject"
                            error={Boolean(formState.errors.subject)}
                            value={formState.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SubjectIcon className='text-stone-400 lg:scale-100 scale-75' />
                                </InputAdornment>
                            }
                        />
                        {formState.errors.subject && <FormHelperText error>{formState.errors.subject}</FormHelperText>}
                    </FormControl>

                    <FormControl size="small">
                        <OutlinedInput
                            placeholder='Email*'
                            name="email"
                            error={Boolean(formState.errors.email)}
                            value={formState.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            startAdornment={
                                <InputAdornment position="start">
                                    <MailIcon className='text-stone-400 lg:scale-100 scale-75' />
                                </InputAdornment>
                            }
                        />
                        {formState.errors.email && <FormHelperText error>{formState.errors.email}</FormHelperText>}
                    </FormControl>

                    <FormControl>
                        <OutlinedInput
                            placeholder='Message*'
                            name="message"
                            error={Boolean(formState.errors.message)}
                            value={formState.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            multiline
                            rows={5}

                        />
                        {formState.errors.message && <FormHelperText error>{formState.errors.message}</FormHelperText>}
                    </FormControl>

                    <button type='submit' className='w-full py-[10px] rounded-md bg-[#6CBE45] hover:opacity-[.8] active:opacity-[.7] transition-all text-white font-medium text-[14px]' >
                        SEND MESSAGE
                    </button>

                    <p className='text-stone-400 text-[14px] leading-tight text-center mt-2 px-4' >
                        Gregor doesn't sell, share or trade customer information your privacy is very important to us.
                    </p>
                </form>
            </div>


            <p className='text-[11px] lg:text-[15px] text-stone-400 lg:w-[650px] text-center my-6' >At Gregor Golfing Club, we're not just golfers; we're a community of individuals passionate about the sport. We look forward to welcoming you with open arms and helping you create golfing memories that last a lifetime. Come, be a part of something extraordinary!</p>
        </div>
    );
}

export default Become_member;
