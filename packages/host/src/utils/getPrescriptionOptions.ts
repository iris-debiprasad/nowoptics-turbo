export const getPrescriptionOptionsArray = (
  minValue: number,
  maxValue: number,
  interval: number,
  prescision: number
) => {
  const options = [];
  for (let i = minValue; i <= maxValue; i += interval) {
    const option = i.toFixed(prescision);
    options.push(option);
  }
  return options;
};
