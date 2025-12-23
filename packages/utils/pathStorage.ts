const pathStorage = {
  getPath: (defaultPath: string): string =>
    localStorage.getItem("sign_in_redirect") ?? defaultPath,
  setPath: (path: string): void => {
    localStorage.setItem("sign_in_redirect", path);
  },
};

export default pathStorage;
