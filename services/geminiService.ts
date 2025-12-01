import { GamePost, SportType, Playground, Area } from "../types";

// Hardcoded list of specific players with their assigned sports
const STATIC_PLAYERS = [
  {
    id: 'p1',
    name: 'Abdulaziz Mansour Aldawsari',
    baseArea: Area.OLAYA,
    rating: 4.9,
    assignedSport: SportType.FOOTBALL
  },
  {
    id: 'p2',
    name: 'Fawaz Faisal Almujil',
    baseArea: Area.HITTEEN,
    rating: 4.7,
    assignedSport: SportType.BASKETBALL
  },
  {
    id: 'p3',
    name: 'Lamyaa Mohammed AlQahtani',
    baseArea: Area.MALQA,
    rating: 4.8,
    assignedSport: SportType.RUNNING
  },
  {
    id: 'p4',
    name: 'Norah Mohammed Almughairbi',
    baseArea: Area.NARJIS,
    rating: 4.6,
    assignedSport: SportType.PADEL
  },
  {
    id: 'p5',
    name: 'Danah Azman Alazman',
    baseArea: Area.DQ,
    rating: 5.0,
    assignedSport: SportType.GYM
  }
];

const POST_TEMPLATES: Record<string, string[]> = {
  [SportType.FOOTBALL]: [
    "Playing football this Thursday. We are missing a goalkeeper. Any takers?",
    "5v5 friendly match. Need 2 defenders!",
    "Weekly football game. Good vibes only."
  ],
  [SportType.BASKETBALL]: [
    "Basketball 3v3 pickup game. We need 1 more person to complete the teams.",
    "Shooting hoops at the park. Join if you want to play.",
    "Competitive basketball game tonight. Looking for experienced players."
  ],
  [SportType.RUNNING]: [
    "Early morning run group starting at Diplomatic Quarter. 5km easy pace. Join us!",
    "Training for the Riyadh Marathon. Long run this weekend.",
    "Evening jog around the neighborhood. All paces welcome."
  ],
  [SportType.PADEL]: [
    "Need 2 more players for a competitive Padel match tonight at Padel Rush. Level B+ preferred!",
    "Looking for a Padel partner for a tournament next week.",
    "Casual Padel game. Rackets provided if you need one."
  ],
  [SportType.GYM]: [
    "Going to the gym for a heavy leg day. Need a spotter and motivation!",
    "HIIT session at the local gym. Come sweat with us!",
    "Body pump class buddy needed. It's more fun with a friend."
  ],
  [SportType.TENNIS]: [
    "Looking for a tennis partner.",
    "Hit and rally session."
  ]
};

export const generateGamePosts = async (
  sportFilter?: SportType,
  areaFilter?: Area
): Promise<GamePost[]> => {
  
  const posts: GamePost[] = STATIC_PLAYERS.map((player, index) => {
    const sport = player.assignedSport;
    const area = areaFilter || player.baseArea;
    
    // Select a template specific to the sport
    const templates = POST_TEMPLATES[sport] || POST_TEMPLATES[SportType.FOOTBALL];
    const content = templates[index % templates.length];

    const slots = Math.floor(Math.random() * 4) + 1;
    const filled = Math.floor(Math.random() * slots);
    const attendees: string[] = []; 
    for(let i=0; i<filled; i++) {
        attendees.push(`dummy_${i}`);
    }

    return {
      id: `post_${player.id}_${Date.now()}`,
      author: {
        id: player.id,
        name: player.name,
        avatarUrl: "",
        rating: player.rating
      },
      content: content,
      sport: sport,
      area: area,
      time: ['Tonight 8 PM', 'Tomorrow 6 PM', 'Now', 'In 2 hours'][index % 4],
      totalSlots: slots + 2,
      attendees: attendees,
      postedAt: Date.now() - (index * 1000 * 60 * 30) 
    };
  });

  // Filter if needed
  let filteredPosts = posts;
  if (sportFilter) {
    filteredPosts = posts.filter(p => p.sport === sportFilter);
  }
  if (areaFilter) {
    filteredPosts = filteredPosts.filter(p => p.area === areaFilter);
  }

  return filteredPosts.sort((a, b) => b.postedAt - a.postedAt);
};

export const generateChatReply = async (
  buddyName: string,
  sport: string,
  area: string,
  lastMessage: string
): Promise<string> => {
  // Simple automatic response logic replacing AI
  const lowerMsg = lastMessage.toLowerCase();
  
  if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey') || lowerMsg.includes('salam')) {
    return "Hello! We're excited to meet with you today.";
  }
  
  if (lowerMsg.includes('where') || lowerMsg.includes('location') || lowerMsg.includes('place')) {
    return `We are playing at the ${sport} courts in ${area}. See you there!`;
  }
  
  if (lowerMsg.includes('time') || lowerMsg.includes('when')) {
    return "We're starting at 8:00 PM sharp.";
  }

  if (lowerMsg.includes('bring') || lowerMsg.includes('need') || lowerMsg.includes('gear')) {
    return "Just bring yourself! We have extra equipment if needed.";
  }

  return "Sounds great! Looking forward to the game.";
};

export const generatePlaygrounds = async (sport: string, area: string): Promise<Playground[]> => {
  // Static mock data replacing AI generation
  return [
    {
      id: "pg_1",
      name: `${area} Sports Park`,
      rating: 4.8,
      address: `King Fahd Rd, ${area}`,
      imageUrl: `https://picsum.photos/seed/${sport}1/300/200`
    },
    {
      id: "pg_2",
      name: `Elite ${sport} Center`,
      rating: 4.5,
      address: `Olaya St, ${area}`,
      imageUrl: `https://picsum.photos/seed/${sport}2/300/200`
    },
    {
      id: "pg_3",
      name: `Community ${sport} Club`,
      rating: 4.2,
      address: `Prince Sultan Rd, ${area}`,
      imageUrl: `https://picsum.photos/seed/${sport}3/300/200`
    }
  ];
}