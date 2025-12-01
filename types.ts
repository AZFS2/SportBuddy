export enum SportType {
  FOOTBALL = 'Football',
  PADEL = 'Padel',
  TENNIS = 'Tennis',
  BASKETBALL = 'Basketball',
  RUNNING = 'Running',
  GYM = 'Gym',
}

export enum Area {
  OLAYA = 'Olaya',
  MALQA = 'Al Malqa',
  DQ = 'Diplomatic Quarter',
  NARJIS = 'Al Narjis',
  HITTEEN = 'Hitteen',
  OTHER = 'Other',
}

export interface User {
  id: string;
  name: string;
  age: string;
  area: Area | string;
  favoriteSports: SportType[];
  avatarUrl?: string;
}

// Represents a "Tweet" or Game Request
export interface GamePost {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number;
  };
  content: string; // The "Tweet" text
  sport: SportType;
  area: string;
  time: string; // e.g. "Tonight 8 PM"
  totalSlots: number;
  attendees: string[]; // List of User IDs who joined
  postedAt: number; // Timestamp
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isUser: boolean;
}

export interface Review {
  id: string;
  buddyId: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Playground {
  id: string;
  name: string;
  rating: number;
  address: string;
  imageUrl: string;
}

export interface BuddyProfile {
  id: string;
  name: string;
  age: number;
  sport: string;
  area: string;
  bio: string;
  level: string;
  availability: string;
  availableDays: string[];
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  matchPercentage: number;
}