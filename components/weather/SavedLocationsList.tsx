import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedLocation } from "@/lib/types";

interface SavedLocationsListProps {
  locations: SavedLocation[];
  onLoadLocation: (location: SavedLocation) => void;
  onRemoveLocation: (id: string) => void;
}

export const SavedLocationsList: React.FC<SavedLocationsListProps> = ({
  locations,
  onLoadLocation,
  onRemoveLocation,
}) => {
  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {locations.map((location) => (
        <div
          key={location.id}
          className="flex items-center justify-between p-2 rounded-lg bg-slate-50"
        >
          <div
            className="flex-1 cursor-pointer"
            onClick={() => onLoadLocation(location)}
          >
            <div className="font-medium">{location.name}</div>
            <div className="text-sm text-slate-500">{location.country}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveLocation(location.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      {locations.length === 0 && (
        <div className="text-center py-4 text-slate-500">
          No saved locations
        </div>
      )}
    </div>
  );
};
