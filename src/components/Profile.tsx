
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
  const [newPassword, setNewPassword] = useState(''); // New state for registration
  const [registrationError, setRegistrationError] = useState('');

  const handleLogin = () => {
    axios.post('http://192.168.1.101:8000/api/login', {
      email: email,
      password: password,
    })
      .then(response => {
        if (response.status === 200) {
          setLoggedIn(true);
          setName(response.data.user.name);
          setError('');
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
    axios.post('http://192.168.1.101:8000/api/register', {
      name: newName,
      email: newEmail,
      password: newPassword,
    })
      .then(response => {
        if (response.status === 201) {
          setLoggedIn(true);
          setName(newName);
          setRegistrationError('');
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
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <Text style={styles.text}>Welcome, {name}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {isRegistering ? (
            <>
              <Text style={styles.heading}>Register</Text>
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
              <Text style={styles.heading}>Login</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Profile;
