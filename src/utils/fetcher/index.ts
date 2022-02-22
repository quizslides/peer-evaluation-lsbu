import { request } from "graphql-request";

import routing from "@/routing";

export const fetcher = (query: string, variables?: object) => request(routing.backendEndpoint, query, variables);
