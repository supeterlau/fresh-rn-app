import { SafeAreaView, StyleSheet,ScrollView } from "react-native";
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams } from "expo-router";
import { useQuery } from '@apollo/client';
import { graphql } from '@/app/gql'

const filmWithVariablesQueryDocument = graphql(/* GraphQL */ `
query filmWithVariablesQueryDocument($id: ID) {
  film(id: $id) {
    ...FilmItem
  }
}
`)

export default function Screen() {
  const local = useLocalSearchParams();

  const { filmId } = local

  const { loading, error, data } = useQuery(filmWithVariablesQueryDocument, { variables: { id: filmId } })

  console.log('data:', data, loading, error)

  const film = data?.film

  const { container, main,
    title, titleHead, titleContent,
    director, directorHead, directorContent,
    releaseDate, releaseDateHead, releaseDateContent, openingCrawl, openingCrawlHead, openingCrawlContent } = styles

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

  return <SafeAreaView style={container}>
    <View style={main}>
      <View style={title}>
        <Text style={titleHead}>Film Name</Text>
        <Text style={titleContent}>{film?.title}</Text>
      </View>
      <View style={director}>
        <Text style={directorHead}>Director</Text>
        <Text style={directorContent}>{film?.director}</Text>
      </View>
      <View style={releaseDate}>
        <Text style={releaseDateHead}>Release Date</Text>
        <Text style={releaseDateContent}>{film?.releaseDate}</Text>
      </View>
      <View style={openingCrawl}>
        <Text style={openingCrawlHead}>Opening Crawl</Text>
        <ScrollView style={openingCrawl}>
          <Text style={openingCrawlContent}>{film?.openingCrawl}</Text>
        </ScrollView>

      </View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    marginHorizontal: 30,
    width: '90%',
  },
  title: {
    marginBottom: 20
  },
  titleHead: {
    fontWeight: 'bold',
    paddingLeft: 5,
    backgroundColor: '#cdb4db',
    marginBottom: 5
  },
  titleContent: {
    fontSize: 20
  },
  director: {
    marginBottom: 20
  },
  directorHead: {
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingVertical: 5,
    backgroundColor: '#ffc8dd',
    marginBottom: 5
  },
  directorContent: {
    fontSize: 20
  },
  releaseDate: {
    marginBottom: 20
  },
  releaseDateHead: {
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingVertical: 5,
    backgroundColor: '#bde0fe',
    marginBottom: 5
  },
  releaseDateContent: {
    fontSize: 20
  },
  openingCrawl: {
  },
  openingCrawlHead: {
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingVertical: 5,
    backgroundColor: '#a2d2ff',
    marginBottom: 5
  },
  openingCrawlContent: {
    color: '#264653',
    fontSize: 12,
  },
})