from random import randint
from requests import post
import argparse
import json


default_headers_request = {
    "content-type": "application/json",
    "Cookie": ""
}


def get_peer_evaluation_students(url, request_headers, peer_evaluation_id):
    payload = json.dumps({
        "query": "query PeerEvaluationStudents($where: PeerEvaluationStudentWhereInput) {\n  peerEvaluationStudents(where: $where) {\n    id\n  }\n}",
        "variables": {
            "where": {
                "peerEvaluationId": {
                    "equals": peer_evaluation_id
                }
            }
        }
    })

    response = post(url, headers=request_headers, data=payload).json()

    return response["data"]["peerEvaluationStudents"]


def create_peer_evaluation_student_table(url, request_headers, peer_evaluation_id, student_id):
    payload = json.dumps({
        "operationName": "PeerEvaluationTableStudentLecturer",
        "variables": {
            "where": {
                "peerEvaluationId": peer_evaluation_id,
                "studentId": student_id
            },
            "orderBy": [
                {
                    "studentReviewed": {
                        "studentName": "asc"
                    }
                }
            ]
        },
        "query": "query PeerEvaluationTableStudentLecturer($where: PeerEvaluationTableStudentLecturerWhereInput!, $orderBy: [PeerEvaluationRevieweeOrderByWithRelationInput!]) {\n  peerEvaluationTableStudentLecturer(where: $where) {\n    readOnly\n    visible\n    message\n    peerEvaluationStudentReview {\n      id\n      createdAt\n      peerEvaluationStudentId\n      updatedAt\n      isCompleted\n      _count {\n        peerEvaluationReviewees\n        __typename\n      }\n      peerEvaluationStudent {\n        studentName\n        user {\n          role\n          email\n          name\n          id\n          __typename\n        }\n        __typename\n      }\n      peerEvaluationReviewees(orderBy: $orderBy) {\n        id\n        criteriaScoreTotal\n        studentReviewedId\n        comment\n        isValid\n        studentReviewed {\n          studentName\n          user {\n            name\n            email\n            __typename\n          }\n          __typename\n        }\n        peerEvaluationReviewId\n        peerEvaluationRevieweeColumns {\n          peerEvaluationColumnId\n          criteriaScore\n          updatedAt\n          createdAt\n          id\n          peerEvaluationRevieweeId\n          peerEvaluationColumn {\n            description\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    peerEvaluation {\n      id\n      status\n      columns {\n        description\n        id\n        __typename\n      }\n      criteriaScoreRangeMin\n      criteriaScoreRangeMax\n      submissionsLockDate\n      title\n      code\n      instructions\n      scaleExplanation\n      __typename\n    }\n    peerEvaluationStudentInfo {\n      studentName\n      studentEmail\n      submissionsLockDate\n      studentTeamName\n      updatedAt\n      isCompleted\n      __typename\n    }\n    __typename\n  }\n}\n"
    })

    post(url, headers=request_headers, data=payload)


