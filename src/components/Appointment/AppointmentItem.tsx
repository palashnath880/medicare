import React from "react";

export default function AppointmentItem() {
  return (
    <div className="rounded-md px-3 py-3 border-2 shadow-md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">Doctor: MD.Sofikul</p>
        </div>
      </div>
    </div>
  );
}
