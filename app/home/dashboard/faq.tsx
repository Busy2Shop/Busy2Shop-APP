import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { ChevronRight, ChevronDown } from "react-native-feather";
import LeftArrowIcon from "@/assets/icons/arrow-left.svg";
import { useRouter } from "expo-router";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      question: "What Is BUSY2SHOP About?",
      answer:
        "BUSY2SHOP is a logistics app that connects customers with reliable logistics services for door-to-door delivery.",
    },
    {
      question: "How do I track my shipment?",
      answer:
        'To book a shipment, simply log into your account, click on "Book a Shipment," and follow the prompts to enter your pickup and delivery details.',
    },
    {
      question: "What are your delivery hours?",
      answer:
        "Our standard delivery hours are Monday to Sunday, 9am to 5pm. However, we also offer express and overnight delivery options.",
    },
    {
      question: "Can I change my pickup or delivery address?",
      answer:
        "Yes, you can change your pickup or delivery address by logging into your account and editing your shipment details.",
    },
    {
      question: "Can I have multiple accounts?",
      answer:
        "No, each user can only have one account. However, you can add multiple shipping addresses and recipients to your account.",
    },
  ];

  const toggleExpand = (index: React.SetStateAction<number>) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <View style={tw`flex-1 bg-white p-4 pt-14`}>
      <View style={tw`flex-row items-center mb-6`}>
        <TouchableOpacity onPress={handleGoBack}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-semibold text-gray-800 ml-2`}>FAQs</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-4 border-b border-gray-200 pb-4`}>
            <TouchableOpacity
              onPress={() => toggleExpand(index)}
              style={tw`flex-row items-center justify-between`}
            >
              <View style={tw`flex-row items-center flex-1`}>
                <Text style={tw`text-gray-500 mr-2`}>•</Text>
                <Text style={tw`text-[#2A2A2A] font-medium text-base flex-1`}>
                  {faq.question}
                </Text>
              </View>
              {expandedIndex === index ? (
                <ChevronDown stroke="#10b981" width={20} height={20} />
              ) : (
                <ChevronRight stroke="#10b981" width={20} height={20} />
              )}
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={tw`mt-3 ml-6`}>
                <Text style={tw`text-[#5D5D5D] leading-5`}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQ;
