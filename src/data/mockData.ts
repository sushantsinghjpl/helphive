import { Service, Provider, Customer, Booking, Review, GlobalFAQ, PricingConfig } from '../types';

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    name: 'Hospital Assistance',
    slug: 'hospital-assistance',
    category: 'Hospital',
    shortDescription: 'Dedicated companionship and hands-on help for OPD visits, admissions, discharge formalities, and pharmacy queues.',
    description: 'Navigating busy hospitals can be exhausting and stressful for patients and busy families. Our verified hospital assistants stand by your loved ones at every step: assisting with wheelchair transfers, standing in OP registration and billing lines, collecting lab reports, picking up prescribed medicines, and keeping you updated with real-time messages.',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    basePrice: 219,
    pricingUnit: 'per hour',
    available: true,
    popular: true,
    badge: 'Most Booked',
    rating: 4.92,
    reviewCount: 348,
    createdDate: '2025-01-15',
    status: 'active',
    features: [
      'Wheelchair and mobility escort throughout the hospital premises',
      'Standing in OPD registration, doctor token & cashier queues',
      'Collecting diagnostic blood/radiology lab reports',
      'Procuring medicines from in-hospital or nearby pharmacies',
      'Real-time WhatsApp updates with prescription photos & doctor summary',
      'Bed-side emotional support and water/meal accompaniment'
    ],
    exclusions: [
      'Performing medical procedures, injections or clinical nursing',
      'Diagnosing health conditions or recommending medications',
      'Bearing medical or hospital fees on behalf of the customer',
      'Operating emergency ambulance or critical care transport'
    ],
    plans: [
      { id: 'plan-h1', name: 'Hourly Plan', hours: 1, price: 219, description: 'Best for short doctor visits & quick follow-ups' },
      { id: 'plan-h3', name: '3 Hours Assistance', hours: 3, price: 499, savingsPercent: 24, popular: true, description: 'Standard OPD consultation and lab sample collection' },
      { id: 'plan-h6', name: '6 Hours Assistance', hours: 6, price: 849, savingsPercent: 35, description: 'Day-care treatments, chemotherapy or dialysis sessions' },
      { id: 'plan-h9', name: '9 Hours Assistance', hours: 9, price: 1099, savingsPercent: 44, description: 'Admission or discharge proceedings & long observations' },
      { id: 'plan-h12', name: '12 Hours Assistance', hours: 12, price: 1349, savingsPercent: 49, description: 'Full day stay, post-surgery bedside monitoring' },
    ],
    faqs: [
      {
        question: 'Will the assistant possess clinical medical training?',
        answer: 'Our hospital assistants are non-clinical, empathetic coordinators trained in hospital navigation, wheelchair handling, patient etiquette, and queue management. They do not administer drugs or clinical nursing.'
      },
      {
        question: 'How do I track my parent while they are at the hospital?',
        answer: 'You will receive continuous updates via WhatsApp notifications, photo checkpoints, and the live status tracker in the HelpHive app.'
      },
      {
        question: 'Can the assistant assist with wheelchair pushing?',
        answer: 'Yes, all our assistants are certified in safe wheelchair handling and patient escorting.'
      }
    ]
  },
  {
    id: 'srv-2',
    name: 'Elderly Care & Companionship',
    slug: 'elderly-care',
    category: 'Care',
    shortDescription: 'Compassionate companionship, timely medicine reminders, grocery runs, and smartphone tech guidance for seniors.',
    description: 'Give your elderly parents warm, dependable companionship while you are away or at work. Our verified caregivers provide heartwarming conversations, take seniors on safe evening strolls, remind them of medications, assist with digital bill payments or smartphone apps, and take care of small errands with utmost patience and respect.',
    icon: 'UserCheck',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    basePrice: 199,
    pricingUnit: 'per hour',
    available: true,
    popular: true,
    badge: 'Family Favorite',
    rating: 4.88,
    reviewCount: 285,
    createdDate: '2025-01-20',
    status: 'active',
    features: [
      'Empathetic conversation, book reading & chess/board game companionship',
      'Safe evening/morning walks within society or community parks',
      'Timely reminders for water intake, meals, and doctor-prescribed medications',
      'Assistance with smartphone tech, WhatsApp video calls & OTT apps',
      'Errand runs: picking up fresh fruits, dairy, or daily groceries',
      'Accompanying to bank, post office, or local temple visits'
    ],
    exclusions: [
      'Invasive diaper changing, bedridden sponge baths, or wound dressing',
      'Administering IV fluids, catheterization, or insulin injections',
      'Heavy domestic house cleaning or cooking entire family meals'
    ],
    plans: [
      { id: 'plan-e1', name: 'Hourly Plan', hours: 1, price: 199, description: 'Quick check-in and medicine reminder' },
      { id: 'plan-e3', name: '3 Hours Companionship', hours: 3, price: 449, savingsPercent: 25, popular: true, description: 'Ideal for morning walk, breakfast companion, and digital setup' },
      { id: 'plan-e6', name: '6 Hours Care', hours: 6, price: 799, savingsPercent: 33, description: 'Half-day companionship while adult children are at office' },
      { id: 'plan-e12', name: '12 Hours Day Care', hours: 12, price: 1299, savingsPercent: 46, description: 'Full day attentive companionship & errands' },
    ],
    faqs: [
      {
        question: 'Are elderly caregivers police verified?',
        answer: 'Yes, 100% of our care companions undergo rigorous identity verification, address authentication, police background clearance, and empathy training.'
      },
      {
        question: 'Can the caregiver prepare a meal for my parent?',
        answer: 'They can assist with light warming of prepared food, cutting fruits, making tea/coffee, and serving water, but they do not do full domestic cooking.'
      }
    ]
  },
  {
    id: 'srv-3',
    name: 'Personal Assistant & Errands',
    slug: 'personal-assistant',
    category: 'Personal Assistance',
    shortDescription: 'Reliable on-demand help for queue standing, government office documentation, shopping pickup, and task delegation.',
    description: 'Do not waste productive work hours waiting in lengthy government queues, standing in line at the RTO or registrar office, or running multiple errands across the city. Your HelpHive personal assistant will take care of document submission, collect parcels, do specialty shopping, and handle bureaucratic queues smoothly.',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    basePrice: 179,
    pricingUnit: 'per hour',
    available: true,
    popular: false,
    rating: 4.85,
    reviewCount: 192,
    createdDate: '2025-02-01',
    status: 'active',
    features: [
      'Queue standing at government offices, municipal counters, and RTOs',
      'Picking up official certificates, couriers, or legal stamp papers',
      'Accompaniment to bank branches for form submissions & locker visits',
      'Curated grocery, clothes, and festive gift shopping runs',
      'Dropping off keys, urgent files, or laptops safely across town'
    ],
    exclusions: [
      'Signing legal affidavits or representing power of attorney',
      'Handling cash transactions exceeding ₹5,000 without prior written consent',
      'Hazardous or illegal substance handling'
    ],
    plans: [
      { id: 'plan-p1', name: 'Hourly Run', hours: 1, price: 179, description: 'Single quick task or local drop-off' },
      { id: 'plan-p3', name: '3 Hours Assistance', hours: 3, price: 399, savingsPercent: 26, popular: true, description: 'Queue standing & local multi-stop errands' },
      { id: 'plan-p6', name: '6 Hours Day Assist', hours: 6, price: 699, savingsPercent: 35, description: 'Extensive government office follow-ups or wedding shopping' },
      { id: 'plan-p8', name: 'Full Day (8 Hours)', hours: 8, price: 899, savingsPercent: 37, description: 'Dedicated personal aide for an entire workday' },
    ],
    faqs: [
      {
        question: 'Can the assistant save my place in a line until I arrive?',
        answer: 'Yes! That is one of our most popular requests. The assistant queues up and calls you 10-15 minutes before your token or number is called.'
      }
    ]
  },
  {
    id: 'srv-4',
    name: 'Driver for Your Own Car',
    slug: 'driver-assistance',
    category: 'Driver',
    shortDescription: 'Professional, verified chauffeur to drive your personal car for hospital visits, outstation trips, or city errands.',
    description: 'Travel in the comfort and cleanliness of your own personal vehicle without the fatigue of navigating heavy traffic or searching for hospital parking. Our verified, experienced drivers handle automatic, manual, and luxury vehicles with utmost safety and defensive driving discipline.',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    basePrice: 189,
    pricingUnit: 'per hour',
    available: true,
    popular: true,
    badge: 'Highly Rated',
    rating: 4.94,
    reviewCount: 412,
    createdDate: '2025-01-10',
    status: 'active',
    features: [
      'Experienced with both Manual (MT) & Automatic (AT/CVT/DCT) cars',
      'Hospital valet and curb-side drop-off so patients do not walk long distances',
      'Stress-free parking management at congested city centers',
      'Punctual, uniformed, and courteous driving demeanor',
      'Clean background with verified commercial/heavy driver license history'
    ],
    exclusions: [
      'Customer must provide a roadworthy, insured personal vehicle',
      'Tolls, parking fees, and fuel costs are paid directly by the car owner',
      'Commercial fleet or yellow-board taxi driving'
    ],
    plans: [
      { id: 'plan-d1', name: 'Hourly Basis', hours: 1, price: 189, description: 'Local short drive or vehicle pickup/drop' },
      { id: 'plan-d4', name: '4 Hours City Drive', hours: 4, price: 599, savingsPercent: 21, popular: true, description: 'Ideal for OPD hospital visits & shopping trips' },
      { id: 'plan-d8', name: '8 Hours Full Day', hours: 8, price: 999, savingsPercent: 34, description: 'Day-long city travel or social functions' },
      { id: 'plan-d12', name: '12 Hours Outstation', hours: 12, price: 1499, savingsPercent: 34, description: 'Highway travel and intercity day return' },
    ],
    faqs: [
      {
        question: 'Are your drivers trained for high-end luxury or electric vehicles (EV)?',
        answer: 'Yes, our top-tier drivers have extensive experience driving BMW, Mercedes, Audi, Hyundai EV, and Tata EV vehicles.'
      }
    ]
  },
  {
    id: 'srv-5',
    name: 'Urgent Non-Medical Assistance',
    slug: 'urgent-assistance',
    category: 'Urgent Help',
    shortDescription: 'Rapid 30-45 minute dispatch for emergency medicine pickups, urgent hospital accompaniment, and crisis support.',
    description: 'When sudden challenges strike and you cannot be physically present, HelpHive acts as your immediate on-ground family extension. Whether your parent is rushed to an emergency room, need sudden midnight prescription pickups, or require urgent document retrieval, we dispatch our nearest verified helper rapidly.',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    basePrice: 299,
    pricingUnit: 'per hour',
    available: true,
    popular: true,
    badge: 'Priority Dispatch',
    rating: 4.96,
    reviewCount: 167,
    createdDate: '2025-01-25',
    status: 'active',
    features: [
      'Priority rapid dispatch within 30 to 45 minutes across metro areas',
      'Immediate hospital emergency triage accompaniment',
      'Midnight / late-night medicine and oxygen cylinder delivery coordination',
      'Continuous phone/video relay with anxious outstation relatives',
      'Senior coordination manager assigned for end-to-end liaison'
    ],
    exclusions: [
      'We are NOT a replacement for 112 / 108 emergency ambulance services',
      'We do not provide clinical CPR or trauma paramedic equipment directly'
    ],
    plans: [
      { id: 'plan-u2', name: '2 Hours Urgent Dispatch', hours: 2, price: 499, popular: true, description: 'Rapid response for emergency hospital triage or pharmacy runs' },
      { id: 'plan-u4', name: '4 Hours Crisis Support', hours: 4, price: 799, savingsPercent: 20, description: 'ER observation accompaniment & diagnostic rush' },
      { id: 'plan-u6', name: '6 Hours Extended Support', hours: 6, price: 1099, savingsPercent: 39, description: 'Late night / overnight ER observation companionship' },
    ],
    faqs: [
      {
        question: 'What is the fastest response time for urgent dispatch?',
        answer: 'In covered metropolitan areas (Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad), our priority assistants arrive within 30 to 45 minutes of booking.'
      }
    ]
  }
];

