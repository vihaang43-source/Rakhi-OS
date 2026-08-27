import { ComplaintRecord, SimulatorScenario } from '../types';

export const DIDI_STATS = {
  version: "2.0.26",
  codename: "Eternal Sarcasm",
  specs: [
    { label: "Drama Level", value: "100%", level: 100, status: "OVERCLOCKED", color: "bg-red-600", desc: "Exceeds recommended thermal limits" },
    { label: "Patience Level", value: "2%", level: 2, status: "CRITICAL LOW", color: "bg-amber-600", desc: "Depletes instantly upon brother speech" },
    { label: "Roasting Efficiency", value: "98%", level: 98, status: "MAXIMUM", color: "bg-orange-600", desc: "No cooling fans required" },
    { label: "Volume", value: "LOUD", level: 95, status: "120 dB", color: "bg-purple-600", desc: "Audible across 3 postal codes" },
    { label: "Attitude", value: "MAX", level: 100, status: "UNMATCHED", color: "bg-rose-600", desc: "Zero tolerance protocol active" },
    { label: "Brother Protection", value: "100%", level: 100, status: "ACTIVE", color: "bg-emerald-700", desc: "Only Didi is licensed to roast this user" }
  ],
  telemetry: [
    { metric: "Memory of your 2018 mistake", value: "100% Intact" },
    { metric: "Probability of stealing your hoodie", value: "99.8%" },
    { metric: "Time required to get ready", value: "5 mins (= 2h 40m)" },
    { metric: "Chance of accepting apology", value: "0.0001%" },
    { metric: "Snack radar detection radius", value: "500 meters" },
    { metric: "TV Remote Ownership Index", value: "Absolute Monopoly" }
  ]
};

export const ABSURD_COMPLAINTS: ComplaintRecord[] = [
  {
    id: "CMP-9041",
    timestamp: "10 mins ago",
    grievance: "Why did you breathe so loudly while I was trying to concentrate on doing nothing?",
    severity: "Critical",
    resolutionStatus: "Permanent Grudge",
    fineAmount: "₹2,500"
  },
  {
    id: "CMP-8832",
    timestamp: "1 hour ago",
    grievance: "You finished the snacks that I specifically left in the fridge to expire.",
    severity: "Catastrophic",
    resolutionStatus: "Brother at Fault",
    fineAmount: "₹5,000 + Sweet Treat"
  },
  {
    id: "CMP-7719",
    timestamp: "Yesterday",
    grievance: "You existed in a 5-meter radius without prior written permission.",
    severity: "Unforgivable",
    resolutionStatus: "Permanent Grudge",
    fineAmount: "₹1,000"
  },
  {
    id: "CMP-6650",
    timestamp: "2 days ago",
    grievance: "You didn't laugh at the 14th Instagram reel I sent you at 2:43 AM.",
    severity: "Petty Felony",
    resolutionStatus: "Brother at Fault",
    fineAmount: "₹500"
  },
  {
    id: "CMP-5421",
    timestamp: "3 days ago",
    grievance: "You plugged your phone into my charger and now it has contaminated brother energy.",
    severity: "Critical",
    resolutionStatus: "Permanent Grudge",
    fineAmount: "New Charger Required"
  },
  {
    id: "CMP-4109",
    timestamp: "Last week",
    grievance: "You replied with 'k' instead of a 3-paragraph acknowledgement.",
    severity: "Unforgivable",
    resolutionStatus: "Brother at Fault",
    fineAmount: "₹1,200"
  },
  {
    id: "CMP-3200",
    timestamp: "Last month",
    grievance: "You were born on a Tuesday, which completely disrupted my weekly schedule.",
    severity: "Catastrophic",
    resolutionStatus: "Permanent Grudge",
    fineAmount: "Priceless"
  },
  {
    id: "CMP-1901",
    timestamp: "2 months ago",
    grievance: "You touched the TV remote when I clearly licked it in 2017 to claim ownership.",
    severity: "Critical",
    resolutionStatus: "Permanent Grudge",
    fineAmount: "Remote Surrender"
  }
];

