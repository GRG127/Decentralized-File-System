import { Location } from '../types/Location';

export const locations: Location[] = [
  {
    id: 'colosseum',
    name: 'The Colosseum',
    description: 'The iconic amphitheater of ancient Rome, a marvel of architecture and engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=2000&h=1000',
    hotspots: [
      {
        id: 'architecture',
        position: [10, 0, -10],
        title: 'Architecture',
        description: 'The Colosseum is built of travertine limestone, tuff, and brick-faced concrete.'
      },
      {
        id: 'arena',
        position: [-10, 0, -10],
        title: 'Arena Floor',
        description: 'The arena floor was made of wood and covered with sand. Beneath it was a complex system of tunnels and cages.'
      }
    ],
    nextLocationId: 'pantheon'
  },
  {
    id: 'pantheon',
    name: 'The Pantheon',
    description: 'A former Roman temple and current church, showcasing remarkable ancient Roman architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1541777704-ce76e4c05a36?auto=format&fit=crop&q=80&w=2000&h=1000',
    hotspots: [
      {
        id: 'dome',
        position: [0, 5, -10],
        title: 'The Dome',
        description: 'The dome remains the largest unreinforced concrete dome in the world.'
      },
      {
        id: 'oculus',
        position: [8, 0, -10],
        title: 'The Oculus',
        description: 'The central opening in the dome allows natural light to illuminate the interior.'
      }
    ],
    nextLocationId: 'colosseum'
  }
];