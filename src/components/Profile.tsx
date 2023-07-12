









// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageStyle } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// import axios from 'axios';

// const Profile = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [gender, setGender] = useState('');
//   const [city, setCity] = useState('');
//   const [cin, setCin] = useState('');
//   const [phone, setPhone] = useState('');
//   const [registrationError, setRegistrationError] = useState('');
//   const [token, setToken] = useState('');
//   const [userId, setUserId] = useState('');
//   const [image, setImage] = useState('');
//   const [profileImage, setProfileImage] = useState('');





//   const handleLogin = () => {
//     axios
//       .post('http://192.168.11.105:8000/api/login', {
//         email: email,
//         password: password,
//       })
//       .then(response => {
//         if (response.status === 200) {
//           setUserId(response.data.user.id);
//           setLoggedIn(true);
//           setName(response.data.user.name);
//           setError('');
//           setProfileImage(response.data.user.image); // Update the profile image URL
//           console.log('User ID:', response.data.user.id);
//           console.log('image:', response.data.user.image);
//         }
//       })
//       .catch(error => {
//         if (error.response) {
//           setError(error.response.data.error || 'Invalid credentials');
//         } else {
//           setError('Login failed. Please try again.');
//         }
//       });
//   };



//   const handleRegister = () => {
//     axios.post('http://192.168.11.105:8000/api/register', {
//       name: newName,
//       email: newEmail,
//       password: newPassword,
//     })
//       .then(response => {
//         if (response.status === 201) {
//           setToken(response.data.token); // Store the token
//           console.log('Token:', response.data.token); // Log the token
//           setLoggedIn(true);
//           setName(newName);
//           setRegistrationError('');
//         }
//       })
//       .catch(error => {
//         if (error.response) {
//           setRegistrationError(error.response.data.error || 'Registration failed. Please try again.');
//         } else {
//           setRegistrationError('Registration failed. Please try again.');
//         }
//       });
//   };

//   const toggleRegistrationMode = () => {
//     setIsRegistering(prevState => !prevState);
//     setRegistrationError('');
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setName('');
//     setToken('');
//     setNewName('');
//     setNewEmail('');
//     setNewPassword('');
//     setUsername('');
//     setGender('');
//     setCity('');
//     setCin('');
//     setPhone('');
//     setImage('');
//     setRegistrationError('');
//   };
//   interface ErrorResponse {
//     response: {
//       data: {
//         message: string;
//       };
//     };
//   }

//   const handleUpdateProfile = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', newName);
//       formData.append('email', newEmail);
//       formData.append('password', newPassword);
//       formData.append('username', username);
//       formData.append('gender', gender);
//       formData.append('city', city);
//       formData.append('cin', cin);
//       formData.append('phone', phone);
//       if (image) {
//         const imageUriParts = image.split('.');
//         const imageExtension = imageUriParts[imageUriParts.length - 1];
//         const imageType = `image/${imageExtension}`;
//         formData.append('image', {
//           uri: image,
//           name: `profile.${imageExtension}`,
//           type: imageType,
//         });
//       }

//       const response = await fetch(`http://192.168.11.105:8000/api/updateProfile?userId=${userId}`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setName(newName);
//         setNewName('');
//         setNewEmail('');
//         setNewPassword('');
//         setUsername('');
//         setGender('');
//         setCity('');
//         setCin('');
//         setPhone('');
//         setImage('');
//         setRegistrationError('');
//         console.log('Profile updated successfully');
//       }
//     } catch (error) {
//       console.log('Update Profile Error:', error); // Log the error
//       if (error.response && error.response.data) {
//         const { data } = error.response;
//         if (data.errors) {
//           const errorMessages = Object.values(data.errors).flat();
//           setRegistrationError(errorMessages.join(', '));
//         } else if (data.message) {
//           setRegistrationError(data.message);
//         } else {
//           setRegistrationError('Update failed. Please try again.');
//         }
//       } else if (error.message) {
//         setRegistrationError(error.message);
//       } else {
//         setRegistrationError('Update failed. Please try again.');
//       }
//     }
//   };