export const CALCULATOR_PRESETS = [
  { equation: "Didi + Attitude", result: "∞ (Limit does not exist)", note: "Mathematical certainty" },
  { equation: "1 brother × 2 didis", result: "RIP 💀", note: "Survival probability: 0%" },
  { equation: "Snacks in fridge - Brother", result: "0 (All gone)", note: "Investigation ongoing" },
  { equation: "My fault ÷ Her fault", result: "DIV/0 (Brother is always at fault)", note: "Fundamental law of physics" },
  { equation: "Rakhi Shagun × Inflation 2026", result: "₹50,000 + 18% Sibling GST", note: "Non-negotiable" },
  { equation: "5 min get ready time", result: "2 hr 45 min", note: "Didi standard time (DST)" },
  { equation: "Hoodie ownership", result: "Permanent Annexation", note: "It's hers now" },
  { equation: "Apology accepted?", result: "False (Stored in grudges.db)", note: "Re-indexing history..." }
];

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: 1,
    title: "The Snack Ambush",
    situation: "You open a bag of chips in your room with maximum stealth. Suddenly, Didi appears in the doorway like a horror movie villain.",
    context: "She asks: 'Are those chips?'",
    options: [
      {
        text: "Say 'No, it is broccoli' and shove the bag under the bed.",
        reaction: "She saw through your pathetic deception. Chips confiscated. 100 drama added.",
        survivalChange: -25,
        dramaChange: +30,
        badgeAwarded: "Terrible Liar"
      },
      {
        text: "Instantly surrender 85% of the bag as protective tribute.",
        reaction: "A wise sacrifice. Didi takes the tribute, calls you a peasant, and leaves peacefully.",
        survivalChange: +20,
        dramaChange: -10,
        badgeAwarded: "Tribute Master"
      },
      {
        text: "Offer only 1 single broken chip crumb.",
        reaction: "CATASTROPHIC ERROR. She revokes your breathing privileges for 48 hours.",
        survivalChange: -40,
        dramaChange: +60,
        badgeAwarded: "Death Wish"
      },
      {
        text: "Pretend you bought them specifically for her all along.",
        reaction: "Didi knows it is a lie, but respects the hustle. She takes the whole bag anyway.",
        survivalChange: +10,
        dramaChange: +5,
        badgeAwarded: "Smooth Talker"
      }
    ]
  },
  {
    id: 2,
    title: "The Swiggy Conundrum",
    situation: "You are ordering food. You ask Didi if she wants anything. She firmly replies: 'No, I'm not hungry at all.'",
    context: "What is your strategic protocol?",
    options: [
      {
        text: "Believe her and order only for yourself.",
        reaction: "FATAL MISTAKE. The food arrives. She eats 92% of your fries and stares daggers at your burger.",
        survivalChange: -50,
        dramaChange: +80,
        badgeAwarded: "Amateur Brother"
      },
      {
        text: "Order her favorite garlic bread & fries anyway without asking.",
        reaction: "PERFECT EXECUTION. She says 'Why did you order this?!' while devouring everything happily.",
        survivalChange: +35,
        dramaChange: -20,
        badgeAwarded: "Psychic Sibling"
      },
      {
        text: "Ask 4 more times: 'Are you sure? Are you REALLY sure?'",
        reaction: "Didi gets annoyed by your questioning. 'STOP ASKING ME!' (Still eats your food later).",
        survivalChange: -15,
        dramaChange: +25,
        badgeAwarded: "Interrogator"
      },
      {
        text: "Order extra food and eat it secretly in the bathroom.",
        reaction: "She smells the oregano through the door. Immediate trial in Sibling High Court.",
        survivalChange: -30,
        dramaChange: +45,
        badgeAwarded: "Secret Snacker"
      }
    ]
  },
  {
    id: 3,
    title: "The Sibling High Court",
    situation: "A glass broke in the kitchen 4 minutes ago. Mom is approaching with extreme velocity.",
    context: "Didi is already looking at you with a rehearsed innocent face.",
    options: [
      {
        text: "Accept your destiny as the designated family scapegoat.",
        reaction: "You took the blame. Mom scolds you, but Didi slips you ₹50 later in silent sibling respect.",
        survivalChange: +15,
        dramaChange: -15,
        badgeAwarded: "Noble Martyr"
      },
      {
        text: "Point at Didi and scream 'SHE DID IT, I HAVE FOOTAGE!'",
        reaction: "Didi produces a fake tear. Mom believes her instantly. You are grounded for 3 lifetimes.",
        survivalChange: -45,
        dramaChange: +75,
        badgeAwarded: "Courtroom Loser"
      },
      {
        text: "Blame the cat/dog (we do not own a pet).",
        reaction: "Mom is confused, Didi starts laughing, the crisis is de-escalated via pure confusion.",
        survivalChange: +25,
        dramaChange: +10,
        badgeAwarded: "Chaos Agent"
      },
      {
        text: "Sprint out of the front door and never look back.",
        reaction: "You are now living in a distant forest. You survived, but you have no WiFi.",
        survivalChange: +5,
        dramaChange: +50,
        badgeAwarded: "Fugitive Brother"
      }
    ]
  },
  {
    id: 4,
    title: "The Raksha Bandhan Negotiation",
    situation: "It is Rakhi morning. Didi ties the Rakhi and extends her palm with a predatory smile.",
    context: "She expects a generous shagun contribution.",
    options: [
      {
        text: "Hand her a crisp ₹100 note with pride.",
        reaction: "Didi looks at the ₹100 note like it is an insulting coupon. 'Is this 1994?!' Prepare for warfare.",
        survivalChange: -40,
        dramaChange: +70,
        badgeAwarded: "Discount Sibling"
      },
      {
        text: "Surrender your UPI PIN and allow direct wealth transfer.",
        reaction: "Your bank balance is now ₹4.12, but you are blessed with 1 year of sibling immunity!",
        survivalChange: +40,
        dramaChange: -30,
        badgeAwarded: "Bankrupted But Alive"
      },
      {
        text: "Give a handmade coupon: '1 Free Glass of Water whenever you ask'.",
        reaction: "She immediately tears the coupon, but keeps the Rakhi intact. Classic maneuver.",
        survivalChange: -10,
        dramaChange: +20,
        badgeAwarded: "Coupon Merchant"
      },
      {
        text: "Say: 'My existence is your greatest gift.'",
        reaction: "Didi pauses, bursts out laughing, and throws a pillow at your head. 10/10 banter.",
        survivalChange: +30,
        dramaChange: +15,
        badgeAwarded: "Supreme Philosopher"
      }
    ]
  }
];

