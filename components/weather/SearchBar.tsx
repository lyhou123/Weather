import React from "react";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SavedLocation } from "@/lib/types";
import { SavedLocationsList } from "./SavedLocationsList";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  savedLocations: SavedLocation[];
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  onLoadSavedLocation: (location: SavedLocation) => void;
  onRemoveSavedLocation: (id: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSubmit,
  loading,
  savedLocations,
  showFavorites,
  setShowFavorites,
  onLoadSavedLocation,
  onRemoveSavedLocation,
}) => {
  return (
    <div className="mb-8">
      <form onSubmit={onSubmit} className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Search for a city or coordinates..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-32 h-14 text-lg border-0 bg-white shadow-sm focus:shadow-md transition-shadow"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <Dialog open={showFavorites} onOpenChange={setShowFavorites}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 px-3">
                <Star className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Saved Locations</DialogTitle>
              </DialogHeader>
              <SavedLocationsList
                locations={savedLocations}
                onLoadLocation={onLoadSavedLocation}
                onRemoveLocation={onRemoveSavedLocation}
              />
            </DialogContent>
          </Dialog>
          <Button type="submit" disabled={loading} className="h-10 px-6">
            {loading ? "..." : "Search"}
          </Button>
        </div>
      </form>
    </div>
  );
};
