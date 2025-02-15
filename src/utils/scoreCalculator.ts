export const calculateScore = (E: number, U: number, T: number, L: number) => {
  // estimated max values
  const maxE = 20;
  const maxT = 1200; // 20 minutes
  const maxL = 200;
  const maxU = 26;

  // parameter weights
  const wE = 10;
  const wU = 2;
  const wL = 0.01;
  const wT = 0.00001;

  const secondsT = T / 1000;

  // adjust max values if inputs exceed initial parameters
  const adjustedMaxE = Math.max(maxE, E);
  const adjustedMaxL = Math.max(maxL, L);
  const adjustedMaxT = Math.max(maxT, secondsT);

  // normalize the parameters to be in the range [0, 1]
  const normalizedL = L / adjustedMaxL;
  const normalizedU = U / maxU;
  const normalizedE = 1 - Math.min(1, E / adjustedMaxE);
  const normalizedT = 1 - Math.min(1, secondsT / adjustedMaxT);

  const computedScore =
    wL * normalizedL + wU * normalizedU + wE * normalizedE + wT * normalizedT;
  const maxPossibleScore = wL * 1 + wU * 1 + wE * 1 + wT * 1;

  // Scale the score to be between 0 and 100
  const scaledScore = Math.max(0.1, (computedScore / maxPossibleScore) * 100);

  return scaledScore;
};
