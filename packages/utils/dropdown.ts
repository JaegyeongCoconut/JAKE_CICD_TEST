export const getSelectedDropdownItem = <T>(
  dropdown: { key: string; label: T }[],
  key: string,
): { key: string; label: T } => {
  const selectedIndex = dropdown.findIndex((item) => item.key === key);

  return dropdown[selectedIndex];
};
