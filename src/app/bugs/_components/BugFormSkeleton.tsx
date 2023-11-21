import { Skeleton } from "@/components";
import { Box } from "@radix-ui/themes";

const BugFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default BugFormSkeleton;
