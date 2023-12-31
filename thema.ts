export const thema = {
  colors: {
    pink: "#c33c81",
    pinkOpacidy: "rgba(195, 60, 129, 0.6)",
    white: "#ffffff",
    violeta: "#ee82ee",
    blue: "#1b98e0",
    red:'#FF0000',
  },
};

export function colorChold(data: boolean | string | undefined) {
  if (data === true || data === "true") {
    return thema.colors.blue;
  } else {
    return thema.colors.violeta;
  }
}
