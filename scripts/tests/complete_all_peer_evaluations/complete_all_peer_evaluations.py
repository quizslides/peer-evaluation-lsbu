import argparse
import requests
import json


default_headers_request = {
    "content-type": "application/json"
}


def get_peer_evaluation_students(peer_evaluation_id):
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

    response = requests.request(
        "POST", url, headers=default_headers_request, data=payload).json()

    return response["data"]["peerEvaluationStudents"]


def create_peer_evaluation_student_table(peer_evaluation_id, student_id):
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

    requests.request(
        "POST", url, headers=default_headers_request, data=payload)


def update_peer_evaluation_criteria_score_column(peer_evaluation_id):
    payload = json.dumps({
        "query": "mutation UpdateManyPeerEvaluationRevieweeColumn($data: PeerEvaluationRevieweeColumnUpdateManyMutationInput!, $where: PeerEvaluationRevieweeColumnWhereInput) {\n  updateManyPeerEvaluationRevieweeColumn(data: $data, where: $where) {\n    count\n  }\n}",
        "variables": {
            "data": {
                "criteriaScore": {
                    "set": 5
                }
            },
            "where": {
                "peerEvaluationReviewee": {
                    "is": {
                        "peerEvaluationReview": {
                            "is": {
                                "peerEvaluationStudent": {
                                    "is": {
                                        "peerEvaluationId": {
                                            "equals": peer_evaluation_id
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    requests.request(
        "POST", url, headers=default_headers_request, data=payload)


def update_peer_evaluations_status_completed(peer_evaluation_id):
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

    requests.request(
        "POST", url, headers=default_headers_request, data=payload)


def update_total_peer_evaluation_criteria_score(peer_evaluation_id):
    payload = json.dumps({
        "query": "mutation UpdateManyPeerEvaluationReviewee($data: PeerEvaluationRevieweeUpdateManyMutationInput!, $where: PeerEvaluationRevieweeWhereInput) {\n  updateManyPeerEvaluationReviewee(data: $data, where: $where) {\n    count\n  }\n}",
        "variables": {
            "data": {
                "criteriaScoreTotal": {
                    "set": 25
                },
                "comment": {
                    "set": "Comment created using script"
                }
            },
            "where": {
                "peerEvaluationReview": {
                    "is": {
                        "peerEvaluationStudent": {
                            "is": {
                                "peerEvaluationId": {
                                    "equals": peer_evaluation_id
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    requests.request(
        "POST", url, headers=default_headers_request, data=payload)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        prog="complete_all_peer_evaluations.py",
        description="Script to complete all peer evaluations",
        usage="%(prog)s [options]",
        formatter_class=argparse.RawTextHelpFormatter,
    )

    parser.add_argument("--peer-evaluation-id", help="Peer Evaluation ID")
    parser.add_argument(
        "--url", help="URL of the application", default="http://localhost:3000")

    args = parser.parse_args()

    peer_evaluation_id = args.peer_evaluation_id

    url = f"{args.url}/api/graphql"

    peer_evaluation_students = get_peer_evaluation_students(peer_evaluation_id)

    for student in peer_evaluation_students:
        create_peer_evaluation_student_table(peer_evaluation_id, student["id"])

    update_peer_evaluations_status_completed(peer_evaluation_id)

    update_total_peer_evaluation_criteria_score(peer_evaluation_id)

    update_peer_evaluation_criteria_score_column(peer_evaluation_id)

    print("The script has been executed successfully ‎😃")
