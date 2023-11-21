"use client";

import { Skeleton } from "@/components";
import { Bug, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ bug }: { bug: Bug }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60_000,
    retry: 3,
  });

  if (isLoading) <Skeleton />;

  if (error) return null;

  const selectUser = (userId: string) => {
    try {
      axios.patch(`/api/bugs/${bug.id}`, {
        userId: userId || null,
      });
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root defaultValue={bug.userId || ""} onValueChange={selectUser}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Item value="">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
