import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
export default function InformationCard(props: any) {
    if (props.visible === false) {
        return null;
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Button  title="Book Now"  onPress={() => {}}  color={'#24aaa1'}/>
        </View>
    )
}
// Styling
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,   
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
});