import React, { useRef, lazy, Suspense } from "react";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css";
import type SunEditorCore from "suneditor/src/lib/core";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

const SunEditor = lazy(() => import("suneditor-react"));

interface EditorProps {
  name: string;
  defaultValue: string;
  placeholder: Languages;
  control: Control<any>;
}

const Editor = ({ name, placeholder, control, defaultValue }: EditorProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const editor = useRef<SunEditorCore | null>(null);

  const getSunEditorInstance = (sunEditor: SunEditorCore): void => {
    editor.current = sunEditor;
  };

  const SUN_EDITOR_INIT_DATA = "<p><br></p>";

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => {
        const handleInput = (e: InputEvent): void => {
          const target = e.target as HTMLElement | null;

          if (!target) return;

          onChange(
            target.innerHTML === SUN_EDITOR_INIT_DATA ? "" : target.innerHTML,
          );
        };

        const handleChange = (data: string): void => {
          onChange(data === SUN_EDITOR_INIT_DATA ? "" : data);
        };

        return (
          <Suspense fallback={<div>Loading Editor...</div>}>
            <SunEditor
              name={name}
              defaultValue={defaultValue}
              height="394"
              width="100%"
              getSunEditorInstance={getSunEditorInstance}
              placeholder={defaultLanguage({ text: placeholder })!}
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
              onBlur={onBlur}
              onChange={handleChange}
              onInput={handleInput}
            />
          </Suspense>
        );
      }}
    />
  );
};

export default Editor;
