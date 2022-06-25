import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import ErrorHandler from "@/pages/api/error";
import { welcomeUserEmailHook } from "@/pages/api/hooks/auth";
import {
  onDeletePeerEvaluationStudentsHookAfter,
  onUpdatePeerEvaluationStudentHookAfterData,
  onUpdatePeerEvaluationStudentHookBeforeData,
} from "@/pages/api/hooks/peer-evaluation";
import { permissions } from "@/pages/api/permissions";
import prisma from "@/pages/api/prisma";
import schemaDefinitions from "@/pages/api/prisma/schema";
import { getDifferenceTwoArrays } from "@/utils/form";
import { calculatePeerEvaluationStudentsMarkByPeerEvaluationId } from "@/utils/peer-evaluation/mark-calculation";
import { onAddPeerEvaluationColumns } from "@/utils/peer-evaluation/student/columns";

const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

prisma.$use(async (params, next) => {
  if (params.model === "User" && (params.action === "createMany" || params.action === "create")) {
    await welcomeUserEmailHook(params);
  }

  const result = await next(params);

  return result;
});

prisma.$use(async (params, next) => {
  let onUpdatePeerEvaluationStudentData = null;

  if (params.model === "PeerEvaluationStudent" && params.action === "update") {
    onUpdatePeerEvaluationStudentData = await onUpdatePeerEvaluationStudentHookBeforeData(params);
  }

  const result = await next(params);

  if (
    params.model === "PeerEvaluationStudent" &&
    params.action === "update" &&
    onUpdatePeerEvaluationStudentData &&
    onUpdatePeerEvaluationStudentData.peerEvaluationStudentTeamIdPrevious
  ) {
    const peerEvaluationStudentTeamIdPrevious = onUpdatePeerEvaluationStudentData.peerEvaluationStudentTeamIdPrevious;

    const peerEvaluationStudentTeamIdCurrent = result.peerEvaluationStudentTeamId;

    if (peerEvaluationStudentTeamIdCurrent !== peerEvaluationStudentTeamIdPrevious) {
      await onUpdatePeerEvaluationStudentHookAfterData(
        onUpdatePeerEvaluationStudentData.userId,
        onUpdatePeerEvaluationStudentData.peerEvaluationId,
        peerEvaluationStudentTeamIdCurrent,
        peerEvaluationStudentTeamIdPrevious
      );
    }
  }

  return result;
});

prisma.$use(async (params, next) => {
  const result = await next(params);

  if (params.model === "PeerEvaluationStudent" && params.action === "deleteMany") {
    const peerEvaluationData = await prisma.peerEvaluationStudent.findFirst({
      where: {
        id: params.args.where.id[0],
      },
      select: {
        peerEvaluationId: true,
      },
    });

    if (peerEvaluationData) {
      await onDeletePeerEvaluationStudentsHookAfter(peerEvaluationData.peerEvaluationId);
    }
  }

  return result;
});

