export const MEGA_MENU_DATA = {
  fashion: {
    accentColor: '#ee5f73',
    columns: [
      {
        heading: "Men's Fashion",
        links: [
          { label: 'Casual T-Shirts', tag: 'HOT', query: 'tshirt' },
          { label: 'Formal & Casual Shirts', query: 'shirt' },
          { label: 'Denim Jeans & Trousers', query: 'jeans' },
          { label: 'Hoodies & Sweatshirts', tag: 'NEW', query: 'hoodie' },
          { label: 'Sneakers & Sports Shoes', tag: '40% OFF', query: 'sneakers' },
          { label: 'Leather Belts & Wallets', query: 'wallet' },
        ]
      },
      {
        heading: "Women's Western",
        links: [
          { label: 'Dresses & Jumpsuits', tag: 'TRENDING', query: 'dress' },
          { label: 'Tops & Blouses', query: 'top' },
          { label: 'High-Rise Denim', query: 'jeans' },
          { label: 'Athleisure & Leggings', query: 'leggings' },
          { label: 'Heels, Flats & Boots', query: 'shoes' },
          { label: 'Handbags & Totes', tag: 'LUXE', query: 'bag' },
        ]
      },
      {
        heading: 'Top Brands & Curations',
        links: [
          { label: 'Nike & Adidas Sports', query: 'Nike' },
          { label: 'Zara & H&M Streetwear', query: 'Zara' },
          { label: "Levi's Classic Denim", query: "Levi's" },
          { label: 'Under ₹999 Budget Edit', query: 'budget' },
          { label: 'Premium Luxury Vault', tag: 'PROMO', query: 'luxury' },
          { label: 'New Seasonal Arrivals', query: 'new' },
        ]
      }
    ],
    promoBadge: '🎉 FLAT 20% OFF with Code WELCOME20 on First Fashion Order'
  },

  mobiles: {
    accentColor: '#2874f0',
    columns: [
      {
        heading: 'Flagship & 5G Phones',
        links: [
          { label: 'Apple iPhone 16 & 15 Pro', tag: 'HOT', query: 'apple' },
          { label: 'Samsung Galaxy S24 Ultra', tag: 'AI TECH', query: 'samsung' },
          { label: 'OnePlus 12 & Nord 5G', query: 'oneplus' },
          { label: 'Google Pixel 9 Pro', query: 'pixel' },
          { label: 'Foldable & Flip Phones', tag: 'NEW', query: 'fold' },
          { label: 'Fast 120W Chargers', query: 'charger' },
        ]
      },
      {
        heading: 'Budget & Performance',
        links: [
          { label: '5G Phones Under ₹15,000', tag: 'BESTSELLER', query: '5g' },
          { label: 'Mid-Range Powerhouses (Under ₹35k)', query: 'phone' },
          { label: 'Gaming Phones (Snapdragon 8 Gen 3)', query: 'gaming' },
          { label: '200MP Camera Champions', query: 'camera' },
          { label: 'Massive 6000mAh Battery', query: 'battery' },
          { label: 'Tempered Glass & Cases', query: 'case' },
        ]
      },
      {
        heading: 'Brand Stores & Offers',
        links: [
          { label: 'Official Apple Authorized Store', query: 'Apple' },
          { label: 'Samsung Exclusive Zone', query: 'Samsung' },
          { label: 'OnePlus Brand Hub', query: 'OnePlus' },
          { label: 'Doorstep Phone Exchange', tag: 'SAVE ₹10k', query: 'exchange' },
          { label: 'No-Cost EMI on Credit Cards', query: 'emi' },
          { label: 'Extended 1-Year Warranty', query: 'warranty' },
        ]
      }
    ],
    promoBadge: '⚡ Up to ₹10,000 Instant Bank Discount on SBI & HDFC Credit Cards'
  },

  electronics: {
    accentColor: '#0284c7',
    columns: [
      {
        heading: 'Audio & Acoustics',
        links: [
          { label: 'Noise Cancelling Headphones', tag: 'ANC', query: 'headphones' },
          { label: 'True Wireless Earbuds (TWS)', tag: 'HOT', query: 'earbuds' },
          { label: 'Bluetooth Party Speakers', query: 'speaker' },
          { label: 'Dolby Atmos Soundbars', query: 'soundbar' },
          { label: 'Studio Monitor Microphones', query: 'mic' },
          { label: 'Spatial 3D Audio Headsets', query: 'audio' },
        ]
      },
      {
        heading: 'Computing & Office',
        links: [
          { label: 'OLED & 4K PC Monitors', tag: 'NEW', query: 'monitor' },
          { label: 'Ergonomic Laptop Stands', query: 'stand' },
          { label: 'Fast USB-C Multi-Port Hubs', query: 'hub' },
          { label: 'High-Speed NVMe SSD Drives', query: 'ssd' },
          { label: 'Wireless Mechanical Keyboards', query: 'keyboard' },
          { label: 'Thermal POS Printers', query: 'printer' },
        ]
      },
      {
        heading: 'Top Tech Brands',
        links: [
          { label: 'Sony & Bose Premium Audio', query: 'Sony' },
          { label: 'NexAudio Pro Gear', query: 'NexAudio' },
          { label: 'Logitech Workspace Tools', query: 'Logitech' },
          { label: 'Under ₹2,499 Gadget Deals', tag: 'VALUE', query: 'deals' },
          { label: 'Student Tech Discounts', query: 'student' },
          { label: '100% Brand Certified Guarantee', query: 'certified' },
        ]
      }
    ],
    promoBadge: '🎧 Free Spatial Audio Tune-Up & 1-Year Replacement Coverage'
  },

  smartwatches: {
    accentColor: '#0ea5e9',
    columns: [
      {
        heading: 'Smart Watches',
        links: [
          { label: 'Apple Watch Ultra & Series 10', tag: 'TITANIUM', query: 'Apple Watch' },
          { label: 'Samsung Galaxy Watch 7', query: 'Galaxy Watch' },
          { label: 'AMOLED Bluetooth Calling', tag: 'HOT', query: 'amoled' },
          { label: 'Rugged Outdoor GPS Multisport', query: 'gps' },
          { label: 'Stainless Steel Luxury Smartwatches', query: 'luxe' },
          { label: 'Quick-Release Magnetic Straps', query: 'strap' },
        ]
      },
      {
        heading: 'Health & Fitness Bands',
        links: [
          { label: 'Continuous Heart Rate & SpO2', query: 'spo2' },
          { label: 'Sleep Stage Biometric Trackers', query: 'sleep' },
          { label: 'Waterproof 5ATM Swim Bands', tag: 'SWIM', query: 'swim' },
          { label: 'Fitness Bands Under ₹1,999', query: 'band' },
          { label: '14-Day Ultra Battery Watches', tag: 'LONG-LIFE', query: 'battery' },
          { label: 'Wireless Magnetic Docks', query: 'charger' },
        ]
      },
      {
        heading: 'Top Wearable Brands',
        links: [
          { label: 'Pulse Active Official Store', query: 'Pulse' },
          { label: 'Garmin Running & Triathlons', query: 'Garmin' },
          { label: 'Amazfit High-End Endurance', query: 'Amazfit' },
          { label: 'Noise & Fire-Boltt Bestsellers', query: 'Noise' },
          { label: 'Under ₹4,999 AMOLED Showcase', tag: 'BEST VALUE', query: 'amoled' },
          { label: 'Free Screen Protector Bundle', query: 'bundle' },
        ]
      }
    ],
    promoBadge: '⌚ Next-Gen Health Telemetry & Dual-Frequency Precision GPS'
  },

  gaming: {
    accentColor: '#8b5cf6',
    columns: [
      {
        heading: 'Battle Station Gear',
        links: [
          { label: 'Hall Effect Magnetic Keyboards', tag: '0.1mm', query: 'keyboard' },
          { label: 'Ultra-Light 8KHz Esports Mice', tag: '49g', query: 'mouse' },
          { label: 'Spatial 7.1 Esports Headsets', query: 'headset' },
          { label: 'Speed Surface XL Desk Mats', query: 'mat' },
          { label: 'Custom PBT Double-Shot Keycaps', query: 'keycaps' },
          { label: 'Adjustable Monitor Arms', query: 'arm' },
        ]
      },
      {
        heading: 'Consoles & Accessories',
        links: [
          { label: 'PlayStation 5 & DualSense', tag: 'HOT', query: 'playstation' },
          { label: 'Wireless Pro Controllers', query: 'controller' },
          { label: '240Hz OLED Gaming Displays', tag: 'OLED', query: 'monitor' },
          { label: 'Ergonomic Gaming Chairs', query: 'chair' },
          { label: 'Streaming Broadcast Webcams & RGB', query: 'stream' },
          { label: 'High-Speed HDMI 2.1 Cables', query: 'hdmi' },
        ]
      },
      {
        heading: 'Esports Brands & Deals',
        links: [
          { label: 'Razer Chroma Battlestations', query: 'Razer' },
          { label: 'Logitech G Pro Series', query: 'Logitech' },
          { label: 'Arc Gaming Tournament Rig', query: 'Arc Gaming' },
          { label: 'Esports Gear Under ₹2,999', tag: 'BUDGET RIG', query: 'deals' },
          { label: 'Official Tournament Bundles', query: 'bundle' },
          { label: 'Low-Latency 2.4GHz Wireless Hub', query: 'wireless' },
        ]
      }
    ],
    promoBadge: '🎮 Tournament-Grade Sub-1ms Latency Gear with Instant Brand Warranty'
  },

  beauty: {
    accentColor: '#ec4899',
    columns: [
      {
        heading: 'Dermatological Skincare',
        links: [
          { label: 'Vitamin C Brightening Serums', tag: 'GLOW', query: 'serum' },
          { label: 'Hyaluronic Acid Moisturizers', query: 'moisturizer' },
          { label: 'Ceramide Barrier Repair Balms', query: 'barrier' },
          { label: 'SPF 50+ Invisible Sunscreens', tag: 'HOT', query: 'sunscreen' },
          { label: 'Exfoliating BHA Cleansers', query: 'cleanser' },
          { label: 'Hydrogel Under-Eye Patches', query: 'eye' },
        ]
      },
      {
        heading: 'Makeup & Haircare',
        links: [
          { label: 'Matte Liquid Lipsticks', tag: '16HR', query: 'lipstick' },
          { label: 'Flawless Liquid Foundations', query: 'foundation' },
          { label: 'Argan & Rosemary Hair Oils', query: 'oil' },
          { label: 'Sulfate-Free Shampoos', query: 'shampoo' },
          { label: 'Luxury EDP Perfumes', tag: 'LUXE', query: 'perfume' },
          { label: 'Professional Makeup Brushes', query: 'brush' },
        ]
      },
      {
        heading: 'Beauty Brands & Regimens',
        links: [
          { label: "L'Oréal Paris & Maybelline", query: 'Loreal' },
          { label: 'The Derma Co & Minimalist', query: 'Minimalist' },
          { label: 'Forest Essentials Organic Luxe', query: 'Forest' },
          { label: 'AM / PM Targeted Daily Regimen', tag: 'GUIDE', query: 'regimen' },
          { label: 'Clean Beauty Under ₹699', query: 'clean' },
          { label: '100% Dermatologist Verified', query: 'verified' },
        ]
      }
    ],
    promoBadge: '✨ 100% Genuine Dermatologically Tested Formulations with Free Samples'
  },

  home: {
    accentColor: '#d97706',
    columns: [
      {
        heading: 'Home Decor & Lighting',
        links: [
          { label: 'Aura Ambient Glow Lamps', tag: 'BESTSELLER', query: 'lamp' },
          { label: 'Air Purifying Indoor Live Plants', query: 'plant' },
          { label: 'Ceramic Planters & Vases', query: 'planter' },
          { label: 'Scented Soy Wax Candles', query: 'candle' },
          { label: 'Modern Geometric Wall Clocks', query: 'clock' },
          { label: 'Cotton Linen Cushion Covers', query: 'cushion' },
        ]
      },
      {
        heading: 'Living & Furniture',
        links: [
          { label: 'High-Back Ergonomic Chairs', tag: 'COMFORT', query: 'chair' },
          { label: 'Solid Sheesham Wood Tables', query: 'table' },
          { label: 'Modular Bookcases & Shelves', query: 'shelf' },
          { label: 'Memory Foam Bed Pillows', query: 'pillow' },
          { label: 'Blackout Thermal Curtains', query: 'curtain' },
          { label: 'Hand-Tufted Wool Rugs', tag: 'LUXE', query: 'rug' },
        ]
      },
      {
        heading: 'Home Brands & Deals',
        links: [
          { label: 'Aura Living Studio', query: 'Aura' },
          { label: 'IKEA & Urban Ladder Curations', query: 'IKEA' },
          { label: 'Home Decor Under ₹1,499', tag: 'DEALS', query: 'budget' },
          { label: 'Work From Home Ergonomic Setup', query: 'wfh' },
          { label: 'Organic Potting Soil & Garden', query: 'garden' },
          { label: 'Free Room Staging Consultations', query: 'consult' },
        ]
      }
    ],
    promoBadge: '🏡 Transform Your Living Space with Carbon-Neutral Free Delivery'
  },

  appliances: {
    accentColor: '#f97316',
    columns: [
      {
        heading: 'Kitchen Essentials',
        links: [
          { label: 'Digital Air Fryers (4.2L)', tag: 'OIL-FREE', query: 'airfryer' },
          { label: '750W Heavy-Duty Mixer Grinders', query: 'mixer' },
          { label: 'Cold-Press Slow Juicers', query: 'juicer' },
          { label: 'Touch Induction Cooktops', query: 'induction' },
          { label: 'Electric Stainless Steel Kettles', query: 'kettle' },
          { label: 'Multi-Slice Pop-Up Toasters', query: 'toaster' },
        ]
      },
      {
        heading: 'Large Home Appliances',
        links: [
          { label: '5-Star Inverter Air Conditioners', tag: 'SAVE 60%', query: 'ac' },
          { label: 'Front Load AI Washing Machines', query: 'washer' },
          { label: 'Frost-Free Double Door Fridges', query: 'fridge' },
          { label: 'HEPA 13 Air Purifiers', tag: 'CLEAN AIR', query: 'purifier' },
          { label: 'Smart Robotic Vacuum Cleaners', query: 'vacuum' },
          { label: 'Water Purifiers with RO+UV', query: 'water' },
        ]
      },
      {
        heading: 'Appliance Brands & Service',
        links: [
          { label: 'Philips & Morphy Richards', query: 'Philips' },
          { label: 'LG & Samsung Smart Living', query: 'LG' },
          { label: 'Prestige & Wonderchef Kitchen', query: 'Prestige' },
          { label: 'Energy Savings Calculator', tag: 'TOOL', query: 'savings' },
          { label: 'Free Next-Day Technician Install', query: 'install' },
          { label: 'Up to 5 Years Motor Warranty', query: 'warranty' },
        ]
      }
    ],
    promoBadge: '⚡ 5-Star Energy Star Certified Appliances with Free Doorstep Installation'
  },

  sports: {
    accentColor: '#10b981',
    columns: [
      {
        heading: 'Home Gym & Weights',
        links: [
          { label: 'Cast Iron Hex Dumbbell Pairs', tag: 'RUBBER', query: 'dumbbell' },
          { label: 'Adjustable Weight Benches', query: 'bench' },
          { label: 'Resistance Loop Bands (5-Pack)', query: 'bands' },
          { label: 'High-Density Non-Slip Yoga Mats', tag: 'ECO TPE', query: 'yoga' },
          { label: 'Kettlebells & Barbell Plates', query: 'kettlebell' },
          { label: 'Foam Rollers for Deep Tissue', query: 'roller' },
        ]
      },
      {
        heading: 'Outdoor & Team Sports',
        links: [
          { label: 'English Willow Cricket Bats', tag: 'PRO', query: 'cricket' },
          { label: 'Badminton Rackets & Shuttles', query: 'badminton' },
          { label: 'Match Footballs & Basketballs', query: 'football' },
          { label: 'Running Shoes & Spikes', query: 'running' },
          { label: 'Compression Tights & Jerseys', query: 'compression' },
          { label: 'Sports Hydration Shaker Bottles', query: 'bottle' },
        ]
      },
      {
        heading: 'Athletic Brands & Offers',
        links: [
          { label: 'Nike & Decathlon Official Hub', query: 'Nike' },
          { label: 'Yonex & SS Cricket Gear', query: 'Yonex' },
          { label: 'Everlast Boxing & Strength', query: 'Everlast' },
          { label: 'Fitness Accessories Under ₹699', tag: 'UNDER ₹699', query: 'budget' },
          { label: 'High-Calorie Workout Guides', query: 'workout' },
          { label: '100% Athlete Grade Durability', query: 'durable' },
        ]
      }
    ],
    promoBadge: '⚽ Athlete-Grade Equipment with Free Doorstep Delivery on Heavy Weights'
  },

  books: {
    accentColor: '#f59e0b',
    columns: [
      {
        heading: 'Fiction & Literature',
        links: [
          { label: 'International Thriller Bestsellers', tag: '4.9★', query: 'thriller' },
          { label: 'Classic Clothbound Box Sets', query: 'classic' },
          { label: 'Sci-Fi & Epic Fantasy Novels', query: 'fantasy' },
          { label: 'Historical & Literary Fiction', query: 'fiction' },
          { label: 'Graphic Novels & Manga', tag: 'POPULAR', query: 'manga' },
          { label: 'Award-Winning Poetry Anthologies', query: 'poetry' },
        ]
      },
      {
        heading: 'Self-Growth & Stationery',
        links: [
          { label: 'Atomic Habits & Psychology', tag: 'TOP READ', query: 'habits' },
          { label: 'Business Strategy & Finance', query: 'business' },
          { label: '120GSM Bullet Dot Journals', tag: 'NO BLEED', query: 'journal' },
          { label: 'Archival Fountain & Gel Pens', query: 'pen' },
          { label: 'Leatherbound Daily Planners', query: 'planner' },
          { label: 'Artisan Bookmark Ribbon Sets', query: 'bookmark' },
        ]
      },
      {
        heading: 'Publishers & Curations',
        links: [
          { label: 'Penguin Random House Classics', query: 'Penguin' },
          { label: 'HarperCollins & Bloomsbury Vault', query: 'Harper' },
          { label: 'Moleskine Luxury Notebooks', query: 'Moleskine' },
          { label: 'Paperback Bestsellers Under ₹399', tag: 'VALUE', query: 'paperback' },
          { label: 'Curated 50-Book Lifetime Shelf', query: 'library' },
          { label: 'Gift Ribbon Packaging Available', query: 'gift' },
        ]
      }
    ],
    promoBadge: '📚 Original Publisher Hardcovers & Acid-Free 120GSM Writing Journals'
  },

  luxury: {
    accentColor: '#eab308',
    columns: [
      {
        heading: 'Fine Diamond Jewellery',
        links: [
          { label: '1.00 Carat Solitaire Rings', tag: 'IGI CERT', query: 'diamond' },
          { label: 'VVS Diamond Stud Earrings', query: 'earrings' },
          { label: 'Halo Diamond Tennis Bracelets', tag: 'LUXE', query: 'bracelet' },
          { label: 'Diamond Heart Pendants', query: 'pendant' },
          { label: 'Eternity Platinum Wedding Bands', query: 'band' },
          { label: 'Custom Engraved Solitaires', query: 'custom' },
        ]
      },
      {
        heading: 'Gold & Swiss Timepieces',
        links: [
          { label: '22K & 18K Solid Gold Chains', tag: 'BIS 916', query: 'gold' },
          { label: 'Swiss Automatic Chronographs', query: 'automatic' },
          { label: '925 Sterling Silver Necklaces', query: 'silver' },
          { label: 'Gemstone Cocktail Rings', query: 'gemstone' },
          { label: 'Sapphire Crystal Luxe Watches', query: 'sapphire' },
          { label: 'Handcrafted Heirlooms Vault', query: 'heirloom' },
        ]
      },
      {
        heading: 'Luxury Houses & Assurance',
        links: [
          { label: 'Caratlande & Tanishq Vault', query: 'Caratlande' },
          { label: 'Tissot & Seiko Swiss Precision', query: 'Tissot' },
          { label: 'Swarovski Crystal Collections', query: 'Swarovski' },
          { label: 'BIS Hallmark 6-Digit HUID Code', tag: 'VERIFIED', query: 'hallmark' },
          { label: '100% Insured Armored Transit', query: 'armored' },
          { label: 'Lifetime Exchange & Buyback', query: 'buyback' },
        ]
      }
    ],
    promoBadge: '💎 BIS 916 Hallmarked Gold & IGI Certified Diamonds with 100% Transit Insurance'
  },

  health: {
    accentColor: '#10b981',
    columns: [
      {
        heading: 'Health & Nutrition',
        links: [
          { label: 'Cold-Pressed Raw Organic Honey', tag: 'RAW', query: 'honey' },
          { label: 'Virgin Cold-Pressed Olive Oils', query: 'oil' },
          { label: 'California Roasted Almonds & Walnuts', query: 'almonds' },
          { label: 'Whey Protein Isolate Powders', tag: 'MUSCLE', query: 'protein' },
          { label: 'Plant-Based Superfood Greens', query: 'superfood' },
          { label: 'Electrolyte Hydration Mixes', query: 'hydration' },
        ]
      },
      {
        heading: 'Wellness & Teas',
        links: [
          { label: 'Kashmiri Organic Green Teas', query: 'tea' },
          { label: 'Japanese Ceremonial Matcha', tag: 'MATCHA', query: 'matcha' },
          { label: 'Chia, Flax & Pumpkin Seeds', query: 'seeds' },
          { label: 'Multivitamin Immunity Gummies', query: 'vitamins' },
          { label: 'Ayurvedic Ashwagandha & Herbs', query: 'herbs' },
          { label: 'Contigo Insulated Tumblers', query: 'tumbler' },
        ]
      },
      {
        heading: 'Certified Wellness Brands',
        links: [
          { label: 'Organic India & Urban Platter', query: 'Organic' },
          { label: 'MuscleBlaze & Optimum Nutrition', query: 'Nutrition' },
          { label: 'Superfoods Under ₹799', tag: 'UNDER ₹799', query: 'superfood' },
          { label: 'Gluten-Free & Keto Verified', query: 'keto' },
          { label: 'Daily Nutrition Meal Builder', query: 'nutrition' },
          { label: 'Zero Artificial Preservatives', query: 'clean' },
        ]
      }
    ],
    promoBadge: '🥗 100% Pure Certified Organic Produce & Cold-Pressed Wellness Superfoods'
  },

  auto: {
    accentColor: '#64748b',
    columns: [
      {
        heading: 'Road Security & Tech',
        links: [
          { label: '4K Sony STARVIS Dual Dashcams', tag: '4K SONY', query: 'dashcam' },
          { label: '150PSI Digital Smart Tire Inflators', tag: 'AUTO-STOP', query: 'inflator' },
          { label: 'Wireless MagSafe Car Mounts', query: 'mount' },
          { label: 'Bluetooth 5.3 FM Transmitters', query: 'fm' },
          { label: 'GPS Real-Time Vehicle Trackers', query: 'gps' },
          { label: 'Emergency Jump Starter Kits', query: 'jump' },
        ]
      },
      {
        heading: 'Care & Interior Comfort',
        links: [
          { label: 'Ceramic Coating Car Shampoos', query: 'shampoo' },
          { label: 'Microfiber Detailing Towels', query: 'microfiber' },
          { label: 'Memory Foam Neck Cushions', query: 'cushion' },
          { label: 'Multi-Pocket Trunk Organizers', query: 'organizer' },
          { label: 'Aromatherapy Car Vent Perfumes', query: 'perfume' },
          { label: 'Heavy-Duty All-Weather Floor Mats', query: 'mats' },
        ]
      },
      {
        heading: 'Automotive Brands',
        links: [
          { label: 'DriveVision 4K Pro Center', query: 'DriveVision' },
          { label: 'AeroPump Rapid Auto Gear', query: 'AeroPump' },
          { label: 'Bosch & 3M Professional Care', query: 'Bosch' },
          { label: 'Road Trip Essentials Under ₹1,499', tag: 'VALUE', query: 'essentials' },
          { label: 'Emergency Breakdown Toolkits', query: 'emergency' },
          { label: '1-Year Rapid Exchange Guarantee', query: 'warranty' },
        ]
      }
    ],
    promoBadge: '🚗 Professional Automotive Safety & 4K Dashcams with Fast 2-Day Delivery'
  },

  toys: {
    accentColor: '#06b6d4',
    columns: [
      {
        heading: 'STEM & Educational',
        links: [
          { label: 'Robotics & Coding Kits', tag: 'STEM', query: 'robot' },
          { label: 'Lego & Architectural Building Blocks', query: 'blocks' },
          { label: 'Science Lab Experiment Sets', query: 'science' },
          { label: 'Interactive Wooden Puzzles', query: 'puzzle' },
          { label: 'Electronic Learning Tablets', query: 'tablet' },
          { label: 'Solar Powered Toy Vehicles', query: 'solar' },
        ]
      },
      {
        heading: 'Baby Care & Plushies',
        links: [
          { label: 'Organic Cotton Baby Swaddles', tag: 'ORGANIC', query: 'baby' },
          { label: 'Ultra-Soft Jumbo Plush Bears', query: 'plush' },
          { label: 'BPA-Free Silicone Feeding Sets', query: 'feeder' },
          { label: 'Ergonomic Baby Carry Slings', query: 'carrier' },
          { label: 'Musical Crib Mobiles & Nightlights', query: 'crib' },
          { label: 'Hypoallergenic Baby Wipes', query: 'wipes' },
        ]
      },
      {
        heading: 'Brands & Safety',
        links: [
          { label: 'Lego & Fisher-Price Official Hub', query: 'Lego' },
          { label: 'Chicco & Mothercare Baby Care', query: 'Chicco' },
          { label: 'Toys Under ₹899 Bestsellers', tag: 'DEALS', query: 'toys' },
          { label: 'Montessori Cognitive Wooden Gear', query: 'montessori' },
          { label: '100% Non-Toxic Child Safe Certified', query: 'safe' },
          { label: 'Same-Day Birthday Gift Wrapping', query: 'gift' },
        ]
      }
    ],
    promoBadge: '🧸 100% Non-Toxic Child-Safe Certified Toys with Instant Birthday Gift Wrapping'
  },

  plants: {
    accentColor: '#15803d',
    columns: [
      {
        heading: 'Air Purifiers & Indoor Plants',
        links: [
          { label: 'Sansevieria Snake Plants', tag: 'AIR PURIFIER', query: 'snake plant' },
          { label: 'Good Luck Jade & Money Plants', tag: 'POPULAR', query: 'jade' },
          { label: 'Areca Palm Oxygen Boosters', query: 'areca' },
          { label: 'ZZ Plants (Zero Care)', tag: 'LOW LIGHT', query: 'zz plant' },
          { label: 'Peace Lily Flowering Plants', query: 'peace lily' },
          { label: 'Desk Bonsai & Ficus Trees', query: 'bonsai' },
        ]
      },
      {
        heading: 'Planters & Ceramic Pots',
        links: [
          { label: 'Handcrafted Ceramic Pots', tag: 'HANDMADE', query: 'ceramic' },
          { label: 'Self-Watering Smart Planters', query: 'self watering' },
          { label: 'Hanging Macrame Plant Holders', query: 'macrame' },
          { label: 'Terracotta Breathable Pots', query: 'terracotta' },
          { label: 'Multi-Tier Wooden Plant Stands', query: 'stand' },
          { label: 'Glass Terrarium Desktop Kits', tag: 'LUXE', query: 'terrarium' },
        ]
      },
      {
        heading: 'Gardening & Organic Soil',
        links: [
          { label: 'IFFCO Urban Gardens Potting Mix', tag: 'ORGANIC', query: 'soil' },
          { label: 'Neem Oil Pest Protection Sprays', query: 'neem' },
          { label: 'Seaweed Liquid Plant Boosters', query: 'fertilizer' },
          { label: 'Precision Brass Watering Cans', query: 'watering can' },
          { label: 'Indoor Plants Under ₹499', tag: 'UNDER ₹499', query: 'plants' },
          { label: 'Guaranteed 10-Day Plant Transit Transit', query: 'guarantee' },
        ]
      }
    ],
    promoBadge: '🌿 100% Safe Transit Guarantee with Eco-Friendly Self-Watering Pots'
  }
};
