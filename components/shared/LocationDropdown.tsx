import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILocation } from "@/lib/database/models/Location.model";
import { startTransition, useEffect, useState } from "react";
import {
  createLocation,
  getAllLocations,
} from "@/lib/actions/location.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

type LocationDropdownProps = {
  value: string;
  onChangeHandler: () => void;
};

const LocationDropdown = ({
  value,
  onChangeHandler,
}: LocationDropdownProps) => {
  const [locations, setLocations] = useState<ILocation[]>([]);

  // adding a new location
  const [newLocation, setNewLocation] = useState("");

  const handleAddCategory = () => {
    createLocation({
      locationName: newLocation.trim(),
    }).then((location) => {
      setLocations((prevState) => [...prevState, location]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const locationList = await getAllLocations();

      locationList && setLocations(locationList as ILocation[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {locations.length > 0 &&
          locations.map((location) => (
            <SelectItem
              key={location._id}
              value={location._id}
              className="select-item p-regular-14"
            >
              {location.name}
            </SelectItem>
          ))}

        {/* adding a new location */}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new location
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Location</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Location name"
                  className="input-field mt-3"
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
