import {CKEditor} from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Italic,
  Indent,
  IndentBlock,
  Link,
  List,
  TodoList,
  Paragraph,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  BlockQuote,
  CodeBlock,
  Undo,
  UploadAdapter, // For handling image uploads (requires custom config)
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface IInput {
  name: string;
  label?: string;
  value: string;
  setValue: any;
  required?: boolean;
}

const FormEditor = ({name, label, required, value, setValue}: IInput) => {
  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}>
          *
        </span>
      ) : null}
      {label ? (
        <label className="flex justify-between pr-2 font-inter font-semibold text-[14px] text-[#0A0B0C] leading-[150%] mb-[8px] inline-block">
          {label}
        </label>
      ) : null}

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data })
          setValue(data);
        }}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              // "|",
              // "heading",
              "|",
              // "fontfamily",
              // "fontsize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "strikethrough",
              "underline",
              "subscript",
              "superscript",
              "code",
              "|",
              "link",
              "uploadImage",
              "blockQuote",
              "codeBlock",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
            ],
          },
          plugins: [
            Essentials,
            Bold,
            Italic,
            Strikethrough,
            Underline,
            Subscript,
            Superscript,
            FontFamily,
            FontSize,
            FontColor,
            FontBackgroundColor,
            Heading,
            Link,
            List,
            TodoList,
            Indent,
            IndentBlock,
            BlockQuote,
            Code,
            CodeBlock,
            // Paragraph,
            Undo,
            //   UploadAdapter
          ],
          initialData: "",
        }}
      />
    </>
  );
};

export default FormEditor;
