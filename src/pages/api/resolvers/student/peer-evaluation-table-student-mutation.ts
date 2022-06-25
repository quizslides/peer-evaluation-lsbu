import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

@InputType({ description: "Peer EvaluationTable Data" })
class PeerEvaluationTableInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Table ID",
  })
  id!: string;

  @Field((_type) => Boolean, {
    nullable: false,
    description: "Peer Evaluation is completed",
  })
  isCompleted!: boolean;
}

@InputType({ description: "Peer Evaluation Reviewee" })
class PeerEvaluationRevieweeInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Reviewee ID",
  })
  id!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Reviewee Comment",
  })
  comment!: string;

  @Field((_type) => Number, {
    nullable: false,
    description: "Peer Evaluation Criteria Score Total",
  })
  criteriaScoreTotal!: number;
}

@InputType({ description: "Peer Evaluation Columns Reviewee Input" })
class PeerEvaluationColumnsRevieweeInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Column Reviewee ID",
  })
  id!: string;

  @Field((_type) => Number, {
    nullable: false,
    description: "Peer Evaluation Reviewee Criteria Score",
  })
  criteriaScore!: number;
}
@InputType({
  isAbstract: true,
  description: "Update Peer Evaluation Table Student Data Input",
})
class UpdatePeerEvaluationTableStudentDataInput {
  @Field((_type) => PeerEvaluationTableInput, {
    nullable: true,
    description: "Peer Evaluation Table to be Updated",
  })
  peerEvaluationTable!: PeerEvaluationTableInput;

  @Field((_type) => PeerEvaluationRevieweeInput, {
    nullable: true,
    description: "Peer Evaluation Reviewee to be Updated",
  })
  peerEvaluationReviewee!: PeerEvaluationRevieweeInput;

  @Field((_type) => [PeerEvaluationColumnsRevieweeInput], {
    nullable: true,
    description: "Peer Evaluation Columns Reviewee to be Updated",
  })
  columnsReviewee!: [PeerEvaluationColumnsRevieweeInput];
}

@InputType({ description: "PeerEvaluationTable Data List" })
class UpdatePeerEvaluationTableStudentDataInputList {
  @Field((_type) => [UpdatePeerEvaluationTableStudentDataInput], {
    nullable: false,
    description: "PeerEvaluationTable Data List",
  })
  peerEvaluationTableDataList!: [UpdatePeerEvaluationTableStudentDataInput];
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Table Student Response",
})
class UpdatePeerEvaluationTableStudentDataResponse {
  @Field((_type) => Boolean, {
    nullable: false,
    description: "Completed successfully",
  })
  completed!: boolean;

  @Field((_type) => String, {
    nullable: false,
    description: "Message of the action updating the peer evaluation table",
  })
  message!: string;

  @Field((_type) => Number, {
    nullable: false,
    description: "Code of the action updating the peer evaluation table",
  })
  code!: number;
}

@Resolver()
class UpdatePeerEvaluationTableStudentData {
  @Mutation((_returns) => UpdatePeerEvaluationTableStudentDataResponse)
  async updatePeerEvaluationTableStudent(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: UpdatePeerEvaluationTableStudentDataInputList
  ): Promise<UpdatePeerEvaluationTableStudentDataResponse> {
    const { peerEvaluationTableDataList } = where;

    const { prisma } = ctx;

    const updatePeerEvaluationStudentReviewUpdateInput = (peerEvaluationStudentId: string, isCompleted: boolean) => {
      return prisma.peerEvaluationStudentReview.update({
        data: {
          isCompleted: {
            set: isCompleted,
          },
        },
        where: {
          peerEvaluationStudentId: peerEvaluationStudentId,
        },
      });
    };

    const updatePeerEvaluationReviewee = (
      peerEvaluationRevieweeId: string,
      criteriaScoreTotal: number,
      comment: string
    ) => {
      return prisma.peerEvaluationReviewee.update({
        data: {
          criteriaScoreTotal: {
            set: criteriaScoreTotal,
          },
          comment: {
            set: comment,
          },
        },
        where: {
          id: peerEvaluationRevieweeId,
        },
      });
    };

    const updatePeerEvaluationRevieweeColumn = (peerEvaluationRevieweeColumnId: string, criteriaScore: number) => {
      return prisma.peerEvaluationRevieweeColumn.update({
        data: {
          criteriaScore: {
            set: criteriaScore,
          },
        },
        where: {
          id: peerEvaluationRevieweeColumnId,
        },
      });
    };

    try {
      for (const peerEvaluationTableData of peerEvaluationTableDataList) {
        const { peerEvaluationTable, peerEvaluationReviewee, columnsReviewee } = peerEvaluationTableData;

        await updatePeerEvaluationStudentReviewUpdateInput(peerEvaluationTable.id, peerEvaluationTable.isCompleted);

        await updatePeerEvaluationReviewee(
          peerEvaluationReviewee.id,
          peerEvaluationReviewee.criteriaScoreTotal,
          peerEvaluationReviewee.comment
        );

        const columnsRevieweePromises = columnsReviewee.map((columnReviewee) =>
          updatePeerEvaluationRevieweeColumn(columnReviewee.id, columnReviewee.criteriaScore)
        );

        await Promise.all(columnsRevieweePromises);
      }
    } catch {
      return {
        code: 500,
        completed: false,
        message: "Error updating peer evaluation",
      };
    }

    return {
      code: 200,
      completed: true,
      message: "Peer evaluation updated successfully",
    };
  }
}

export {
  UpdatePeerEvaluationTableStudentData,
  UpdatePeerEvaluationTableStudentDataInput,
  UpdatePeerEvaluationTableStudentDataResponse,
};
