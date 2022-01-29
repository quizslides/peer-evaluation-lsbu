import { useSession, signIn, signOut } from "next-auth/react";

const Auth = () => {
  const { data: session } = useSession();

  const userSignIn = () => signIn();
  const userSignOut = () => signOut();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={userSignOut}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={userSignIn}>Sign in</button>
    </>
  );
};

export default Auth;
