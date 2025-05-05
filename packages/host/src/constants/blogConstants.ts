import { ImageUrlConstants } from "./image.url.constants";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const BLOG_DESKTOP_BANNER =
  BASE_IMAGE_URL +
  "transform/7f01cadc-6fff-4f56-9f9a-2c44d934c186/SO-New-Blog-Banner_Desktop";
export const BLOG_MOBILE_BANNER =
  BASE_IMAGE_URL +
  "transform/f4c0d1a6-7f2a-413a-9ff0-d7ae367a8fec/SO-New-Blog-Banner_Mobile";

export interface IBlogMeta {
  date: string;
  description: string;
  image: string;
  tag: string;
  title: string;
  url: string;
}

export interface IBlog_Page {
  image?: string;
  alt: string;
  title: string;
  date: string;
  tag: string;
  url: string;
  content: {
    content1: string;
    content2?: string;
    image1?: string;
    image2?: string;
  };
  meta: {
    title: string;
    description: string;
  };
  hasDynamicBanner?: boolean;
}

const BLOG_IMAGES = ImageUrlConstants.BLOG;

export const BLOGS: IBlogMeta[] = [
  {
    image: BLOG_IMAGES.CAN_EYE_EXAM_BLOG_TILE,
    date: "March 18th, 2025",
    description:
      "I’ve been wearing glasses for as long as I can remember so keeping up with annual eye exams has always been part of my eye care routine, and my local Stanton Optical has been my go-to for some time now, because I can just walk-in for an eye exam without an appointment.",
    tag: "Eye Care",
    title: "Can an Eye Exam Change My Life? —You Bet!",
    url: "/blog/can-an-eye-exam-change-my-life",
  },
  {
    image: BLOG_IMAGES.SEVEN_HABITS_BLOG_TILE,
    date: "March 11th, 2025",
    description:
      "Are your eyes killing you by lunchtime? You’re staring at your screen, and suddenly everything’s a blurry mess—or maybe your head is pounding, and your eyes feel like sandpaper. Yep, welcome to the modern-day reality of digital eye strain. Here are a few simple habits that can make...",
    tag: "Eye Care",
    title: "7 Habits to Make Your Eyes Work Smarter",
    url: "/blog/seven-habits-to-make-your-eyes-work-smarter",
  },
  {
    image: BLOG_IMAGES.KICKSTART_BLOG_TILE,
    date: "March 4th, 2025",
    description:
      "The start of a new year is the perfect time to focus on your health and well-being. Many of us set goals for fitness, diet, or mindfulness, but one critical area often gets overlooked: your eyes.",
    tag: "Eye Health",
    title:
      "Kickstart Your Year with a Wellness Checklist: Don’t Forget Your Eyes!",
    url: "/blog/kickstart-your-year-with-a-wellness",
  },
  {
    image: BLOG_IMAGES.GLAUCOMA_AWARENESS,
    date: "January 16th, 2025",
    title: "Glaucoma Awareness Month: Understanding and Preventing Vision Loss",
    url: "/blog/glaucoma-awareness-month",
    tag: "Eye Care",
    description:
      "January marks Glaucoma Awareness Month, a critical time to spotlight one of the leading causes of blindness worldwide. At Stanton Optical, we’re committed to educating our communities about the importance of early detection...",
  },
  {
    image: BLOG_IMAGES.NEW_YEAR_NEW_YOU,
    url: "/blog/new-year-new-you-blog-2025/",
    title: "Eyewear Trends of 2025: Unapologetically You",
    date: "January 14th, 2025",
    tag: "Eye Care",
    description:
      "This year is all about timeless elegance and bold self-expression. Every year, we at Stanton Optical combine the precision of data with the artistry of fashion to predict the hottest eyewear trends.",
  },
  {
    image: BLOG_IMAGES.BACK_TO_SCHOOL,
    url: "/blog/back-to-school-blog-2024/",
    title: "Back-to-School: Keeping an Eye on your Child’s Sight",
    date: "July 9th, 2024",
    tag: "Eye Care",
    description:
      "Here's how to identify signs of possible eye-related condition (such as refractive error) and understand when a visit to Stanton Optical is essential.",
  },
  {
    image: BLOG_IMAGES.EYE_POPPING_TRENDS,
    url: "/blog/eyeglasses-trends-2024/",
    title: "Eye Popping Trends for 2024",
    date: "February 12th, 2024",
    tag: "Eye Care",
    description:
      "2024 is about expression and showing your personality and individuality through fashion and eyewear. From Bold, vibrant colors to oversized eyewear, we will share the best 2024 trends!",
  },
  {
    image: BLOG_IMAGES.MACULAR_PREVENTIVE_CARE,
    url: "/blog/macular-preventive-care/",
    title: "Macular Degeneration and Preventative Care",
    date: "February 5th, 2024",
    tag: "Eye Care",
    description:
      "February is Macular Degeneration Awareness Month, a condition that leads to significant vision loss. Want to know how to prevent this condition? Let’s take a dive and learn about preventative care.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/a115489f-5a6a-4e8e-a6ff-c7c7a5deb20c/023_Digital_2021_Blog_ContactGuide_SO_580x248",
    url: "/blog/contact-lens-quick-guide/",
    title: "Contact Lens Quick Guide",
    date: "April 5th, 2021",
    tag: "Contact Lenses",
    description:
      "When it comes to everyday eyewear convenience, contacts are a fantastic option. Contact lenses don’t have to be intimidating. Check out these contact basics to help you understand this world!",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/fd026cfc-59cc-470d-a78f-995f3f5f9080/how-to-properly-care-for-your-eyeglasses",
    url: "/blog/how-to-properly-care-for-your-eyeglasses/",
    title: "How To Properly Care For Your Eyeglasses",
    date: "December 27th, 2019",
    tag: "Eye Care",
    description:
      "Did you know eyeglasses can harbor dirt and bacteria if they’re not properly cleaned and stored on a regular basis? Follow the guidelines from this blog to properly care for your eyeglasses.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/d72f2150-0329-4884-9e11-d3dd8c7244c1/protect-your-eyes-with-platinum-blue-anti-glare-lenses",
    url: "/blog/protect-your-eyes-with-platinum-blue-anti-glare-lenses/",
    title: "Protect Your Eyes With Platinum Blue Anti-Glare Lenses",
    date: "November 19th, 2019",
    tag: "Eye Care",
    description:
      "In the digital era, too much screen time can affect eye health. Platinum Blue Anti-Glare Lenses can protect your eyes from the harmful blue light transmitted from different devices.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/34e7af30-7ad3-4214-a43a-d10709178a03/responsive-lenses",
    url: "/blog/responsive-lenses/",
    title: "Responsive Lenses",
    date: "October 13th, 2019",
    tag: "Eye Care",
    description:
      "Responsive lenses are designed to darken when they become exposed to UV light and then become clear when indoors and not exposed to UV light. They reduce eye strain, and squinting in the sunlight.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/b7fba181-d703-47b7-8619-23afcbfce612/reasons-wearing-glasses",
    url: "/blog/reasons-wearing-glasses/",
    title: "Top 5 Reasons For Wearing Glasses",
    date: "September 11th, 2019",
    tag: "Eye Care",
    description:
      "We have put together the top 5 reasons for getting eyeglasses. From a fashion decision to eye protection, check this blog to learn the importance of wearing glasses, and visit our stores!",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/3abb44da-666c-4025-b5a5-5a4c74625ba8/vision-insurance-accepted-stanton-optical",
    url: "/blog/vision-insurance-accepted-stanton-optical/",
    title: "Making The Most Of Your Vision Insurance",
    date: "August 22nd, 2019",
    tag: "Eye Exam",
    description:
      "Make the most of your Vision Insurance with Stanton Optical. We proudly accept a wide variety of vision insurance providers which can help save you money when purchasing eyewear.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/5b08d074-1cee-49bf-8242-b502bb154177/contact-lens-fitting-vs-eye-exam",
    url: "/blog/contact-lens-fitting-vs-eye-exam/",
    title: "What’s The Difference Between Contact Lens Fitting Vs Eye Exam?",
    date: "July 23rd, 2019",
    tag: "Contact Lenses",
    description:
      "Have you been considering wearing contacts? Are you wondering how they’ll feel, and whether you’d like them better than glasses? This should be a decision taken before your eye exam.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/5b1d9f2b-e378-41ef-83fa-9f20899c7d08/virtual-eye-care-with-telehealth-technology",
    url: "/blog/virtual-eye-care-with-telehealth-technology/",
    title: "Our Telehealth Technology",
    date: "June 3rd, 2019",
    tag: "Eye Exam",
    description:
      "In partnership with the Physicians Eyecare Group, Stanton Optical offers patients the opportunity to receive eye care through telemedicine technology (telehealth eye exams).",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/5356efdf-77f6-418d-9146-131bf2eeece9/top-4-eye-charts-used-eye-exams",
    url: "/blog/top-4-eye-charts-used-eye-exams",
    title: "Top 4 Eye Charts Used During Eye Exams",
    date: "May 16th, 2019",
    tag: "Eye Exam",
    description:
      "Eye charts are just one of many tools the doctor uses when conducting an eye exam, but they serve a valuable purpose when checking your vision. Check the four most common eye charts!",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/9b7c8cbc-8df4-42a5-a2a7-e25dddb70ce0/2020-vision-banner",
    url: "/blog/2020-vision/",
    title: "The True Meaning Of 20/20 Vision",
    date: "April 20th, 2019",
    tag: "Eye Exam",
    description:
      "When most people hear the term 20/20 vision, they understand that it is to have perfect vision. In reality, it refers to your visual acuity, which is the clarity or sharpness of your vision.",
  },
  {
    image:
      BASE_IMAGE_URL +
      "transform/772a8f2b-f3b4-4573-a3ea-618773da4ee5/soft_contant_lenses_stanton_optical",
    url: "/blog/hard-vs-soft-contact-lenses/",
    title: "Soft Contact Lenses Vs. Hard Contact Lenses",
    date: "March 11th, 2019",
    tag: "Contact Lenses",
    description:
      "When choosing contacts, you need to know if you want hard or soft contact lenses. The decision might depend on the outcome of your eye exam. Want to know the difference?",
  },
];

