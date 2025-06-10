import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";

const course = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            className="w-full h-40 object-cover rounded-t-lg"
            src="data:image/jpeg;base64,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"
            alt="Nextjs Course"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            NextJs Complete Course 2025
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">NameOfInstructor</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full ">
              Advance
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹499</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default course;
