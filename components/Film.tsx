import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { graphql, FragmentType, useFragment } from '@/app/gql';
import {
  TypedDocumentNode,
} from "@graphql-typed-document-node/core";
import {router} from 'expo-router'

export const FilmFragment = graphql(/* GraphQL */ `
  fragment FilmItem on Film {
    id
    episodeID
    title
    releaseDate
    producers
    director
    openingCrawl
  }
`) as TypedDocumentNode

const Film = (props: {
  /* `film` property has the correct type 🎉 */
  film: FragmentType<typeof FilmFragment>
}) => {
  const film = useFragment(FilmFragment, props.film)

  const {container, card, title, titleContainer,releaseDate,releaseDateContainer} = styles

  const showDetail = (film: any) => router.navigate({
    pathname: './detail',
    params: {filmId: film.id}
  })

  return (
    <View style={container}>
      <TouchableOpacity style={card} onPress={()=>showDetail(film)}>
        <View style={titleContainer}>
          <Text style={title}>{film.title}</Text>
        </View>
        <View style={releaseDateContainer}>
          <Text style={releaseDate}>{film.releaseDate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EEF7',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    // marginLeft: '0%',
    width: '96%',
    height: 150,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 10,
    borderRadius: 10,
    padding: 10,
  },
  titleContainer: {
    backgroundColor: '#e9edc9',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5
  },
  releaseDateContainer: {
    backgroundColor: '#fdf0d5'
  },
  releaseDate: {},
})

export default Film