def get_peer_evaluation_columns_by_student(url, request_headers, student_id):
    payload = json.dumps({
        "query": "query PeerEvaluationReviewees($where: PeerEvaluationRevieweeWhereInput) {\n  peerEvaluationReviewees(where: $where) {\n    id\n    comment\n    criteriaScoreTotal\n    peerEvaluationRevieweeColumns {\n      criteriaScore\n      id\n    }\n  }\n}",
        "variables": {
            "where": {
                "peerEvaluationReview": {
                    "is": {
                        "peerEvaluationStudent": {
                            "is": {
                                "peerEvaluationReviewed": {
                                    "is": {
                                        "peerEvaluationStudentId": {
                                            "equals": student_id
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }
    })

    response = post(url, headers=request_headers, data=payload).json()

    return response["data"]["peerEvaluationReviewees"]


def update_peer_evaluation_criteria_score_column(url, request_headers, column_id, criteria_score):
    payload = json.dumps({
        "query": "mutation UpdateManyPeerEvaluationRevieweeColumn($data: PeerEvaluationRevieweeColumnUpdateManyMutationInput!, $where: PeerEvaluationRevieweeColumnWhereInput) {\n  updateManyPeerEvaluationRevieweeColumn(data: $data, where: $where) {\n    count\n  }\n}",
        "variables": {
            "data": {
                "criteriaScore": {
                    "set": criteria_score
                }
            },
            "where": {
                "id": {
                    "equals": column_id
                }
            }
        }
    })

    post(url, headers=request_headers, data=payload)


def update_peer_evaluations_status_completed(url, request_headers, peer_evaluation_id):
    payload = json.dumps({
        "query": "mutation UpdateManyPeerEvaluationStudentReview($data: PeerEvaluationStudentReviewUpdateManyMutationInput!, $where: PeerEvaluationStudentReviewWhereInput) {\n  updateManyPeerEvaluationStudentReview(data: $data, where: $where) {\n    count\n  }\n}",
        "variables": {
            "data": {
                "isCompleted": {
                    "set": True
                }
            },
            "where": {
                "peerEvaluationStudent": {
                    "is": {
                        "peerEvaluationId": {
                            "equals": peer_evaluation_id
                        }
                    }
                }
            }
        }
    })

    post(url, headers=request_headers, data=payload)


def update_total_peer_evaluation_criteria_score(url, request_headers, student_id, peer_evaluation_reviewee_id, criteria_score_total):
    payload = json.dumps({
        "query": "mutation UpdateManyPeerEvaluationReviewee($data: PeerEvaluationRevieweeUpdateManyMutationInput!, $where: PeerEvaluationRevieweeWhereInput) {\n  updateManyPeerEvaluationReviewee(data: $data, where: $where) {\n    count\n  }\n}",
        "variables": {
            "data": {
                "criteriaScoreTotal": {
                    "set": criteria_score_total
                },
                "comment": {
                    "set": f"Comment created using script - Student ID: {student_id}"
                }
            },
            "where": {
                "id": {
                    "equals": peer_evaluation_reviewee_id
                }
            }
        }
    })

    post(url, headers=request_headers, data=payload)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        prog="complete_all_peer_evaluations.py",
        description="Script to complete all peer evaluations",
        usage="%(prog)s [options]",
        formatter_class=argparse.RawTextHelpFormatter,
    )

    parser.add_argument("--peer-evaluation-id", help="Peer Evaluation ID")

    parser.add_argument(
        "--cookie-auth", help="Cookie of the user authenticated", default="")

    parser.add_argument(
        "--url", help="URL of the application", default="http://localhost:3000")

    parser.add_argument("--criteria-range-min", type=int,
                        help="Criteria Range to have randomized the inputs fo each reviewee", default=1)

    parser.add_argument(
        "--criteria-range-max", type=int, help="Criteria Range to have randomized the inputs fo each reviewee", default=5)

    args = parser.parse_args()

    peer_evaluation_id = args.peer_evaluation_id

    cookie_auth = args.cookie_auth

    criteria_range_min = int(args.criteria_range_min)

    criteria_range_max = int(args.criteria_range_max)

    request_headers = default_headers_request

    request_headers["Cookie"] = cookie_auth

    url = f"{args.url}/api/graphql"

    peer_evaluation_students = get_peer_evaluation_students(
        url, request_headers, peer_evaluation_id)

    for student in peer_evaluation_students:
        create_peer_evaluation_student_table(
            url, request_headers, peer_evaluation_id, student["id"])

    update_peer_evaluations_status_completed(
        url, request_headers, peer_evaluation_id)

    for student in peer_evaluation_students:

        peer_evaluation_student_id = student["id"]

        peer_evaluation_columns_by_student = get_peer_evaluation_columns_by_student(
            url, request_headers, peer_evaluation_student_id)

        for student_review in peer_evaluation_columns_by_student:
            column_criteria_score = []

            for student_column_review in student_review["peerEvaluationRevieweeColumns"]:

                random_criteria_range = randint(
                    criteria_range_min, criteria_range_max)

                column_criteria_score.append(random_criteria_range)

                update_peer_evaluation_criteria_score_column(
                    url, request_headers, student_column_review["id"], random_criteria_range)

            total_sum_columns_criteria_score = sum(column_criteria_score)

            update_total_peer_evaluation_criteria_score(
                url, request_headers, peer_evaluation_student_id, student_review["id"], total_sum_columns_criteria_score)

    print("The script has been executed successfully ‎😃")
