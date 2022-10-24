import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  //1. menampung data dari api
  const [data, setData] = useState([]);

  //2. fungsi untuk ambil data dengan get
  const getDataFromApiAsync = async () => {
    try {
      let response = await fetch('https://reqres.in/api/users?page=1');
      let json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  //otomatis dijalankan
  useEffect(() => {
    getDataFromApiAsync();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 5,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 500 / 2 }}
            source={{
              uri: item.avatar,
            }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text>{item.first_name}</Text>
            <Text>{item.last_name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Data dari API</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
