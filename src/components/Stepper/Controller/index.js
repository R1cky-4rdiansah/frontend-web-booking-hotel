import React from "react";

export default function Controller({ children, currentStep }) {
  return (
      <section >
        <div className='grid grid-cols-6'>
          <div
            className={`col-span-12 flex ${
              currentStep == "completed" ? "justify-center" : "justify-between"
            } items-center`}
          >
            {children}
          </div>
        </div>
      </section>
  );
}
