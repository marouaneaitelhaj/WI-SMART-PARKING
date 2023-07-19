import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Register = () => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleRegister = () => {
    axios
      .post('http://192.168.11.106:8000/api/register', {
        name: newName,
        email: newEmail,
        password: newPassword,
      })
      .then(response => {
        if (response.status === 201) {
          console.log('User registered successfully');
          // Handle successful registration
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

  return (
    <View style={styles.container}>
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
      {registrationError ? <Text style={styles.error}>{registrationError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
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
    backgroundColor: '#24aaa1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
