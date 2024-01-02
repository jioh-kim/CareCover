"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllOccupations } from "@/lib/actions/occupation.actions";
import { IOccupation } from "@/lib/database/models/Occupation.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OccupationFilter = () => {
  const [occupations, setOccupations] = useState<IOccupation[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getOccupations = async () => {
      const occupationList = await getAllOccupations();

      occupationList && setOccupations(occupationList as IOccupation[]);
    };

    getOccupations();
  }, []);

  const onSelectOccupation = (occupation: string) => {
    let newUrl = "";

    if (occupation && occupation !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "occupation",
        value: occupation,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["occupation"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectOccupation(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Occupation" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {occupations.map((occupation) => (
          <SelectItem
            value={occupation.name}
            key={occupation._id}
            className="select-item p-regular-14"
          >
            {occupation.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OccupationFilter;
