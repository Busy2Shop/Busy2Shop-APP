import { View, Text } from "react-native";
import React, { useState } from "react";
import DocumentUploadSection from "@/components/DocumentUploadSection";
import NinInputSection from "@/components/NinInputSection";

const Documents = () => {
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleNinSubmitSuccess = () => {
    // Move to document upload after successful NIN submission
    setShowDocumentUpload(true);
  };

  const handleNinSkip = () => {
    // Skip NIN and go directly to document upload
    setShowDocumentUpload(true);
  };

  return (
    <View className="flex-1 bg-white">
      {!showDocumentUpload ? (
        <NinInputSection
          onSubmitSuccess={handleNinSubmitSuccess}
          onSkip={handleNinSkip}
        />
      ) : (
        <DocumentUploadSection />
      )}
    </View>
  );
};

export default Documents;
