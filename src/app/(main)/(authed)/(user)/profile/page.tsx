import Container from "@/components/Container";
import ProfileSignoutButton from "@/components/ProfileSignoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
};

async function ProfilePage() {
  return (
    <div>
      <Container>
        <div className="mx-auto flex w-fit flex-col items-center">
          <Avatar>
            <AvatarImage src="/images/profile.jpeg" />
            <AvatarFallback className="font-bold">PG</AvatarFallback>
          </Avatar>
          <p>email@gmail.com</p>
          <div>
            <ProfileSignoutButton />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
