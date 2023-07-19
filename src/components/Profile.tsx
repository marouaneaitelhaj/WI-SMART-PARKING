import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/store";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
// import DropDownPicker from 'react-native-dropdown-picker';

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [cin, setCin] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const token = useSelector((state: { token: string | null }) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        setToken(token);
        setLoggedIn(true);
        axios
          .get("http://192.168.11.106:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUsername(response.data.name);
            // setName(response.data.name);
            setEmail(response.data.email);
          }).catch((error) => {
            console.log("User Error:", error);
          });
      }
    });
  }, [loggedIn, token]);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("http://192.168.11.106:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userId", response.data.user.id.toString());
        if (response.status === 200) {
          setUserId(response.data.user.id);
          setLoggedIn(true);
          setName(response.data.user.name);
          setError("");
          setProfileImage(response.data.user.image); // Update the profile image URL
          console.log("User ID:", response.data.user.id);
          console.log("image:", response.data.user.image);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error || "Invalid credentials");
        } else {
          setError("Login failed. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegister = () => {
    setLoading(true);
    axios
      .post("http://192.168.11.106:8000/api/register", {
        name: newName,
        email: newEmail,
        password: newPassword,
      })
      .then((response) => {
        if (response.status === 201) {
          setToken(response.data.token); // Store the token
          console.log("Token:", response.data.token); // Log the token
          setLoggedIn(true);
          setName(newName);
          setRegistrationError("");
          dispatch(setToken(response.data.token)); // Dispatch the token to the Redux store
          AsyncStorage.setItem("token", response.data.token); // Store the token in AsyncStorage
        }
      })
      .catch((error) => {
        console.log("Registration Error:", error); // Log the error
        if (error.response) {
          setRegistrationError(
            error.response.data.error ||
              "Registration failed. Please try again."
          );
        } else {
          setRegistrationError("Registration failed. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleRegistrationMode = () => {
    setIsRegistering((prevState) => !prevState);
    setRegistrationError("");
  };

  const handleLogout = () => {
    setLoading(true);
    setLoggedIn(false);
    setName("");
    setToken("");
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setUsername("");
    setGender("");
    setCity("");
    setCin("");
    setPhone("");
    setImage("");
    setRegistrationError("");
    setLoading(false);
    AsyncStorage.removeItem("token");
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("email", newEmail);
      formData.append("password", newPassword);
      formData.append("username", username);
      formData.append("gender", gender);
      formData.append("city", city);
      formData.append("cin", cin);
      formData.append("phone", phone);
      if (image) {
        const imageUriParts = image.split(".");
        const imageExtension = imageUriParts[imageUriParts.length - 1];
        const imageType = `image/${imageExtension}`;
        formData.append("image", {
          uri: image,
          name: `profile.${imageExtension}`,
          type: imageType,
        });
      }

      const response = await fetch(
        `http://192.168.11.106:8000/api/updateProfile?userId=${userId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setName(newName);
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setUsername("");
        setGender("");
        setCity("");
        setCin("");
        setPhone("");
        setImage("");
        setRegistrationError("");
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.log("Update Profile Error:", error); // Log the error
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setRegistrationError(errorMessages.join(", "));
        } else if (data.message) {
          setRegistrationError(data.message);
        } else {
          setRegistrationError("Update failed. Please try again.");
        }
      } else if (error.message) {
        setRegistrationError(error.message);
      } else {
        setRegistrationError("Update failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };
  const GenderSelect = () => {
    const [gender, setGender] = useState("");
  };
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <AntDesign name="logout" size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>Welcome, {name}!</Text>
          {image && (
            <Image source={{ uri: image }} style={styles.profileImage} />
          )}

          {/* Update Profile section */}
          <Text style={[styles.heading, styles.editProfile]}>Edit Profile</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChooseImage}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newName}
            onChangeText={(text) => setNewName(text)}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            editable={!loading}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={text => setGender(text)}
            editable={!loading}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="CIN"
            value={cin}
            onChangeText={(text) => setCin(text)}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            editable={!loading}
          />

          <Picker
            style={styles.input2}
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Home" value="home" />
            <Picker.Item label="Famme" value="famme" />
          </Picker>

          {registrationError ? (
            <Text style={styles.error}>{registrationError}</Text>
          ) : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button2}
              onPress={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update Profile</Text>
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button2} onPress={handleLogout} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Logout</Text>
            )}
          </TouchableOpacity> */}
          </View>
        </>
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {isRegistering ? (
            <>
              <Image
                source={{
                  uri: "https://vectorportal.com/storage/parking(3).jpg",
                }}
                style={{ width: 200, height: 130, margin: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setNewName(text)}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setNewEmail(text)}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setNewPassword(text)}
                editable={!loading}
              />

              {registrationError ? (
                <Text style={styles.error}>{registrationError}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleRegistrationMode}
              >
                <Text style={styles.toggleButtonText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: "https://vectorportal.com/storage/parking(3).jpg",
                }}
                style={{ width: 200, height: 130, margin: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleRegistrationMode}
              >
                <Text style={styles.toggleButtonText}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#24aaa1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: "#24aaa1",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  editProfile: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#24aaa1",
    margin: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button2: {
    height: 40,
    backgroundColor: "#24aaa1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
  },
  logoutButton: {
    position: "absolute",
    top: -0,
    right: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#24aaa1",
  },
  input2: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