prisma.$use(async (params, next) => {
  let peerEvaluationId = null;

  let peerEvaluationDataBeforeUpdate = null;

  if (params.model === "PeerEvaluation" && params.action === "update") {
    peerEvaluationId = params.args.where.id as string;

    peerEvaluationDataBeforeUpdate = await prisma.peerEvaluation.findFirst({
      select: {
        maxMarkDecrease: true,
        maxMarkIncrease: true,
        criteriaScoreRangeMin: true,
        criteriaScoreRangeMax: true,
        columns: true,
      },
      where: {
        id: {
          equals: peerEvaluationId,
        },
      },
    });
  }

  const result = await next(params);

  if (params.model === "PeerEvaluation" && params.action === "update" && peerEvaluationId) {
    if (peerEvaluationDataBeforeUpdate && peerEvaluationId) {
      let isValidRecalculateMarksPeerEvaluation = false;

      const peerEvaluationDataAfterUpdate = await prisma.peerEvaluation.findFirst({
        select: {
          columns: true,
        },
        where: {
          id: {
            equals: peerEvaluationId,
          },
        },
      });

      const maxMarkIncreaseUpdated = params.args.data.maxMarkIncrease.set as number;

      const maxMarkDecreaseUpdated = params.args.data.maxMarkDecrease.set as number;

      const criteriaScoreRangeMinUpdated = params.args.data.criteriaScoreRangeMin.set as number;

      const criteriaScoreRangeMaxUpdated = params.args.data.criteriaScoreRangeMax.set as number;

      const getIsCriteriaScoreRangeAdjusted = (
        criteriaScoreRangeMinPrevious: number,
        criteriaScoreRangeMaxPrevious: number,
        criteriaScoreRangeMinCurrent: number,
        criteriaScoreRangeMaxCurrent: number
      ) => {
        if (
          criteriaScoreRangeMinPrevious !== criteriaScoreRangeMinCurrent ||
          criteriaScoreRangeMaxPrevious !== criteriaScoreRangeMaxCurrent
        ) {
          return true;
        }

        return false;
      };

      const getIsMaxMarkAdjusted = (
        maxMarkIncreasePrevious: number,
        maxMarkDecreasePrevious: number,
        maxMarkIncreaseCurrent: number,
        maxMarkDecreaseCurrent: number
      ) => {
        if (maxMarkIncreasePrevious !== maxMarkIncreaseCurrent || maxMarkDecreasePrevious !== maxMarkDecreaseCurrent) {
          return true;
        }

        return false;
      };

      const isMaxMarkAdjusted = getIsMaxMarkAdjusted(
        peerEvaluationDataBeforeUpdate.maxMarkIncrease,
        peerEvaluationDataBeforeUpdate.maxMarkDecrease,
        maxMarkIncreaseUpdated,
        maxMarkDecreaseUpdated
      );

      const isCriteriaScoreRangeAdjusted = getIsCriteriaScoreRangeAdjusted(
        peerEvaluationDataBeforeUpdate.criteriaScoreRangeMin,
        peerEvaluationDataBeforeUpdate.criteriaScoreRangeMax,
        criteriaScoreRangeMinUpdated,
        criteriaScoreRangeMaxUpdated
      );

      if (isMaxMarkAdjusted) {
        isValidRecalculateMarksPeerEvaluation = true;
      }

      if (isCriteriaScoreRangeAdjusted) {
        await prisma.peerEvaluationRevieweeColumn.updateMany({
          data: {
            criteriaScore: null,
          },
          where: {
            peerEvaluationColumn: {
              peerEvaluationId: {
                equals: peerEvaluationId,
              },
            },
          },
        });

        await prisma.peerEvaluationStudentReview.updateMany({
          data: {
            isCompleted: false,
          },
          where: {
            peerEvaluationStudent: {
              peerEvaluationId: {
                equals: peerEvaluationId,
              },
            },
          },
        });

        await prisma.peerEvaluationStudent.updateMany({
          data: {
            averageCriteriaScore: null,
            averageCriteriaScoreByTeamMember: null,
            systemCalculatedMark: null,
            systemAdjustedMark: null,
          },
          where: {
            peerEvaluationId: {
              equals: peerEvaluationId,
            },
          },
        });

        await prisma.peerEvaluationReviewee.updateMany({
          data: {
            criteriaScoreTotal: null,
          },
          where: {
            studentReviewed: {
              peerEvaluationId: {
                equals: peerEvaluationId,
              },
            },
          },
        });

        isValidRecalculateMarksPeerEvaluation = true;
      }

      if ("columns" in params.args.data) {
        if ("delete" in params.args.data.columns) {
          isValidRecalculateMarksPeerEvaluation = true;
        }

        if ("create" in params.args.data.columns) {
          if (peerEvaluationDataBeforeUpdate && peerEvaluationDataAfterUpdate) {
            const peerEvaluationColumnIdsBeforeUpdate = peerEvaluationDataBeforeUpdate.columns.map(({ id }) => id);

            const peerEvaluationColumnIdsAfterUpdate = peerEvaluationDataAfterUpdate.columns.map(({ id }) => id);

            const peerEvaluationColumnsIdCreated = getDifferenceTwoArrays(
              peerEvaluationColumnIdsBeforeUpdate,
              peerEvaluationColumnIdsAfterUpdate
            );

            await onAddPeerEvaluationColumns(peerEvaluationId, peerEvaluationColumnsIdCreated);

            isValidRecalculateMarksPeerEvaluation = true;
          }
        }
      }

      if (isValidRecalculateMarksPeerEvaluation) {
        await calculatePeerEvaluationStudentsMarkByPeerEvaluationId(peerEvaluationId);
      }
    }
  }

  return result;
});

const getApolloServer = (prisma: PrismaClient) => {
  const isProduction = process.env.NODE_ENV === "production";

  const schemaWithRules = applyMiddleware(schemaDefinitions, permissions);

  return new ApolloServer({
    schema: schemaWithRules,
    context: ({ req, res }) => ({ prisma, req, res }),
    debug: !isProduction,
    introspection: !isProduction,
    formatError: (error) => ErrorHandler(error),
  });
};

const createApolloServerHandler = (apolloServer: ApolloServer) => {
  return apolloServer.createHandler({
    path: "/api/graphql",
  });
};

const apolloInstance = await getApolloServer(prisma);

await apolloInstance.start();

const apolloServerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  return createApolloServerHandler(apolloInstance)(req, res);
};

export { config };

export default apolloServerHandler;
