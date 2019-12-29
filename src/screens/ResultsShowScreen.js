import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import yelp from '../api/yelp';

const GOOGLE_MAP_API = 'https://www.google.com/maps/search/?api=1&query';

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        response.data;
        setResult(response.data);
    };

    useEffect(() => {
        getResult(id);
    }, []);


    if (!result) {
        return null;
    }

    const makeCall = (number) => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };

    const searchQuery = `${GOOGLE_MAP_API}=${result.location.city}+${result.location.address1}+${result.name}`;
    const { display_address } = result.location;
    const { is_open_now } = result.hours[0];

    return (
        <View>
            <Text style={styles.header}>{result.name}</Text>
            <FlatList
                horizontal
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.restaurantImages} source={{ uri: item }} />
                }}
            />
            <View style={styles.container}>
                {is_open_now
                    ?
                    <Text style={[styles.isOpen, { color: 'green' }]}>Open now</Text>
                    :
                    <Text style={[styles.isOpen, { color: 'red' }]}>Closed now</Text>
                }
                <TouchableOpacity onPress={() => Linking.openURL(searchQuery)}>
                    <View style={styles.description}>
                        <Image style={styles.mapsIcon} source={require('../../assets/google-maps.png')} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text>{display_address[0]}</Text>
                            <Text>{display_address[1]}</Text>
                            <Text>{display_address[2]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => makeCall(result.phone)}>
                    <View style={styles.description}>
                        <Image style={styles.phoneIcon} source={require('../../assets/icons8-phone-64.png')} />
                        <Text style={{ alignSelf: 'center' }}>{result.phone}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    restaurantImages: {
        height: 200,
        width: 300,
        marginLeft: 10,
    },
    container: {
        marginTop: 30,
        marginHorizontal: 10,
    },
    description: {
        flexDirection: 'row',
        marginBottom: 20
    },
    mapsIcon: {
        width: 50,
        height: 50,
    },
    phoneIcon: {
        width: 45,
        height: 45,
        marginLeft: 5
    },
    isOpen: {
        textAlign: 'center',
        marginBottom: 35,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ResultsShowScreen;