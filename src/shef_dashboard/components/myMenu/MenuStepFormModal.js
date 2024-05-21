import React from 'react';
import Modal from 'react-modal';
const MenuStepFormModal = ({ isOpen, onClose, steps, currentStep, setCurrentStep, onNext, onBack }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="MultiStepFormModal"
      >
        <div className='flex flex-col justify-between h-full'>
          <div className=''>
            <div className='sticky top-0 bg-white flex justify-between items-center gap-4 border-b border-borderClr p-4 z-10'>
              <h2 className='font-bold uppercase text-2xl mb-0'>{steps[currentStep].title}</h2>
              <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              </button>
            </div>
            <div className="flex lg:flex-nowrap flex-wrap items-center md:justify-center justify-start lg:gap-6 gap-3 stepFormTitles py-4 mb-8 bg-grayBg">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 stepFormTitle mx-4 ${index === currentStep ? 'active' : ''}`}
                // onClick={() => setCurrentStep(index)}
                >
                  {step.title}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
                    <path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"></path>
                  </svg>
                </div>
              ))}
            </div>
            <div className='p-4'>
              {steps[currentStep].content}
            </div>
          </div>
          <div className='sticky bottom-0 bg-white border-t'>
            <div className='flex justify-between items-center gap-4 p-4'>

              {currentStep > 0 && (
                <button className='shefBtnBorder' onClick={onBack}>Back</button>
              )}

              {currentStep < steps.length - 1 && (
                <div className='flex justify-between items-center w-full'>
                  <button className=''></button>
                  <button className='text-lg font-bold bg-primaryDark px-[22px] py-[6px] uppercase text-white rounded-[6px]' onClick={onNext}>Next</button>
                </div>

              )}

              {currentStep === steps.length - 1 && (
                <button className='text-lg font-bold bg-primaryDark px-[22px] py-[6px] uppercase text-white rounded-[6px]' onClick={onClose}>Finish</button>
              )}
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default MenuStepFormModal;
