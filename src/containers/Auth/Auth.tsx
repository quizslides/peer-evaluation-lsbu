import { useSession, signIn, signOut } from "next-auth/react";

import Button from "@/components/Button/Button";

const Auth = () => {
  const { data: session } = useSession();

  const userSignIn = () => signIn();
  const userSignOut = () => signOut();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button variant="contained" onClick={userSignOut}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="contained" onClick={userSignIn}>
        Sign in
      </Button>
    </>
  );
};

export default Auth;