export const BLOGS_PAGES: Record<string, IBlog_Page> = {
  "hard-vs-soft-contact-lenses": {
    image:
      BASE_IMAGE_URL +
      "transform/772a8f2b-f3b4-4573-a3ea-618773da4ee5/soft_contant_lenses_stanton_optical",
    alt: "Contact Lens fitting vs eye exam.",
    title: "Soft Contact Lenses Vs. Hard Contact Lenses",
    date: "March 11th, 2019",
    tag: "Contact Lenses",
    url: "/blog/hard-vs-soft-contact-lenses/",
    content: {
      content1:
        "<p>People who wear contact lenses are used to making choices. Stanton Optical is a retailer who is fully equipped to provide prescription contact lenses to anyone that wants them. When you are choosing contacts, you need to know if you want hard contact lenses or soft contact lenses. Making this decision is not as easy as it seems, as the answer depends not only on preference but also on the outcome of the eye exam, and whether contact lenses or glasses will be the better option.</p><p>After deciding that contacts are the best option, the patient must then determine if they want to wear soft contact lenses or hard contact lenses.</p><h3>Soft contacts</h3><p>Soft contact lenses are extremely comfortable and easy to apply. This type of contact lens stays in place and is easier to adjust than hard contact lenses. Soft contact lenses are made out of a flexible plastic that is combined with water to allow oxygen to flow through the contact lens and to the cornea. This increases comfort and helps maintain eye health. In most cases, soft contacts are used to correct myopia, also known as nearsightedness, hyperopia or farsightedness, astigmatism or blurred vision, and age related loss of close-up vision.</p><p>Soft lenses are disposable and there are varieties of soft lenses available that can be worn for several days before they need to be removed and discarded.</p>",
      image1: BASE_IMAGE_URL + "m/51804018c3d0f8d1/original/pp-pic.jpg",
      content2:
        "<h3>Hard contacts</h3><p>Hard contact lenses are the second option of contact lenses available. These lenses have come a long way since the 1970s. Hard contact lenses today are rigid gas permeable lenses which allow for more flexibility and oxygen to pass through the lens to the cornea, while still maintaining their shape on the eye. Rigid gas permeable contacts have been known to help slow down the development of nearsightedness in young adults and adult contact lens wearers. Furthermore, these contact lenses are extremely durable, easy to care for, handle and wear. They offer clear, crisp vision and can correct most astigmatism.</p><p>The few disadvantages to hard contact lenses include:</p><ul><li>Vulnerability to scratches</li><li>Can easily dislodge from the center of the eye</li><li>In order to grow accustom to them, you must wear them consistently.</li></ul><h3>Making the decision</h3><p>When making the final decision on what contact lens to choose, there are many things to consider such as eye condition, lifestyle, budget and personal preference. In some cases, one may start out with soft contact lenses and then decide to switch to hard contact lenses.  Which ever may be your case, here at Stanton Optical we can not only provide a contact lens exam, but we can also guide you and help you choose the best fit for you.</p><p>Make sure to visit a Stanton Optical location near you, to schedule your next appointment and learn which contact lens is right for you!</p>",
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Soft Contact Lenses vs Hard Contact Lenses - Stanton Optical",
      description:
        "Deciding between Soft and Hard Contact Lenses is not as easy as it seems, as the answer depends not only on preference but also on the eye exam results.",
    },
  },
  "2020-vision": {
    image:
      BASE_IMAGE_URL +
      "transform/9b7c8cbc-8df4-42a5-a2a7-e25dddb70ce0/2020-vision-banner",
    alt: "Snellen Eye Chart.",
    url: "/blog/2020-vision/",
    title: "The True Meaning Of 20/20 Vision",
    date: "April 20th, 2019",
    tag: "Eye Exam",
    content: {
      content1:
        "<p>When most people hear the term 20/20 vision or find out they have 20/20 vision, they understand that to mean that they have perfect vision. They don’t hesitate to share that they have perfect 20/20 vision and do not know what it’s like to have to wear glasses or put on contacts.</p><p>We don’t mean to burst their bubble, but 20/20 vision does not mean having  “perfect vision.” When the optometrist says that you have “20/20 vision” he is referring to your visual acuity, which is the clarity or sharpness of your vision. When the doctor tests for 20/20 visual acuity he is testing how well your eyes can see an object at a distance of 20 feet. If you can see the letters clearly, then you are considered to have “normal vision.” This number indicates that you can see objects clearly at a distance of 20 feet, compared to other people.</p><h3>Snellen eye chart</h3><p>Optometrist test your visual acuity using the Snellen Eye Chart. The Snellen Eye Chart is used to test visual acuity. It consists of displaying letters of progressively smaller sizes. The common Snellen chart has 11 lines of block letters. The first line consists of one large letter, like the “E” in the image shown below. Depending on the Snellen Chart, the first letter can one of several letters including E,H, and N. As you move down the chart each row not only gets smaller, but also increases in number of letters. The further down you can make it in the chart, the closer you are to having 20/20 vision. The eighth row is 20/20 visual acuity.</p><p>The common Snellen eye chart looks like this:</p>",
      image1:
        BASE_IMAGE_URL +
        "transform/8ec1ee9e-57f9-437d-aacd-8edb448827a3/2020_vision_exam",
      content2:
        "<h3>Variations of 20/20 vision</h3><p>Having 20/20 vision may be the goal, and the minimum requirement for pilots, but there are different variations such as:</p><ul><li>Peripheral awareness</li><li>Eye coordination</li><li>Depth perception</li><li>Ability to focus</li><li>Color vision</li></ul><p>Here at Stanton Optical our independent eye care doctor will ensure that you receive An eye exam and receive the appropriate eye care.</p><p>Call a Stanton Optical location near you and schedule your appointment today!</p>",
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "The True Meaning of 20/20 Vision - Stanton Optical",
      description:
        "When the optometrist says that you have “20/20 vision” he is referring to your visual acuity, which is the clarity or sharpness of your vision.",
    },
    hasDynamicBanner: true,
  },
  "top-4-eye-charts-used-eye-exams": {
    image:
      BASE_IMAGE_URL +
      "transform/5356efdf-77f6-418d-9146-131bf2eeece9/top-4-eye-charts-used-eye-exams",
    alt: "Eye Exam Chart.",
    url: "/blog/top-4-eye-charts-used-eye-exams",
    title: "Top 4 Eye Charts Used During Eye Exams",
    date: "May 16th, 2019",
    tag: "Eye Exam",
    content: {
      content1: `<p>“Can you please read me the first 2 lines?”</p><p>“Umm..sure. E, F, P.”</p><p>Most of us have experienced the nerve racking moment when the Optometrist asks you to read the letters off the eye chart. We start to second guess ourselves and how “blind” we are. But just like most things in medicine, there is a method to using the eye charts.</p><p>Eye charts are just one of many tools the doctor uses when conducting an eye exam, but they  serve a valuable purpose when checking your vision.</p><p>Eye charts are used during an eye exam to measure visual acuity by checking how well you see in comparison to other people. Your eye doctor has you look at the eye chart and read the smallest line of text that you can see from 20 feet away. If you see clearly at 20 feet, which is what most people see at that distance, you have 20/20 vision.</p><p>In the United States legal blindness is defined as your best corrected vision, even when wearing glasses or contact lenses, is only 20/200.  20/200 vision means you have to get within 20 feet of the eye chart to read the line that people with normal vision can see from 200 feet away.</p><h3>Top eye charts used by optometrists</h3><p>Optometrists use eye charts as a basic vision check. Today many variations of the eye chart exist. The four most common eye charts used are:</p><h3>1. SNELLEN</h3><p>The original eye chart designed in the 1860’s by the Dutch eye doctor Hermann Snellen. The first line on this chart is a giant letter E. You read the chart from top to bottom, left to right covering one eye at a time.</p><h3>2. TUMBLING E</h3><p>This type of eye chart is used for children that are too small to read or adults with reading or speaking difficulties. The patient is asked to lift their hand up, down, to the left or right depending on the image orientation of the letter E they see on the chart.</p><h3>3. LANDOLT C</h3><p>Edmund Landolt, a Swiss ophthalmologist, created this visual acuity chart. This eye chart, which is similar to the Tumbling E chart, uses a Landolt broken ring symbol in various orientations. The Landolt C chart is a way to check vision for illiterate or mute patients.</p><h3>4. ETDRS</h3><p>The Early Treatment Diabetic Retinopathy Study helped develop standardization for both visual acuity testing and eye chart design. The ETDRS is accepted by The National Eye Institute and the Food and Drug Administration as the mandated standard for clinical eye test trials worldwide.</p><h3>Get your eye exam at stanton optical</h3><p>Optometrists are primary healthcare providers and offer eye and vision care services to their patients. A Doctor of Optometry does many different vision tests during a routine eye examination, including the eye chart test.</p><p>Besides prescribing corrective eye wear, eye doctors also diagnose common vision problems like cataracts, macular degeneration and diabetic retinopathy.</p><p>Schedule your appointment at Stanton Optical today!</p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Top 4 Eye Charts Used During Eye Exams - Stanton Optical",
      description:
        "Eye charts are just one of many tools the doctor uses when conducting an eye exam, but they serve a valuable purpose when checking your vision.",
    },
    hasDynamicBanner: true,
  },
  "virtual-eye-care-with-telehealth-technology": {
    image:
      BASE_IMAGE_URL +
      "transform/5b1d9f2b-e378-41ef-83fa-9f20899c7d08/virtual-eye-care-with-telehealth-technology",
    alt: "Telehealth Technology.",
    url: "/blog/virtual-eye-care-with-telehealth-technology/",
    title: "Our Telehealth Technology",
    date: "June 3rd, 2019",
    tag: "Eye Exam",
    content: {
      content1: `<p>In response to COVID-19, Stanton Optical is now only offering telehealth eye exams. In partnership with the Physicians Eyecare Group, select locations across the nation will offer patients the opportunity to receive eye care through telemedicine. All retail stores that do not offer telehealth services will be closed temporarily.</p><p>Due to the Coronavirus, extra safety measures will be taken at each store. These include:</p><ul><li>A pre-screening questionnaire before patients are let in for an exam.</li><li>Enforcement of strict capacity rules to keep employees and patients within safe social distancing proximity (or a maximum of 10 people)</li><li>Additional cleaning and sanitizing precautions.</li><li>After the pre-testing (which includes digital photos of the front of the eye, retinal images, a screening for glaucoma as well as additional testing), a Technician will escort the patient to a private, sanitized examination room for an Acuities and Refraction Exam to test for the glasses or contact lens prescription. The test is performed virtually via video-screen.</li><li>The remote Ophthalmologist (MD) or Optometrist then creates the patient’s customized eye care treatment plan and prescription.</li><li>Alternative forms of dispensing will be implemented, including curbside order pick-up and order delivery options where permitted.</li></ul><p>“This is a unique opportunity to provide a service to people who need it when others can’t during such a crisis,” said Daniel Stanton, CEO of My Eyelab and Stanton Optical. “This solution allows customers to receive eye care in a safe, no-contact way, and allows us to keep jobs in our stores. Our updated policies and procedures will allow customers who have eye care emergencies to access these services in the safest way possible.”</p><p>Telehealth co-creator and 20-year veteran optometrist Dr. Brad Brocwell, Vice President of Clinical Operations for Now Optics, designed a customized approach utilizing Now Optics Health Services’ proven telehealth solutions. Over the past 3+ years, more than 1 million telehealth eye exams have been conducted through the company’s proprietary technology and network of doctors.</p><p>“Now more than ever customers are looking for the safest way to receive services, and we are at the forefront of telemedicine as it pertains to eye health,” said Brocwell. “If someone’s prescription expires during this crisis or has a need for prescription eyewear, we are the only provider of telehealth eye care services nationwide. We are stepping up to deliver a safe and reliable experience.”</p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Our Telehealth Technology - Stanton Optical",
      description:
        "Stanton Optical is offering telehealth eye exams and extra safety measures in their open stores to protect their customers in times of COVID 19.",
    },
    hasDynamicBanner: true,
  },
  "contact-lens-fitting-vs-eye-exam": {
    image:
      BASE_IMAGE_URL +
      "transform/5b08d074-1cee-49bf-8242-b502bb154177/contact-lens-fitting-vs-eye-exam",
    alt: "Contact Lens fitting",
    url: "/blog/contact-lens-fitting-vs-eye-exam/",
    title: "What’s The Difference Between Contact Lens Fitting Vs Eye Exam?",
    date: "July 23rd, 2019",
    tag: "Contact Lenses",
    content: {
      content1: `<p>Have you been considering wearing contacts? Are you wondering how they’ll feel, and whether you’d like them better than glasses? Then you should talk to your eye doctor during your next eye exam. You’ll want to let him know ahead of time that you’re interested in trying contact lenses, as a contact lens fitting exam is different from a regular eye exam.</p><h3>Eye exam</h3><p>When you go to your doctor for a regular eye exam, he’s checking your eyes for more than just your latest prescription lenses. He’s also checking for any possible eye infections or diseases you may have, as well as indications that a problem may becausing. He performs several different tests using several different machines. Once the eye exam is over, your doctor will tell you if your eyesight has changed drastically enough to change your prescription, and order your new lenses and frames.</p><h3>Contact lens fitting</h3><p>When you go to your doctor for a contact lens fitting, he’s checking your eyes to decide what strength you need, and what type you need. There are various types of contacts, some for sensitive eyes, some for astigmatism, and even some for those who need bifocals. You can even select colored contact lenses. Once you and your doctor decide what type of contact is best for you, and he determines the strength you need, he’ll put your first pair in your eyes for you.</p><h3>Adjusting to contacts</h3><p>Once that first pair is in your eyes, you’ll stay at your doctor’s office for a while. He’ll want to know that you can see properly before you leave. He might try a couple of different pairs depending on your vision and comfort. Once you’ve selected the proper pair, he’ll show you how to put them in and take them out, and how to take care of them. You’ll also schedule a follow-up appointment with him, where you’ll determine if the contact you have works for you, or if you need to try a different pair. Once you both have determined which type of contact lenses are right for you, your doctor will order a full set of contacts.</p><p>Come in to any Stanton Optical store the next time you need either an eye exam for prescription glasses or want to be fitted for contact lenses. You can order contacts at the store, from as low as $12.49 per box when you order an annual supply. Stanton offers many brands of contact lenses including daily, weekly and monthly disposable contacts.</p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title:
        "What's the Difference Between Contact Lens Fitting vs Eye Exam? - Stanton Optical",
      description:
        "Have you been considering wearing contacts? Are you wondering how they’ll feel, and whether you’d like them better than glasses? Schedule your exam today!",
    },
  },
  "vision-insurance-accepted-stanton-optical": {
    image:
      BASE_IMAGE_URL +
      "transform/3abb44da-666c-4025-b5a5-5a4c74625ba8/vision-insurance-accepted-stanton-optical",
    alt: "Vision Insurance Accepted",
    url: "/blog/vision-insurance-accepted-stanton-optical/",
    title: "Making The Most Of Your Vision Insurance",
    date: "August 22nd, 2019",
    tag: "Eye Exam",
    content: {
      content1: `<p>In today’s workforce, many companies offer their employees not only health insurance, but, in some cases vision insurance or discount vision plans. Having these added benefits to your insurance plan ensures you will receive the proper eye care each year. Furthermore, having supplemental vision insurance can help in saving you money when purchasing eyeglasses or contact lenses.</p><h3>Types of vision insurance</h3><p>Most employers offer their employees two types of vision insurance:</p><h3>VISION BENEFITS PACKAGE:</h3><p>Vision benefit packages provide consumers with free eye care services and eyewear within a predetermined fixed dollar amount. In this case, the consumer pays an annual premium or membership fee and a small co-pay. In some cases, a deductible may be necessary.</p><h3>DISCOUNT VISION PLAN:</h3><p>Discount vision plans offer customers with eye care and eyewear at a discounted rate, after an annual membership and/ annual premium is paid. Knowing which of these options to choose, will be determined by your need for vision care. The Vision Benefits Package may be a better option if you need to visit the eye doctor more than once a year. The Discount Vision Plan may be the better option if you only need to visit your eye doctor for your annual eye exam.</p><h3>Stanton optical accepts most vision insurance plans</h3><p>At Stanton Optical we take our customers eye health seriously and accept a wide range of vision insurance providers. This grants us the opportunity to provide top tiered vision health and eye care services to various communities throughout the U.S. If you do not have insurance, don’t fret! Stanton Optical offers great deals on eye exams and frames, like our Buy 1 Pair, Get the 2nd Pair FREE offer which includes a FREE eye exam. Stanton Optical is committed to helping our customers  find premium eye care services and products while staying within a low budget.</p><h3>VISION INSURANCE PROVIDERS ACCEPTED AT STANTON OPTICAL</h3><p>Don’t see your vision insurance listed? Call us at 877-350-3314 to check for additional accepted plans.</p><ul><li>AARP Vision</li><li>Advantica</li><li>Aetna</li><li>Aflac</li><li>AlwaysCare</li><li>Avesis</li><li>BCBS of CA</li><li>BCBS of GA	</li><li>BCBS of NY	</li><li>BCBS of TN	</li><li>Blue Cross Blue Shield – EyeMed	</li><li>Blue View Vision	</li><li>Care n Care of TX	</li><li>CarePlus	</li><li>Cigna – EyeMed	</li><li>Unicare</li><li>Coast to Coast Vision	</li><li>Coventry of GA	</li><li>Coventry – EyeMed	</li><li>Empire BCBS Discount	</li><li>EyeMed</li><li>Eyetopia</li><li>First Look Vision – AlwaysCare</li><li>Humana Vision – EyeMed</li><li>Molina of TX</li><li>MESVision</li><li>NVA</li><li>Opticare</li><li>OptumHealth – Spectera</li><li>Outlook Vision</li><li>Preferred Care Parners – Spectera</li><li>Physician’s Eye Care Network</li><li>Solstice</li><li>Spectera</li><li>Sunshine Health Plan – OptiCare</li><li>Superior Vision</li><li>The Alliance</li><li>United Healthcare – Spectera</li><li>Univera Health</li><li>Wellmark – Avesis</li><li>Wellpoint – EyeMed</li></ul><h3>Flexible spending accounts</h3><p>Ask your employer if they offer flexible spending accounts as part of your employee benefits package. Flex accounts allow you to appoint a portion of your pre-tax income into an account you can use to pay for medical expenses not covered by your regular health insurance plan. Flex plan funds are often used to pay for dental and eye care expenses, which are usually not covered under standard employee health insurance plans.</p><p>Check the insurance plans accepted at your closest store by clicking <a href="/vision-insurance/">here!</a></p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Making the Most of your Vision Insurance - Stanton Optical",
      description:
        "Make the most of your Vision Insurance with Stanton Optical. We proudly accept a wide variety of vision insurance providers. Stop in today!",
    },
    hasDynamicBanner: true,
  },
  "reasons-wearing-glasses": {
    image:
      BASE_IMAGE_URL +
      "transform/b7fba181-d703-47b7-8619-23afcbfce612/reasons-wearing-glasses",
    alt: "Reasons for Wearing Glasses",
    url: "/blog/reasons-wearing-glasses/",
    title: "Top 5 Reasons For Wearing Glasses",
    date: "September 11th, 2019",
    tag: "Eye Care",
    content: {
      content1: `<p>Thinking about getting glasses? Here are our Top 5 Reasons for choosing and wearing glasses!</p><h3>Top 5 reasons for wearing glasses</h3><p><b>Fashion</b>– With  numerous styles, colors, and shapes, eyeglasses are up to date on the latest fashion trends. They are a great accessory to make any outfit fashionable and enhance your facial features.</p><p><b>Eye Protection</b> – In today’s digital world it is important to properly protect your eyesight in order to ensure that it lasts a lifetime. Glasses not only protect your vision from digital screens, but they also keep dirt and dust from getting into your eyes. Furthermore, eyeglasses can also help protect your eyes from harmful UV rays.</p><p><b>Convenience</b> – Unlike contact lenses, glasses are easy to put on and take off. Eyeglasses do not require additional cleaning and do not need to be replaced as often as contact lenses.</p><p><b>Added Features</b> – As technology has expanded and grown, so has eyecare technology. Nowadays, there are numerous additions that can be made to your eyeglasses to better protect your eyes and vision. For example, you can get a transition lens which darkens when exposed to UV rays and lightens once inside.</p><p><b>Affordability</b> – At Stanton Optical, we pride ourselves in offering the best prices on eyeglasses. Our special offers make it easy and affordable to get the latest eyeglass styles. With over 3,000 frames to choose from, we’re sure you’ll find the perfect pair for you!</p>`,
    },
    meta: {
      title: "Top 5 Reasons for Wearing Glasses - Stanton Optical",
      description:
        "We have put together the top 5 reasons for getting eyeglasses. Visit our store or schedule your eye exam online now!",
    },
    hasDynamicBanner: true,
  },
  "responsive-lenses": {
    image: BASE_IMAGE_URL + "m/3402ef66b1969279/original/responsive_lenses.gif",
    alt: "Responsive Lenses",
    url: "/blog/responsive-lenses/",
    title: "Responsive Lenses",
    date: "October 13th, 2019",
    tag: "Eye Care",
    content: {
      content1: `<p>Have you ever noticed someone’s glasses going dark as soon they step outside? One minute they are wearing glasses and the next their glasses seem to be transforming into sunglasses! Don’t worry you aren’t losing your mind, they are just wearing what are known as responsive lenses.</p><p>Responsive Lenses are made to darken as soon as they are exposed to any sort of UV light, and become crystal clear when indoors, or aren’t exposed to UV light.</p><h3>What are responsive lenses?</h3><p>Responsive lenses are lenses that react to UV light. When the lenses are worn inside, they are crystal clear – as soon as you step outside, the lens darkens when exposed to UV light. The brighter the UV light, the darker the lens becomes. Most lenses will block out 80% of harmful UV rays within the first 15 minutes of being exposed to UV rays. Responsive lenses minimize the cost of having to purchase two different pieces of eyewear since you get the benefit of eyeglasses and sunglasses in one. The lens tint is available in a variety of colors to match your personal style.</p><h3>Pros of responsive lenses</h3><p>– They are known to reduce eye strain and fatigue indoors, and squinting in the sunlight.</p><p>– The lenses help reduce glare by regulating the amount of natural light that your eyes are exposed to.</p><p>– Light sensitivity is reduced. Since the lens adjusts to the UV exposure, and can help reduce the risk of cataracts and age-related eye conditions.</p><p>– These lenses can be applied to a variety of lenses such as bifocals, single and progressive lenses.</p><p>– Getting responsive lenses help save money as you don’t need to purchase separate prescription sunglasses and eyeglasses.</p><p>– Your view will appear clearer, and crisper and colors will also appear more vivid in sunlight.</p><h3>Cons of responsive lenses</h3><p>– Responsive lenses do not work well while inside a car because the windshield blocks UV rays that are necessary for the lens to respond and darken</p><p>– If you’re taking a picture outside, your eyes may not be visible in the picture since the lens will darken once outside.</p><p>– Responsive lenses are not the best option for someone who is highly sensitive to light.</p><p>– It can take the lenses longer to transition back to clear when you enter indoors once again, and they are no longer exposed to UV light.</p><p>If you’re looking to save some money on your eyewear, or if responsive lenses sound like the best option, stop by a Stanton Optical location near you and purchase your responsive lenses!</p>`,
    },
    meta: {
      title: "What are Responsive Lenses: The Pros & Cons - Stanton Optical",
      description:
        "Responsive lenses are designed to darken when they become exposed to UV light and then become clear when indoors and not exposed to UV light. Learn more!",
    },
    hasDynamicBanner: true,
  },
  "protect-your-eyes-with-platinum-blue-anti-glare-lenses": {
    image:
      BASE_IMAGE_URL +
      "transform/d72f2150-0329-4884-9e11-d3dd8c7244c1/protect-your-eyes-with-platinum-blue-anti-glare-lenses",
    alt: "Blue Light Filter Lenses.",
    url: "/blog/protect-your-eyes-with-platinum-blue-anti-glare-lenses/",
    title: "Protect Your Eyes With Platinum Blue Anti-Glare Lenses",
    date: "November 19th, 2019",
    tag: "Eye Care",
    content: {
      content1: `<p>With millions of people working from home due to the Coronavirus (COVID-19) outbreak, the use of digital technology provides a safe and easy way for everyone to stay in touch. However, too much screen time can affect eye health.</p><h3>What causes digital eye strain?</h3><p>Digital eye strain may result in eye fatigue, headaches, dry eyes, double vision and other uncomfortable symptoms. This strain is caused by the harmful blue-violet rays that are emitted from the back-lit screens from devices such as laptops, smartphones and tablets.</p><p>This cumulative and constant exposure to the blue-violet light over time has the potential to cause serious damage to the retinal cells, which may gradually lead to retinal cell death, and can in turn lead to AMD: age-related macular degeneration.</p><h3>Stop blue-light eye strain</h3><p>Dr. Brad Brocwell recommends to “take frequent breaks from your screen for 10 minutes each hour. Look at something in the distance to disconnect from your device.”</p><p>Platinum Blue Anti-Glare Lenses also protect your eyes from the harmful blue light transmitted from iPhones, Androids, iPads, tablets, laptops and desktop computers.</p><p>Stanton Optical’s Platinum Blue Anti-Glare Lenses limit the amount of harmful blue light reaching the eye. Platinum Blue Anti-Glare Lenses are scratch, glare, smudge, water, and dust resistant in addition to filtering blue light, two benefits in one.</p>`,
    },
    meta: {
      title:
        "Protect Your Eyes with Platinum Blue Anti-Glare Lenses - Stanton Optical",
      description:
        "Avoid Digital Eye Strain While Working From Home. Protect Your Eyes With Platinum Blue Anti Glare Lenses To Improve Your Eye Health.",
    },
    hasDynamicBanner: true,
  },
  "how-to-properly-care-for-your-eyeglasses": {
    image:
      BASE_IMAGE_URL +
      "transform/fd026cfc-59cc-470d-a78f-995f3f5f9080/how-to-properly-care-for-your-eyeglasses",
    alt: "How to care for your glasses",
    url: "/blog/how-to-properly-care-for-your-eyeglasses/",
    title: "How To Properly Care For Your Eyeglasses",
    date: "December 27th, 2019",
    tag: "Eye Care",
    content: {
      content1: `<p>At Stanton Optical, we take health and hygiene very seriously. Because of COVID-19, it is more important than ever to clean surfaces frequently. Did you know eyeglasses can harbor dirt and bacteria if they’re not properly cleaned and stored on a regular basis? It’s very important to keep your eyeglasses free of dirt, dust and debris. Besides the risk of bacteria growing on glasses, dirty lenses can cause eye strain and headaches.</p><p>Follow these guidelines to properly care for your eyeglasses:</p><h3>Do:</h3><h3>LENSES</h3><ul><li>Wash: Wash your hands. Grease and dirt from your hands can easily transfer to your lenses.</li><li>Wipe: Use a microfiber cloth to remove debris and dust that could scratch your lenses.</li><li>Rinse: Use distilled water to rinse your lenses. Tap water is okay if you do not have access to distilled water.</li><li>Spray: Spray your lenses on both sides with glasses cleaner or use mild dish soap.</li><li>Rinse Again: Rinse the cleaner or dish soap off in distilled or tap water. Shake off excess water.</li><li>Wipe Again: Use a pre-moistened, non-abrasive lens wipe that contains isopropyl alcohol.</li><li>Dry: Use canned air to dry the lenses.</li></ul><h3>FRAMES</h3><ul><li>Wash: Dip your fingertips in mild, lotion free-dish soap and apply it to your frames.</li><li>Rinse: Hold your frames under warm water and rinse thoroughly. Shake the excess water off.</li><li>Wipe: Wipe the nose pads and earpieces of your frames with a pre-moistened wipe that contains isopropyl alcohol.</li></ul><h3>Don’t:</h3><ul><li>Use Your Clothes: Although convenient, don’t use your clothes to wipe or clean your frames. Clothes contain dirt particles that could scratch your lenses.</li><li>Clean with Household Products: Many household cleaners contain chemicals that are not only harmful to your eyes but also can slowly disintegrate the protective coating on your lenses.</li><li>Forget Your Case: You get a protective case when you purchase glasses for a reason. When taking glasses off and putting them down on the counter, a desk or in a handbag, they are susceptible to scratches and bacteria.</li></ul>`,
    },
    meta: {
      title: "How to Properly Care for Your Eyeglasses - Stanton Optical",
      description:
        "Because of COVID-19, it is more important than ever to clean your eyeglasses frequently. Follow these guidelines and tip to keep your glasses clean.",
    },
    hasDynamicBanner: true,
  },
  "contact-lens-quick-guide": {
    image:
      BASE_IMAGE_URL +
      "transform/a60783dc-0310-49f4-8522-7b3015d384a7/023_Digital_2021_Blog_ContactGuide_SO_1180x400",
    alt: "Contact Lens Guide",
    url: "/blog/contact-lens-quick-guide/",
    title: "Contact Lens Quick Guide",
    date: "April 5th, 2021",
    tag: "Contact Lenses",
    content: {
      content1: `<h3>Ready to go frameless? get the scoop on all things contacts.</h3><p>When it comes to everyday eye wear convenience, contacts are clearly a fantastic option. Contact lenses don’t have to be intimidating. Check out these contact lens basics to help you understand the world of contact lenses.</p><h3>Daily Contacts</h3><p>Daily contact lenses are disposable and come pre-packaged in blister packs. Simply pop them open, put them in, and go! The good news is that daily contacts require very little maintenance. On the downside, you’ll need to make sure to purchase high-quality lenses from a reputable company, and keep in mind that daily contacts cannot be taken out and put back in. If you remove them for any reason, you must replace them with a new pair.</p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Contact Lens Quick Guide - Stanton Optical",
      description:
        "When it comes to everyday eyewear convenience, contacts are clearly a fantastic option. Check out these contact lens basics to help you understand this world.",
    },
  },
  "macular-preventive-care": {
    image: BLOG_IMAGES.MACULAR_PREVENTIVE_CARE_PAGE_IMAGE,
    alt: "Macular Degeneration and Preventative Care",
    url: "/blog/macular-preventive-care",
    title: "Macular Degeneration and Preventative Care",
    date: "February 5th, 2024",
    tag: "Eye Care",
    content: {
      content1: `<p>Let’s talk about something that often doesn't get the attention it deserves yet impacts millions: age-related macular degeneration (AMD). And since February is Macular Degeneration Awareness Month, we’re shining a light on this condition, where the central part of the retina, the macula, deteriorates, leading to significant vision loss. Want to know how to prevent this condition? Let’s take a dive and learn about preventative care with the help of supplements.</p><h2>Understanding AMD and Its Impact</h2><p>AMD primarily affects people over the age of 50. It's a progressive disease that, unfortunately, doesn't have a cure yet. But don't worry – knowledge is power, especially when it comes to understanding the risk factors and the steps you can take to manage it.</p><p>While aging is a significant risk factor, there’s more to it:</p><ul><li><strong>Genetics</strong>: Yes, AMD can run in families. If you have a family history, it's crucial to keep an eye on your eye health.</li><li><strong>Lifestyle Choices</strong>: Smoking, poor diet, and lack of exercise can increase your risk. Good news though – changing these habits can help lower the risk!</li></ul><h2>The Power of Prevention and Early Detection</h2><p>Regular eye exams are your best friend when it comes to AMD. These exams can detect the condition in its early stages, even before symptoms appear. Early detection means better management of the disease, helping to slow its progression and maintain your quality of life.</p><p>Here are a few steps you can take right now:</p><ul><li><strong>Schedule an Eye Exam</strong>: If it's been a while since your last check-up, now is the time.</li><li><strong>Review Your Diet</strong>: eat foods rich in antioxidants and supplements like MacuHealth products. </li><li><strong>Stay Informed</strong>: Knowledge is power, so keep learning about AMD and ways to keep your eyes healthy.</li></ul><h2>A Closer Look at MacuHealth Supplements</h2><p>Your diet plays a vital role in maintaining eye health. Nutritional supplements, like the ones offered by MacuHealth, can be game-changers. By supporting overall eye health these supplements can help protect the macula from damage. Here’s an overview of these innovative eye care products.</p>`,
      image1: BLOG_IMAGES.MACULAR_PREVENTIVE_CARE_PAGE_IMAGE1,
      content2: `<h3>MacuHealth – Flagship Supplement</h3><p>Rebuilds macular pigment, optimizes visual performance, and protects vision over a lifetime.</p><p>Triple Carotenoid Formula is the only eye supplement containing all three carotenoids (Meso-Zeaxanthin, Lutein and Zeaxanthin) as found in the macular pigment.</p><h3>MacuHealth PLUS+</h3><p>Recognized as the leading treatment protocol for those diagnosed with or at risk for Age-Related Macular Degeneration (AMD). Effectively rebuilds macular pigment. Based on the AREDS2 formula (Age Related Eye Disease Study), MacuHealth<sup>PLUS+</sup> offers safer levels of Zinc and is fortified with 10mg of Meso-Zeaxanthin.</p><h2>Your Vision, Our Focus</h2><p>Remember, while AMD is a common condition, there are ways to manage it and maintain your quality of life. During Macular Degeneration Awareness Month, let's commit to keeping our eyes healthy. Ready to take the next step in your eye health journey? Let our eye experts at Stanton Optical guide you every step of the way.</p>`,
      image2:
        BASE_IMAGE_URL +
        "transform/33c4bb68-b10d-4f6a-a3ff-266acce591f6/023_Digital_2021_Blog_ContactGuide_EyeExam_Banner_SO",
    },
    meta: {
      title: "Macular Degeneration and Preventative Care | Stanton Optical",
      description:
        "February is Macular Degeneration Awareness Month. Want to know how to prevent this condition? Let's take a dive and learn about preventative care by clicking here!",
    },
    hasDynamicBanner: true,
  },
  "eyeglasses-trends-2024": {
    image: BLOG_IMAGES.EYEGLASSES_TRENDS_PAGE_IMAGE,
    alt: "Eye-Popping Trends for 2024",
    url: "/blog/eyeglasses-trends-2024/",
    title: "Eye Popping Trends for 2024",
    date: "February 12th, 2024",
    tag: "Eye Care",
    content: {
      content1: `<p>Every year, the fashion industry tracks the ever-evolving world of trends. And recently, this shift has accelerated in ways never seen before. Historical and global events are constantly tailoring the digital ecosystem, and the accessibility to content creation through social media has created an opportunity for every voice and vibe to influence the very definition of “style.” This fashion phenomenon has forever changed the eyewear industry, causing a renaissance of personal expression. In 2024, we’re seeing this expressive disposition pay homage to classic styles with a contemporary twist. Expert eyewear-fashion merchant Jorie chimes on the subject:</p><p><i>"More than in any recent year, 2024 is about expression and showing your personality and individuality through fashion and eyewear. I think bold, vibrant colors for Spring and Summer 24 are going to put that exclamation point on your outfit and look, especially when it comes to eyewear. The other big trends we're seeing are oversized eyewear and the revisit to 80s and 90s fashion with a modern approach."</i></p><p>Let’s break down these observations, shall we?</p><h2>General Fashion Outlook</h2><p>2024's fashion landscape rebels against old norms, urging people to showcase their unique styles boldly. Expect a mix of fringe, denim, vibrant colors, and metallic looks. Influential brands are revisiting 70s, 80s, and 90s minimalism, infusing it with a contemporary edge.</p><h2>Eyewear Trends: A Canvas for Self-Expression</h2><p>This year, eyewear isn't just a utility; it's a statement of fun and personal expression. Vibrant colors and distinctive styles that reflect your personality are trending in the world of sunglasses and prescription glasses.</p><section style="display:grid;row-gap:2rem;column-gap:3rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))"><div><img alt="color-me-bold" width="100%" src=${BLOG_IMAGES.EYEGLASSES_TRENDS_PAGE_CONTENT1}><h2 style="font-size:16px">Color Me Bold</h2><p style="margin:0;margin-top:.5rem">Gone are the days of neutral and subdued eyewear. 2024 welcomes eyewear in the full-color spectrum, reflecting a joyous rebound from the somber pandemic years. Look for bright, bold tints like fuchsia, deep cerulean, and softer shades like coral, aligning with the Pantone® color of the year: Peach Fuzz.</p></div><div><img alt="supersize-it" width="100%" src=${BLOG_IMAGES.EYEGLASSES_TRENDS_PAGE_CONTENT2}><h2 style="font-size:16px">Supersize it</h2><p style="margin:0;margin-top:.5rem">Oversized frames are making a significant comeback, transcending from clothing to eyewear. These frames are perfect for nearly all face types, providing character and a confident image. They're not just about size; they bring a sense of boldness and flair that works with every face shape.</p></div><div><img alt="Reinvented Classics and Geometric Shapes" width="100%" src=${BLOG_IMAGES.EYEGLASSES_TRENDS_PAGE_CONTENT3}><h2 style="font-size:16px">Reinvented Classics and Geometric Shapes</h2><p style="margin:0;margin-top:.5rem">2024 sees a revival and reinterpretation of classic eyewear styles. Aviators, cat-eye, and rectangular shapes are being redesigned with a modern touch. Additionally, unconventional shapes like hexagonal thin-wired frames are gaining popularity, merging 70s vibrancy with modern sleekness.</p></div></section><p style="padding:2rem;background-color:#f8f8f8"><strong>Honorable Mention</strong>: While mentioning standout styles, we’re noticing eyewear trends featuring intricate designs and patterns, highlighting contrasting accents (often in chrome and gold), and adding elements of sophistication and detail to your look.</p><h2>The Runway Rundown</h2><p>In 2024, eyewear fashion will be an exciting playground for self-expression and style exploration. Whether you lean towards the boldness of vibrant colors or the sophistication of reinvented classics, this year offers an array of choices to reflect your personality and enhance your vision health. Embrace these trends and make a statement whenever you smile for the cameras!</p>`,
      image2: BLOG_IMAGES.EYEGLASSES_TRENDS_PAGE_IMAGE2,
    },
    meta: {
      title: "Eye Popping Trends for 2024 - Stanton Optical",
      description:
        "2024 is about expression and showing your personality and individuality through fashion and eyewear. From Bold, vibrant colors to oversized eyewear, check the best trends here!",
    },
    hasDynamicBanner: true,
  },
  "back-to-school-blog-2024": {
    image: BLOG_IMAGES.BACK_TO_SCHOOL_PAGE_IMAGE,
    alt: "Keeping an Eye on your Child’s Sight",
    url: "/blog/back-to-school-blog-2024/",
    title: "Back-to-School: Keeping an Eye on your Child’s Sight",
    date: "July 9th, 2024",
    tag: "Eye Care",
    content: {
      content1: `<p>
      As children head back to school, it is crucial to pay attention to more
      than just their academic performance and social growth. Their eye health
      plays a pivotal role in learning and interacting with the world around
      them. Many kids won’t complain about vision problems simply because they
      may not recognize them as abnormal. Here's how to identify signs of
      possible eye-related condition (such as refractive error) and understand
      when a visit to Stanton Optical is essential.
    </p>
    <h2>Why Good Vision is Critical for School Success</h2>
    <p>
      Vision issues can profoundly impact a child's education, often manifesting
      as a decline in school performance. Children with uncorrected vision
      problems may need help to see the whiteboard, read textbooks, or use a
      computer effectively, all of which can lead to poor academic performance.
      A child's ability to focus visually affects their learning, concentration,
      and attention in class.
    </p>
    <h2>Signs of Vision Problems in Children</h2>
    <p>
      As a parent or caregiver, staying alert to the signs of potential vision
      problems is essential, especially during the school year. Here are some
      key indicators that your child might be experiencing vision issues:
    </p>
    <section
      style="
        display: grid;
        row-gap: 2rem;
        column-gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      "
    >
      <div>
        <ol>
          <li style="margin-bottom: 0.5rem">
            <strong>Decline in School Performance:</strong>
            If you notice a sudden drop in your child's grades or a teacher
            reports that your child is having trouble seeing the board, it could
            be a sign of a vision problem.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Lack of Focus:</strong>
            Children who can’t see well might seem inattentive or distracted in
            class. They might also have difficulty with tasks that require
            sustained visual effort, such as reading or writing.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Holding Books or Devices Too Close:</strong>
            If your child frequently holds books, tablets, or other devices
            closer to their face than usual, it could indicate myopia
            (nearsightedness) or other refractive errors.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Squinting:</strong>
            Squinting may help momentarily improve focus and clarity for
            children with refractive errors. If your child squints frequently,
            it suggests they struggle to see clearly.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Complaints of Headaches or Eye Strain:</strong>
            Regular headaches or complaints of tired eyes after reading or
            using a computer could be caused by uncorrected vision or blue light
            exposure from screens.
          </li>
        </ol>
      </div>
      <div>
        <Image
          alt="boy-with-glasses"
          width="90%"
          src=${BLOG_IMAGES.BACK_TO_SCHOOL_PAGE_CONTENT1}
        />
      </div>
    </section>
    <h2>The Impact of Blue Light</h2>
    <p>
      With the increase in digital learning, children’s exposure to blue light
      has significantly risen. Blue light from screens can contribute to digital
      eye strain, which can make focusing difficult and lead to discomfort.
      Symptoms often include headaches as well as dryness, redness, irritation,
      fatigue, and overall pain around the eyes. Discussing these concerns
      during an eye exam can help, as Stanton Optical offers solutions like blue
      light filtering glasses designed to reduce the impact of blue light
      exposure, promoting comfort and better focus.
    </p>
    <h2>When to Visit Stanton Optical</h2>
    <p>
      An annual eye exam is vital to keeping your child's vision sharp and
      promptly addressing any vision problems. At Stanton Optical, we recommend
      that children have their eyes checked before starting school. Our
      comprehensive eye exams are tailored to children, making them quick,
      comfortable, and stress-free. Our friendly eye care professionals use the
      latest technology to assess your child's vision and can recommend glasses,
      contacts, or other treatments to help manage or correct vision issues. As
      your child steps into the new school year, ensure their vision does not
      hold them back. Recognizing the early signs of eyesight decline can
      prevent future challenges. At Stanton Optical, we’re ready to support your
      child’s journey to clearer vision and better learning. Schedule an
      appointment today and ensure your child is fully prepared to succeed this
      school year with optimal eye health.
    </p>`,
      image2: BLOG_IMAGES.BACK_TO_SCHOOL_PAGE_IMAGE2,
    },
    meta: {
      title:
        "Back-to-School: Keeping an Eye on your Child’s Sight - Stanton Optical",
      description: "Back-to-School: Keeping an Eye on your Child’s Sight",
    },
    hasDynamicBanner: true,
  },
  "glaucoma-awareness-month": {
    alt: "Glaucoma Awareness Month",
    date: "January 16th, 2025",
    title: "Glaucoma Awareness Month: Understanding and Preventing Vision Loss",
    url: "/blog/glaucoma-awareness-month",
    tag: "Eye Care",
    meta: {
      title:
        "Glaucoma Awareness Month: Understanding and Preventing Vision Loss",
      description:
        "January marks Glaucoma Awareness Month, a critical time to spotlight one of the leading causes of blindness worldwide. Understanding glaucoma can help you take proactive steps to preserve your vision.",
    },
    content: {
      content1: `<style type="text/css">h1{font:400 1.5rem Recoleta!important}h2{font:400 1.4rem Roboto!important}.link{color:#004098;font-weight:700}.link:focus-visible,.link:hover{text-decoration:underline}.img{height:auto;object-fit:cover;width:100%}.content{margin-top:2rem;display:grid;gap:1rem}.content__left{order:2;display:grid;gap:1rem}.content__right{order:1}.content__right img{max-width:450px;margin-inline:auto}@media screen and (min-width:600px){h1,h2{font-size:2rem!important}}@media screen and (min-width:768px){.content{grid-template-columns:1fr 1fr}.content__left{order:1}.content__right{order:2}.content__right img{max-width:unset;margin-inline:unset}}</style><h1>Glaucoma Awareness Month: Understanding and Preventing Vision Loss</h1><image class="img" alt="Glaucoma Awareness Month" src="${BLOG_IMAGES.GLAUCOMA_AWARENESS_LP_BANNER}" style="margin-top:1rem"><p>January marks Glaucoma Awareness Month, a critical time to spotlight one of the leading causes of blindness worldwide. At Stanton Optical, we’re committed to educating our communities about the importance of early detection and prevention of glaucoma through comprehensive eye exams provided by clinical professionals from Physicians Eyecare Group. Understanding glaucoma can help you take proactive steps to preserve your vision.</p><h2>Understanding Glaucoma</h2><p>Glaucoma is often called the "silent thief of sight" because it typically has no symptoms in its early stages. This group of eye conditions damages the optic nerve, which is vital for good vision, and is often associated with high pressure inside the eye. Without detection and proper treatment, glaucoma can lead to permanent vision loss. For more detailed medical information about glaucoma, see the <a class="link" href="https://glaucoma.org/">Glaucoma Research Foundation</a>.</p><h2>Detecting Glaucoma Early</h2><p>The best defense against glaucoma is a comprehensive eye exam. At Stanton Optical, we partner with Physicians Eyecare Group to use advanced screening techniques to detect signs of the disease before you even notice any symptoms. During a glaucoma test, your optic nerve is assessed through a detailed scan. Catching glaucoma early can mean the difference between minor vision changes and significant vision loss.</p><h2>Preventing Glaucoma Onset and Progression</h2><section class="content"><div class="content__left"><p>While glaucoma can be a hereditary condition, there are measures you can take to reduce your risk and slow its progression:</p><p><strong>Regular Eye Exams</strong>: Schedule annual comprehensive eye exams, especially if you're over 40 or have a family history of the disease. Early detection is key to protecting your vision.</p><p><strong>Protect Your Eyes</strong>: Wear protective eyewear when engaging in sports or home improvement projects to prevent eye injuries that could lead to glaucoma.</p><p><strong>Exercise Moderately</strong>: Regular, moderate exercise may help prevent glaucoma by reducing eye pressure. Consult with your doctor about an exercise program that’s right for you.</p><p><strong>Healthy Diet</strong>: Maintain a diet rich in eye-healthy nutrients such as omega-3 fatty acids, antioxidants, and vitamins A and C.</p><p><strong>Avoid Smoking</strong>: Smoking is linked to higher eye pressure and poor overall health, which can increase your risk of glaucoma.</p></div><figure class="content__right"><image class="img" alt="Preventing Glaucoma Onset and Progression" src="${BLOG_IMAGES.GLAUCOMA_AWARENESS_LP_IMAGE}"></figure></section><h2>Stanton Optical: Your Partner in Eye Health</h2><p>At Stanton Optical, managing your eye health is crucial, not just during Glaucoma Awareness Month but all year round. With over 290 locations nationwide, we offer accessible, high-quality eye care services tailored to your needs. Our advanced diagnostic tools and personalized approach ensure you receive the best care possible.</p><h2>Call to Action</h2><p>Don’t wait for symptoms to appear. Take charge of your eye health today by scheduling a comprehensive eye exam at Stanton Optical. <a class="link" href="/schedule-exam">Find your nearest location</a> and learn how we can help you maintain optimal vision health. Remember, taking care of your eyes is an integral part of your overall well-being. Let us help you keep your vision clear and healthy for years to come!</p>`,
    },
  },
  "new-year-new-you-blog-2025": {
    image: BLOG_IMAGES.NYNY_PAGE_IMAGE,
    alt: "Eyewear Trends of 2025",
    url: "/blog/new-year-new-you-blog-2025/",
    title: "Eyewear Trends of 2025: Unapologetically You",
    date: "January 14th, 2025",
    tag: "Eye Care",
    content: {
      content1: `<p>
      This year is all about timeless elegance and bold self-expression.</p>
      <p>Every year, we at Stanton Optical combine the precision of data with the artistry of fashion to
      predict the hottest eyewear trends. By analyzing the shapes and colors that consistently capture
      attention and taking inspiration from global fashion movements, we curate the ultimate guide to
      stepping up your eyewear game. This year, we’ve got exciting news for trendsetters: 2025 is
      about you. Whether you’re embracing quiet elegance or bold self-expression, your eyewear will
      make a statement.</p>
      <p>One of the key influences shaping the trends this year is the <a style="text-decoration: underline;" target="_blank" href="https://www.pantone.com/color-of-the-year/2025?srsltid=AfmBOooEwgJi8_DB_uFFLgU0bOiXtwSLmPekA1bFfA6iqyrnl15rnXdT">Pantone Color of the Year—Mocha-
      Mousse</a>. This velvety, rich brown fits seamlessly with the ongoing love for neutral palettes and
      adds a warm sophistication to every look. And if you’re feeling bold, green is trending big,
      offering a refreshing pop of color that’s both chic and versatile.</p>
      <p>So, what’s on the horizon for spring and summer 2025? We’re diving deep into two opposite but
      equally exciting style waves: the “Quiet Luxury Era” and the “Self-Expression Era.”
    </p>
    <h2>The Quiet Luxury Era: Timeless Elegance</h2>
    <p>
      Quiet luxury is all about refined, understated sophistication. It’s less about flaunting and more
      about confidence in simplicity. Think clean lines, neutral tones, and a focus on craftsmanship.
    </p>
    <section
      style="
        display: grid;
        row-gap: 2rem;
        column-gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      "
    >
      <div>
      <h2>Key Features of Quiet Luxury</h2>
        <ul style="margin-top: 1rem;">
          <li style="margin-bottom: 0.5rem">
            <strong>Style:</strong>
            Timeless designs that never go out of fashion. Think Hailey Bieber’s elegant, clean
            aesthetic—polished, put-together, and effortlessly chic.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Frames:</strong>
            Picture delicate crystal accents, minimalist round metal frames, and sleek
            finishes. These styles are perfect for those who prefer their accessories to whisper rather
            than shout.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Colors:</strong>
            A neutral palette reigns supreme, featuring black, silver, and gold. These shades
            pair effortlessly with any wardrobe and exude quiet confidence.
            Whether you’re heading to the office or a refined evening event, Quiet Luxury frames ensure
            your “face card” stays flawless—offering a sophisticated upgrade to your everyday look.
          </li>
        </ul>
      </div>
      <div>
        <Image
          alt="boy-with-glasses"
          width="90%"
          src=${BLOG_IMAGES.NYNY_PAGE_CONTENT1}
        />
      </div>
    </section>
    <h2>In My Self-Expression Era: Bold and Playful</h2>
    <p>
      On the flip side, the Self-Expression Era is a celebration of individuality. Inspired by the cultural
      phenomenon of Taylor Swift’s Eras Tour, where fans dress up in outfits reflecting their favorite
      “Era,” this trend encourages everyone to showcase their unique personality.
    </p>
    <section
      style="
        display: grid;
        row-gap: 2rem;
        column-gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      "
    >
      <div>
        <Image
          alt="boy-with-glasses"
          width="90%"
          src=${BLOG_IMAGES.NYNY_PAGE_CONTENT2}
        />
      </div>
      <div>
      <h2>Key Features of Self-Expression</h2>
        <ul style="margin-top: 1rem;">
          <li style="margin-bottom: 0.5rem">
            <strong>Style:</strong>
            Bold, untamed, and full of character. This era is about having fun and pushing boundaries.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Frames:</strong>
            Chunky acetate designs, statement sunglasses, mixed materials, and embellishments. These are frames that demand attention and start conversations.
          </li>
          <li style="margin-bottom: 0.5rem">
            <strong>Colors:</strong>
            Vibrant greens, playful pinks, and unexpected patterns. Anything goes when it comes to embracing your inner artist.
            <p>If you’re ready to turn heads and let your eyewear do the talking, Self-Expression frames are
            your go-to. They’re perfect for festivals, brunches, or any occasion you want to be
            unapologetically you.</p>
          </li>
        </ul>
      </div>
    </section>
    <h2>Stanton Optical</h2>
    <p>
      The best part about Stanton Optical? We’ve got something for everyone. With 1,500+ frames to
      choose from, you can explore both trends without breaking a sweat—or your budget. Whether
      you lean toward the refined aesthetics of Quiet Luxury or the vibrant playfulness of Self-
      Expression, we’ve got the perfect pair to match your vibe.
      <br/>
      Our wide range of frames ensures you can level up your “face card” effortlessly. For those
      unfamiliar, this trendy idea suggests that your face is like a VIP card—you benefit from looking
      your best. And with the proper eyewear, your face card will stay in the top tier.
    </p>
    <h2>How to Choose Your Trend</h2>
    <p>
    <ol style="margin: 1rem;">
      <li style="margin-bottom: 0.5rem">
        <strong>Know Your Style:</strong>
        Are you a minimalist who loves timeless pieces, or are you ready to embrace bold, expressive frames?
      </li>
      <li style="margin-bottom: 0.5rem">
        <strong>Consider Your Wardrobe:</strong>
        Neutral frames complement capsule wardrobes, while vibrant frames add a pop of personality to every outfit.
      </li>
      <li style="margin-bottom: 0.5rem">
        <strong>Experiment:</strong>
        Don’t be afraid to try something new. Visit Stanton Optical to try on frames virtually or in-store to see what fits your mood.
        
      </li>
    </ol>
    <p>2025 is shaping up to be an exciting year for eyewear. Whether you’re drawn to the elegance of
      Quiet Luxury or the vibrant energy of Self-Expression, the right frames can transform your look
      and give your confidence a major boost. With Stanton Optical’s vast collection, finding your
      perfect pair has never been easier—or more fun.
    </p>
    <p>
      So, why wait? Level up your face card today and let your frames do the talking. After all, when your eyewear is on point, so is your style.
    </p>
    </p>
    
    <div class="frames-container-2025-blog">
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      ">
        <img style="width: 100%; " src="${BLOG_IMAGES.NYNY_PAGE_FRAME1}"/>
        <a href="/product/2016189-resw-22-05-princeton/">
        <button style="
          display: inline-flex;
          align-items: center;
          width: max-content;
          color: white;
          background-color: #f98300;
          border-radius: 14px;
          border: none;
          outline: none;
          padding: 8px 14px;
          font-weight: 400;
          text-transform: uppercase;
          cursor: pointer;
          ">
        Try Them On
        <svg style="margin-left:10px;" width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z" fill="#ffffff"></path></svg>
        </button></a>
      </div>
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      ">
        <img style="width: 100%; " src="${BLOG_IMAGES.NYNY_PAGE_FRAME2}"/>
        <a href="/product/2016160-auw-22-01-veles/">
        <button style="
          display: inline-flex;
          align-items: center;
          width: max-content;
          color: white;
          background-color: #f98300;
          border-radius: 14px;
          border: none;
          outline: none;
          padding: 8px 14px;
          font-weight: 400;
          text-transform: uppercase;
          cursor: pointer;
          ">
        Try Them On
        <svg style="margin-left:10px;" width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z" fill="#ffffff"></path></svg>
        </button></a>
      </div>
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      ">
        <img style="width: 100%; " src="${BLOG_IMAGES.NYNY_PAGE_FRAME3}"/>
        <a href="/product/2015998-sw-22-01-syracuse/">
        <button style="
          display: inline-flex;
          align-items: center;
          width: max-content;
          color: white;
          background-color: #f98300;
          border-radius: 14px;
          border: none;
          outline: none;
          padding: 8px 14px;
          font-weight: 400;
          text-transform: uppercase;
          cursor: pointer;
          ">
        Try Them On
        <svg style="margin-left:10px;" width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z" fill="#ffffff"></path></svg>
        </button></a>
      </div>
    </div>`,
    },
    meta: {
      title: "Eyewear Trends of 2025: Unapologetically You - Stanton Optical",
      description: "Eyewear Trends of 2025: Unapologetically You",
    },
    hasDynamicBanner: false,
  },
  "kickstart-your-year-with-a-wellness": {
    alt: "Kickstart Your Year with a Wellness Checklist",
    title:
      "Kickstart Your Year with a Wellness Checklist: Don’t Forget Your Eyes!",
    date: "March 4th, 2025",
    tag: "Eye Health",
    url: "/kickstart-your-year-with-a-wellness/",
    content: {
      content1: `<style type="text/css"> h1{font:400 1.5rem Recoleta!important} h2{font:400 1.4rem Roboto!important} .link{color:#004098;font-weight:700} .link:focus-visible,.link:hover{text-decoration:underline} .img{height:auto;object-fit:cover;width:100%} .desktop{display:block;} .mobile{display:none;} .content{display: flex;align-items: center;column-gap: 3rem;} .content__right{display: flex;justify-content: center;} .content-top{flex-direction: row;} .content-bottom{flex-direction: row-reverse;} .content-bottom .content__right {width: 100%;} .content-top .content__right {width: 150%;} @media screen and (min-width:600px){h1,h2{font-size:2rem!important}} @media screen and (max-width:768px){.content-top{flex-direction: column-reverse;} .content-bottom{flex-direction: column;} .content-top .content__right {width: 90%; margin-bottom:20px;} .content-bottom .content__right {width: 80%;} .desktop{display:none;} .mobile{display:block;}} </style> <h1>Kickstart Your Year with a Wellness Checklist:<br/> Don’t Forget Your Eyes!</h1> <img class="img desktop" alt="Kickstart Your Year with a Wellness Checklist" src=${BLOG_IMAGES.KICKSTART_BLOG_BANNER} style="margin-top:1rem"><img class="img mobile" alt="Kickstart Your Year with a Wellness Checklist" src=${BLOG_IMAGES.KICKSTART_BLOG_BANNER_MOBILE} style="margin-top:1rem"> <p>The start of a new year is the perfect time to focus on your health and well-being. Many of us set goals for fitness, diet, or mindfulness, but one critical area often gets overlooked: your eyes. That’s right—<a class="link" target="_blank" href="https://www.aoa.org/healthy-eyes/caring-for-your-eyes/full-picture-of-eye-health?sso=y">an annual eye exam</a> isn’t just about seeing clearly; it’s a key part of your overall wellness. Let’s dive into why your eyes deserve a spot on your New Year checklist and how Stanton Optical can help you protect your vision and health.</p> <h2>Why Annual Eye Exams Are a Must</h2> <p>Your eyes are windows not only to the world but also to your health. We partner with Physicians Eyecare Group to provide comprehensive eye exams. A clinical professional checks your prescription and looks for signs of severe health conditions. And since early detection is key, here’s what a simple eye exam can uncover:</p> <section class="content content-top"> <div class="content__left"> <ul> <li><strong>Diabetes</strong>: A commonly diagnosed disease often affecting even our loved ones, high blood sugar levels can damage the tiny blood vessels in your eyes, leading to diabetic retinopathy. These early signs may appear in the eyes before you notice other symptoms.</li> <li><strong>High Blood Pressure</strong>: Swelling or narrowing blood vessels in the eyes can indicate hypertension, which might otherwise go undetected.</li> <li><strong>Cholesterol Issues</strong>: Yellowish deposits around the eyes or changes in your retina can signal high cholesterol levels.</li> <li><strong>Autoimmune Disorders</strong>: Certain eye inflammations can point to underlying autoimmune diseases.</li> </ul> <p>An annual eye exam is preventative care at its finest—catching potential issues early can lead to better health outcomes and peace of mind.</p> </div> <figure class="content__right"> <img class="img" alt="Building Your New Year Wellness Checklist" src=${BLOG_IMAGES.KICKSTART_BLOG_IMAGE1}> </figure> </section> <br/><br/> <section class="content content-bottom"> <div class="content__left"> <h2>Building Your New Year Wellness Checklist</h2><br/> <p>Here’s a handy list to help you prioritize your health in 2025. Check these off for a great start to the year:</p> <ol> <li><strong>Schedule Annual Eye Health Screenings</strong>: Add a comprehensive eye exam to your list alongside checkups with your primary care doctor and dentist.</li> <li><strong>Stay Active</strong>: Regular exercise supports circulation, which benefits your eyes and overall health.</li> <li><strong>Eat for Your Eyes</strong>: Foods rich in omega-3 fatty acids, vitamins C and E, zinc, and lutein—like leafy greens, carrots, and fish—are fantastic for eye health.</li> <li><strong>Protect Your Eyes</strong>: Whether working on a computer or enjoying outdoor activities, wear proper eyewear to shield your eyes from blue light, UV rays, and other irritants. Learn more about digital screen protection <a class="link" href="/blog/protect-your-eyes-with-platinum-blue-anti-glare-lenses/">here</a>.</li> <li><strong>Prioritize Rest and Recovery</strong>: Quality sleep is essential for eye health, reducing strain, and keeping your vision sharp. <a class="link" href="https://pubmed.ncbi.nlm.nih.gov/34030534/" target="_blank">Blue-light filtering lenses help you sleep better</a>.</li> <li><strong>Keep Tabs on Chronic Conditions</strong>: If you have diabetes, hypertension, or other ongoing health concerns, regular eye exams are essential.</li> </ol> </div> <figure class="content__right"> <img class="img" alt="Building Your New Year Wellness Checklist" src=${BLOG_IMAGES.KICKSTART_BLOG_IMAGE2}> </figure> </section> <h2>Why Choose Stanton Optical?</h2> <p>At Stanton Optical, we’re here to make eye care easy and accessible. Our comprehensive eye exams are designed to provide insights into your vision and overall health. Plus, with our wide selection of frames and lenses, you can find the perfect fit for your lifestyle.</p> <p>This year, don’t just see the world—see it clearly and confidently. Make your eye health a priority, and let Stanton Optical be your partner in vision care. Book your annual eye exam today and step into 2025 with clarity and purpose. Cheers!</p> <h4>Sources:</h4> <div> <p style="font-style: italic;">Blue-light and sleep prevention - National Library of Medicine</p> <a style="font-style: italic;" class="link" href="https://pubmed.ncbi.nlm.nih.gov/34030534/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/34030534/</a> <br/><br/> <p style="font-style: italic;">Importance of an eye exam – American Optometric Association</p> <a style="font-style: italic;" class="link" href="https://www.aoa.org/healthy-eyes/caring-for-your-eyes/full-picture-of-eye-health?sso=y" target="_blank">https://www.aoa.org/healthy-eyes/caring-for-your-eyes/full-picture-of-eye-health?sso=y</a> </div>`,
    },
    meta: {
      title:
        "Kickstart Your Year with a Wellness Checklist: Don’t Forget Your Eyes!",
      description:
        "Start your year off right by prioritizing your health, including your vision. Learn why annual eye exams are essential and how Stanton Optical can help.",
    },
    hasDynamicBanner: false,
  },
  "seven-habits-to-make-your-eyes-work-smarter": {
    alt: "7 Habits to Make Your Eyes Work Smarter",
    title: "7 Habits to Make Your Eyes Work Smarter",
    date: "March 11th, 2025",
    tag: "Eye Care",
    url: "/seven-habits-to-make-your-eyes-work-smarter/",
    content: {
      content1: `<style type="text/css"> h1 { font: 400 1.5rem Recoleta !important; } h2 { font: 600 1rem Roboto !important; } .link { color: #004098; font-weight: 700; } .link:focus-visible, .link:hover { text-decoration: underline; } .img {height: auto; object-fit: cover; width: 100%; } .desktop{display:block;} .mobile{display:none;} .content { display: flex; align-items: center; column-gap: 3rem; } .content__right { display: flex; justify-content: center; } .content-top { flex-direction: row; } .content-bottom { flex-direction: row-reverse; } .content-bottom .content__right { width: 120%; } .content-top .content__right { width: 150%; } .img{height:auto;object-fit:cover;width:100%} @media screen and (max-width: 768px) { .content-top { flex-direction: column-reverse; } .content-bottom { flex-direction: column-reverse; } .content-top .content__right { width: 90%; margin-bottom: 20px; } .content-bottom .content__right { width: 80%; } .desktop{display:none;} .mobile{display:block;} } </style> <h1>7 Habits to Make Your Eyes Work Smarter</h1> <img class="img desktop" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.SEVEN_HABITS_BLOG_BANNER} style="margin-top:1rem"> <img class="img mobile" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.SEVEN_HABITS_BLOG_BANNER_MOBILE} style="margin-top:1rem"> <p>Are your eyes killing you by lunchtime? You're staring at your screen, and suddenly everything's a blurry mess-or maybe your head is pounding, and your eyes feel like sandpaper. Yep, welcome to the moder-day reality of digital eye strain. Here are a few simple habits that can make a world of difference your eyes will thank you for it.</p> <p>Let's focus on giving your hardworking eyes the care they deserve.</p> <div class="content content-top"> <div class="content__left"> <h2>1) The 20-20-20 Rule (Your New BFF!)</h2> <p>Think of your eyes like marathon runners—they need quick breaks to perform their best. Enter the 20-20-20 rule! For every 20 minutes of screen time, look at something 20 feet away for 20 seconds. This small action gives your eyes a chance to reset and recharge.</p> <h2>2) A Hero Accessory: Blue Light-Filtering Lenses</h2> <p>Screens are a big part of your day, blue light-filtering glasses are a game-changer. They help cut down on glare and protect your vision from harmful blue light, and may even improve restful sleep. Check out our blog on <a class="link" href="/blog/protect-your-eyes-with-platinum-blue-anti-glare-lenses/">TrueBlue Light Filtering Lenses.</a> </p> <h2>3) Blink It Out!</h2> <p>Did you know you blink less when staring at screens? Yep, it’s true. Give your eyes some love by consciously blinking more often. And if your eyes feel dry, keep hydrating drops within arm's reach for quick relief.</p> <h2>4) Create Your Eye-Friendly Workspace</h2> <p>Poor lighting and overly bright screens are harsh on your eyes. Dim the glare by adjusting your screen brightness, and ensure your desk is lit with soft, even lighting. Bonus tip? Adding a humidifier can tackle dry office air and keep your eyes feeling fresh.</p> </div> <figure class="content__right"> <img class="img" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.SEVEN_HABITS_BLOG_IMAGE1} /> </figure> </div> <br/><br/> <div class="content content-bottom"> <div class="content__left"> <h2>5) Microbreaks = Macro Benefits</h2> <p>Your eyes (and your body) need more than just a chair-to-desk relationship. We all need our space! So step away, stretch, or take a short walk every hour. Not only does this refresh your eyes, but it also boosts your mood and productivity. Win-win!</p> <h2>6) Dry Eye Solutions at Stanton Optical</h2> <p>If your eyes are still feeling dry, red, or irritated despite following these other best practices, come see us at Stanton Optical. From artificial tears to eye lid wipes, we have <a href="/catalog/all-eye-health-products/" class="link">eye drops and supplements</a> to bring you sweet (eye) relief.</p> <h2>7) Protective Eyewear</h2> <p>Essential in jobs like construction, manufacturing, or outdoor work to shield your eyes from hazards like flying debris, chemical splashes, and harmful UV rays. Without it, even a small mishap could lead to serious eye injuries or long-term damage. Choose the right frames for the right conditions.</p> </div> <figure class="content__right"> <img class="img" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.SEVEN_HABITS_BLOG_IMAGE2} /> </figure> </div> <br/><br/> <h3>Eyes First, Always</h3> <p>Prioritizing your eye health at work doesn’t have to be a chore. Simple changes like the 20-20-20 rule or routinely hydrating can go a long way. And if discomfort lingers, a comprehensive eye exam could be the key to identifying dry eye and detecting other eye-health concerns.</p> <p>Show your eyes some love—they're working hard for you. Visit Stanton Optical today, and we’ll help you see the world with clarity and confidence!</p> <h4>Sources:</h4> <div> <p style="font-style: italic;"><a class="link" target="_blank" href="https://www.cdc.gov/vision-health/prevention/index.html">Preventing Vision Loss | Vision and Eye Health - CDC</a></p> <p style="font-style: italic;"> <a class="link" target="_blank" href="https://www.aoa.org/healthy-eyes/caring-for-your-eyes/protecting-your-vision?sso=y">Protecting Your Eyes at Work - AOA</a></p> <p style="font-style: italic;"><a class="link" target="_blank" href="https://mobile.visionmonday.com/business/the-independent-eye/inspirations/article/a-few-ideas-for-workplace-eye-wellness-month/">A Few Ideas for Workplace Eye Wellness Month – Vision Monday</a></p> </div>`,
    },
    meta: {
      title: "7 Habits to Make Your Eyes Work Smarter",
      description:
        "Are your eyes killing you by lunchtime? You’re staring at your screen, and suddenly everything’s a blurry mess—or maybe your head is pounding, and your eyes feel like sandpaper. Yep, welcome to the modern-day reality of digital eye strain. Here are a few simple habits that can make a world of difference—your eyes will thank you for it.",
    },
    hasDynamicBanner: false,
  },
  "can-an-eye-exam-change-my-life": {
    alt: "Can an Eye Exam Change My Life? —You Bet!",
    title: "Can an Eye Exam Change My Life? —You Bet!",
    date: "March 18th, 2025",
    tag: "Eye Care",
    url: "/can-an-eye-exam-change-my-life/",
    content: {
      content1: `<style type="text/css"> h1 { font: 400 1.5rem Recoleta !important; } h2 { font: 500 1.4rem Roboto !important; } .link { color: #004098; font-weight: 700; } .link:focus-visible, .link:hover { text-decoration: underline; } .img {height: auto; object-fit: cover; width: 100%; } .desktop{display:block;} .mobile{display:none;} .content { display: flex; column-gap: 3rem; } .content__right { display: flex; justify-content: center; } .content-top { flex-direction: row; } .content-bottom { flex-direction: row-reverse; } .content-bottom .content__right { width: 120%; } .content-top .content__right { width: 120%; } .img{height:auto;object-fit:cover;width:100%} @media screen and (max-width: 768px) { .content-top { flex-direction: column; } .content-bottom { flex-direction: column-reverse; } .content-top .content__right { width: 85%; margin-top: 20px; } .content-bottom .content__right { width: 80%; } .desktop{display:none;} .mobile{display:block;} } </style> <h1>Can an Eye Exam Change My Life? —You Bet!</h1> <img class="img desktop" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.CAN_EYE_EXAM_BLOG_BANNER} style="margin-top:1rem"> <img class="img mobile" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.CAN_EYE_EXAM_BLOG_BANNER_MOBILE} style="margin-top:1rem"> <p>I’ve been wearing glasses for as long as I can remember so keeping up with annual eye exams has always been part of my eye care routine, and my local Stanton Optical has been my go-to for some time now, because I can just walk-in for an eye exam without an appointment.</p> <p>But I never imagined how one routine check-up would go from the usual “Which is better, one or two?” to saving my eyesight.</p> <div class="content content-top"> <div class="content__left"> <h2>A Routine Visit Took an Unexpected Turn</h2> <p>When I walked into Stanton Optical, I thought it would be a typical day. I just expected them to update my prescription. But what happened instead? Plot twist!</p> <p>During the exam, the team caught something I never expected—a retina bleed. Yep, you read that right. A. Retina. Bleed. And here’s the kicker—I had zero symptoms. No blurry vision, no discomfort, nada. I was shocked.</p> <p>What stood out, though, was how calm and professional the Stanton team was the entire time. Setting my racing mind at ease, they explained everything—what a retina bleed is, why it’s not something you brush off, and why I needed to see a specialist immediately. Instead of drowning in anxiety, I felt genuinely supported.</p> <h2>A Team That Truly Cares</h2> <p>Here’s where Stanton Optical really blew me away. They didn’t treat me like a number or push me to make a quick decision. Nobody said, “OK, so about those new glasses…” Instead, their focus was clear—my health. They strongly recommended I see a specialist before even thinking about updating my prescription.</p> <p>How many places would prioritize making a sale first, right? Their priority wasn’t just helping me see better—it was making sure I stayed healthy. Thanks to their guidance, I got the medical care I needed fast, and honestly, it could’ve changed the course of my future eye health.</p> </div> <figure class="content__right"> <img class="img" alt="Workplace Eye Wellness" src=${BLOG_IMAGES.CAN_EYE_EXAM_BLOG_IMAGE1} /> </figure> </div> <br/> <div class="content content-bottom"> <div class="content__left"> <h2>Reasons You’ll Love Stanton Optical</h2> <p>If you are reading this and wondering what happened, it turns out the bleeding was unrelated to any eye disease. I went into treatment, got it under control, and I'm now totally healthy. But I def could have lost my vision. So, after that, I went back and got my new prescription and my fave black cat eye frames, which I love.</p> <p>Stanton Optical turned what I thought would be a run-of-the-mill appointment into a life-changing moment. Thanks to them, I avoided a serious health scare. If you’ve been putting it off, trust me, now’s the time to prioritize your vision. Swing by Stanton Optical—you can walk right in, and who knows? They might surprise you (in the best way possible).</p> <p>Your eyes deserve it. Take the first step toward clear, confident vision today. You’ll be glad you did.</p> </div> </div> <br/><br/> <h4>Sources:</h4> <div> <p style="font-style: italic;">American Optometric Association: <a class="link" target="_blank" href="https://www.aoa.org/healthy-eyes/caring-for-your-eyes/full-picture-of-eye-health?sso=y">https://www.aoa.org/healthy-eyes/caring-for-your-eyes/full-picture-of-eye-health?sso=y</a></p> <p style="font-style: italic;">American Academy of Ophthalmology:<a class="link" target="_blank" href="https://www.aao.org/practice-management/patient-education/patient-education-basics">https://www.aao.org/practice-management/patient-education/patient-education-basics</a></p> </div>`,
    },
    meta: {
      title: "Can an Eye Exam Change My Life? —You Bet!",
      description:
        "I’ve been wearing glasses for as long as I can remember so keeping up with annual eye exams has always been part of my eye care routine, and my local Stanton Optical has been my go-to for some time now, because I can just walk-in for an eye exam without an appointment.",
    },
    hasDynamicBanner: false,
  },
};
