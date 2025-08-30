import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { useModalStore } from "../store/store";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

function SignUpModal() {
  const { modalType, openModal, closeModal } = useModalStore();
  const { t } = useTranslation();

  if (modalType !== "signup") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-gray-950 dark:text-white">
      <div className="relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold z-10"
        >
          &times;
        </button>
        <div className="flex items-center justify-center">
          <SignUp 
            afterSignUpUrl="/mybookings?signup=success"
            routing="virtual"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                card: 'shadow-none border-none',
                headerTitle: 'text-2xl font-semibold text-neutral-800',
                formFieldInput: 'border border-gray-300 rounded-lg focus:ring-blue-400',
                footerActionLink: 'text-blue-600 hover:text-blue-700',
                socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50'
              },
              layout: {
                socialButtonsPlacement: 'top'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
