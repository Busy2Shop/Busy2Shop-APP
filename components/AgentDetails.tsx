import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Platform,
} from "react-native";

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "@/assets/icons/arrow-down.svg";

import VisibilityToggleIcon from "@/components/VisibilityToggle";
import { DetailsProps } from "@/types/interfaces";

import { Link, useRouter } from "expo-router";
import tw from "twrnc";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { useCompleteProfileMutation } from "@/app/store/api/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import FeedbackBanner from "@/components/FeedbackBanner";
import ErrorModal from "@/components/ErrorModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { updateUser, setCredentials } from "@/app/store/slices/authSlice";

// Nigerian States Data
const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

// Country-State mapping
const COUNTRY_STATES: Record<string, string[]> = {
  NG: NIGERIAN_STATES,
  US: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
};

interface AgentRegistrationData {
  firstName: string;
  lastName: string;
  otherName: string;
  displayImage: string;
  dob: string; // YYYY-MM-DD format
  gender: "male" | "female";
  location: {
    country: string;
    city: string;
    address: string;
  };
  phone: {
    countryCode: string;
    number: string;
  };
  password: string;
}

const AgentDetails: React.FC<DetailsProps> = ({ href }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [otherName, setOtherName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [dateOfBirthString, setDateOfBirthString] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<Country["cca2"]>("NG");
  const [callingCode, setCallingCode] = useState<string>("234");
  const [country, setCountry] = useState<string>("Nigeria");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayImage, setDisplayImage] = useState<string>("");

  // UI state
  const [countryPickerVisible, setCountryPickerVisible] =
    useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [genderPickerVisible, setGenderPickerVisible] =
    useState<boolean>(false);
  const [cityPickerVisible, setCityPickerVisible] = useState<boolean>(false);

  // Focus states
  const [isFirstNameFocused, setIsFirstNameFocused] = useState<boolean>(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState<boolean>(false);
  const [isOtherNameFocused, setIsOtherNameFocused] = useState<boolean>(false);
  const [isDateOfBirthFocused, setIsDateOfBirthFocused] =
    useState<boolean>(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] =
    useState<boolean>(false);
  const [isAddressFocused, setIsAddressFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  // State-related states
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [citySearchQuery, setCitySearchQuery] = useState<string>("");

  // Feedback states
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<
    "success" | "error" | "info"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // Error modal states
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get auth token from Redux store
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);
  const isEmailVerified = useSelector(
    (state: RootState) => state.auth.isEmailVerified
  );
  const verificationEmail = useSelector(
    (state: RootState) => state.auth.verificationEmail
  );
  console.log("User in AgentDetails:", user);
  console.log("Auth Token in AgentDetails:", token);

  // API mutation
  const [completeProfile, { isLoading: isRegistering }] =
    useCompleteProfileMutation();

  const router = useRouter();

  // Auto-hide feedback banner after 3 seconds
  useEffect(() => {
    if (feedbackVisible) {
      const timeout = setTimeout(() => {
        setFeedbackVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [feedbackVisible]);

  // Show feedback banner
  const showFeedback = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackVisible(true);
  };

  // Show error modal
  const showError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle date change
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDateOfBirth(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      setDateOfBirthString(formattedDate);
    }
  };

  // Handle country selection and update cities
  const onSelectCountry = async (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCallingCode(selectedCountry.callingCode[0]);
    setCountry(
      typeof selectedCountry.name === "string"
        ? selectedCountry.name
        : selectedCountry.name.common || ""
    );
    setCountryPickerVisible(false);

    // Reset city when country changes
    setCity("");

    // Load cities for the new country
    await loadCitiesForCountry(selectedCountry.cca2);
  };

  // Load cities based on selected country (using states as cities for now)
  const loadCitiesForCountry = async (countryCode: string) => {
    setLoadingCities(true);

    try {
      const cities = COUNTRY_STATES[countryCode] || [];
      setAvailableCities(cities);
    } catch (error) {
      console.error("Error loading cities:", error);
      setAvailableCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  // Load initial cities on component mount
  useEffect(() => {
    loadCitiesForCountry(countryCode);
    // Set initial country name
    setCountry("Nigeria");
  }, []);

  // Filter cities based on search query
  const filteredCities = availableCities.filter((cityName) =>
    cityName.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setCityPickerVisible(false);
    setCitySearchQuery("");
  };

  const handleGenderSelect = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
    setGenderPickerVisible(false);
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!firstName.trim()) {
      showFeedback("error", "First name is required");
      return false;
    }
    if (!lastName.trim()) {
      showFeedback("error", "Last name is required");
      return false;
    }
    if (!phoneNumber.trim()) {
      showFeedback("error", "Phone number is required");
      return false;
    }
    if (!dateOfBirthString) {
      showFeedback("error", "Date of birth is required");
      return false;
    }
    if (!gender) {
      showFeedback("error", "Gender is required");
      return false;
    }
    if (!city) {
      showFeedback("error", "City is required");
      return false;
    }
    if (!address.trim()) {
      showFeedback("error", "Address is required");
      return false;
    }
    if (!password.trim()) {
      showFeedback("error", "Password is required");
      return false;
    }
    if (password.length < 8) {
      showFeedback("error", "Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Clear any previous feedback when submitting
    if (feedbackVisible) {
      setFeedbackVisible(false);
    }

    if (!validateForm()) return;

    // Check if user is authenticated
    if (!token) {
      showError(
        "Authentication Required",
        "Please log in to complete your profile"
      );
      return;
    }

    try {
      const registrationData: AgentRegistrationData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        otherName: otherName.trim(),
        displayImage: displayImage || "", // Empty string if no image
        dob: dateOfBirthString, // YYYY-MM-DD format
        gender: gender as "male" | "female",
        location: {
          country: country,
          city: city,
          address: address.trim(),
        },
        phone: {
          countryCode: `+${callingCode}`,
          number: phoneNumber.trim(),
        },
        password: password.trim(),
      };

      console.log("Registration data:", registrationData);

      const completedProfile = await completeProfile(registrationData).unwrap();

      dispatch(
        setCredentials({
          user: completedProfile,
          accessToken: token, // Use the existing verification token
          refreshToken: undefined, // May be provided by the API response if needed
        })
      );

      showFeedback("success", "Profile completed successfully! Redirecting...");

      // Navigate to document upload page after successful registration
      setTimeout(() => {
        router.push("/agent/documents");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);

      // Clear form sensitive data on error
      setPassword("");

      if (error.status === 401) {
        showError(
          "Authentication Failed",
          "Your session has expired. Please log in again."
        );
      } else if (error.status === 400) {
        const errorMsg =
          error?.data?.message ||
          "Invalid data provided. Please check your inputs.";
        showFeedback("error", errorMsg);
      } else if (error.status >= 500) {
        showError(
          "Server Error",
          "Something went wrong on our end. Please try again later."
        );
      } else {
        const errorMsg =
          error?.data?.message || "An error occurred during registration";
        showFeedback("error", errorMsg);
      }
    }
  };

  useEffect(() => {
    if (user && token && !isEmailVerified) {
      router.push("/home/dashboard/page");
    }

    // If no verification token, redirect to verification
    if (!token && !isEmailVerified) {
      router.push("/agent/signup");
    }
  }, [user, token, isEmailVerified]);

  return (
    <SafeAreaView style={tw`bg-[#F7F7F7] h-full text-[#00A082]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Feedback Banner */}
        {feedbackVisible && (
          <View style={tw`px-5 pt-2 absolute top-0 left-0 w-full`}>
            <FeedbackBanner
              type={feedbackType}
              message={feedbackMessage}
              onClose={() => setFeedbackVisible(false)}
              visible={feedbackVisible}
              autoHide={true}
              duration={3000}
            />
          </View>
        )}

        <View style={tw`w-full justify-center h-full px-5 my-6`}>
          <Text
            style={tw`text-center text-4xl  text-[#00A082] font-bold leading-10 `}
          >
            Personal Details
          </Text>

          <Text style={tw`text-center text-sm font-normal text-[#434343]`}>
            Fill in your details to continue
          </Text>

          {/* First Name */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              First Name *
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isFirstNameFocused ? "border-[#00A082]" : "border-gray-300"
              } `}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setIsFirstNameFocused(true)}
                onBlur={() => setIsFirstNameFocused(false)}
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Last Name *
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isLastNameFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setIsLastNameFocused(true)}
                onBlur={() => setIsLastNameFocused(false)}
              />
            </View>
          </View>

          {/* Other Name (Optional) */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Other Name (Optional)
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isOtherNameFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Other Name"
                value={otherName}
                onChangeText={setOtherName}
                onFocus={() => setIsOtherNameFocused(true)}
                onBlur={() => setIsOtherNameFocused(false)}
              />
            </View>
          </View>

          {/* Date of Birth with Date Picker */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Date of Birth *
            </Text>
            <TouchableOpacity
              style={tw`flex-row items-center border rounded-lg px-3 bg-white border-gray-300`}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={tw`flex-1 py-3 px-3 text-base ${
                  dateOfBirthString ? "text-black" : "text-gray-400"
                }`}
              >
                {dateOfBirthString || "Select Date of Birth"}
              </Text>
              <Dropdown />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
                maximumDate={new Date()} // Prevent future dates
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
          </View>

          {/* Gender */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Gender *
            </Text>
            <TouchableOpacity
              style={tw`flex-row items-center border rounded-lg px-3 bg-white border-gray-300`}
              onPress={() => setGenderPickerVisible(true)}
            >
              <Text
                style={tw`flex-1 py-3 px-3 text-base ${
                  gender ? "text-black" : "text-gray-400"
                }`}
              >
                {gender
                  ? gender.charAt(0).toUpperCase() + gender.slice(1)
                  : "Select Gender"}
              </Text>
              <Dropdown />
            </TouchableOpacity>
          </View>

          {/* Phone Number Section with Country Picker */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Phone Number *
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg bg-white ${
                isPhoneNumberFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TouchableOpacity
                style={tw`flex-row items-center px-3 py-3 border-r border-gray-200`}
                onPress={() => setCountryPickerVisible(true)}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  onSelect={onSelectCountry}
                  visible={countryPickerVisible}
                  onClose={() => setCountryPickerVisible(false)}
                />
                <Text style={tw` text-base text-[#434343]`}>
                  +{callingCode}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setIsPhoneNumberFocused(true)}
                onBlur={() => setIsPhoneNumberFocused(false)}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>

          {/* City */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              City *
            </Text>
            <TouchableOpacity
              style={tw`flex-row items-center border rounded-lg px-3 bg-white border-gray-300`}
              onPress={() => setCityPickerVisible(true)}
              disabled={loadingCities || availableCities.length === 0}
            >
              <Text
                style={tw`flex-1 py-3 px-3 text-base ${
                  city ? "text-black" : "text-gray-400"
                }`}
              >
                {loadingCities
                  ? "Loading cities..."
                  : city ||
                    `Select City ${
                      availableCities.length === 0
                        ? "(No cities available)"
                        : ""
                    }`}
              </Text>
              <Dropdown />
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Address *
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3  bg-white ${
                isAddressFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
                onFocus={() => setIsAddressFocused(true)}
                onBlur={() => setIsAddressFocused(false)}
                multiline
                numberOfLines={2}
              />
            </View>
          </View>

          {/* Password */}
          <View style={tw`px-3 mt-7`}>
            <Text style={tw`text-base font-medium text-[#434343] px-3`}>
              Password *
            </Text>
            <View
              style={tw`flex-row items-center border rounded-lg px-3 bg-white ${
                isPasswordFocused ? "border-[#00A082]" : "border-gray-300"
              }`}
            >
              <TextInput
                style={tw`flex-1 py-3 px-3 text-base`}
                placeholder="Password (minimum 8 characters)"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                maxLength={20}
              />
              <VisibilityToggleIcon
                visible={passwordVisible}
                onToggle={togglePasswordVisibility}
              />
            </View>
          </View>

          <View style={tw`mt-[62px] mx-3`}>
            <TouchableOpacity
              style={tw`bg-[#00A082] p-3 rounded-lg mt-7 flex-row justify-center items-center ${
                isRegistering ? "opacity-50" : ""
              }`}
              onPress={handleSubmit}
              disabled={isRegistering}
            >
              <Text style={tw`text-white text-center font-medium`}>
                {isRegistering ? "Submitting..." : "Submit"}
              </Text>
            </TouchableOpacity>
            <Text style={tw`text-center text-[#696969] mt-1 text-sm mb-10`}>
              Already have an account?{" "}
              <Link href={href} asChild>
                <Text style={tw`text-[#FF9400]`}>Login</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Gender Picker Modal */}
      <Modal
        visible={genderPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGenderPickerVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl`}>
            <View style={tw`p-4 border-b border-gray-200`}>
              <Text style={tw`text-lg font-semibold text-center`}>
                Select Gender
              </Text>
            </View>

            <TouchableOpacity
              style={tw`p-4 border-b border-gray-100`}
              onPress={() => handleGenderSelect("male")}
            >
              <Text style={tw`text-base`}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`p-4 border-b border-gray-100`}
              onPress={() => handleGenderSelect("female")}
            >
              <Text style={tw`text-base`}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`p-4 bg-gray-100`}
              onPress={() => setGenderPickerVisible(false)}
            >
              <Text style={tw`text-center font-medium`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* City Picker Modal */}
      <Modal
        visible={cityPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCityPickerVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-96`}>
            <View style={tw`p-4 border-b border-gray-200`}>
              <Text style={tw`text-lg font-semibold text-center`}>
                Select City
              </Text>
              <TextInput
                style={tw`mt-3 p-3 border border-gray-300 rounded-lg`}
                placeholder="Search cities..."
                value={citySearchQuery}
                onChangeText={setCitySearchQuery}
              />
            </View>

            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw`p-4 border-b border-gray-100`}
                  onPress={() => handleCitySelect(item)}
                >
                  <Text style={tw`text-base`}>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={tw`p-4`}>
                  <Text style={tw`text-center text-gray-500`}>
                    {citySearchQuery
                      ? "No cities found"
                      : "No cities available"}
                  </Text>
                </View>
              }
            />

            <TouchableOpacity
              style={tw`p-4 bg-gray-100`}
              onPress={() => setCityPickerVisible(false)}
            >
              <Text style={tw`text-center font-medium`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        title={errorTitle}
        message={errorMessage}
      />
    </SafeAreaView>
  );
};

export default AgentDetails;
