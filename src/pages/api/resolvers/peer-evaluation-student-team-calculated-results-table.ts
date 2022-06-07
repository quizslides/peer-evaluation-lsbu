import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

import { getSortedObject } from "@/utils/form";
import { IPeerEvaluationStudentMarksByTeam } from "@/utils/peer-evaluation/mark-calculation";

type PeerEvaluationStudentTableRow =
  | "averageCriteriaScore"
  | "systemCalculatedMark"
  | "systemAdjustedMark"
  | "lecturerAdjustedMark"
  | "finalMark";

const extractRowDataPeerEvaluationStudentTable = (
  columnName: string,
  keyName: PeerEvaluationStudentTableRow,
  peerEvaluationStudentTeamCalculatedResults: IPeerEvaluationStudentMarksByTeam[]
) => {
  return {
    studentName: columnName,
    ...getSortedObject(
      peerEvaluationStudentTeamCalculatedResults.reduce((previous, current) => {
        return { [current.email]: current[keyName], ...previous };
      }, {})
    ),
  };
};

const getStudentsColumnList = (peerEvaluationStudentTeamCalculatedResults: IPeerEvaluationStudentMarksByTeam[]) =>
  Object.values(
    getSortedObject(
      peerEvaluationStudentTeamCalculatedResults.reduce((previous, current) => {
        return { [current.email]: { name: current.email, label: current.studentName }, ...previous };
      }, {})
    )
  ) as [PeerEvaluationStudentTeamCalculatedResultsTableColumnList];

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
    nullable: false,
    description: "Peer Evaluation Students Table Column List",
  })
  studentsColumnList!: [PeerEvaluationStudentTeamCalculatedResultsTableColumnList];

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Calculated Results Table Stringified",
  })
  table!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Name",
  })
  teamName!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Updated At",
  })
  updatedAt!: string | undefined;

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation Student Team Mark",
  })
  mark!: number | undefined;
}

@Resolver()
class PeerEvaluationStudentTeamCalculatedResultsTable {
  @Query((_returns) => PeerEvaluationStudentTeamCalculatedResultsTableResponse)
  async peerEvaluationStudentTeamCalculatedResultsTable(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationStudentTeamCalculatedResultsTableWhereInput
  ): Promise<PeerEvaluationStudentTeamCalculatedResultsTableResponse> {
    const { peerEvaluationStudentTeamName, peerEvaluationId } = where;

    const peerEvaluationStudentTeamData = await ctx.prisma.peerEvaluationStudentTeam.findFirst({
      select: {
        calculatedResults: true,
        mark: true,
        updatedAt: true,
        createdAt: true,
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

    const peerEvaluationStudentTeamCalculatedResults =
      peerEvaluationStudentTeamData?.calculatedResults as unknown as IPeerEvaluationStudentMarksByTeam[];

    const studentsColumnList = getStudentsColumnList(peerEvaluationStudentTeamCalculatedResults);

    const studentsData = peerEvaluationStudentTeamCalculatedResults.map(({ studentName, reviews }) => {
      const reviewerData = reviews.reduce((previous, current) => {
        return { [current.revieweeEmail]: current.criteriaScoreTotal, ...previous };
      }, {});
      return { studentName, ...getSortedObject(reviewerData) };
    });

    const dataStudentToBeExtractedList = [
      {
        columnName: "Average Criteria Score",
        keyName: "averageCriteriaScore",
      },
      {
        columnName: "System Calculated Mark",
        keyName: "systemCalculatedMark",
      },
      {
        columnName: "System Adjusted Mark",
        keyName: "systemAdjustedMark",
      },
      {
        columnName: "Lecturer Adjusted Mark",
        keyName: "lecturerAdjustedMark",
      },
      {
        columnName: "Final Mark",
        keyName: "finalMark",
      },
    ];

    const peerEvaluationStudentTeamDataCalculationRows = dataStudentToBeExtractedList.flatMap((column) =>
      extractRowDataPeerEvaluationStudentTable(
        column.columnName,
        column.keyName as PeerEvaluationStudentTableRow,
        peerEvaluationStudentTeamCalculatedResults
      )
    );

    return {
      studentsColumnList: studentsColumnList,
      table: JSON.stringify([...studentsData, ...peerEvaluationStudentTeamDataCalculationRows]),
      teamName: peerEvaluationStudentTeamName,
      updatedAt: peerEvaluationStudentTeamData?.updatedAt.toLocaleString("en-GB"),
      mark: peerEvaluationStudentTeamData?.mark ? Number(peerEvaluationStudentTeamData?.mark) : undefined,
    };
  }
}

export {
  PeerEvaluationStudentTeamCalculatedResultsTable,
  PeerEvaluationStudentTeamCalculatedResultsTableResponse,
  PeerEvaluationStudentTeamCalculatedResultsTableWhereInput,
};
