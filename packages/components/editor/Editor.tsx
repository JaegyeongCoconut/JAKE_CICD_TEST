import React, { useRef, lazy, Suspense } from "react";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css";
import type SunEditorCore from "suneditor/src/lib/core";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

const SunEditor = lazy(() => import("suneditor-react"));

interface EditorProps {
  name: string;
  defaultValue: string;
  placeholder: Languages;
  control: Control<any>;
  handleClearError: (data: string) => void;
  handleIsEmpty: (count: number) => void;
}

const Editor = ({
  name,
  placeholder,
  control,
  defaultValue,
  handleIsEmpty,
  handleClearError,
}: EditorProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const editor = useRef<SunEditorCore | null>(null);

  const getSunEditorInstance = (sunEditor: SunEditorCore): void => {
    editor.current = sunEditor;
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={{ required: COMMON_ERROR_MESSAGE.FIELD }}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => {
        const handleEditorChange = (data: string): void => {
          onChange(data);
          handleClearError(data);
        };

        const handleEditorBlur = (): void => {
          onBlur();

          const content = editor.current?.core.getContents(false);
          const htmlTagRegex = /(<([^>]+)>|&nbsp;)/gi;
          const contentCount = content
            ?.replace(htmlTagRegex, "")
            ?.trim().length;

          handleIsEmpty(contentCount ? contentCount : 0);
        };

        return (
          <Suspense fallback={<div>Loading Editor...</div>}>
            <SunEditor
              name={name}
              defaultValue={defaultValue}
              height="394"
              width="100%"
              getSunEditorInstance={getSunEditorInstance}
              placeholder={defaultLanguage(placeholder)!}
              setContents={value}
              setDefaultStyle={"font-size: 14px;"}
              setOptions={{
                charCounter: true,
                charCounterType: "char",
                imageUploadSizeLimit: 1 * 1024 * 1024,
                imageResizing: false,
                linkNoPrefix: true,
                buttonList: [
                  [
                    "fontSize",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "list",
                    "fontColor",
                    "hiliteColor",
                    "image",
                    "link",
                    "preview",
                  ],
                ],
              }}
              onBlur={handleEditorBlur}
              onChange={handleEditorChange}
            />
          </Suspense>
        );
      }}
    />
  );
};

export default Editor;
