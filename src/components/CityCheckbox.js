import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, CheckBox } from 'react-native';
const CityCheckbox = ({ city }) => {
    const [checked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>{city}</Text>
            <CheckBox
                value={checked}
                onValueChange={() => setChecked(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginVertical: 5
    },
    cityName: {
        alignSelf: 'center'
    }
});

export default CityCheckbox;