import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function Personajes() {
  const route = useRoute();
  const { id } = route.params;
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => console.log('Error al obtener personaje:', error));
  }, [id]);

  useEffect(() => {
    if (character) {
      const episodePromises = character.episode.map((episodeUrl) => fetch(episodeUrl).then((res) => res.json()));

      // Ejecuta todas las promesas para obtener los datos de cada episodio
      Promise.all(episodePromises)
        .then((episodesData) => {
          setEpisodes(episodesData);
        })
        .catch((error) => console.log('Error al obtener episodios:', error));
    }
  }, [character]);

  return (
    <View style={styles.container}>
      {character && (
        <>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.title}>{character.name}</Text>
          <Text style={styles.text}>Especie: {character.species}</Text>
          <Text style={styles.text}>Género: {character.gender}</Text>
          <Text style={styles.text}>Origen: {character.origin.name}</Text>

          <Text style={styles.episodeTitle}>Episodios:</Text>
          <FlatList
            data={episodes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.episodeContainer}>
                <Text style={styles.episodeText}>Episodio: {item.name}</Text>
                <Text style={styles.episodeText}>Fecha: {item.air_date}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#a6bddc',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  episodeTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  episodeContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  episodeText: {
    fontSize: 16,
  },
});
