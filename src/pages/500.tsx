import React from "react";

import Error from "next/error";

const ServerError = () => {
  return <Error statusCode={500} />;
};

export default ServerError;
