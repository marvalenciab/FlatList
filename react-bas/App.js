import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  // Función para llamar a la API
  const urlbase = 'https://rickandmortyapi.com/api/character';
  const getCharacters = () => {
    fetch(urlbase)
      .then((response) => {
        console.log('Response:', response); // Verifica la respuesta
        return response.json();
      })
      .then((dataApi) => {
        console.log('Data API:', dataApi); // Verifica los datos
        setData(dataApi.results); // Guarda los datos de 'results'
      })
      .catch((error) => console.log('Error:', error)); // Muestra el error por si hay alguno
  };

  return (
    <View style={styles.container}>
      <Button onPress={getCharacters} title='Llamar API' color='#5379a4' />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          console.log('Image URI:', item.image),
          (
            <TouchableHighlight key={item.id}>
              <View style={styles.containerBooks}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.name}</Text>
                <Text>{item.species}</Text>
              </View>
            </TouchableHighlight>
          )
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a6bddc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBooks: {
    width: 170,
    height: 200,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: 150,
    height: 140,
  },
});

//contr+k+c comentar, contr+k+u descomentar
