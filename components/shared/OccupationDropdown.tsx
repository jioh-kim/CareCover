import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { startTransition, useEffect, useState } from "react";
import { IOccupation } from "@/lib/database/models/Occupation.model";
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
import { createOccupation, getAllOccupations } from "@/lib/actions/occupation.actions";


type OccupationDropdownProps = {
  value: string;
  onChangeHandler: () => void;
};

const OccupationDropdown = ({
  value,
  onChangeHandler,
}: OccupationDropdownProps) => {
  const [occupations, setOccupations] = useState<IOccupation[]>([]);

  // adding a new occupation
  const [newOccupation, setNewOccupation] = useState("");

  const handleAddCategory = () => {
    createOccupation({
      occupationName: newOccupation.trim(),
    }).then((occupation) => {
      setOccupations((prevState) => [...prevState, occupation]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const occupationList = await getAllOccupations();

      occupationList && setOccupations(occupationList as IOccupation[]);
    };

    getCategories();
  }, []);

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

        {/* adding a new occupation */}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new occupation
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Occupation</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewOccupation(e.target.value)}
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


export default OccupationDropdown;
