"use client";

import { Skeleton } from "@/components";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NavAuth = () => {
  const { status, data: session } = useSession();

  if (status === "loading") <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <Link
        href="/api/auth/signin"
        className="text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        Login
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session?.user?.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>{session?.user?.email}</DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavAuth;
