import { FlatList, StyleSheet } from 'react-native';

import { View, Text } from '@/components/Themed';
import { useQuery, gql } from '@apollo/client';
import { graphql, FragmentType } from '@/app/gql'

import Film, {FilmFragment} from '@/components/Film';

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          ...FilmItem
        }
      }
    }
  }
`)

export default function TabOneScreen() {
  const { loading, error, data } = useQuery(allFilmsWithVariablesQueryDocument, { variables: { first: 5 } })
  // const { loading, error, data } = {loading: false, error: false, data: []}

  console.log('[(film) index.tsx] data:', data, loading, error)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading ...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error : {error.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data?.allFilms?.edges}
        style={{ backgroundColor: '#E6EEF7', width: "100%",paddingTop: 10 }}
        keyExtractor={() => Math.random()+''}
        renderItem={({item, index}) => (
          <Film film={item?.node as FragmentType<typeof FilmFragment>} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
