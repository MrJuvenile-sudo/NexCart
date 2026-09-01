import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiChevronRight, FiSearch, 
  FiShield, FiTruck, FiRefreshCw, FiHelpCircle, FiChevronDown,
  FiCopy, FiCheck, FiStar, FiAward
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

const CATEGORY_CONFIGS = {
  mobiles: {
    name: 'Mobiles',
    title: 'Mobiles & Smart Device Hub',
    subtitle: 'FLAGSHIP 5G • 200MP CAMERAS • TITANIUM BUILDS',
    description: 'Explore groundbreaking 5G flagship smartphones, cinematic multi-lens camera systems, embedded stylus suites, and long-lasting battery powerhouses with official brand warranties.',
    theme: 'mobiles-theme',
    icon: '📱',
    badge: 'Official Authorized Smartphone Center',
    departments: ['All Mobiles', 'Flagship 5G', 'Foldables', 'Budget Champions', 'Fast Chargers'],
    brands: ['APPLE', 'SAMSUNG', 'ONEPLUS', 'XIAOMI', 'GOOGLE PIXEL', 'IQOO'],
    deals: [
      { label: '5G Under ₹15,000', maxPrice: 15000 },
      { label: 'Mid-Range (Under ₹35k)', maxPrice: 35000 },
      { label: 'Flagships (Under ₹75k)', maxPrice: 75000 }
    ],
    widgetType: 'mobiles_comparator',
    guide: {
      title: 'Flagship Smartphone Buying Guide 2026',
      tips: [
        'Look for 3nm / 4nm processors (A18 Pro / Snapdragon 8 Gen 3) for next-gen on-device AI.',
        'Opt for LTPO 120Hz AMOLED displays for butter-smooth scrolling and power efficiency.',
        'Check for dedicated optical zoom (3x or 5x telephoto) for crisp lossless portrait photography.'
      ]
    },
    faqs: [
      { q: 'Are all smartphones sold on NexCart 100% authentic with warranty?', a: 'Yes, every device is sourced directly from brand authorized distributors and comes with a 1-year manufacturer warranty + valid GST invoice.' },
      { q: 'Do you offer doorstep old phone trade-in / exchange?', a: 'Yes! Enter your old device model at checkout to receive instant valuation discounts applied directly to your order.' },
      { q: 'What is the return window for smartphones?', a: 'Smartphones enjoy a 7-day brand replacement guarantee in case of any verified hardware or manufacturing defects.' }
    ]
  },
  fashion: {
    name: 'Fashion',
    title: 'Fashion & Luxury Wardrobe',
    subtitle: 'MONSOON LUXE • TRENDSETTING STREETWEAR • 50-70% OFF',
    description: 'Elevate your seasonal aesthetic with handpicked breathable knitwear, cushioned running sneakers, tailored fits, and luxury lifestyle accessories.',
    theme: 'fashion-theme',
    icon: '👕',
    badge: 'Curated Global Fashion Collections',
    departments: ['All Fashion', "Men's Casual", "Women's Western", 'Sneakers & Shoes', 'Luxury Daypacks'],
    brands: ['NIKE', 'ZARA', 'LEVI\'S', 'H&M', 'ADIDAS', 'CLOUDSTEP'],
    deals: [
      { label: 'Tees Under ₹999', maxPrice: 999 },
      { label: 'Footwear Under ₹2,499', maxPrice: 2499 },
      { label: 'Daypacks Under ₹1,999', maxPrice: 1999 }
    ],
    widgetType: 'fashion_lookbook',
    guide: {
      title: 'Wardrobe Essentials & Material Care Guide',
      tips: [
        'Choose 100% GOTS certified organic cotton for breathable all-day skin comfort.',
        'Opt for high-rebound EVA foam soles in walking sneakers to reduce joint impact.',
        'Follow cold-water wash cycles and avoid direct sunlight drying to prevent fabric color fading.'
      ]
    },
    faqs: [
      { q: 'Can I exchange for a different size if the item does not fit?', a: 'Absolutely! We offer 14-day free doorstep size exchanges. Our courier partner picks up the old size and delivers your new size.' },
      { q: 'Are sneakers and apparel genuine brand stock?', a: 'Yes, 100% original verified inventory shipped in original brand packaging with barcodes intact.' }
    ]
  },
  electronics: {
    name: 'Electronics',
    title: 'Electronics, Audio & Computing',
    subtitle: 'SPATIAL ANC AUDIO • 4K OPTICS • GAMING GEAR',
    description: 'Immerse yourself in active noise cancellation, mechanical tactile keyboards, 360° surround speakers, and vintage digital photography.',
    theme: 'electronics-theme',
    icon: '🎧',
    badge: 'Pro Audio & Creator Electronics',
    departments: ['All Electronics', 'Spatial Audio', 'Mechanical Keyboards', '360° Speakers', 'Digital Cameras'],
    brands: ['NEXAUDIO', 'ARC GAMING', 'ORBIT', 'PIXELFRAME', 'SONY', 'BOSE'],
    deals: [
      { label: 'Audio Under ₹1,999', maxPrice: 1999 },
      { label: 'Keyboards Under ₹2,999', maxPrice: 2999 },
      { label: 'Cameras Under ₹4,999', maxPrice: 4999 }
    ],
    widgetType: 'electronics_anc',
    guide: {
      title: 'High-Fidelity Audio & Gaming Buying Guide',
      tips: [
        'Hybrid Active Noise Cancellation (ANC) utilizes internal and external mics to cancel up to 98% of ambient noise.',
        'Hot-swappable mechanical switches let you customize your typing sound and actuation feel without soldering.',
        'Check for Bluetooth 5.3 and LDAC codec support for high-resolution lossless wireless streaming.'
      ]
    },
    faqs: [
      { q: 'How long is the battery warranty on wireless audio devices?', a: 'All audio products carry a 1-year full replacement warranty covering batteries, drivers, and charging cases.' },
      { q: 'Are mechanical keyboards compatible with Mac and Windows?', a: 'Yes, our keyboards include dual OS keycaps and support USB-C, 2.4GHz wireless, and Bluetooth pairing.' }
    ]
  },
  beauty: {
    name: 'Beauty',
    title: 'Beauty, Skincare & Botanical Glow',
    subtitle: 'DERMATOLOGIST TESTED • 100% CLEAN FORMULAS',
    description: 'Nourish your skin barrier with clinically proven 15% Vitamin C serums, organic botanical cleansers, and hydrating daily moisturizers.',
    theme: 'beauty-theme',
    icon: '✨',
    badge: 'Clean Botanical & Dermatological Care',
    departments: ['All Beauty', 'Vitamin C Brightening', 'Botanical Cleansers', 'Hydrating Moisturizers', 'Organic Bundles'],
    brands: ['LUMIÈRE', 'GLOWDROP', 'THE ORDINARY', 'MINIMALIST', 'CERAVE'],
    deals: [
      { label: 'Serums Under ₹799', maxPrice: 799 },
      { label: 'Cleansers Under ₹999', maxPrice: 999 },
      { label: 'Kits Under ₹1,499', maxPrice: 1499 }
    ],
    widgetType: 'beauty_routine',
    guide: {
      title: 'Daily Clinical Skincare Protocol',
      tips: [
        'Apply Vitamin C serum in the morning on clean skin to protect against oxidative free-radical damage.',
        'Always seal hydration with a lightweight ceramide moisturizer followed by broad-spectrum sunscreen.',
        'Store antioxidant serums in cool, dry areas away from direct sunlight to preserve potency.'
      ]
    },
    faqs: [
      { q: 'Are these skincare formulas suitable for sensitive skin?', a: 'Yes, all products undergo rigorous dermatological patch testing, are fragrance-free, and paraben-free.' },
      { q: 'What is the shelf life after opening?', a: 'Our antioxidant serums remain at peak potency for 6 months after unsealing the dropper.' }
    ]
  },
  home: {
    name: 'Home & Living',
    title: 'Home, Living & Interior Spaces',
    subtitle: 'DIMMABLE AMBIENT LIGHT • ARTISAN STONEWARE • WAFFLE WEAVES',
    description: 'Create calm, inspiring spaces with warm dimmable table lamps, hand-thrown ceramic serve sets, and 100% organic cotton waffle throws.',
    theme: 'home-theme',
    icon: '🏡',
    badge: 'Artisan Living & Aesthetic Spaces',
    departments: ['All Home', 'Ambient Lighting', 'Artisan Stoneware', 'Organic Throws', 'Kitchen Craft'],
    brands: ['AURA HOME', 'SOLIS CERAMICS', 'HAVEN LIVING', 'BREWMATE', 'IKEA'],
    deals: [
      { label: 'Throws Under ₹1,299', maxPrice: 1299 },
      { label: 'Dinnerware Under ₹1,599', maxPrice: 1599 },
      { label: 'Lamps Under ₹1,999', maxPrice: 1999 }
    ],
    widgetType: 'home_roomtour',
    guide: {
      title: 'Interior Ambience & Material Guide',
      tips: [
        'Layer 2700K warm LED lighting at different heights to create depth and relaxation in living rooms.',
        'High-fired stoneware ceramics resist chipping and are 100% microwave and dishwasher safe.',
        'GOTS-certified waffle cotton fabrics allow airflow, making them perfect for all-season use.'
      ]
    },
    faqs: [
      { q: 'Is ceramic stoneware safely packed to prevent transit breakage?', a: 'Yes, every artisan stoneware piece is double-boxed with custom high-density shock-absorbing honeycomb wrap.' },
      { q: 'Are the table lamps USB-C rechargeable?', a: 'Yes, our ambient lamps feature built-in 2000mAh lithium batteries providing up to 20 hours of cord-free warm glow.' }
    ]
  },
  appliances: {
    name: 'Appliances',
    title: 'Smart Home & Kitchen Appliances',
    subtitle: 'HEPA H13 AIR PURIFIERS • 360° AIR FRYERS • INVERTER TECH',
    description: 'Breathe cleaner air with 5-in-1 medical-grade air purifiers and cook healthy restaurant-style meals with rapid 360° digital air fryers.',
    theme: 'appliances-theme',
    icon: '⚡',
    badge: '5-Star Energy Efficient Appliances',
    departments: ['All Appliances', 'Smart Air Purifiers', 'Digital Air Fryers', 'Inverter Refrigerators', 'Coffee Makers'],
    brands: ['AEROPURE', 'DYNACOOK', 'FROSTWAVE', 'BREWMATE', 'PHILIPS'],
    deals: [
      { label: 'Air Fryers Under ₹4,999', maxPrice: 4999 },
      { label: 'Purifiers Under ₹8,999', maxPrice: 8999 },
      { label: 'Refrigerators Under ₹29,999', maxPrice: 29999 }
    ],
    widgetType: 'appliances_energy',
    guide: {
      title: 'Appliance Energy & Air Quality Guide',
      tips: [
        'H13 True HEPA filters capture 99.97% of airborne particulate matter down to 0.3 microns including pollen and viruses.',
        'Rapid 360° air circulation crisps foods evenly while cutting oil consumption by over 85%.',
        'Smart app scheduling lets you automate air purifier fans to clean rooms before you arrive home.'
      ]
    },
    faqs: [
      { q: 'Do large appliances include free delivery and doorstep installation?', a: 'Yes! Refrigerators and major appliances include free unboxing, scheduled doorstep placement, and demo.' },
      { q: 'How often do air purifier HEPA filters need replacement?', a: 'Filters typically last 8 to 12 months. The digital AQI panel displays an automatic filter life replacement reminder.' }
    ]
  },
  toys: {
    name: 'Toys & Baby',
    title: 'Toys, Baby & STEM Learning',
    subtitle: 'HANDS-ON CODING ROBOTS • 360° BABY CARRIERS • NON-TOXIC',
    description: 'Inspire young minds with programmable visual coding robots, ergonomic hip-healthy baby carriers, and certified eco-safe play gear.',
    theme: 'toys-theme',
    icon: '🧸',
    badge: 'Certified Child-Safe & STEM Accredited',
    departments: ['All Toys & Baby', 'STEM Robotics', 'Ergonomic Baby Carriers', 'Board Games', 'Eco Wooden Blocks'],
    brands: ['ROBOSTEM', 'LULLABYCARE', 'PLAYGRID', 'LEGO', 'CHICCO'],
    deals: [
      { label: 'Games Under ₹999', maxPrice: 999 },
      { label: 'Baby Carriers Under ₹1,999', maxPrice: 1999 },
      { label: 'STEM Kits Under ₹2,999', maxPrice: 2999 }
    ],
    widgetType: 'toys_milestone',
    guide: {
      title: 'Child Development & Safety Guide',
      tips: [
        'Drag-and-drop visual coding develops logical sequencing and problem-solving in children aged 6+.',
        'Look for International Hip Dysplasia Institute certified ergonomic M-position baby carriers.',
        'Ensure all wooden blocks use non-toxic water-based lead-free stains and rounded chamfered corners.'
      ]
    },
    faqs: [
      { q: 'Are all toys compliant with safety standards?', a: 'Yes, 100% compliant with BIS, EN71, and ASTM international child safety standards with zero harmful phthalates.' },
      { q: 'Does the robot kit require soldering or complex wiring?', a: 'No, all components feature modular snap-fit magnetic connections and color-coded safe plug-in sensors.' }
    ]
  },
  health: {
    name: 'Food & Health',
    title: 'Food, Health & Gourmet Nutrition',
    subtitle: 'PURE WHEY ISOLATE • FIRST COLD-PRESSED OILS • ORGANIC SNACKS',
    description: 'Fuel your fitness goals and daily vitality with 90% pure whey isolates, polyphenol-rich single-estate extra virgin olive oil, and organic snack boxes.',
    theme: 'health-theme',
    icon: '🥗',
    badge: 'Lab Verified Clean Nutrition',
    departments: ['All Food & Health', 'Pure Whey Protein', 'Cold-Pressed Oils', 'Gourmet Snack Boxes', 'Fitness Gear'],
    brands: ['NUTRICORE', 'RAWROOTS', 'FRESHFIELD', 'MOTIONFLEX', 'ORGANIC INDIA'],
    deals: [
      { label: 'Snacks Under ₹699', maxPrice: 699 },
      { label: 'Olive Oil Under ₹1,099', maxPrice: 1099 },
      { label: 'Whey Protein Under ₹2,799', maxPrice: 2799 }
    ],
    widgetType: 'health_diet',
    guide: {
      title: 'Active Nutrition & Clean Sourcing Guide',
      tips: [
        'Whey protein isolate provides rapid amino acid absorption with 27g protein and virtually zero lactose or fat.',
        'Extra virgin cold-pressed olive oils maintain highest polyphenol antioxidant counts when stored in dark UV glass.',
        'Pair regular hydration with balanced whole-food snacking to sustain steady metabolic energy levels.'
      ]
    },
    faqs: [
      { q: 'Is the whey protein tested for banned substances?', a: 'Yes, every batch is certified by independent third-party labs and Informed-Choice tested for athletes.' },
      { q: 'What is the harvest date of the cold-pressed olive oil?', a: 'Our single-estate extra virgin oils are cold-pressed within 4 hours of harvest and bottled fresh.' }
    ]
  },
  auto: {
    name: 'Auto Accessories',
    title: 'Auto Accessories & Road Safety',
    subtitle: '4K SONY DUAL DASH CAMS • DIGITAL TIRE PUMPS • CERAMIC CARE',
    description: 'Equip your vehicle for ultimate security and road-readiness with Sony STARVIS 4K dual dashcams and 150PSI portable smart tire inflators.',
    theme: 'auto-theme',
    icon: '🚗',
    badge: 'Pro Automotive & Travel Gear',
    departments: ['All Auto', '4K Dual Dashcams', 'Digital Tire Inflators', 'Interior Organizers', 'Car Care'],
    brands: ['DRIVEVISION', 'AEROPUMP', 'BOSCH', 'GARMIN', '3M AUTO'],
    deals: [
      { label: 'Detailing Under ₹999', maxPrice: 999 },
      { label: 'Tire Pumps Under ₹1,999', maxPrice: 1999 },
      { label: '4K Dash Cams Under ₹5,499', maxPrice: 5499 }
    ],
    widgetType: 'auto_checklist',
    guide: {
      title: 'Vehicle Road Trip Safety Essentials',
      tips: [
        'Dual 4K front + 1080p rear dashcams provide indispensable video evidence with GPS speed and timestamp stamping.',
        'Keep tire pressure at manufacturer PSI specs to extend tire lifespan and save up to 4% on fuel consumption.',
        'Carry a portable 150PSI battery inflator to handle sudden punctures or pressure drops without roadside delays.'
      ]
    },
    faqs: [
      { q: 'Does the 4K dashcam record while the car is parked?', a: 'Yes, with the included smart parking kit and G-sensor, the camera automatically records 60-second video clips if collision vibration is detected.' },
      { q: 'Can the portable tire inflator inflate bicycle tires and footballs?', a: 'Yes, multiple adapters (Presta valve, ball needle, float nozzle) are included in the package.' }
    ]
  },
  smartwatches: {
    name: 'Smart Watches',
    title: 'Smart Watches & Wearable Tech',
    subtitle: 'AMOLED DISPLAYS • DUAL GPS • ECG & SPO2 • 14-DAY BATTERY',
    description: 'Track your athletic endurance, biometric heart rate variability, sleep stages, and smartphone notifications with aerospace titanium smartwatches and fitness bands.',
    theme: 'smartwatches-theme',
    icon: '⌚',
    badge: 'Next-Gen Health & Fitness Wearables',
    departments: ['All Smart Watches', 'Fitness Bands', 'Apple Watch / WearOS', 'Rugged GPS Outdoor', 'Stainless Steel Luxe'],
    brands: ['APPLE', 'SAMSUNG', 'GARMIN', 'PULSE', 'AMAZFIT', 'NOISE'],
    deals: [
      { label: 'Bands Under ₹1,999', maxPrice: 1999 },
      { label: 'AMOLED Under ₹4,999', maxPrice: 4999 },
      { label: 'Pro GPS (Under ₹24,999)', maxPrice: 24999 }
    ],
    widgetType: 'smartwatch_comparator',
    guide: {
      title: 'Smartwatch Sensor Accuracy & OS Guide',
      tips: [
        'Dual-frequency GPS (L1+L5) provides centimeter-accurate tracking under dense tree canopies and high-rise cities.',
        'Always-on AMOLED displays offer 2000+ nits peak outdoor brightness for effortless direct sunlight legibility.',
        'Look for 5ATM / IP68 ratings for open-water lap swimming and high-pressure water sports.'
      ]
    },
    faqs: [
      { q: 'Can I take voice calls directly on the smartwatch?', a: 'Yes! Bluetooth calling smartwatches feature built-in HD microphones and acoustic speakers for answering calls on your wrist.' },
      { q: 'Are these smartwatches compatible with both iPhone and Android?', a: 'Yes, all Pulse, Amazfit, and Garmin smartwatches sync seamlessly via dedicated iOS and Android companion apps.' }
    ]
  },
  gaming: {
    name: 'Gaming & Esports',
    title: 'Gaming & Esports Battle Station Hub',
    subtitle: '1MS MECHANICAL SWITCHES • 240HZ OLED • 8KHZ POLLING • SPATIAL 7.1',
    description: 'Elevate your competitive performance with tournament-grade mechanical keyboards, ultra-lightweight optical gaming mice, and immersive spatial surround sound headsets.',
    theme: 'gaming-theme',
    icon: '🎮',
    badge: 'Tournament-Grade Esports Equipment',
    departments: ['All Gaming', 'Mechanical Keyboards', 'Esports Mice', 'Gaming Headsets', 'Controllers & Desks'],
    brands: ['RAZER', 'LOGITECH G', 'SONY PLAYSTATION', 'CORSAIR', 'HYPERX', 'STEELSERIES'],
    deals: [
      { label: 'Accessories Under ₹1,499', maxPrice: 1499 },
      { label: 'Pro Mice Under ₹3,499', maxPrice: 3499 },
      { label: 'Keyboards Under ₹6,999', maxPrice: 6999 }
    ],
    widgetType: 'gaming_rig_specs',
    guide: {
      title: 'Competitive Esports Hardware Guide',
      tips: [
        'Opt for Hall Effect magnetic switches for rapid trigger reset actuation in tactical FPS games.',
        'Sub-60g honeycomb or magnesium mice reduce wrist fatigue during extended gaming sessions.',
        'Planar magnetic audio drivers provide pinpoint spatial audio localization for enemy footsteps.'
      ]
    },
    faqs: [
      { q: 'Do the gaming keyboards feature hot-swappable switches?', a: 'Yes, all custom and pro mechanical keyboards support 3-pin and 5-pin hot-swappable switch replacements with the included keycap puller.' },
      { q: 'Are the wireless headsets lag-free for competitive shooters?', a: 'Yes, our 2.4GHz ultra-low latency wireless dongles ensure <15ms response times with zero audible lag.' }
    ]
  },
  sports: {
    name: 'Sports & Fitness',
    title: 'Sports, Gym & Fitness Equipment',
    subtitle: 'ADJUSTABLE DUMBBELLS • HIGH-DENSITY YOGA • CRICKET BATS • RUNNING GEAR',
    description: 'Level up your daily athletic routine with commercial-grade home workout equipment, non-slip eco rubber yoga mats, English willow cricket bats, and compression apparel.',
    theme: 'sports-theme',
    icon: '⚽',
    badge: 'Athlete Performance & Fitness Center',
    departments: ['All Sports', 'Home Gym & Dumbbells', 'Yoga & Recovery', 'Cricket & Rackets', 'Running Apparel'],
    brands: ['NIKE', 'DECATHLON', 'YONEX', 'SS CRICKET', 'COSCO', 'EVERLAST'],
    deals: [
      { label: 'Essentials Under ₹699', maxPrice: 699 },
      { label: 'Yoga Mats Under ₹1,499', maxPrice: 1499 },
      { label: 'Weights Under ₹4,999', maxPrice: 4999 }
    ],
    widgetType: 'sports_calorie_widget',
    guide: {
      title: 'Home Fitness & Strength Training Blueprint',
      tips: [
        'Progressive overload with adjustable dumbbells stimulates optimal hypertrophy and joint stability.',
        'High-density 6mm TPE yoga mats protect joints during high-impact plyometrics and core workouts.',
        'Dynamic stretching before cardio and foam roller myofascial release afterwards accelerates muscular recovery.'
      ]
    },
    faqs: [
      { q: 'Are the dumbbell weights rubber coated to protect floors?', a: 'Yes, all cast iron hex dumbbells and kettlebells feature vulcanized rubber coatings that absorb shock and protect floor tiles.' },
      { q: 'Is home delivery available for heavy weight benches and treadmills?', a: 'Yes! We provide white-glove doorstep delivery and free technician installation for all heavy gym equipment.' }
    ]
  },
  books: {
    name: 'Books & Stationery',
    title: 'Books, Novels & Fine Stationery',
    subtitle: 'INTERNATIONAL BESTSELLERS • HARDCOVERS • FOUNTAIN PENS • 120GSM JOURNALS',
    description: 'Immerse yourself in world-renowned fiction bestsellers, business classics, self-mastery journals, archival fountain pens, and leatherbound planners.',
    theme: 'books-theme',
    icon: '📚',
    badge: 'Curated Literature & Creative Writing Vault',
    departments: ['All Books', 'Fiction & Thrillers', 'Business & Growth', 'Hardcover Classics', 'Fine Writing Pens'],
    brands: ['PENGUIN', 'HARPER COLLINS', 'MOLESKINE', 'LAMY', 'PARKER', 'BLOOMSBURY'],
    deals: [
      { label: 'Paperbacks Under ₹399', maxPrice: 399 },
      { label: 'Box Sets Under ₹1,299', maxPrice: 1299 },
      { label: 'Luxury Pens Under ₹2,499', maxPrice: 2499 }
    ],
    widgetType: 'books_shelf_widget',
    guide: {
      title: 'Building a Timeless Personal Home Library',
      tips: [
        'Acid-free 120GSM paper prevents ink feathering and ghosting with wet fountain pen nibs.',
        'Hardcover editions with sewn bindings ensure books lay flat and endure decades of re-reading.',
        'Pair fiction reading with habit tracking journals to consistently hit 30+ pages per day.'
      ]
    },
    faqs: [
      { q: 'Are all books original publisher printings?', a: 'Yes, every title is 100% genuine original print certified by Penguin, HarperCollins, Bloomsbury, and authorized global publishers.' },
      { q: 'Do you offer gift wrapping for novel box sets?', a: 'Yes, select premium ribbon gift packaging with custom handwritten note cards during checkout.' }
    ]
  },
  luxury: {
    name: 'Luxury & Jewellery',
    title: 'Luxury Timepieces & Fine Jewellery',
    subtitle: 'BIS 916 HALLMARKED • CERTIFIED LAB DIAMONDS • SWISS AUTOMATICS • 925 SILVER',
    description: 'Celebrate life’s finest milestones with certified solitaire diamond rings, Swiss automatic chronographs, hallmarked 22K gold pendants, and handcrafted sterling silver jewellery.',
    theme: 'luxury-theme',
    icon: '💎',
    badge: 'Certified Luxury & Fine Jewellery Vault',
    departments: ['All Luxury', 'Fine Jewellery', 'Swiss Automatic Watches', 'Solitaire Diamonds', '925 Sterling Silver'],
    brands: ['TISSOT', 'SWAROVSKI', 'CARATLANDE', 'SEIKO', 'GIVA', 'FOSSIL LUXE'],
    deals: [
      { label: 'Silver Under ₹1,999', maxPrice: 1999 },
      { label: 'Solitaires (Under ₹24,999)', maxPrice: 24999 },
      { label: 'Swiss Watches (Under ₹49,999)', maxPrice: 49999 }
    ],
    widgetType: 'luxury_certificate_widget',
    guide: {
      title: 'The 4Cs Diamond & Precious Metal Guide',
      tips: [
        'Verify the BIS Triangular Hallmark and 6-digit HUID code for guaranteed precious gold purity.',
        'Cut quality determines 80% of diamond brilliance and light sparkle—always look for Excellent/Ideal cut grades.',
        'Sapphire crystal glass with anti-reflective coating ensures watch faces remain 100% scratch-proof for generations.'
      ]
    },
    faqs: [
      { q: 'Does jewellery come with authentic purity certification?', a: 'Yes, all diamond items include IGI/SGL laboratory certificates and gold jewellery carries official government BIS hallmark verification.' },
      { q: 'Is luxury shipping insured during transit?', a: 'Every high-value order is shipped in tamper-evident secure armored boxes with 100% full transit insurance and OTP delivery verification.' }
    ]
  },
  plants: {
    name: 'Plants & Garden',
    title: 'Indoor Plants, Planters & Garden Care',
    subtitle: 'AIR PURIFYING PLANTS • SELF-WATERING POTS • ORGANIC SOIL • 10-DAY TRANSIT GUARANTEE',
    description: 'Transform your home into a natural oasis with NASA-recommended air purifying indoor plants, artisanal ceramic planters, and nutrient-rich organic potting mixes.',
    theme: 'plants-theme',
    icon: '🌿',
    badge: 'Eco-Friendly Nursery & Plant Care Center',
    departments: ['All Plants', 'Air Purifiers', 'Desk & Succulents', 'Ceramic Planters', 'Organic Soil & Fertilizers'],
    brands: ['IFFCO GARDENS', 'URBAN PLANT', 'GREENDECOR', 'POTTERYBARN', 'ECOGROW'],
    deals: [
      { label: 'Plants Under ₹499', maxPrice: 499 },
      { label: 'Pots Under ₹999', maxPrice: 999 },
      { label: 'Bonsai Trees Under ₹2,499', maxPrice: 2499 }
    ],
    widgetType: 'plants_sunlight_widget',
    guide: {
      title: 'Indoor Plant Light & Watering Guide',
      tips: [
        'Snake plants and ZZ plants thrive in low-light bedroom corners and only need water once every 2 weeks.',
        'Always check the top 2 inches of soil before watering—overwatering causes 90% of indoor plant issues.',
        'Use pots with drainage holes and saucers to prevent root rot and allow healthy oxygen circulation.'
      ]
    },
    faqs: [
      { q: 'How are live plants safely packaged for delivery?', a: 'All plants are shipped in specialized ventilated shock-absorbing biodegradable packaging with moist root balls for a 100% healthy arrival guarantee.' },
      { q: 'What happens if a plant arrives damaged?', a: 'We offer an instant free replacement or 100% refund within 10 days of delivery with just a simple photo upload.' }
    ]
  }
};

