import React from "react";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

const WYSIWYG = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default WYSIWYG;
