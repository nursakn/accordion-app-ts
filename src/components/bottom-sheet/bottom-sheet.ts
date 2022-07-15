export const initSnapPoints = (
  snapPoints: (number | "auto")[],
  clientHeight?: number
) => {
  return snapPoints.map((point) => {
    if (point === "auto") {
      return clientHeight ? clientHeight : 0;
    }
    if (point > window.innerHeight) {
      return window.innerHeight;
    }
    return point;
  });
};
