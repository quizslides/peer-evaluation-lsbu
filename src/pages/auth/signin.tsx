import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { Box, Container, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { object } from "yup";

import { Button, PageTitle, TextFieldForm, Typography } from "@/components";
import { SignInWrapper } from "@/containers";
import content from "@/content";
import { EmailSentEmoji } from "@/icons";
import routing from "@/routing";
import { emailValidator, errorNotification, loadingNotification, successNotification } from "@/utils";

interface ISignInForm {
  email: string;
}

const EmailSentContainer = styled(Container)`
  text-align: center;
`;

const TextBold = styled.a`
  font-weight: 700;
`;

const SignIn: NextPage = () => {
  const router = useRouter();

  const [callBackUrl, setCallBackUrl] = useState<string | null>(null);

  const { data: session, status } = useSession();

  const [valuesForm, setValuesForm] = useState<ISignInForm>({
    email: content.pages.auth.signIn.form.email.defaultValue,
  });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [isLinkSent, setLinkSent] = useState<boolean>(false);

  const validationSchema = object({
    ...emailValidator,
  });

  const sendLink = async (valuesForm: ISignInForm) => {
    setSubmitting(true);

    try {
      const notificationsId = loadingNotification("Wait a little bit...");

      await signIn("email", {
        email: valuesForm.email,
        redirect: false,
        callbackUrl: callBackUrl || `${window.location.origin}${routing.dashboard}`,
      });

      setLinkSent(true);
      successNotification("Link sent successfully", notificationsId);
    } catch (error) {
      errorNotification("Something wrong happened sending the link");
    } finally {
      setSubmitting(false);
    }
  };

  const submitForm = async (valuesForm: ISignInForm) => {
    setValuesForm(valuesForm);
    await sendLink(valuesForm);
  };

  const resendLink = () => sendLink(valuesForm);

  const hideLinkSetComponent = () => setLinkSent(false);

  const loading = status === "loading";

  useEffect(() => {
    if (router.query.callbackUrl && typeof router.query.callbackUrl === "string") {
      setCallBackUrl(router.query.callbackUrl);
    }
  }, [router.query.callbackUrl]);

  if (!loading && session) {
    router.push(routing.dashboard);
    return null;
  }

  if (isLinkSent) {
    return (
      <SignInWrapper loading={loading}>
        <EmailSentContainer maxWidth="xs">
          <EmailSentEmoji height="5rem" width="5rem" testId={"signin-email-link-sent-emoji"} />
          <Typography variant="subtitle1" testId="signin-email-link-sent">
            {content.pages.auth.signIn.linkSent.description1} <TextBold>{valuesForm.email}</TextBold>
            {content.pages.auth.signIn.linkSent.description2}
          </Typography>

          <Stack spacing={1}>
            <Button
              onClick={resendLink}
              testId="signin-email-link-sent-button-resent"
              variant="contained"
              color="inherit"
            >
              {content.pages.auth.signIn.linkSent.resendLink}
            </Button>
            <Button
              onClick={hideLinkSetComponent}
              testId="signin-email-link-sent-button-hide"
              variant="outlined"
              color="inherit"
            >
              {content.pages.auth.signIn.linkSent.hideLinkSetComponent}
            </Button>
          </Stack>
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
            <Formik initialValues={valuesForm} validationSchema={validationSchema} onSubmit={submitForm}>
              {() => (
                <Form>
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
                            testId="signin-form-submit-button"
                            fullWidth
                            variant="contained"
                            type="submit"
                          >
                            {content.pages.auth.signIn.form.button.submit}
                          </Button>
                          <Button
                            onClick={() => router.push(routing.playground)}
                            size="small"
                            testId="signin-form-playground-button"
                            variant="text"
                          >
                            {content.pages.auth.signIn.form.button.playground}
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
