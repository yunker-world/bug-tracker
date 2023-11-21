import { Bug, Status } from "@prisma/client";

type BugQuery = {
  status: Status;
  page: string;
  orderBy: keyof Bug;
};

export default BugQuery;
