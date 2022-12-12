# Scripts for Testing

This is a list of scripts created to help testing process

## Prerequisites

We need to have installed the following services:

- Python 3

and a Unix based computer, such Mac or Ubuntu.

### Complete All Peer Evaluations

The script creates all student peer evaluations tables, marking them as completed and adding value to them and with a value of 25 as the total criteria score by each reviewee

#### Instructions

1. Clone the repository to local environment

   ```bash
   git clone git@github.com:quizslides/peer-evaluation-lsbu.git
   ```

2. Go to the script directory `cd scripts/tests/complete_all_peer_evaluations`

3. Create a virtual environment

   ```bash
   python -m venv venv
   ```

   The above script will create a virtual environment named `venv`

   If you are using `python3` as an alias for python v3, run the above command with `python3` instead

4. Active the virtual environment for a terminal session

   ```bash
   source venv/bin/activate
   ```

5. Install the dependencies of the script

   It is recommended to use a virtual environment to avoid any potential conflict with other python dependencies installed globally, for example [venv](https://docs.python.org/3/library/venv.html)

   ```python
   pip install -r requirements.txt
   ```

6. Create a peer evaluation and add all the students you would like to test

7. After setting up a peer evaluation, copy the Peer Evaluation ID from the url. For example, `http://localhost:3000/peer-evaluation/students/cl2wfutv200508q5eyeoqvyas` the `peerEvaluationId` would be `cl2wfutv200508q5eyeoqvyas`

8. Copy the URL of the environment. For example, `https://staging.lsbupeerevaluation.software`

9. Extract from the `Cookie` used by the signed in account to communicate to the backend. The cookie is available as a header named `Cookie` when making any requests to the backend

10. Run the following command:

    ```python
    python path/to/complete_all_peer_evaluations.py \
      --peer-evaluation-id="PASTE_HERE_PEER_EVALUATION_ID" \
      --url="PASTE_HERE_URL" \
      --cookie-auth="PASTE_HERE_COOKIE_AUTH"
    ```

If the script has been executed successfully it will appear as a message on the terminal `The script has been executed successfully ‎😃`

To double-check, go to the peer evaluation dashboard and all peer evaluations should be marked as completed.
