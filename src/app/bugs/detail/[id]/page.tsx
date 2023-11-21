import prisma from "@/lib/db";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import BugDetails from "./BugDetails";
import DeleteBugButton from "./DeleteBugButton";
import EditBugButton from "./EditBugButton";

interface Props {
  params: { id: string };
}

const fetchBug = cache((id: number) => {
  return prisma.bug.findUnique({ where: { id } });
});

const BugDetailPage = async ({ params }: Props) => {
  const bug = await fetchBug(parseInt(params.id));

  if (!bug) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="col-span-4">
        <BugDetails bug={bug} />
      </Box>
      <Box>
        <Flex direction="column" gap="3">
          <AssigneeSelect bug={bug} />
          <EditBugButton bugId={bug.id} />
          <DeleteBugButton bugId={bug.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchBug(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default BugDetailPage;
