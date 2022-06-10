import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import sorter from "sort-nested-json";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

import { getDateLocaleString } from "@/utils/date";
import { getSortedObject } from "@/utils/form";
import { IPeerEvaluationStudentMarksByTeam } from "@/utils/peer-evaluation/mark-calculation";
import { dataStudentToBeExtractedList } from "@/utils/peer-evaluation/result/team";

type PeerEvaluationStudentTableRow =
  | "averageCriteriaScore"
  | "systemCalculatedMark"
  | "systemAdjustedMark"
  | "lecturerAdjustedMark"
  | "finalMark";

const getReturnOfNotAvailablePeerEvaluation = (teamName: string) => {
  return {
    isAvailable: false,
    areMarksCalculated: false,
    studentsColumnList: undefined,
    table: undefined,
    teamName: teamName,
    updatedAt: undefined,
    mark: undefined,
    comment: null,
    message: "Peer Evaluation Results are not available",
  };
};

const extractRowDataPeerEvaluationStudentTable = (
  columnName: string,
  keyName: PeerEvaluationStudentTableRow,
  peerEvaluationStudentTeamCalculatedResults: IPeerEvaluationStudentMarksByTeam[]
) => {
  return {
    studentName: columnName,
    ...getSortedObject(
      peerEvaluationStudentTeamCalculatedResults.reduce((previous, current) => {
        return { [current.studentId]: current[keyName], ...previous };
      }, {})
    ),
  };
};

const getStudentsColumnList = (peerEvaluationStudentTeamCalculatedResults: IPeerEvaluationStudentMarksByTeam[]) => {
  const dataColumnList = Object.values(
    getSortedObject(
      peerEvaluationStudentTeamCalculatedResults.reduce((previous, current) => {
        return { [current.studentId]: { name: current.studentId, label: current.studentName }, ...previous };
      }, {})
    )
  );

  const studentsColumnListSorted = sorter.sort(dataColumnList).asc("label");

  return studentsColumnListSorted as unknown as [PeerEvaluationStudentTeamCalculatedResultsTableColumnList];
};
@InputType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Where Input",
})
class PeerEvaluationStudentTeamCalculatedResultsTableWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Name",
  })
  peerEvaluationStudentTeamName!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;
}

@ObjectType({ description: "Peer Evaluation Student Table Column List" })
class PeerEvaluationStudentTeamCalculatedResultsTableColumnList {
  @Field((_type) => String, {
    nullable: false,
    description: "Column Name",
  })
  name!: string;

  @Field((_type) => String, {
    nullable: true,
    description: "Column Label",
  })
  label!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Response",
})
class PeerEvaluationStudentTeamCalculatedResultsTableResponse {
  @Field((_type) => [PeerEvaluationStudentTeamCalculatedResultsTableColumnList], {
    nullable: true,
    description: "Peer Evaluation Students Table Column List",
  })
  studentsColumnList!: [PeerEvaluationStudentTeamCalculatedResultsTableColumnList] | undefined;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Calculated Results Table Stringified",
  })
  table!: string | undefined;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Name",
  })
  teamName!: string;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Updated At",
  })
  updatedAt!: string | undefined;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Mark",
  })
  mark!: number | undefined;

  @Field((_type) => Boolean, {
    nullable: false,
    description: "Peer Evaluation Student Team Mark is Available",
  })
  isAvailable!: boolean;

  @Field((_type) => Boolean, {
    nullable: false,
    description: "Peer Evaluation Student Team Marks are Calculated",
  })
  areMarksCalculated!: boolean;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Comment",
  })
  comment!: string | null;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Marks response message",
  })
  message!: string;
}

