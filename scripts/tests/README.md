# Scripts for Testing

This is a list of scripts created to help testing process

## Prerequisites

We need to have installed the following services:

- Python 3

and a Unix based computer, such Mac or Ubuntu.

### Complete All Peer Evaluations

The script creates all student peer evaluations tables, marking them as completed and adding value to them and with a value of 25 as the total criteria score by each reviewee

#### Instructions

1. Open the terminal and run `python -v` and make sure it exists and it is v3

2. Create a peer evaluation and add all the students you would like to test

3. Copy the Peer Evaluation ID `http://localhost:3000/peer-evaluation/students/cl2wfutv200508q5eyeoqvyas` the `peerEvaluationId` would be `cl2wfutv200508q5eyeoqvyas`

4. Copy the URL of the environment `https://staging.lsbupeerevaluation.software`

5. Run the following command:

```python
python3 path/to/complete_all_peer_evaluations.py --peer-evaluation-id="PASTE_HERE_PEER_EVALUATION_ID" --url="PASTE_HERE_URL"
```

If the script has been executed successfully it will appear as a message on the terminal `The script has been executed successfully ‎😃`

To double-check, go to the peer evaluation dashboard and all peer evaluations should be marked as completed.