export const initialProviders: Provider[] = [
  {
    id: 'prov-1',
    name: 'Rajesh Sharma',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98112 43210',
    email: 'rajesh.sharma@helphive.in',
    location: 'Saket & South Delhi',
    languages: ['Hindi', 'English', 'Punjabi'],
    services: ['Hospital Assistance', 'Elderly Care'],
    availability: 'available',
    rating: 4.95,
    reviewCount: 124,
    verificationStatus: 'verified',
    experienceYears: 6,
    policeVerificationDone: true,
    idVerified: true,
    eta: '18 mins away',
    completedTasks: 312
  },
  {
    id: 'prov-2',
    name: 'Ananya Deshmukh',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98220 54321',
    email: 'ananya.d@helphive.in',
    location: 'Koramangala & Indiranagar, Bengaluru',
    languages: ['English', 'Hindi', 'Kannada', 'Marathi'],
    services: ['Hospital Assistance', 'Elderly Care', 'Personal Assistant'],
    availability: 'available',
    rating: 4.98,
    reviewCount: 156,
    verificationStatus: 'verified',
    experienceYears: 4,
    policeVerificationDone: true,
    idVerified: true,
    eta: '12 mins away',
    completedTasks: 278
  },
  {
    id: 'prov-3',
    name: 'Vikramaditya Verma',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 97180 99881',
    email: 'vikram.v@helphive.in',
    location: 'Cyber City & DLF Phase 5, Gurugram',
    languages: ['Hindi', 'English'],
    services: ['Driver Assistance', 'Personal Assistant'],
    availability: 'available',
    rating: 4.91,
    reviewCount: 98,
    verificationStatus: 'verified',
    experienceYears: 8,
    policeVerificationDone: true,
    idVerified: true,
    eta: '25 mins away',
    completedTasks: 420
  },
  {
    id: 'prov-4',
    name: 'Pooja Sundaram',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    phone: '+91 94441 23456',
    email: 'pooja.s@helphive.in',
    location: 'Anna Nagar & T. Nagar, Chennai',
    languages: ['Tamil', 'English', 'Telugu'],
    services: ['Hospital Assistance', 'Elderly Care', 'Urgent Assistance'],
    availability: 'on_duty',
    rating: 4.96,
    reviewCount: 142,
    verificationStatus: 'verified',
    experienceYears: 5,
    policeVerificationDone: true,
    idVerified: true,
    eta: 'Currently on duty',
    completedTasks: 295
  },
  {
    id: 'prov-5',
    name: 'Sandeep Kulkarni',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98201 67890',
    email: 'sandeep.k@helphive.in',
    location: 'Bandra West & Andheri, Mumbai',
    languages: ['Marathi', 'Hindi', 'English', 'Gujarati'],
    services: ['Driver Assistance', 'Hospital Assistance'],
    availability: 'available',
    rating: 4.89,
    reviewCount: 88,
    verificationStatus: 'verified',
    experienceYears: 7,
    policeVerificationDone: true,
    idVerified: true,
    eta: '15 mins away',
    completedTasks: 260
  },
  {
    id: 'prov-6',
    name: 'Meenakshi Iyer',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98450 87654',
    email: 'meenakshi.i@helphive.in',
    location: 'Jayanagar & JP Nagar, Bengaluru',
    languages: ['Kannada', 'Tamil', 'English', 'Hindi'],
    services: ['Elderly Care', 'Personal Assistant'],
    availability: 'available',
    rating: 4.93,
    reviewCount: 110,
    verificationStatus: 'verified',
    experienceYears: 4,
    policeVerificationDone: true,
    idVerified: true,
    eta: '20 mins away',
    completedTasks: 198
  },
  {
    id: 'prov-7',
    name: 'Harpreet Singh Sandhu',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98140 11223',
    email: 'harpreet.s@helphive.in',
    location: 'Noida Sector 62 & Greater Noida',
    languages: ['Punjabi', 'Hindi', 'English'],
    services: ['Urgent Assistance', 'Hospital Assistance'],
    availability: 'available',
    rating: 4.87,
    reviewCount: 74,
    verificationStatus: 'verified',
    experienceYears: 3,
    policeVerificationDone: true,
    idVerified: true,
    eta: '30 mins away',
    completedTasks: 145
  },
  {
    id: 'prov-8',
    name: 'Ramesh Babu G.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '+91 99890 33445',
    email: 'ramesh.b@helphive.in',
    location: 'Banjara Hills & Jubilee Hills, Hyderabad',
    languages: ['Telugu', 'Hindi', 'English'],
    services: ['Driver Assistance'],
    availability: 'available',
    rating: 4.92,
    reviewCount: 130,
    verificationStatus: 'verified',
    experienceYears: 10,
    policeVerificationDone: true,
    idVerified: true,
    eta: '10 mins away',
    completedTasks: 510
  },
  {
    id: 'prov-9',
    name: 'Kavita Chawla',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    phone: '+91 99100 55667',
    email: 'kavita.c@helphive.in',
    location: 'Dwarka & West Delhi',
    languages: ['Hindi', 'English'],
    services: ['Elderly Care', 'Hospital Assistance'],
    availability: 'offline',
    rating: 4.90,
    reviewCount: 65,
    verificationStatus: 'pending',
    experienceYears: 2,
    policeVerificationDone: true,
    idVerified: true,
    eta: 'Offline',
    completedTasks: 82
  },
  {
    id: 'prov-10',
    name: 'Mohammed Farhan',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98860 77889',
    email: 'farhan.m@helphive.in',
    location: 'Whitefield & HSR Layout, Bengaluru',
    languages: ['Urdu', 'Hindi', 'English', 'Kannada'],
    services: ['Personal Assistant', 'Urgent Assistance'],
    availability: 'available',
    rating: 4.86,
    reviewCount: 92,
    verificationStatus: 'verified',
    experienceYears: 5,
    policeVerificationDone: true,
    idVerified: true,
    eta: '14 mins away',
    completedTasks: 215
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Amitabh Sen',
    phone: '+91 98711 22334',
    email: 'amitabh.sen@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    totalBookings: 6,
    totalSpent: 4890,
    lastBookingDate: '2025-05-12',
    status: 'active',
    savedAddresses: [
      { id: 'addr-1', label: 'Parents Home', address: 'Flat 402, Nilgiri Apartments, Alaknanda', city: 'New Delhi', pincode: '110019', isDefault: true },
      { id: 'addr-2', label: 'Office', address: 'Cyber City, Tower B, 7th Floor', city: 'Gurugram', pincode: '122002' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Deepika Nair',
    phone: '+91 98451 99887',
    email: 'deepika.nair@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    totalBookings: 4,
    totalSpent: 3590,
    lastBookingDate: '2025-05-10',
    status: 'active',
    savedAddresses: [
      { id: 'addr-3', label: 'Home', address: 'Villa 12, Palm Meadows, Whitefield', city: 'Bengaluru', pincode: '560066', isDefault: true }
    ]
  },
  {
    id: 'cust-3',
    name: 'Sunil Manchanda',
    phone: '+91 98110 33221',
    email: 'sunil.manchanda@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    totalBookings: 8,
    totalSpent: 7420,
    lastBookingDate: '2025-05-14',
    status: 'active',
    savedAddresses: [
      { id: 'addr-4', label: 'Home', address: 'B-14, Greater Kailash Part 1', city: 'New Delhi', pincode: '110048', isDefault: true }
    ]
  },
  {
    id: 'cust-4',
    name: 'Radhika Kulkarni',
    phone: '+91 98205 11447',
    email: 'radhika.k@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    totalBookings: 3,
    totalSpent: 2650,
    lastBookingDate: '2025-05-02',
    status: 'active',
    savedAddresses: [
      { id: 'addr-5', label: 'Home', address: '701, Sea Breeze, Prabhadevi', city: 'Mumbai', pincode: '400025', isDefault: true }
    ]
  },
  {
    id: 'cust-5',
    name: 'Suresh Reddy',
    phone: '+91 99890 12345',
    email: 'suresh.reddy@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    totalBookings: 2,
    totalSpent: 1850,
    lastBookingDate: '2025-04-28',
    status: 'active',
    savedAddresses: [
      { id: 'addr-6', label: 'Home', address: 'Road No. 36, Jubilee Hills', city: 'Hyderabad', pincode: '500033', isDefault: true }
    ]
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'HH-8241',
    serviceId: 'srv-1',
    serviceName: 'Hospital Assistance',
    serviceSlug: 'hospital-assistance',
    serviceIcon: 'HeartPulse',
    planId: 'plan-h3',
    planName: '3 Hours Assistance',
    hours: 3,
    date: '2025-05-18',
    timeSlot: '09:30 AM - 12:30 PM',
    customer: {
      name: 'Amitabh Sen',
      phone: '+91 98711 22334',
      email: 'amitabh.sen@gmail.com',
      address: 'Max Super Speciality Hospital, Press Enclave Marg, Saket',
      landmark: 'Near OPD Entry Gate 2',
      city: 'New Delhi',
      pincode: '110017',
      patientName: 'Kailash Nath Sen (Age 74)',
      emergencyContact: '+91 98711 22335 (Wife)',
      specialInstructions: 'Patient uses a wheelchair. Needs help with Cardiology token and ECG report collection.'
    },
    provider: initialProviders[0],
    status: 'confirmed',
    timeline: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'May 17, 04:30 PM', note: 'Slot reserved & payment verified', done: true },
      { status: 'provider_assigned', label: 'Provider Assigned', timestamp: 'May 17, 04:35 PM', note: 'Rajesh Sharma assigned (4.9★)', done: true },
      { status: 'on_the_way', label: 'Provider On The Way', timestamp: 'Pending', note: 'Will start at 08:45 AM', done: false, current: true },
      { status: 'arrived', label: 'Provider Arrived', timestamp: 'Pending', note: 'Arrival check-in at Gate 2', done: false },
      { status: 'in_progress', label: 'Service In Progress', timestamp: 'Pending', note: 'Accompanying patient', done: false },
      { status: 'completed', label: 'Service Completed', timestamp: 'Pending', note: 'Reports handed over safely', done: false }
    ],
    pricing: {
      basePrice: 499,
      surgeFee: 0,
      platformFee: 49,
      tax: 98,
      discount: 50,
      total: 596
    },
    payment: {
      method: 'upi',
      status: 'paid',
      transactionId: 'UPI-774921049214',
      paidAt: '2025-05-17 16:30'
    },
    createdAt: '2025-05-17 16:30'
  },
  {
    id: 'HH-8240',
    serviceId: 'srv-2',
    serviceName: 'Elderly Care & Companionship',
    serviceSlug: 'elderly-care',
    serviceIcon: 'UserCheck',
    planId: 'plan-e3',
    planName: '3 Hours Companionship',
    hours: 3,
    date: '2025-05-17',
    timeSlot: '04:00 PM - 07:00 PM',
    customer: {
      name: 'Deepika Nair',
      phone: '+91 98451 99887',
      email: 'deepika.nair@outlook.com',
      address: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      pincode: '560066',
      patientName: 'Mrs. Shanti Nair (Age 78)',
      emergencyContact: '+91 98451 99887',
      specialInstructions: 'Gentle walk in society park and help setting up new iPad video calling.'
    },
    provider: initialProviders[1],
    status: 'in_progress',
    timeline: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'May 17, 10:00 AM', done: true },
      { status: 'provider_assigned', label: 'Provider Assigned', timestamp: 'May 17, 10:15 AM', done: true },
      { status: 'on_the_way', label: 'Provider On The Way', timestamp: 'May 17, 03:20 PM', done: true },
      { status: 'arrived', label: 'Provider Arrived', timestamp: 'May 17, 03:52 PM', note: 'Checked in with OTP', done: true },
      { status: 'in_progress', label: 'Service In Progress', timestamp: 'May 17, 04:00 PM', note: 'Walking in society clubhouse', done: true, current: true },
      { status: 'completed', label: 'Service Completed', timestamp: 'Pending', done: false }
    ],
    pricing: {
      basePrice: 449,
      surgeFee: 0,
      platformFee: 49,
      tax: 89,
      discount: 0,
      total: 588
    },
    payment: {
      method: 'card',
      status: 'paid',
      transactionId: 'TXN-9988112233',
      paidAt: '2025-05-17 10:00'
    },
    createdAt: '2025-05-17 10:00'
  },
  {
    id: 'HH-8238',
    serviceId: 'srv-4',
    serviceName: 'Driver for Your Own Car',
    serviceSlug: 'driver-assistance',
    serviceIcon: 'Car',
    planId: 'plan-d4',
    planName: '4 Hours City Drive',
    hours: 4,
    date: '2025-05-16',
    timeSlot: '11:00 AM - 03:00 PM',
    customer: {
      name: 'Sunil Manchanda',
      phone: '+91 98110 33221',
      email: 'sunil.manchanda@gmail.com',
      address: 'B-14, Greater Kailash Part 1',
      city: 'New Delhi',
      pincode: '110048',
      specialInstructions: 'Drive Honda City Automatic to Medanta Gurugram and return.'
    },
    provider: initialProviders[2],
    status: 'completed',
    timeline: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'May 16, 08:30 AM', done: true },
      { status: 'provider_assigned', label: 'Provider Assigned', timestamp: 'May 16, 08:45 AM', done: true },
      { status: 'on_the_way', label: 'Provider On The Way', timestamp: 'May 16, 10:15 AM', done: true },
      { status: 'arrived', label: 'Provider Arrived', timestamp: 'May 16, 10:48 AM', done: true },
      { status: 'in_progress', label: 'Service In Progress', timestamp: 'May 16, 11:00 AM', done: true },
      { status: 'completed', label: 'Service Completed', timestamp: 'May 16, 03:10 PM', note: 'Car parked safely, keys returned', done: true }
    ],
    pricing: {
      basePrice: 599,
      surgeFee: 0,
      platformFee: 49,
      tax: 116,
      discount: 100,
      total: 664
    },
    payment: {
      method: 'upi',
      status: 'paid',
      transactionId: 'UPI-119933882200',
      paidAt: '2025-05-16 08:30'
    },
    createdAt: '2025-05-16 08:30',
    rating: {
      score: 5,
      comment: 'Vikramaditya was extremely polite, arrived 15 mins before time, drove smoothly in peak traffic. Felt very safe.',
      createdAt: '2025-05-16 15:30'
    }
  },
  {
    id: 'HH-8235',
    serviceId: 'srv-5',
    serviceName: 'Urgent Non-Medical Assistance',
    serviceSlug: 'urgent-assistance',
    serviceIcon: 'Zap',
    planId: 'plan-u2',
    planName: '2 Hours Urgent Dispatch',
    hours: 2,
    date: '2025-05-15',
    timeSlot: '08:30 PM - 10:30 PM',
    customer: {
      name: 'Radhika Kulkarni',
      phone: '+91 98205 11447',
      email: 'radhika.k@yahoo.com',
      address: 'Lilavati Hospital & Research Centre, Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      patientName: 'Kishore Kulkarni (Father)',
      specialInstructions: 'Rush to pick up specialty injection from Dadar Apollo pharmacy to Lilavati ICU desk.'
    },
    provider: initialProviders[4],
    status: 'completed',
    timeline: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'May 15, 08:32 PM', done: true },
      { status: 'provider_assigned', label: 'Provider Assigned', timestamp: 'May 15, 08:35 PM', done: true },
      { status: 'on_the_way', label: 'Provider On The Way', timestamp: 'May 15, 08:40 PM', done: true },
      { status: 'arrived', label: 'Provider Arrived', timestamp: 'May 15, 08:58 PM', done: true },
      { status: 'in_progress', label: 'Service In Progress', timestamp: 'May 15, 09:05 PM', done: true },
      { status: 'completed', label: 'Service Completed', timestamp: 'May 15, 10:20 PM', note: 'Delivered to ICU nurse with bill receipt', done: true }
    ],
    pricing: {
      basePrice: 499,
      surgeFee: 75,
      platformFee: 49,
      tax: 112,
      discount: 0,
      total: 735
    },
    payment: {
      method: 'upi',
      status: 'paid',
      transactionId: 'UPI-884422110099',
      paidAt: '2025-05-15 20:32'
    },
    createdAt: '2025-05-15 20:32',
    rating: {
      score: 5,
      comment: 'Life-saver! When we were stuck in another city, Sandeep picked up the emergency medicine and delivered it in under 45 mins. Lifesaver service!',
      createdAt: '2025-05-15 22:35'
    }
  },
  {
    id: 'HH-8229',
    serviceId: 'srv-3',
    serviceName: 'Personal Assistant & Errands',
    serviceSlug: 'personal-assistant',
    serviceIcon: 'ShoppingBag',
    planId: 'plan-p3',
    planName: '3 Hours Assistance',
    hours: 3,
    date: '2025-05-14',
    timeSlot: '10:00 AM - 01:00 PM',
    customer: {
      name: 'Suresh Reddy',
      phone: '+91 99890 12345',
      email: 'suresh.reddy@gmail.com',
      address: 'GHMC Sub-Registrar Office, Banjara Hills',
      city: 'Hyderabad',
      pincode: '500034',
      specialInstructions: 'Token queue standing for property slot verification.'
    },
    provider: initialProviders[9],
    status: 'completed',
    timeline: [
      { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'May 14, 07:00 AM', done: true },
      { status: 'provider_assigned', label: 'Provider Assigned', timestamp: 'May 14, 07:30 AM', done: true },
      { status: 'on_the_way', label: 'Provider On The Way', timestamp: 'May 14, 09:15 AM', done: true },
      { status: 'arrived', label: 'Provider Arrived', timestamp: 'May 14, 09:40 AM', done: true },
      { status: 'in_progress', label: 'Service In Progress', timestamp: 'May 14, 10:00 AM', done: true },
      { status: 'completed', label: 'Service Completed', timestamp: 'May 14, 01:00 PM', done: true }
    ],
    pricing: {
      basePrice: 399,
      surgeFee: 0,
      platformFee: 49,
      tax: 80,
      discount: 0,
      total: 528
    },
    payment: {
      method: 'wallet',
      status: 'paid',
      transactionId: 'WAL-55228811',
      paidAt: '2025-05-14 07:00'
    },
    createdAt: '2025-05-14 07:00'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    serviceId: 'srv-1',
    serviceName: 'Hospital Assistance',
    providerId: 'prov-1',
    providerName: 'Rajesh Sharma',
    customerName: 'Amitabh Sen',
    customerLocation: 'Delhi',
    rating: 5,
    comment: 'I live in London and my 74-year-old father had a cardiology consultation at Max Saket. Rajesh bhaiya accompanied him like an elder son, got his wheelchair, handled the lines, and video called me with the doctor. Incredible peace of mind!',
    date: '2025-05-10',
    status: 'approved'
  },
  {
    id: 'rev-2',
    serviceId: 'srv-2',
    serviceName: 'Elderly Care & Companionship',
    providerId: 'prov-2',
    providerName: 'Ananya Deshmukh',
    customerName: 'Deepika Nair',
    customerLocation: 'Bengaluru',
    rating: 5,
    comment: 'Ananya spent 3 hours with my mother in Palm Meadows. She patiently helped her learn how to do group video calls on WhatsApp and played board games. My mom was so happy and asked when she is coming again.',
    date: '2025-05-12',
    status: 'approved'
  },
  {
    id: 'rev-3',
    serviceId: 'srv-4',
    serviceName: 'Driver for Your Own Car',
    providerId: 'prov-3',
    providerName: 'Vikramaditya Verma',
    customerName: 'Sunil Manchanda',
    customerLocation: 'Gurugram',
    rating: 5,
    comment: 'Booking a driver for our own vehicle was super smooth. Vikramaditya was impeccably dressed, polite, and handled Gurgaon traffic effortlessly. He dropped us right at the hospital porch and managed parking.',
    date: '2025-05-14',
    status: 'approved'
  },
  {
    id: 'rev-4',
    serviceId: 'srv-5',
    serviceName: 'Urgent Non-Medical Assistance',
    providerId: 'prov-5',
    providerName: 'Sandeep Kulkarni',
    customerName: 'Radhika Kulkarni',
    customerLocation: 'Mumbai',
    rating: 5,
    comment: 'Late night medicine emergency at Lilavati hospital. HelpHive arranged Sandeep within 25 minutes. He picked up the rare prescription from Dadar and handed it to the nurse. True lifesaver!',
    date: '2025-05-15',
    status: 'approved'
  },
  {
    id: 'rev-5',
    serviceId: 'srv-1',
    serviceName: 'Hospital Assistance',
    providerId: 'prov-4',
    providerName: 'Pooja Sundaram',
    customerName: 'Karthik Raman',
    customerLocation: 'Chennai',
    rating: 5,
    comment: 'Navigating Apollo Greams Road can take an entire day. Pooja handled all the billing tokens, accompanied my mother through ultrasound tests, and collected reports. Outstanding professionalism.',
    date: '2025-05-08',
    status: 'approved'
  }
];