export default function CategoryHubPage() {
  const { categorySlug } = useParams();
  const { products } = useCart();

  // Normalize slug to config key
  const configKey = useMemo(() => {
    if (!categorySlug) return 'mobiles';
    const clean = categorySlug.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.includes('plant') || clean.includes('garden') || clean.includes('nursery')) return 'plants';
    if (clean.includes('watch') || clean.includes('wear')) return 'smartwatches';
    if (clean.includes('game') || clean.includes('gaming') || clean.includes('esport')) return 'gaming';
    if (clean.includes('sport') || clean.includes('fit') || clean.includes('gym')) return 'sports';
    if (clean.includes('book') || clean.includes('station')) return 'books';
    if (clean.includes('lux') || clean.includes('jewel') || clean.includes('gold') || clean.includes('diamond')) return 'luxury';
    if (clean.includes('mobile') || clean.includes('phone')) return 'mobiles';
    if (clean.includes('fashion') || clean.includes('wear') || clean.includes('apparel')) return 'fashion';
    if (clean.includes('elect')) return 'electronics';
    if (clean.includes('beauty')) return 'beauty';
    if (clean.includes('home') || clean.includes('living') || clean.includes('furniture')) return 'home';
    if (clean.includes('appliance')) return 'appliances';
    if (clean.includes('toy') || clean.includes('baby')) return 'toys';
    if (clean.includes('food') || clean.includes('health') || clean.includes('groc')) return 'health';
    if (clean.includes('auto') || clean.includes('car')) return 'auto';
    return 'mobiles';
  }, [categorySlug]);

  const category = CATEGORY_CONFIGS[configKey] || CATEGORY_CONFIGS.mobiles;

  const { showToast } = useToast();
  const [couponCopied, setCouponCopied] = useState(false);

  // States
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [maxPriceCap, setMaxPriceCap] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Interactive widget states
  const [activeAmPm, setActiveAmPm] = useState('AM');
  const [applianceHours, setApplianceHours] = useState(6);

  // Filter products for this category
  const categoryProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
    return safeProducts.filter(p => {
      // Category match
      const pCat = (p.category || '').toLowerCase();
      const cCat = (category.name || '').toLowerCase();
      
      let matchesCategory = false;
      if (cCat.includes('plant') && (pCat.includes('plant') || pCat.includes('garden') || pCat.includes('soil') || pCat.includes('pot'))) matchesCategory = true;
      else if (cCat.includes('watch') && (pCat.includes('watch') || pCat.includes('wear') || pCat.includes('smart'))) matchesCategory = true;
      else if (cCat.includes('game') && (pCat.includes('game') || pCat.includes('gaming') || pCat.includes('esport') || pCat.includes('keyboard') || pCat.includes('mouse'))) matchesCategory = true;
      else if (cCat.includes('sport') && (pCat.includes('sport') || pCat.includes('fitness') || pCat.includes('gym') || pCat.includes('outdoor'))) matchesCategory = true;
      else if (cCat.includes('book') && (pCat.includes('book') || pCat.includes('media') || pCat.includes('stationery') || pCat.includes('pen'))) matchesCategory = true;
      else if (cCat.includes('lux') && (pCat.includes('luxury') || pCat.includes('jewel') || pCat.includes('silver') || pCat.includes('gold') || pCat.includes('diamond'))) matchesCategory = true;
      else if (cCat === 'mobiles' && (pCat.includes('mobile') || pCat.includes('phone'))) matchesCategory = true;
      else if (cCat === 'fashion' && (pCat.includes('fashion') || pCat.includes('apparel') || pCat.includes('wear'))) matchesCategory = true;
      else if (cCat === 'electronics' && (pCat.includes('electron') || pCat.includes('audio') || pCat.includes('gaming'))) matchesCategory = true;
      else if (cCat === 'beauty' && (pCat.includes('beauty') || pCat.includes('skin'))) matchesCategory = true;
      else if (cCat.includes('home') && (pCat.includes('home') || pCat.includes('kitchen') || pCat.includes('living'))) matchesCategory = true;
      else if (cCat === 'appliances' && (pCat.includes('appliance') || pCat.includes('air') || pCat.includes('kitchen'))) matchesCategory = true;
      else if (cCat.includes('toys') && (pCat.includes('toy') || pCat.includes('baby') || pCat.includes('game') || pCat.includes('gaming'))) matchesCategory = true;
      else if (cCat.includes('food') && (pCat.includes('food') || pCat.includes('health') || pCat.includes('groc'))) matchesCategory = true;
      else if (cCat.includes('auto') && (pCat.includes('auto') || pCat.includes('car'))) matchesCategory = true;
      else if (pCat === cCat) matchesCategory = true;

      if (!matchesCategory) return false;

      // Price cap filter
      if (maxPriceCap && p.price > maxPriceCap) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${p.name} ${p.brand} ${p.description}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.reviews || 0) - (a.reviews || 0); // popular
    });
  }, [products, category.name, maxPriceCap, searchQuery, sortBy]);

  return (
    <div className="category-hub-page">
      <div className="home-container">
        
        {/* Breadcrumb navigation */}
        <div className="breadcrumbs" style={{ marginTop: '15px' }}>
          <Link to="/">Home</Link> <FiChevronRight /> <span>Category</span> <FiChevronRight /> <strong style={{ color: '#1c1b1a' }}>{category.name}</strong>
        </div>

        {/* Hero Category Banner */}
        <div className={`category-hero-header ${category.theme}`}>
          <div className="category-hero-grid-layout">
            <div className="category-hero-content">
              <span className="category-badge-tag">{category.icon} {category.badge}</span>
              <h1 className="category-hero-title">{category.title}</h1>
              <p className="category-hero-desc">{category.description}</p>
              
              {/* Floating Key Metrics */}
              <div className="category-hero-stats-row">
                <div className="cat-stat-chip">
                  <FiStar style={{ color: '#F59E0B' }} />
                  <span><strong>4.9/5</strong> (50k+ Reviews)</span>
                </div>
                <div className="cat-stat-chip">
                  <FiAward style={{ color: '#10B981' }} />
                  <span><strong>100%</strong> Brand Warranty</span>
                </div>
                <div className="cat-stat-chip">
                  <FiTruck style={{ color: '#3B82F6' }} />
                  <span><strong>24-Hr</strong> Fast Dispatch</span>
                </div>
              </div>

              <div className="category-hero-perks">
                <span className="category-perk-pill"><FiTruck style={{ color: '#F59E0B' }} /> Free Express Transit</span>
                <span className="category-perk-pill"><FiShield style={{ color: '#10B981' }} /> 100% Brand Guarantee</span>
                <span className="category-perk-pill"><FiRefreshCw style={{ color: '#3B82F6' }} /> 14-Day Easy Return</span>
              </div>
            </div>

            {/* Right Promotional Coupon Card */}
            <div className="category-hero-promo-card">
              <div className="promo-card-tag">LIMITED TIME OFFER</div>
              <h3>Exclusive {category.name} Coupon</h3>
              <p>Get an extra 20% instant discount on your order at checkout.</p>
              <div className="coupon-code-box">
                <code>WELCOME20</code>
                <button 
                  type="button" 
                  className="coupon-copy-btn"
                  onClick={() => {
                    navigator.clipboard?.writeText('WELCOME20');
                    setCouponCopied(true);
                    showToast('Coupon WELCOME20 copied to clipboard!', 'success');
                    setTimeout(() => setCouponCopied(false), 3000);
                  }}
                >
                  {couponCopied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy Code</>}
                </button>
              </div>
              <small>Valid on all prepaid & COD transactions</small>
            </div>
          </div>
        </div>

        {/* Sub-department Quick Navigator */}
        <div className="category-subnav-carousel">
          <button 
            className={`department-pill-btn ${selectedDept === 'All' && !maxPriceCap ? 'active' : ''}`}
            onClick={() => {
              setSelectedDept('All');
              setMaxPriceCap(null);
            }}
          >
            ✦ All {category.name} Catalog
          </button>
          {category.departments.filter(d => d !== 'All ' + category.name).map((dept, idx) => (
            <button 
              key={idx}
              className={`department-pill-btn ${selectedDept === dept ? 'active' : ''}`}
              onClick={() => {
                setSelectedDept(dept);
                setSearchQuery(dept.split(' ')[0]);
              }}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Category Specific Interactive Widget */}
        {category.widgetType === 'mobiles_comparator' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">FLAGSHIP COMPARATOR</span>
              <h3>Compare Top 5G Flagship Specifications</h3>
              <p>Compare camera optics, processors, and fast charging speeds side-by-side.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80" alt="iPhone 16 Pro Max" />
                <h4>iPhone 16 Pro Max</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹1,34,900</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Processor</span><strong>Apple A18 Pro (3nm)</strong></div>
                  <div className="spec-item"><span>Camera</span><strong>48MP + 5x Telephoto</strong></div>
                  <div className="spec-item"><span>Display</span><strong>6.9" 120Hz ProMotion</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>33 Hours Video</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80" alt="Galaxy S24 Ultra" />
                <h4>Samsung Galaxy S24 Ultra</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹1,19,999</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Processor</span><strong>Snapdragon 8 Gen 3</strong></div>
                  <div className="spec-item"><span>Camera</span><strong>200MP + 100x Zoom</strong></div>
                  <div className="spec-item"><span>Display</span><strong>6.8" QHD+ 2600 nits</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>5000mAh + 45W</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80" alt="OnePlus 12" />
                <h4>OnePlus 12 5G</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹64,999</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Processor</span><strong>Snapdragon 8 Gen 3</strong></div>
                  <div className="spec-item"><span>Camera</span><strong>50MP Sony Hasselblad</strong></div>
                  <div className="spec-item"><span>Display</span><strong>6.82" 2K 4500 nits</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>5400mAh + 100W</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'beauty_routine' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <span className="section-subtitle">DERMATOLOGIST REGIMEN</span>
                <h3>Targeted Skincare Routine Step-by-Step</h3>
                <p>Follow our AM/PM protocol for optimal skin barrier hydration and radiance.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className={`price-shelf-tab-btn ${activeAmPm === 'AM' ? 'active' : ''}`}
                  onClick={() => setActiveAmPm('AM')}
                >
                  ☀️ Morning Glow (AM)
                </button>
                <button 
                  className={`price-shelf-tab-btn ${activeAmPm === 'PM' ? 'active' : ''}`}
                  onClick={() => setActiveAmPm('PM')}
                >
                  🌙 Evening Repair (PM)
                </button>
              </div>
            </div>
            
            <div className="skincare-routine-grid">
              <div className="routine-step-card">
                <span className="routine-step-tag">Step 1: Cleanse</span>
                <h4>Botanical Gel Cleanser</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>{activeAmPm === 'AM' ? 'Gentle pH-balanced wash to remove overnight oils without stripping moisture.' : 'Double cleanse with botanical extract to wash away SPF and urban pollution.'}</p>
              </div>
              <div className="routine-step-card">
                <span className="routine-step-tag">Step 2: Treat</span>
                <h4>{activeAmPm === 'AM' ? '15% Vitamin C Antioxidant' : 'Barrier Niacinamide Serum'}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>{activeAmPm === 'AM' ? 'Neutralizes UV free radicals and brightens dark spots.' : 'Calms redness and strengthens the lipid matrix overnight.'}</p>
              </div>
              <div className="routine-step-card">
                <span className="routine-step-tag">Step 3: Moisturize</span>
                <h4>Deep Ceramide Cream</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>Locks in moisture with lightweight hyaluronic acid hydration.</p>
              </div>
              <div className="routine-step-card">
                <span className="routine-step-tag">Step 4: Protect</span>
                <h4>{activeAmPm === 'AM' ? 'SPF 50+ Broad Spectrum Sunscreen' : 'Restorative Night Recovery Balm'}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>{activeAmPm === 'AM' ? 'Non-greasy invisible finish against UVA/UVB rays.' : 'Seals moisture and boosts skin repair cellular turnover.'}</p>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'appliances_energy' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">SMART SAVINGS CALCULATOR</span>
              <h3>5-Star Energy Efficiency Annual Savings</h3>
              <p>Calculate your estimated power savings when switching to inverter-powered appliances.</p>
            </div>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px' }}>
                  Daily Appliance Usage: <strong>{applianceHours} Hours / Day</strong>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="24" 
                  value={applianceHours} 
                  onChange={(e) => setApplianceHours(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--n-orange, #f15b2a)', height: '8px', borderRadius: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '5px' }}>
                  <span>2 hrs (Occasional)</span>
                  <span>12 hrs (Standard)</span>
                  <span>24 hrs (Continuous)</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '280px', background: 'var(--n-cream, #f9f7f2)', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
                <small style={{ textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold' }}>Estimated Electricity Saved</small>
                <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#15803d', margin: '6px 0' }}>
                  ₹{(applianceHours * 480).toLocaleString('en-IN')} / year
                </div>
                <p style={{ fontSize: '0.85rem', color: '#484440' }}>Reduces carbon footprint by ~{applianceHours * 35} kg CO₂ annually.</p>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'smartwatch_comparator' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">FLAGSHIP WEARABLE MATRIX</span>
              <h3>Compare Flagship Smartwatch Capabilities</h3>
              <p>Compare battery endurance, health telemetry sensors, and waterproof dive ratings.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80" alt="Apple Watch Ultra 2" />
                <h4>Apple Watch Ultra 2</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹89,900</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Display</span><strong>3000 Nits Sapphire OLED</strong></div>
                  <div className="spec-item"><span>Sensors</span><strong>ECG, Temp, Depth Gauge</strong></div>
                  <div className="spec-item"><span>GPS</span><strong>Dual L1+L5 Frequency</strong></div>
                  <div className="spec-item"><span>Waterproof</span><strong>100m Dive EN13319</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" alt="Galaxy Watch 7 Ultra" />
                <h4>Samsung Galaxy Watch 7</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹32,999</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Display</span><strong>1.5" Super AMOLED</strong></div>
                  <div className="spec-item"><span>Sensors</span><strong>BioActive AGEs Index</strong></div>
                  <div className="spec-item"><span>OS</span><strong>WearOS 5 + Google AI</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>Up to 48 Hours</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80" alt="Pulse Active Smartwatch" />
                <h4>Pulse Active GPS Watch</h4>
                <div style={{ fontWeight: 'bold', color: 'var(--n-orange, #f15b2a)', margin: '4px 0 10px 0' }}>₹3,299</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Display</span><strong>1.43" HD AMOLED</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>12 Days Battery Life</strong></div>
                  <div className="spec-item"><span>Calling</span><strong>Bluetooth Calling HD</strong></div>
                  <div className="spec-item"><span>Waterproof</span><strong>5ATM Water Resistant</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'gaming_rig_specs' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">ESPORTS COMBAT BENCHMARK</span>
              <h3>Tournament Tier Esports Battle Station Gear</h3>
              <p>Engineered for sub-1ms response times, 8KHz polling rates, and tactile precision.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80" alt="Custom Mechanical Keyboard" />
                <h4>Apex Magnetic TKL Keyboard</h4>
                <div style={{ fontWeight: 'bold', color: '#2563eb', margin: '4px 0 10px 0' }}>₹8,499</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Switches</span><strong>Hall Effect Magnetic (0.1mm)</strong></div>
                  <div className="spec-item"><span>Polling</span><strong>8000Hz Ultra-fast</strong></div>
                  <div className="spec-item"><span>Keycaps</span><strong>Double-shot PBT</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80" alt="Esports Gaming Mouse" />
                <h4>G-Pro Ultralight 4K Mouse</h4>
                <div style={{ fontWeight: 'bold', color: '#2563eb', margin: '4px 0 10px 0' }}>₹4,999</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Weight</span><strong>49 Grams Magnesium</strong></div>
                  <div className="spec-item"><span>Sensor</span><strong>32,000 DPI Optical Gen 2</strong></div>
                  <div className="spec-item"><span>Battery</span><strong>90 Hours Competitive</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80" alt="Gaming Headset" />
                <h4>Spatial 7.1 Wireless Headset</h4>
                <div style={{ fontWeight: 'bold', color: '#2563eb', margin: '4px 0 10px 0' }}>₹6,299</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Audio</span><strong>50mm Titanium Drivers</strong></div>
                  <div className="spec-item"><span>Latency</span><strong>&lt;15ms 2.4GHz Lossless</strong></div>
                  <div className="spec-item"><span>Mic</span><strong>Broadcast Detachable ANC</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'sports_calorie_widget' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">ATHLETE PERFORMANCE ESTIMATOR</span>
              <h3>Workout Routine & Calorie Burn Index</h3>
              <p>Target your fitness objectives with recommended equipment and expected output.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <h4>🔥 High Intensity Strength</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Adjustable dumbbells + bench training</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Burn Output</span><strong>450-600 kcal / hr</strong></div>
                  <div className="spec-item"><span>Core Focus</span><strong>Hypertrophy & Bone Density</strong></div>
                  <div className="spec-item"><span>Gear Needed</span><strong>Cast Iron Hex Dumbbells</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>🧘 Vinyasa Yoga & Recovery</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>High density eco mat + foam roller</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Burn Output</span><strong>220-350 kcal / hr</strong></div>
                  <div className="spec-item"><span>Core Focus</span><strong>Flexibility & Joint Mobility</strong></div>
                  <div className="spec-item"><span>Gear Needed</span><strong>6mm Anti-Slip TPE Mat</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>🏃 Outdoor Cardio & Rackets</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Badminton, cricket & distance running</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Burn Output</span><strong>550-750 kcal / hr</strong></div>
                  <div className="spec-item"><span>Core Focus</span><strong>VO2 Max & Agility Reflexes</strong></div>
                  <div className="spec-item"><span>Gear Needed</span><strong>Graphite Racket / Spikes</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'books_shelf_widget' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">CURATED READING VAULT</span>
              <h3>Literary Masterpieces & Creative Journals</h3>
              <p>Top-rated fiction and growth paperbacks rated 4.8★+ by verified readers.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <h4>Atomic Habits & Psychology</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>James Clear • International Bestseller</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Genre</span><strong>Self-Mastery / Behavioral</strong></div>
                  <div className="spec-item"><span>Pages</span><strong>320 Pages Hardcover</strong></div>
                  <div className="spec-item"><span>Reader Rating</span><strong>4.9 ★ (120k+ reviews)</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>Classic Literature Box Set</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Collector's Gilded Clothbound Edition</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Genre</span><strong>Timeless Fiction Classics</strong></div>
                  <div className="spec-item"><span>Paper</span><strong>80GSM Acid-Free Cream</strong></div>
                  <div className="spec-item"><span>Included</span><strong>Ribbon Bookmark & Slipcase</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>120GSM Bullet Dot Journal</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Archival Vegan Leather Notebook</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Paper</span><strong>Zero Bleed / Ghosting</strong></div>
                  <div className="spec-item"><span>Binding</span><strong>Lay-Flat 180° Thread Sewn</strong></div>
                  <div className="spec-item"><span>Features</span><strong>Pen Loop + Dual Bookmarks</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'luxury_certificate_widget' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">HALLMARK & CERTIFICATION VAULT</span>
              <h3>BIS 916 Hallmarking & Diamond Verification</h3>
              <p>Every piece is accompanied by individual laser-inscribed laboratory certification.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <h4>💎 Solitaire Diamonds</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>IGI / SGL Certified VVS Clarity</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Cut Grade</span><strong>Triple Excellent Ideal</strong></div>
                  <div className="spec-item"><span>Color</span><strong>D-E-F Colorless Range</strong></div>
                  <div className="spec-item"><span>Security</span><strong>Laser Inscribed Girdle ID</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>✨ 22K & 18K Solid Gold</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Government BIS Triangular Hallmark</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Purity</span><strong>91.6% Pure Gold Certified</strong></div>
                  <div className="spec-item"><span>Traceability</span><strong>6-Digit Unique HUID Code</strong></div>
                  <div className="spec-item"><span>Assay</span><strong>Government Approved Labs</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <h4>⌚ Swiss Automatic Chronographs</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '6px 0' }}>Powermatic 80 / NH35 Calibre</p>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Glass</span><strong>AR-Coated Sapphire Crystal</strong></div>
                  <div className="spec-item"><span>Case</span><strong>316L Surgical Stainless Steel</strong></div>
                  <div className="spec-item"><span>Warranty</span><strong>2-Year International Card</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {category.widgetType === 'plants_sunlight_widget' && (
          <div className="category-interactive-widget-box">
            <div className="widget-header">
              <span className="section-subtitle">BOTANICAL CARE MATRIX</span>
              <h3>Light & Hydration Requirements by Plant Variety</h3>
              <p>Match your indoor lighting conditions with perfect low-maintenance greenery.</p>
            </div>
            <div className="mobile-comparator-grid">
              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80" alt="Sansevieria Snake Plant" />
                <h4>Sansevieria Snake Plant</h4>
                <div style={{ fontWeight: 'bold', color: '#15803d', margin: '4px 0 10px 0' }}>₹499</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Light</span><strong>Low to Bright Indirect</strong></div>
                  <div className="spec-item"><span>Watering</span><strong>Once Every 2-3 Weeks</strong></div>
                  <div className="spec-item"><span>Benefit</span><strong>NASA Top Air Purifier</strong></div>
                  <div className="spec-item"><span>Care Level</span><strong>Zero Maintenance (Beginner)</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80" alt="Good Luck Jade Plant" />
                <h4>Good Luck Crassula Jade</h4>
                <div style={{ fontWeight: 'bold', color: '#15803d', margin: '4px 0 10px 0' }}>₹349</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Light</span><strong>4+ Hours Morning Sunlight</strong></div>
                  <div className="spec-item"><span>Watering</span><strong>When Soil is Completely Dry</strong></div>
                  <div className="spec-item"><span>Symbol</span><strong>Prosperity & Feng Shui</strong></div>
                  <div className="spec-item"><span>Foliage</span><strong>Plump Fleshy Succulent</strong></div>
                </div>
              </div>

              <div className="phone-compare-card">
                <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80" alt="IFFCO Organic Soil" />
                <h4>Organic Enriched Potting Soil</h4>
                <div style={{ fontWeight: 'bold', color: '#15803d', margin: '4px 0 10px 0' }}>₹299 (5kg)</div>
                <div className="spec-badge-row">
                  <div className="spec-item"><span>Composition</span><strong>Cocopeat + Vermicompost</strong></div>
                  <div className="spec-item"><span>Aeration</span><strong>Perlite Enhanced Drainage</strong></div>
                  <div className="spec-item"><span>Protection</span><strong>Neem Cake Anti-Fungal</strong></div>
                  <div className="spec-item"><span>pH Level</span><strong>6.5 Balanced Neutral</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Brand Partners Strip */}
        <div className="category-brands-row">
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', letterSpacing: '1px' }}>OFFICIAL BRAND PARTNERS:</span>
          {category.brands.map((b, idx) => (
            <span 
              key={idx} 
              className="brand-partner-tile"
              onClick={() => setSearchQuery(b)}
            >
              {b}
            </span>
          ))}
        </div>

        {/* Deals & Price Tier Quick Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1c1b1a' }}>Filter by Budget:</span>
          {category.deals.map((deal, idx) => (
            <button 
              key={idx}
              className={`price-shelf-tab-btn ${maxPriceCap === deal.maxPrice ? 'active' : ''}`}
              onClick={() => setMaxPriceCap(maxPriceCap === deal.maxPrice ? null : deal.maxPrice)}
            >
              {deal.label}
            </button>
          ))}
          {maxPriceCap && (
            <button 
              onClick={() => setMaxPriceCap(null)}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
            >
              ✕ Clear Budget Filter
            </button>
          )}
        </div>

        {/* Live Catalog Toolbar */}
        <div className="category-catalog-toolbar">
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1c1b1a' }}>
              Explore {category.name} Catalog ({categoryProducts.length} items)
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="category-catalog-search">
              <FiSearch />
              <input 
                type="text" 
                placeholder={`Search in ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '20px', border: '1px solid var(--n-line, #e6e2db)', fontSize: '0.9rem', outline: 'none' }}
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="price-low">💵 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {categoryProducts.length > 0 ? (
          <div className="product-cards-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '16px', margin: '30px 0' }}>
            <FiSearch style={{ fontSize: '2.5rem', color: '#94a3b8', marginBottom: '15px' }} />
            <h3>No products matching "{searchQuery}"</h3>
            <p style={{ color: '#64748b', marginTop: '6px' }}>Try resetting your budget or search filter to see more items.</p>
            <button 
              className="cta-btn primary"
              style={{ marginTop: '20px' }}
              onClick={() => {
                setSearchQuery('');
                setMaxPriceCap(null);
                setSelectedDept('All');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Buying Guide Editorial Section */}
        <div style={{ background: '#fff', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '20px', padding: '35px', marginTop: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#1c1b1a' }}>{category.guide.title}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {category.guide.tips.map((tip, idx) => (
              <div key={idx} style={{ background: 'var(--n-cream, #f9f7f2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--n-line, #e6e2db)' }}>
                <strong style={{ display: 'block', color: 'var(--n-orange, #f15b2a)', fontSize: '0.85rem', marginBottom: '6px' }}>PRO-TIP #{idx + 1}</strong>
                <p style={{ fontSize: '0.9rem', color: '#484440', lineHeight: '1.5' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category FAQ Accordion */}
        <div style={{ marginTop: '50px' }}>
          <div className="section-header">
            <div>
              <span className="section-subtitle">BUYER ASSISTANCE</span>
              <h2>{category.name} Frequently Asked Questions</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            {category.faqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#fff', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  style={{ width: '100%', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', textAlign: 'left', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', color: '#1c1b1a' }}
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <FiChevronDown style={{ transform: openFaqIdx === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'var(--n-orange, #f15b2a)' }} />
                </button>
                {openFaqIdx === idx && (
                  <div style={{ padding: '0 24px 20px 24px', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid var(--n-line, #e6e2db)', paddingTop: '14px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Trust & Assurance Grid */}
        <div className="category-trust-grid">
          <div className="category-trust-card">
            <div className="trust-icon-wrap"><FiShield /></div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>100% Genuine</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Direct brand authorization</p>
            </div>
          </div>
          <div className="category-trust-card">
            <div className="trust-icon-wrap"><FiTruck /></div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Express 24-hr Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Free shipping over ₹999</p>
            </div>
          </div>
          <div className="category-trust-card">
            <div className="trust-icon-wrap"><FiRefreshCw /></div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>14-Day Free Returns</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Doorstep pickup & direct refund</p>
            </div>
          </div>
          <div className="category-trust-card">
            <div className="trust-icon-wrap"><FiHelpCircle /></div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>24x7 Customer Care</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Live chat & toll-free helpline</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
