import { FAQItem } from "@/types/home.type";
import { SO_DEFAULT_STORE_SUPPORT_NUMBER } from "@root/host/src/constants/common.constants";

export const Constants = {
    "WINDOW_SIZE": {
        MOBILE: '(min-width:426px)',
        TABLET: '(min-width:1024px)'
    },
    "LANGUAGE": {
        BOOK_EYE_EXAM: "Book Eye Exam",
        APPOINTMENTS: "Appointments",
        SETTINGS: "Settings",
        CHECK_EXAM_TODAY: "Check Exam Today",
        SEE_OFFER_DETAILS: "*See offer details",
        "SHOP MEN": "SHOP MEN",
        "SHOP WOMEN": "SHOP WOMEN",
        "SHOP KIDS": "SHOP KIDS",
        "SHOP ALL": "SHOP ALL",
        "TAKE A LOOK": "TAKE A LOOK",
        "REFER A FRIEND": "REFER A FRIEND",
        SIGN_ME_UP: "Sign me up!",
        COPYRIGHT: "COPYRIGHT",
        VISIT: 'Visit any of our stores and get',
        STORE_SUPPORT: "Store Support",
    },
    MESSAGES: {
       APPOINTMENT_BOOKING_FAILED_DEFAULT: `We couldn’t find a time for you. Please contact our Support Center at ${SO_DEFAULT_STORE_SUPPORT_NUMBER} to schedule
       your appointment.`,
       APPOINTMENT_CANCELED: 'Appointment canceled successfully'
    }
}

export const FaqQnA: FAQItem[] = [
    {
      question: "How much does an eye exam cost?",
      answer:
        "The eye exam is free with the purchase of glasses. Without insurance or the purchase of glasses, the cost of the eye exam is $69 ($99 in AK). A contact lens exam typically costs $109 ($119 in AK, AR and OK)* and includes prescriptions for both contacts and glasses, and a free pair of trial lenses. We also have in-store deals on contact lenses that include a Free Contact Lens Eye Exam. Check out all our deals here. *Exam pricing may vary by state, visit or call your local store for more details. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. ",
    },
    {
      question: "How long does it take for an eye exam?",
      answer:
        "The overall eye exam, including your pre-test, takes approximately 25 minutes.",
    },
    {
      question: "What type of insurance do you accept?",
      answer:
        "We accept most major insurance plans including FSA & HSA. We also provide a special discount for Medicaid in-store. See our Insurance page for a current list of accepted insurance. We also offer special in-store promotions, some of which can be paired with insurance purchases. Please bring your insurance card so we can verify your benefits in-store and help you maximize your plan. We do everything we can to provide you with the best pricing.  ",
    },
    {
      question: "Do I need to use insurance?",
      answer:
        "No, insurance is not needed. We make eyewear affordable for everyone. We offer competitive promotions you can use without insurance including a free eye exam with the purchase of eyeglasses.",
    },
    {
      question: "How long does it take for my glasses to be ready?",
      answer:
        "Depending on your frames and prescription, single-vision glasses can be made in-store in :30 minutes using our on-site lab, or can take between 7-14 business days to complete.",
    },
  ];