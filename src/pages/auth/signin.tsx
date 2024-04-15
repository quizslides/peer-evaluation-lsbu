import React, { useEffect, useState } from "react";

import type { NextPage } from "next";

import styled from "@emotion/styled";
import { Box, Container, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import VerificationInput from "react-verification-input";
import { object } from "yup";

import { Button, Counter, PageTitle, TextFieldForm, Typography, WarningUnsavedForm } from "@/components";
import { SignInWrapper } from "@/containers";
import content from "@/content";
import { EmailSentEmoji } from "@/icons";
import routing from "@/routing";
import { errorNotification, loadingNotification, successNotification, userEmailValidator } from "@/utils";

interface ISignInForm {
  email: string;
}

const EmailSentContainer = styled(Container)`
  text-align: center;
`;

const TextBold = styled.a`
  font-weight: 700;
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  .character {
    color: black;
    font-size: 20px;
    border-radius: 8px;
    background-color: #eeeeee;
    box-shadow: 0 2px 0 #e4e2f5;
  }
`;

const counterInitialValue = 60;

const SignIn: NextPage = () => {
  const router = useRouter();

  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [isCodeSent, setCodeSent] = useState<boolean>(false);

  const [counter, setCounter] = useState(counterInitialValue);

  const [isLoadingCode, setLoadingCode] = useState(false);

  const { data: session, status } = useSession();

  const [valuesForm, setValuesForm] = useState<ISignInForm>({
    email: content.pages.auth.signIn.form.email.defaultValue,
  });

  const validationSchema = object({
    ...userEmailValidator,
  });

  const sendCode = async (valuesForm: ISignInForm) => {
    setSubmitting(true);

    try {
      const notificationsId = loadingNotification("Wait a little bit...");

      await signIn("email", {
        email: valuesForm.email.toLocaleLowerCase(),
        redirect: false,
        redirectUrl: redirectUrl || `${window.location.origin}${routing.home}`,
      });

      setCodeSent(true);

      successNotification("Code sent successfully", notificationsId);
    } catch (error) {
      errorNotification("Something wrong happened sending the link with the code");
    } finally {
      setSubmitting(false);
    }
  };

  const submitForm = async (valuesForm: ISignInForm) => {
    setValuesForm(valuesForm);

    await sendCode(valuesForm);
  };

  const resendCode = () => {
    disableReSendCodeButton();
    sendCode(valuesForm);
  };

  const hideLinkSetComponent = () => setCodeSent(false);

  const loading = status === "loading" || isLoadingCode;

  const getAuthenticatedRedirect = () => {
    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.home;
  };

  const onSignInWithCode = async (code: string) => {
    setLoadingCode(true);

    const url = `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/email?callbackUrl=${encodeURIComponent(
      `${process.env.NEXT_PUBLIC_URL}/auth/signin`
    )}&token=${code}&email=${encodeURIComponent(valuesForm.email.toLocaleLowerCase())}`;

    const response = await fetch(url);

    if (response.url.includes("error")) {
      errorNotification("Your code entered is invalid. Try again or request another one.");

      setLoadingCode(false);

      return null;
    }

    let urlRedirect = response.url;

    if (redirectUrl) {
      urlRedirect = `${response.url}?redirectUrl=${redirectUrl}`;
    }

    window.location.href = urlRedirect;
  };

  const [isDisabled, setDisabled] = useState(false);

  const disableReSendCodeButton = () => {
    setDisabled(true);

    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    setTimeout(() => {
      setDisabled(false);

      setCounter(counterInitialValue);

      clearInterval(interval);
    }, counterInitialValue * 1000);
  };

  useEffect(() => {
    if (router.query.redirectUrl && typeof router.query.redirectUrl === "string") {
      setRedirectUrl(router.query.redirectUrl);
    }
  }, [router.query.redirectUrl]);

  useEffect(() => {
    if (router.query.email && typeof router.query.email === "string") {
      setValuesForm({
        email: router.query.email,
      });

      setCodeSent(true);
    }
  }, [router.query.email]);

  if (!loading && session) {
    router.push(getAuthenticatedRedirect());
    return null;
  }

  if (isCodeSent) {
    return (
      <SignInWrapper loading={loading}>
        <EmailSentContainer maxWidth="xs">
          <EmailSentEmoji height="5rem" width="5rem" testId={"signin-email-link-sent-emoji"} />

          <Typography variant="subtitle1" testId="signin-email-link-sent">
            {content.pages.auth.signIn.codeSent.description1} <TextBold>{valuesForm.email}</TextBold>{" "}
            {content.pages.auth.signIn.codeSent.description2}
          </Typography>

          <CodeInputContainer data-testid={"signin-code-input"}>
            <VerificationInput
              classNames={{
                container: "container",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
              }}
              onComplete={(value) => onSignInWithCode(value)}
            />
          </CodeInputContainer>

          <Stack spacing={1}>
            <Button
              onClick={resendCode}
              testId="signin-email-link-sent-button-resent"
              variant="contained"
              color="inherit"
              disabled={isDisabled}
            >
              {content.pages.auth.signIn.codeSent.resendCode}
            </Button>
            <Button
              onClick={hideLinkSetComponent}
              testId="signin-email-link-sent-button-hide"
              variant="outlined"
              color="inherit"
            >
              {content.pages.auth.signIn.codeSent.hideLinkSetComponent}
            </Button>
          </Stack>

          <div style={{ visibility: isDisabled ? "visible" : "hidden" }}>
            <Counter seconds={counter} />
          </div>
        </EmailSentContainer>
      </SignInWrapper>
    );
  }

  return (
    <SignInWrapper loading={loading}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageTitle title={content.pages.auth.signIn.title} testId="signin-title" variant="h3" />
        </Grid>

        <Grid item xs={12}>
          <Container maxWidth="sm">
            <Formik
              initialValues={valuesForm}
              validationSchema={validationSchema}
              onSubmit={async (data, { resetForm }) => {
                await submitForm(data);
                resetForm({
                  values: data,
                });
              }}
            >
              {({ dirty }) => (
                <Form>
                  <WarningUnsavedForm areChangesUnsaved={dirty} />
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: "white",
                      borderRadius: "20px",
                      m: 1,
                      boxShadow: 3,
                    }}
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
                      <Grid item xs={6}>
                        <TextFieldForm
                          testId="signin-form-field-email"
                          name="email"
                          props={{
                            autoFocus: true,
                            fullWidth: true,
                            label: "Email",
                            type: "email",
                            variant: "outlined",
                            placeholder: content.pages.auth.signIn.form.email.placeholder,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Button
                            disabled={isSubmitting}
                            testId="signin-form-submit"
                            fullWidth
                            variant="contained"
                            type="submit"
                          >
                            {content.pages.auth.signIn.form.button.submit}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </SignInWrapper>
  );
};

export default SignIn;