export const initialFaqs: GlobalFAQ[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is HelpHive?',
    answer: 'HelpHive is a trusted on-demand service marketplace that allows customers to book verified assistants for hospital visits, elderly care companionship, personal errands, drivers for personal cars, and rapid urgent non-medical help.'
  },
  {
    id: 'faq-2',
    category: 'safety',
    question: 'How are your assistants and drivers verified?',
    answer: 'Every HelpHive provider undergoes a rigorous 4-step verification: Government Photo ID (Aadhaar/PAN), residential address verification, mandatory police criminal record clearance, and a comprehensive in-person empathy & protocol training.'
  },
  {
    id: 'faq-3',
    category: 'hospital',
    question: 'Can the assistant accompany my parent inside the doctor cabin?',
    answer: 'Yes! If the patient or family wishes, our assistant will accompany them into the consultation room, take clear notes of doctor prescriptions, and send photos to family members.'
  },
  {
    id: 'faq-4',
    category: 'hospital',
    question: 'Do you provide medical equipment or clinical nursing?',
    answer: 'No. HelpHive provides non-clinical assistance (navigation, queue management, wheelchair escort, pharmacy runs, companionship). For IV lines, catheter, injections, or clinical nursing, registered nurses or hospital staff are required.'
  },
  {
    id: 'faq-5',
    category: 'booking',
    question: 'How far in advance should I book a service?',
    answer: 'For scheduled visits (Hospital, Elderly Care, Driver), we recommend booking 12 to 24 hours in advance. For Urgent Assistance, on-demand dispatch takes 30 to 45 minutes.'
  },
  {
    id: 'faq-6',
    category: 'payment',
    question: 'What payment modes are supported?',
    answer: 'We support all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and digital wallets. Payments are held securely in escrow until service initiation.'
  },
  {
    id: 'faq-7',
    category: 'cancellation',
    question: 'What is your cancellation and refund policy?',
    answer: 'Free cancellations are permitted up to 2 hours before the scheduled service time for a 100% instant refund. Cancellations made within 2 hours incur a small provider travel compensation fee of ₹99.'
  },
  {
    id: 'faq-8',
    category: 'driver',
    question: 'Is fuel or toll included in the driver rate?',
    answer: 'No. The driver fee covers the professional chauffeur service for your personal car. Fuel, highway tolls, and parking tickets are paid directly by the vehicle owner.'
  }
];

export const defaultPricingConfig: PricingConfig = {
  nightChargePercentage: 15,
  weekendSurgePercentage: 10,
  platformFee: 49,
  gstPercentage: 18,
  coupons: [
    { code: 'WELCOME100', discountPercentage: 15, maxDiscount: 100, minBookingAmount: 399 },
    { code: 'CARE50', discountPercentage: 10, maxDiscount: 50, minBookingAmount: 299 },
    { code: 'HEALTHFIRST', discountPercentage: 20, maxDiscount: 200, minBookingAmount: 799 }
  ]
};
