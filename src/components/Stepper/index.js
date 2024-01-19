import React, { useState } from "react";
import propTypes from "prop-types";

export default function Stepper({ data, initialStep, steps, children }) {
  const stepKeys = Object.keys(steps);
  const [currentStep, setCurrentStep] = useState(
    stepKeys.indexOf(initialStep) > -1 ? initialStep : stepKeys[0]
  );
  const totalLength = stepKeys.length;
  const indexStep = stepKeys.indexOf(currentStep);

  const prevStep = () => {
    if (indexStep > 0) setCurrentStep(stepKeys[indexStep - 1]);
  };

  const nextStep = () => {
    if (indexStep < totalLength) setCurrentStep(stepKeys[indexStep + 1]);
  };

  return (
    <div className="mt-[80px] mb-4">
      {children(prevStep, nextStep, currentStep, steps)}
    </div>
  );
}

Stepper.propTypes = {
  // data: propTypes.object.isRequired,
  initialStep: propTypes.number,
};
