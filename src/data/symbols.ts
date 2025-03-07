import { SymbolCard, Category } from '../types';

export const categories: Category[] = [
  { 
    id: 'needs', 
    name: 'categories.needs', 
    color: 'bg-red-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png'
  },
  { 
    id: 'feelings', 
    name: 'categories.feelings', 
    color: 'bg-yellow-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/3062/3062912.png'
  },
  { 
    id: 'activities', 
    name: 'categories.activities', 
    color: 'bg-green-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/2790/2790402.png'
  },
  { 
    id: 'food', 
    name: 'categories.food', 
    color: 'bg-blue-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png'
  },
  { 
    id: 'people', 
    name: 'categories.people', 
    color: 'bg-purple-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/3126/3126589.png'
  },
  { 
    id: 'places', 
    name: 'categories.places', 
    color: 'bg-orange-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/1719/1719695.png'
  },
  { 
    id: 'time', 
    name: 'categories.time', 
    color: 'bg-indigo-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972531.png'
  },
  { 
    id: 'phrases', 
    name: 'categories.phrases', 
    color: 'bg-pink-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/745/745205.png'
  }
];

export const symbols: SymbolCard[] = [
  // Needs
  { 
    id: 'water', 
    text: 'symbols.water', 
    image: 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png', 
    category: 'needs',
    tags: ['drink', 'thirsty', 'liquid']
  },
  { 
    id: 'bathroom', 
    text: 'symbols.bathroom', 
    image: 'https://cdn-icons-png.flaticon.com/512/994/994764.png', 
    category: 'needs',
    tags: ['toilet', 'wc', 'restroom']
  },
  { 
    id: 'help', 
    text: 'symbols.help', 
    image: 'https://cdn-icons-png.flaticon.com/512/4221/4221836.png', 
    category: 'needs',
    tags: ['assistance', 'support', 'aid']
  },
  { 
    id: 'break', 
    text: 'symbols.break', 
    image: 'https://cdn-icons-png.flaticon.com/512/2413/2413377.png', 
    category: 'needs',
    tags: ['rest', 'pause', 'stop']
  },
  { 
    id: 'sleep', 
    text: 'symbols.sleep', 
    image: 'https://cdn-icons-png.flaticon.com/512/3094/3094837.png', 
    category: 'needs',
    tags: ['rest', 'bed', 'tired']
  },
  { 
    id: 'medicine', 
    text: 'symbols.medicine', 
    image: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', 
    category: 'needs',
    tags: ['pill', 'health', 'sick']
  },
  
  // Feelings
  { 
    id: 'happy', 
    text: 'symbols.happy', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166538.png', 
    category: 'feelings',
    tags: ['joy', 'smile', 'glad']
  },
  { 
    id: 'sad', 
    text: 'symbols.sad', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166527.png', 
    category: 'feelings',
    tags: ['unhappy', 'cry', 'tears']
  },
  { 
    id: 'angry', 
    text: 'symbols.angry', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166525.png', 
    category: 'feelings',
    tags: ['mad', 'upset', 'furious']
  },
  { 
    id: 'tired', 
    text: 'symbols.tired', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166532.png', 
    category: 'feelings',
    tags: ['exhausted', 'sleepy', 'fatigue']
  },
  { 
    id: 'scared', 
    text: 'symbols.scared', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166555.png', 
    category: 'feelings',
    tags: ['afraid', 'fear', 'frightened']
  },
  { 
    id: 'confused', 
    text: 'symbols.confused', 
    image: 'https://cdn-icons-png.flaticon.com/512/166/166536.png', 
    category: 'feelings',
    tags: ['puzzled', 'unsure', 'lost']
  },
  
  // Activities
  { 
    id: 'play', 
    text: 'symbols.play', 
    image: 'https://cdn-icons-png.flaticon.com/512/2790/2790402.png', 
    category: 'activities',
    tags: ['fun', 'toys', 'games']
  },
  { 
    id: 'music', 
    text: 'symbols.music', 
    image: 'https://cdn-icons-png.flaticon.com/512/3659/3659784.png', 
    category: 'activities',
    tags: ['song', 'dance', 'listen']
  },
  { 
    id: 'outside', 
    text: 'symbols.outside', 
    image: 'https://cdn-icons-png.flaticon.com/512/1169/1169597.png', 
    category: 'activities',
    tags: ['outdoors', 'park', 'playground']
  },
  { 
    id: 'read', 
    text: 'symbols.read', 
    image: 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png', 
    category: 'activities',
    tags: ['book', 'story', 'learning']
  },
  { 
    id: 'draw', 
    text: 'symbols.draw', 
    image: 'https://cdn-icons-png.flaticon.com/512/2919/2919592.png', 
    category: 'activities',
    tags: ['paint', 'color', 'art']
  },
  { 
    id: 'tv', 
    text: 'symbols.tv', 
    image: 'https://cdn-icons-png.flaticon.com/512/2586/2586717.png', 
    category: 'activities',
    tags: ['watch', 'movie', 'show']
  },
  
  // Food
  { 
    id: 'apple', 
    text: 'symbols.apple', 
    image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png', 
    category: 'food',
    tags: ['fruit', 'healthy', 'snack']
  },
  { 
    id: 'banana', 
    text: 'symbols.banana', 
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909808.png', 
    category: 'food',
    tags: ['fruit', 'yellow', 'snack']
  },
  { 
    id: 'milk', 
    text: 'symbols.milk', 
    image: 'https://cdn-icons-png.flaticon.com/512/2405/2405583.png', 
    category: 'food',
    tags: ['drink', 'dairy', 'white']
  },
  { 
    id: 'cookie', 
    text: 'symbols.cookie', 
    image: 'https://cdn-icons-png.flaticon.com/512/541/541732.png', 
    category: 'food',
    tags: ['sweet', 'snack', 'dessert']
  },
  { 
    id: 'juice', 
    text: 'symbols.juice', 
    image: 'https://cdn-icons-png.flaticon.com/512/3050/3050154.png', 
    category: 'food',
    tags: ['drink', 'fruit', 'sweet']
  },
  { 
    id: 'sandwich', 
    text: 'symbols.sandwich', 
    image: 'https://cdn-icons-png.flaticon.com/512/6978/6978255.png', 
    category: 'food',
    tags: ['lunch', 'bread', 'meal']
  },
  
  // People
  { 
    id: 'mom', 
    text: 'symbols.mom', 
    image: 'https://cdn-icons-png.flaticon.com/512/1326/1326430.png', 
    category: 'people',
    tags: ['mother', 'parent', 'family']
  },
  { 
    id: 'dad', 
    text: 'symbols.dad', 
    image: 'https://cdn-icons-png.flaticon.com/512/1326/1326405.png', 
    category: 'people',
    tags: ['father', 'parent', 'family']
  },
  { 
    id: 'teacher', 
    text: 'symbols.teacher', 
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', 
    category: 'people',
    tags: ['school', 'learning', 'classroom']
  },
  { 
    id: 'friend', 
    text: 'symbols.friend', 
    image: 'https://cdn-icons-png.flaticon.com/512/4835/4835419.png', 
    category: 'people',
    tags: ['buddy', 'pal', 'playmate']
  },
  { 
    id: 'doctor', 
    text: 'symbols.doctor', 
    image: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png', 
    category: 'people',
    tags: ['medical', 'health', 'hospital']
  },
  { 
    id: 'sibling', 
    text: 'symbols.sibling', 
    image: 'https://cdn-icons-png.flaticon.com/512/1326/1326377.png', 
    category: 'people',
    tags: ['brother', 'sister', 'family']
  },
  
  // Places
  { 
    id: 'home', 
    text: 'symbols.home', 
    image: 'https://cdn-icons-png.flaticon.com/512/619/619034.png', 
    category: 'places',
    tags: ['house', 'residence', 'living']
  },
  { 
    id: 'school', 
    text: 'symbols.school', 
    image: 'https://cdn-icons-png.flaticon.com/512/1157/1157001.png', 
    category: 'places',
    tags: ['education', 'learning', 'classroom']
  },
  { 
    id: 'park', 
    text: 'symbols.park', 
    image: 'https://cdn-icons-png.flaticon.com/512/616/616639.png', 
    category: 'places',
    tags: ['playground', 'outside', 'fun']
  },
  { 
    id: 'store', 
    text: 'symbols.store', 
    image: 'https://cdn-icons-png.flaticon.com/512/3165/3165589.png', 
    category: 'places',
    tags: ['shop', 'market', 'buy']
  },
  
  // Time
  { 
    id: 'morning', 
    text: 'symbols.morning', 
    image: 'https://cdn-icons-png.flaticon.com/512/3815/3815183.png', 
    category: 'time',
    tags: ['sunrise', 'early', 'day']
  },
  { 
    id: 'afternoon', 
    text: 'symbols.afternoon', 
    image: 'https://cdn-icons-png.flaticon.com/512/3815/3815126.png', 
    category: 'time',
    tags: ['day', 'noon', 'midday']
  },
  { 
    id: 'night', 
    text: 'symbols.night', 
    image: 'https://cdn-icons-png.flaticon.com/512/3815/3815248.png', 
    category: 'time',
    tags: ['evening', 'dark', 'sleep']
  },
  { 
    id: 'wait', 
    text: 'symbols.wait', 
    image: 'https://cdn-icons-png.flaticon.com/512/2972/2972531.png', 
    category: 'time',
    tags: ['patience', 'later', 'soon']
  },
  
  // Phrases
  { 
    id: 'want', 
    text: 'symbols.want', 
    image: 'https://cdn-icons-png.flaticon.com/512/3997/3997872.png', 
    category: 'phrases',
    tags: ['desire', 'need', 'wish']
  },
  { 
    id: 'dont_want', 
    text: 'symbols.dont_want', 
    image: 'https://cdn-icons-png.flaticon.com/512/5107/5107775.png', 
    category: 'phrases',
    tags: ['refuse', 'reject', 'no']
  },
  { 
    id: 'like', 
    text: 'symbols.like', 
    image: 'https://cdn-icons-png.flaticon.com/512/456/456115.png', 
    category: 'phrases',
    tags: ['enjoy', 'prefer', 'favorite']
  },
  { 
    id: 'dont_like', 
    text: 'symbols.dont_like', 
    image: 'https://cdn-icons-png.flaticon.com/512/880/880613.png', 
    category: 'phrases',
    tags: ['dislike', 'hate', 'not']
  },
  { 
    id: 'more', 
    text: 'symbols.more', 
    image: 'https://cdn-icons-png.flaticon.com/512/748/748113.png', 
    category: 'phrases',
    tags: ['additional', 'extra', 'again']
  },
  { 
    id: 'finished', 
    text: 'symbols.finished', 
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png', 
    category: 'phrases',
    tags: ['done', 'complete', 'end']
  }
];
