import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ILocation } from "@/lib/database/models/Location.model";
import { useState } from "react";


type LocationDropdownProps = {
  value: string;
  onChangeHandler: () => void;
};

const LocationDropdown = ({ value, onChangeHandler }: LocationDropdownProps) => {
const [locations, setLocations] = useState<ILocation[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {locations.length > 0 && locations.map((location) => (
          <SelectItem key={location._id} value={location._id}
          className="select-item p-regular-14">
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export default LocationDropdown;
