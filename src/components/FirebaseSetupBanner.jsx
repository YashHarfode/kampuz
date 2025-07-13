import React from "react";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function FirebaseSetupBanner({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            Firebase Setup Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              You're currently viewing demo data. To use the full application
              features (upload notes, post items, create events), Firebase
              Firestore rules need to be deployed.
            </p>
            <p className="mt-2">
              <strong>Admin:</strong> Please check{" "}
              <code className="bg-yellow-100 px-1 rounded">
                FIREBASE_SETUP.md
              </code>{" "}
              for deployment instructions.
            </p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-400 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