@Resolver()
class PeerEvaluationStudentTeamCalculatedResultsTable {
  @Query((_returns) => PeerEvaluationStudentTeamCalculatedResultsTableResponse)
  async peerEvaluationStudentTeamCalculatedResultsTable(
    @Ctx() ctx: { prisma: PrismaClient; req: NextApiRequest; res: NextApiResponse },
    @Arg("where") where: PeerEvaluationStudentTeamCalculatedResultsTableWhereInput
  ): Promise<PeerEvaluationStudentTeamCalculatedResultsTableResponse> {
    const { peerEvaluationStudentTeamName, peerEvaluationId } = where;

    const session = await getSession({ req: ctx.req });

    const peerEvaluationTeachingMember = await ctx.prisma.peerEvaluationTeachingMember.findFirst({
      select: {
        id: true,
      },
      where: {
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
        userId: {
          equals: session?.user.id,
        },
      },
    });

    if (!peerEvaluationTeachingMember) {
      return getReturnOfNotAvailablePeerEvaluation(peerEvaluationStudentTeamName);
    }

    const peerEvaluationStudentTeamData = await ctx.prisma.peerEvaluationStudentTeam.findFirst({
      select: {
        calculatedResults: true,
        mark: true,
        updatedAt: true,
        createdAt: true,
        comment: true,
      },
      where: {
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
        name: {
          equals: peerEvaluationStudentTeamName,
        },
      },
    });

    if (!peerEvaluationStudentTeamData) {
      return getReturnOfNotAvailablePeerEvaluation(peerEvaluationStudentTeamName);
    }

    if (!peerEvaluationStudentTeamData?.calculatedResults) {
      return {
        isAvailable: true,
        areMarksCalculated: false,
        studentsColumnList: undefined,
        table: undefined,
        teamName: peerEvaluationStudentTeamName,
        updatedAt: getDateLocaleString(peerEvaluationStudentTeamData.updatedAt),
        mark: peerEvaluationStudentTeamData?.mark ? Number(peerEvaluationStudentTeamData?.mark) : undefined,
        comment: null,
        message: "Peer Evaluation Marks are not calculated",
      };
    }

    const peerEvaluationStudentTeamCalculatedResults =
      peerEvaluationStudentTeamData?.calculatedResults as unknown as IPeerEvaluationStudentMarksByTeam[];

    const studentsColumnList = getStudentsColumnList(peerEvaluationStudentTeamCalculatedResults);

    const studentsData = peerEvaluationStudentTeamCalculatedResults.map(({ studentName, reviews, studentId }) => {
      const reviewerData = reviews.reduce((previous, current) => {
        return {
          [current.revieweeStudentId]: {
            studentId: studentId,
            peerEvaluationReviewId: current.peerEvaluationReviewId,
            criteriaScoreTotal: current.criteriaScoreTotal,
            isValid: current.isValid,
            comment: current.comment,
          },
          ...previous,
        };
      }, {});
      return {
        studentName: {
          studentName: studentName,
          studentId: studentId,
        },
        ...getSortedObject(reviewerData),
      };
    });

    const studentsDataSorted = sorter.sort(studentsData).asc("studentName.studentName");

    const peerEvaluationStudentTeamDataCalculationRows = dataStudentToBeExtractedList.flatMap((column) =>
      extractRowDataPeerEvaluationStudentTable(
        column.columnName,
        column.keyName as PeerEvaluationStudentTableRow,
        peerEvaluationStudentTeamCalculatedResults
      )
    );

    return {
      isAvailable: true,
      areMarksCalculated: true,
      studentsColumnList: studentsColumnList,
      table: JSON.stringify([...studentsDataSorted, ...peerEvaluationStudentTeamDataCalculationRows]),
      teamName: peerEvaluationStudentTeamName,
      updatedAt: getDateLocaleString(peerEvaluationStudentTeamData.updatedAt),
      mark: peerEvaluationStudentTeamData?.mark ? Number(peerEvaluationStudentTeamData?.mark) : undefined,
      comment: peerEvaluationStudentTeamData.comment,
      message: "Peer evaluation Student Team Results fetched successfully",
    };
  }
}

export {
  PeerEvaluationStudentTeamCalculatedResultsTable,
  PeerEvaluationStudentTeamCalculatedResultsTableResponse,
  PeerEvaluationStudentTeamCalculatedResultsTableWhereInput,
};