export const SYSTEM_TOASTS = [
  "⚠️ Didi entered the hallway. Look busy immediately.",
  "🔔 System Alert: Your snacks have been requisitioned under Article 4.",
  "🔋 Battery Low: Feed Didi iced coffee to prevent catastrophic crash.",
  "📡 Sarcasm WiFi connected: Signal strength 100% (Unbearable).",
  "🛡️ Brother Protection Protocol: Active. (Only Didi may bully you).",
  "🚨 Warning: You haven't apologized for breathing today.",
  "📦 New Package: Didi ordered something with your card again.",
  "📺 Remote Control status: Permanently locked by Administrator Didi."
];

export const DO_NOT_CLICK_MESSAGES = [
  "I told you not to.",
  "Seriously? You clicked it again?",
  "BRO. What part of DO NOT CLICK was confusing?",
  "You are still clicking? Do you have no survival instincts?",
  "Achievement unlocked: 🏆 Professional Button Clicker",
  "Initiating Brother Dismissal Protocol in 3... 2... 1...",
  "Just kidding, but ₹500 has been added to your Rakhi Ransom bill.",
  "Didi has been alerted to your disobedience.",
  "Warning: Clicking this button accelerates Didi's roast velocity by 400%.",
  "You win. You clicked it 10 times. Here is your prize: Absolutely nothing! 🎊",
  "Okay seriously, go do your homework or give Didi the TV remote."
];
