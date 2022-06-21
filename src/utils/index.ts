'use strict'

import { BaseReults, CharacterResult, EpisodeResult, GetResources, PopulatedEpisodesAndCharacters } from '../interfaces/commonApi'
import customAxios from '../services/customAxios'

 /**
  * @param baseUrl
  * @param numPage
  * @returns build url with baseUrl and numPage
  */
const endpointBuilder = (baseUrl :string, numPage :number) :string => {
  return `${baseUrl}?page=${numPage}`
}
 /**
  * @param url
  * @returns Array with resources
  */
const getResources = async (url :string) :Promise<GetResources> => {
  const { info, results } = await customAxios(url)
  return { info, results }
}
 /**
  * @param query
  * @returns Array with all results of pages
  */
export const getAllData = async (query :string) :Promise<GetResources[]>=> {
  const baseUrl = process.env.RICK_AND_MORTY_API + query
  const firstResponse = await getResources(baseUrl)

  const arrayPages = Array.from(Array(firstResponse.info.pages).keys())

  const promisesArray :  Promise<GetResources>[] = arrayPages.map(async (__,i) => {
   return getResources(endpointBuilder(baseUrl, i))
  })

  const secondResponse = await Promise.all(promisesArray)

  return [ firstResponse, ...secondResponse]
}
 /**
  * @param { String} string
  * @param { String } regExp
  * @returns { Number } concurrency number
  */
export const charCounter = (string :string, expresion :RegExp) :number => {
  const concurrences = string.match(expresion)
  return concurrences.length
}
 /**
  * @param resource
  * @returns String with all names of pages
  */
export const stringNames = (resource :GetResources[]) :string => {
  return resource
    .flatMap((item:GetResources) => item.results)
    .map((result:BaseReults) => result.name)
    .toString()
}
/**
 * @param  time
 * @returns time formated example 2s 34ms
 */
export const formatTime = (time :number) :string => {
 const value = time.toString()
  return `${value.charAt(0)}s ${value.charAt(1)}${value.charAt(2)}ms`
}
/**
 * @param  episodes
 * @param characters
 * @returns array with name, episode and character fields
 */
export const populateEpisodesAndCharacters = (episodes :EpisodeResult[], characters :CharacterResult[]) :PopulatedEpisodesAndCharacters[] => {
  episodes.forEach((episode) => {
    let setOriginNames = new Set(
      episode.characters
        .map((character:string) => characters.find((item) => item.id === Number(character.split('/').pop())))
        .map((item) => item?.origin?.name || null)
    )
    episode.characters = Array.from(setOriginNames)

    return episode
  })

  const episodesArray :PopulatedEpisodesAndCharacters[] = episodes.map((item ) => ({ name: item.name, episode: item.episode, characters: item.characters }))

  return episodesArray
}