//   const handleChooseImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       console.log('Permission to access camera roll is required!');
//       return;
//     }

//     const pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!pickerResult.canceled) {
//       setImage(pickerResult.assets[0].uri);
//     }
//   };


//   return (
//     <View style={styles.container}>
//       {loggedIn ? (
//         <>
//           <Text style={styles.text}>Welcome, {name}!</Text>

//           <Image
//             source={{ uri: 'https://staticg.sportskeeda.com/editor/2022/07/31987-16590245387151-1920.jpg' }}
//             style={{ width: 200, height: 200 }}
//           />

//           {/* Update Profile section */}
//           <Text style={[styles.heading, styles.editProfile]}>Edit Profile</Text>
//           <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
//             <Text style={styles.buttonText}>Choose Image</Text>
//           </TouchableOpacity>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={newName}
//             onChangeText={text => setNewName(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={newEmail}
//             onChangeText={text => setNewEmail(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={newPassword}
//             onChangeText={text => setNewPassword(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Username"
//             value={username}
//             onChangeText={text => setUsername(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Gender"
//             value={gender}
//             onChangeText={text => setGender(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="City"
//             value={city}
//             onChangeText={text => setCity(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="CIN"
//             value={cin}
//             onChangeText={text => setCin(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Phone"
//             value={phone}
//             onChangeText={text => setPhone(text)}
//           />

//           {registrationError ? (
//             <Text style={styles.error}>{registrationError}</Text>
//           ) : null}
//           <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//             <Text style={styles.buttonText}>Update Profile</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleLogout}>
//             <Text style={styles.buttonText}>Logout</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           {error ? <Text style={styles.error}>{error}</Text> : null}
//           {isRegistering ? (
//             <>
//               <Text style={styles.heading}>Register</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Name"
//                 onChangeText={text => setNewName(text)}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 onChangeText={text => setNewEmail(text)}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 onChangeText={text => setNewPassword(text)}
//               />

//               {registrationError ? (
//                 <Text style={styles.error}>{registrationError}</Text>
//               ) : null}
//               <TouchableOpacity style={styles.button} onPress={handleRegister}>
//                 <Text style={styles.buttonText}>Register</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.toggleButton}
//                 onPress={toggleRegistrationMode}
//               >
//                 <Text style={styles.toggleButtonText}>Already have an account? Login</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <Text style={styles.heading}>Login</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 onChangeText={text => setEmail(text)}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 onChangeText={text => setPassword(text)}
//               />
//               <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                 <Text style={styles.buttonText}>Login</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.toggleButton}
//                 onPress={toggleRegistrationMode}
//               >
//                 <Text style={styles.toggleButtonText}>Don't have an account? Register</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#24aaa1',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   toggleButton: {
//     marginTop: 20,
//   },
//   toggleButtonText: {
//     color: 'black',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   editProfile: {

//     fontWeight: 'bold',
//     fontSize: 23,
//     color: 'black',
//     margin: 2,
//   },

//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
// });

// export default Profile;






























import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/store"; // Import the setToken action


