import { useState } from "react";
import {
  BatteryMedium,
  Sailboat,
  Fuel,
  Gauge,
  Map,
  Timer,
  HardDriveDownload,
  Satellite,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Vital from "../vital/vital";
import { Button } from "../ui/button";

function MobileNavigation() {
  const [showMore, setShowMore] = useState(false);
  return (
    <nav className="bg-background p-2 overflow-x-scroll sm:hidden">
      <ul className="flex gap-4">
        <Vital name="Hull 36" icon={<Sailboat aria-label="Hull 36" />}>
          <p>H36</p>
        </Vital>
        <Vital
          name="Battery Status"
          vital="35%"
          icon={<BatteryMedium aria-label="Battery Status" />}
        />

        <Vital
          name="Fuel Remaining"
          vital="75%"
          icon={<Fuel aria-label="Fuel Status" />}
        />

        <Vital name="Vehical Status" vital="Status">
          <div
            className="flex items-center gap-1"
            role="status"
            aria-label="Auto mode"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Auto
          </div>
        </Vital>

        {!showMore ? (
          <Button
            onClick={() => setShowMore(true)}
            title="show more"
            variant="outline"
          >
            More
            <ChevronRight />
          </Button>
        ) : (
          <>
            <Vital
              name="Speed Over Ground"
              vital="4.5"
              icon={<Gauge aria-label="Speed Guage" />}
            />

            <Vital
              name="Approximate Distance Remaining"
              vital="12nm"
              icon={<Map aria-label="Speed Guage" />}
            />

            <Vital
              name="Estimated Time Remaining"
              vital="6.0h"
              icon={<Timer aria-label="Speed Guage" />}
            />
            <Vital
              name="Last Data Recieved"
              vital="-00:01"
              icon={<HardDriveDownload aria-label="Latest Downloaded Data" />}
            />

            <Vital
              name="Satellite Connection"
              vital=""
              icon={<Satellite aria-label="Speed Guage" />}
            >
              <div
                className="flex items-end gap-1"
                role="img"
                aria-label="Signal strength: 4 out of 5"
              >
                <span className="h-1 w-1 bg-green-500 rounded"></span>
                <span className="h-2 w-1 bg-green-500 rounded"></span>
                <span className="h-3 w-1 bg-green-500 rounded"></span>
                <span className="h-4 w-1 bg-gray-300 rounded"></span>
              </div>
            </Vital>

            <Button
              onClick={() => setShowMore(false)}
              title="show less"
              variant="outline"
            >
              <ChevronLeft />
              Less
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MobileNavigation;
