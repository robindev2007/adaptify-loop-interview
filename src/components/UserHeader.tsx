import React from "react";
import Container from "./Container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function UserHeader() {
  return (
    <div className="border-b">
      <Container className="flex items-center justify-between py-1.5">
        <p className="text-lg font-bold">PayGard</p>
        <div>
          <Avatar className="size-8">
            <AvatarFallback className="text-sm font-bold">PG</AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </div>
  );
}

export default UserHeader;
