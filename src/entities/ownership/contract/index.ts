import { z } from "zod";
import { OwnershipContract } from "./ownership.contract";

export type OwnershipMutation = z.infer<typeof OwnershipContract>;
