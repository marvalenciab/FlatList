import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default function Home() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
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

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          console.log('Image URI:', item.image),
          (
            <TouchableHighlight key={item.id}>
              <View style={styles.containerBooks}>
                <Text style={styles.text}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Personajes', { id: item.id })}
                >
                  <Text>Conocer</Text>
                </TouchableOpacity>
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
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 28,
    padding: 5,
  },
  image: {
    width: 80,
    height: 80,
    margin: 20,
  },
  button: {
    backgroundColor: '#4a9ae9',
    margin: 10,
  },
});

//contr+k+c comentar, contr+k+u descomentar
