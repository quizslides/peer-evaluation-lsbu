import Error from "next/error";

const NotFound = () => {
  // Opinionated: do not record an exception in Sentry for 404
  return <Error statusCode={404} />;
};

export default NotFound;
