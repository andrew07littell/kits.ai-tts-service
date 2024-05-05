import React, { memo } from "react";

import { Separator } from "@/components/ui/separator";

import { formatTimeDifference } from "@/lib/utils";
import AudioPlayer from "@/components/AudioPlayer";
import AnimatedProgress from "@/components/AnimatedProgress";

interface StatusListItemProps {
  status: string;
  title: string;
  createdAt: string;
  jobStartTime: string;
  jobEndTime: string;
  outputFileUrl: string;
}

const StatusListItem = ({
  status,
  title,
  createdAt,
  jobStartTime,
  jobEndTime,
  outputFileUrl,
}: StatusListItemProps) => (
  <>
    <Separator className="my-4" />
    <div className="flex text-sm items-center">
      <div
        className={`h-2 w-2 rounded-full mr-2 ${
          status === "running"
            ? "bg-orange-400"
            : status === "success"
            ? "bg-sky-500"
            : "bg-red-500"
        }`}
      ></div>{" "}
      {status === "success"
        ? "Ready"
        : status === "running"
        ? "Converting"
        : "Failed"}{" "}
      •
      <span className="mx-1 text-gray-400">
        {formatTimeDifference(jobEndTime || jobStartTime || createdAt)}
      </span>
      •<span className="ml-1 underline">{title}</span>
    </div>

    {status === "running" && (
      <div className="flex items-center space-x-2 my-2">
        <AnimatedProgress running={true} />
      </div>
    )}
    {status === "success" && <AudioPlayer audioUrl={outputFileUrl} />}
  </>
);

export default memo(StatusListItem);
