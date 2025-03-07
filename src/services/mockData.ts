import { Dealer } from '@/types/dealer';

// Mock data
export const MOCK_DEALERS: Dealer[] = [
  {
    id: "1",
    name: "Sophia",
    personality: "Elegant & Sophisticated",
    model: "Stable Diffusion XL",
    isActive: true,
    isPremium: true,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-10T14:45:00Z",
    gender: "female",
    outfits: [
      {
        id: "o1",
        stage: 1,
        name: "Casino Uniform",
        imageUrl: "https://images.unsplash.com/photo-1589135006062-5b7e4a749194?q=80&w=300&h=400&auto=format&fit=crop",
        approved: true
      },
      {
        id: "o2",
        stage: 2,
        name: "Relaxed Attire",
        imageUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=300&h=400&auto=format&fit=crop",
        approved: true
      },
      {
        id: "o3",
        stage: 3,
        name: "Formal Look",
        imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&h=400&auto=format&fit=crop",
        approved: true
      },
    ]
  },
  {
    id: "2",
    name: "Isabella",
    personality: "Playful & Charming",
    model: "DALL·E 3",
    isActive: true,
    isPremium: false,
    createdAt: "2023-07-20T08:15:00Z",
    updatedAt: "2023-08-05T11:30:00Z",
    gender: "female",
    outfits: [
      {
        id: "o4",
        stage: 1,
        name: "Casino Uniform",
        imageUrl: "https://images.unsplash.com/photo-1618400954958-b93e73cbacde?q=80&w=300&h=400&auto=format&fit=crop",
        approved: true
      },
      {
        id: "o5",
        stage: 2,
        name: "Relaxed Attire",
        imageUrl: "https://images.unsplash.com/photo-1546975554-31053113e977?q=80&w=300&h=400&auto=format&fit=crop",
        approved: true
      },
    ]
  }
];
