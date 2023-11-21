"use client";

import { ErrorMessage, Spinner } from "@/components";
import { bugSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bug } from "@prisma/client";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type BugFormData = z.infer<typeof bugSchema>;

const BugForm = ({ bug }: { bug?: Bug }) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BugFormData>({
    resolver: zodResolver(bugSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (bug) {
        await axios.patch(`/api/bugs/{$bug.id}`, data);
      } else {
        await axios.post("/api/bugs", data);
      }
      router.push("/bugs/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Something is wrong");
    }
  });

  return (
    <Flex direction="column" className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            defaultValue={bug?.title}
            {...register("title")}
          />
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={bug?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={isSubmitting}>
          {bug ? "Save Bug" : "Create New Bug"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Flex>
  );
};

export default BugForm;
