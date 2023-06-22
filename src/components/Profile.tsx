// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// const Profile = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = () => {
//         fetch('http://192.168.11.108:8000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.redirect) {
//                     // Redirect to the desired page after successful login
//                     setLoggedIn(true);
//                     setName(data.name); // Assuming the response includes the user's name
//                     setError('');
//                 } else if (data.error) {
//                     // Handle error response
//                     setError(data.error);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     };

//     return (
//         <View style={styles.container}>
//             {loggedIn ? (
//                 <Text style={styles.text}>Welcome, {name}!</Text>
//             ) : (
//                 <>
//                     {error ? <Text style={styles.error}>{error}</Text> : null}
//                     <Text style={styles.text}>Login</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         onChangeText={text => setEmail(text)}
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         secureTextEntry
//                         onChangeText={text => setPassword(text)}
//                     />
//                     <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: {
//         width: '80%',
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     button: {
//         backgroundColor: 'blue',
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     error: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });

// export default Profile;










import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        fetch('http://192.168.11.108:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    // Redirect to the desired page after successful login
                    setLoggedIn(true);
                    setName(data.name); // Assuming the response includes the user's name
                    setError('');
                } else if (data.error) {
                    // Handle error response
                    setError(data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            {loggedIn ? (
                <Text style={styles.text}>Welcome, {name}!</Text>
            ) : (
                <>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
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
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#3c8dbc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Profile;
