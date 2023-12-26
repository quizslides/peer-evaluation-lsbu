import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import {
  getPeerEvaluationStudentsByUserId,
  getPeerEvaluationsStudentList,
} from "@/utils/peer-evaluation/peer-evaluations/student";
import type { TPeerEvaluationStatus } from "@/utils/peer-evaluation/peer-evaluations/student";

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluations Student Response",
})
class PeerEvaluationStudentResponse {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Title",
  })
  title!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Code",
  })
  code!: string;

  @Field((_type) => Boolean, {
    nullable: false,
    description: "Peer Evaluation is Completed",
  })
  isCompleted!: boolean;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Last Updated Date",
  })
  updatedAt!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Submissions Lock Date",
  })
  submissionsLockDate!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Submissions Lock Date",
  })
  peerEvaluationStatus!: TPeerEvaluationStatus;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluations Student Response",
})
class PeerEvaluationsStudentResponse {
  @Field((_type) => [PeerEvaluationStudentResponse], {
    nullable: true,
    description: "Peer Evaluations Student Response",
  })
  peerEvaluationsStudent: PeerEvaluationStudentResponse[] | undefined;
}

@Resolver()
class PeerEvaluationsStudentQueryResolver {
  @Query((_returns) => PeerEvaluationsStudentResponse)
  async peerEvaluationsStudent(
    @Ctx() ctx: { prisma: PrismaClient; req: NextApiRequest; res: NextApiResponse }
  ): Promise<PeerEvaluationsStudentResponse> {
    const session = await getSession({ req: ctx.req });

    if (!session) {
      return {
        peerEvaluationsStudent: undefined,
      };
    }

    const userId = session.user.id;

    const peerEvaluationsStudentData = await getPeerEvaluationStudentsByUserId(userId);

    const PeerEvaluationsStudentDashboard = getPeerEvaluationsStudentList(peerEvaluationsStudentData);

    return {
      peerEvaluationsStudent: PeerEvaluationsStudentDashboard,
    };
  }
}

export { PeerEvaluationsStudentQueryResolver, PeerEvaluationsStudentResponse };
