const babelConfig = {
  plugins: [
    [
      "@emotion/babel-plugin", // DESC: Emotion의 Babel 플러그인. 개발자 경험(DX) 개선을 위해 사용
      {
        autoLabel: "dev-only", // DESC: 개발 환경(dev)에서만 자동 라벨링 활성화
        labelFormat: "[filename]-[local]", // DESC: className 라벨 형식 지정
      },
    ],
  ],
};

export default babelConfig;
