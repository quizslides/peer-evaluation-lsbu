import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

const WYSIWYG = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default WYSIWYG;