import axios from 'axios';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  // const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const token = useSelector((state: { token: string | null }) => state.token);
  const dispatch = useDispatch();







  const handleLogin = () => {
    axios
      .post('http://192.168.11.105:8000/api/login', {
        email: email,
        password: password,
      })
      .then(response => {
        if (response.status === 200) {
          setUserId(response.data.user.id);
          setLoggedIn(true);
          setName(response.data.user.name);
          setError('');
          setProfileImage(response.data.user.image); // Update the profile image URL
          console.log('User ID:', response.data.user.id);
          console.log('image:', response.data.user.image);
        }
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.error || 'Invalid credentials');
        } else {
          setError('Login failed. Please try again.');
        }
      });
  };



  const handleRegister = () => {
    axios.post('http://192.168.11.105:8000/api/register', {
      name: newName,
      email: newEmail,
      password: newPassword,
    })
     .then(response => {
        if (response.status === 201) {
          setToken(response.data.token); // Store the token
          console.log('Token:', response.data.token); // Log the token
          setLoggedIn(true);
          setName(newName);
          setRegistrationError('');
          dispatch(setToken(response.data.token)); // Dispatch the token to the Redux store
          AsyncStorage.setItem('token', response.data.token); // Store the token in AsyncStorage
        }
      })
     .catch(error => {
        if (error.response) {
          setRegistrationError(error.response.data.error || 'Registration failed. Please try again.');
        } else {
          setRegistrationError('Registration failed. Please try again.');
        }
      });
  };
  const toggleRegistrationMode = () => {
    setIsRegistering(prevState => !prevState);
    setRegistrationError('');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setName('');
    setToken('');
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setUsername('');
    setGender('');
    setCity('');
    setCin('');
    setPhone('');
    setImage('');
    setRegistrationError('');
  };
  interface ErrorResponse {
    response: {
      data: {
        message: string;
      };
    };
  }

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('email', newEmail);
      formData.append('password', newPassword);
      formData.append('username', username);
      formData.append('gender', gender);
      formData.append('city', city);
      formData.append('cin', cin);
      formData.append('phone', phone);
      if (image) {
        const imageUriParts = image.split('.');
        const imageExtension = imageUriParts[imageUriParts.length - 1];
        const imageType = `image/${imageExtension}`;
        formData.append('image', {
          uri: image,
          name: `profile.${imageExtension}`,
          type: imageType,
        });
      }

      const response = await fetch(`http://192.168.11.105:8000/api/updateProfile?userId=${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setName(newName);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setUsername('');
        setGender('');
        setCity('');
        setCin('');
        setPhone('');
        setImage('');
        setRegistrationError('');
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.log('Update Profile Error:', error); // Log the error
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setRegistrationError(errorMessages.join(', '));
        } else if (data.message) {
          setRegistrationError(data.message);
        } else {
          setRegistrationError('Update failed. Please try again.');
        }
      } else if (error.message) {
        setRegistrationError(error.message);
      } else {
        setRegistrationError('Update failed. Please try again.');
      }
    }
  };


  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
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


  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <Text style={styles.text}>Welcome, {name}!</Text>

          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />

          {/* Update Profile section */}
          <Text style={[styles.heading, styles.editProfile]}>Edit Profile</Text>
          <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newName}
            onChangeText={text => setNewName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmail}
            onChangeText={text => setNewEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={text => setGender(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={text => setCity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CIN"
            value={cin}
            onChangeText={text => setCin(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={text => setPhone(text)}
          />

          {registrationError ? (
            <Text style={styles.error}>{registrationError}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {isRegistering ? (
            <>
              {/* <Text style={styles.heading}>Register</Text> */}
              
              <Image
                source={{ uri: 'https://vectorportal.com/storage/parking(3).jpg' }}
                style={{ width: 200, height: 130, margin: 10 }}
                />
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setNewName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setNewEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setNewPassword(text)}
              />

              {registrationError ? (
                <Text style={styles.error}>{registrationError}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleRegistrationMode}
              >
                <Text style={styles.toggleButtonText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
                {/* <Text style={styles.heading}>Login</Text> */}

                <Image
                source={{ uri: 'https://vectorportal.com/storage/parking(3).jpg' }}
                style={{ width: 200, height: 130, margin: 10 }}
                />
                                {/* <Image
                source={{ uri: 'https://www.ajax.ca/en/resources/news/OccasionalParking_News.jpg' }}
                style={{ width: 220, height: 130, margin: 10 }}
                /> */}
                
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleRegistrationMode}
              >
                <Text style={styles.toggleButtonText}>Don't have an account? Register</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#24aaa1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#24aaa1',
  },
  error: {
    color: 'ed',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  editProfile: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#24aaa1',
    margin: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'ed',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  chooseImageButton: {
    backgroundColor: '#24aaa1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  chooseImageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default Profile;


































