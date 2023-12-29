import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { IOccupation } from "@/lib/database/models/Occupation.model";


type OccupationDropdownProps = {
  value: string;
  onChangeHandler: () => void;
};

const OccupationDropdown = ({
  value,
  onChangeHandler,
}: OccupationDropdownProps) => {
  const [occupations, setoccupations] = useState<IOccupation[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {occupations.length > 0 &&
          occupations.map((occupation) => (
            <SelectItem
              key={occupation._id}
              value={occupation._id}
              className="select-item p-regular-14"
            >
              {occupation.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};


export default OccupationDropdown;
