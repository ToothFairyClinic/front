export const lightColorStyles = {
  control: (styles: any) => ({
    ...styles,
    background: "#D9DBB3",
    color: "#333335",
    "&:focus": {
      borderColor: "#D9DBB3",
      boxShadow: "0 0 0 2px #D9DBB3",
    },
  }),
  option: (
    styles: any,
    { isDisabled, isFocused, isSelected, isDisbled }: any
  ) => {
    return {
      ...styles,
      "&:hover": {
        background: isDisabled
          ? styles.background
          : isSelected
          ? "#D9DBB3"
          : "#D9DBB3",
        color: isDisabled ? "#FBF6F2" : "#333335",
      },
      background: isSelected ? "#FBF6F2" : styles.background,
      color: isSelected ? "#333335" : "inherit",
    };
  },
  placeholder: (styles: any) => ({
    ...styles,
    color: "#333335",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#333335",
  }),
  // Додайте ці стилі для підсвітки тексту при наведенні на опцію
  menu: (styles: any) => ({
    ...styles,
    "&:hover": {
      background: "#D9DBB3",
      color: "#333335",
    },
  }),
};

export const darkColorStyles = {
  control: (styles: any) => ({
    ...styles,
    background: "#333335",
    color: "#FBF6F2",
    "&:focus": {
      borderColor: "#333335",
      boxShadow: "0 0 0 2px #333335",
    },
  }),
  option: (
    styles: any,
    { isDisabled, isFocused, isSelected, isDisbled }: any
  ) => {
    return {
      ...styles,
      "&:hover": {
        background: isDisabled
          ? styles.background
          : isSelected
          ? "white"
          : "white",
        color: isDisabled ? "#FBF6F2" : "#333335",
      },
      background: isSelected ? "#FBF6F2" : styles.background,
      color: isSelected ? "#333335" : "inherit",
    };
  },
  placeholder: (styles: any) => ({
    ...styles,
    color: "#FBF6F2",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#FBF6F2",
  }),
};
