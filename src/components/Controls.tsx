import { Compass, ChevronRight, Info } from 'lucide-react';
import { Location } from '../types/Location';

interface ControlsProps {
  location: Location;
  onNextLocation: () => void;
}

export function Controls({ location, onNextLocation }: ControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Compass className="h-6 w-6" />
          <div>
            <h2 className="text-xl font-bold">{location.name}</h2>
            <p className="text-sm opacity-80">{location.description}</p>
          </div>
        </div>
        
        <button
          onClick={onNextLocation}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <span>Next Location</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}