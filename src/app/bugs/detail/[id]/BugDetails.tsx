import { StatusBadge } from "@/components";
import { Bug } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

const BugDetails = ({ bug }: { bug: Bug }) => {
  return (
    <Flex direction="column">
      <Heading>{bug.title}</Heading>
      <Flex className="space-x-3 py-2">
        <StatusBadge status={bug.status} />
        <Text>{bug.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="4" className="prose max-w-full">
        <ReactMarkDown>{bug.description}</ReactMarkDown>
      </Card>
    </Flex>
  );
};

export default BugDetails;
