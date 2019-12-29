import React from 'react';
import { View, Text, StyleSheet, FlatList, Tou } from 'react-native';
import CityCheckbox from './CityCheckbox';

const cities = ["Warsaw", "Cracow", "Wrocław", "Katowice", "Gdańsk"]

const CityList = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={cities}
                keyExtractor={(cities) => cities}
                renderItem={({ item }) => {
                    return (
                        <CityCheckbox city={item} />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    city: {
        marginLeft: 5
    }
});

export default CityList;