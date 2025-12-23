interface FileDimensionsProps {
  hasMinimum: boolean;
  file: File;
  standardHeight: number;
  standardWidth: number;
}

type ValidateFileDimensionsType = "valid" | "sizeError" | "ratioError" | false;

interface CheckDimensionsProps {
  hasMinimum: boolean;
  height: number;
  width: number;
  standardHeight: number;
  standardWidth: number;
}

export const checkDimensions = ({
  width,
  height,
  hasMinimum,
  standardWidth,
  standardHeight,
}: CheckDimensionsProps): ValidateFileDimensionsType => {
  if (isNaN(width) || isNaN(height)) return "sizeError";

  if (hasMinimum) {
    const minRatio = standardWidth / standardHeight;
    const actualRatio = width / height;
    const hasSizeError = width < standardWidth || height < standardHeight;
    //NOTE: 부동 소수점 문제 예방을 위한 조건문
    const hasRadioError = Math.abs(actualRatio - minRatio) > 0.01;

    if (hasSizeError) return "sizeError";
    if (hasRadioError) return "ratioError";

    return "valid";
  } else {
    return width === standardWidth && height === standardHeight
      ? "valid"
      : "sizeError";
  }
};

export const validateSVGFileDimensions = async ({
  file,
  hasMinimum,
  standardWidth,
  standardHeight,
}: FileDimensionsProps): Promise<ValidateFileDimensionsType> => {
  try {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) return "sizeError";

    let width = parseFloat(svg.getAttribute("width") || "");
    let height = parseFloat(svg.getAttribute("height") || "");

    if (isNaN(width) || isNaN(height)) {
      const viewBox = svg.getAttribute("viewBox");
      if (viewBox) {
        const [, , viewBoxWidth, viewBoxHeight] = viewBox
          .split(" ")
          .map(Number);
        width = viewBoxWidth;
        height = viewBoxHeight;
      }
    }

    return checkDimensions({
      width,
      height,
      hasMinimum,
      standardWidth,
      standardHeight,
    });
  } catch (err) {
    console.error("SVG 파싱 실패", err);
    return false;
  }
};

export const validateImageFileDimensions = ({
  file,
  hasMinimum,
  standardWidth,
  standardHeight,
}: FileDimensionsProps): Promise<ValidateFileDimensionsType> =>
  new Promise((resolve) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);
    img.src = objectURL;

    img.onload = () => {
      URL.revokeObjectURL(objectURL);
      resolve(
        checkDimensions({
          width: img.width,
          height: img.height,
          hasMinimum,
          standardWidth,
          standardHeight,
        }),
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      resolve(false);
    };
  });
