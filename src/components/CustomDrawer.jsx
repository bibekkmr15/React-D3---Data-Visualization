import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { forwardRef } from "react";
import CustomTable from "./CustomTable";

const CustomDrawer = forwardRef(({ data }, ref) => {
  return (
    <Drawer>
      <Button ref={ref}>
        <DrawerTrigger>Click here to see Details</DrawerTrigger>
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Selected Data Details</DrawerTitle>
          <DrawerDescription>
            <CustomTable data={data} />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Click anywhere to Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

export default CustomDrawer;
