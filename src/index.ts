import { config } from "dotenv";

import { Cluster } from "./app";

config();

const cluster = new Cluster(Number(process.env.CLUSTER_REPLICAS));