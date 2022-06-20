'use strict'

import { CharacterResult, EpisodeResult, GetResources, PopulatedEpisodesAndCharacters } from '../interfaces/commonApi'
import customAxios from '../services/customAxios'

const endpointBuilder = (baseUrl :string, numPage :number) :string => {
  return `${baseUrl}?page=${numPage}`
}
const getResources = async (url :string) :Promise<GetResources> => {
  const { info, results } = await customAxios(url)
  return { info, results }
}
export const getAllData = async (query :string) :Promise<GetResources[]>=> {
  const baseUrl = process.env.RICK_AND_MORTY_API + query
  const firstResponse = await getResources(baseUrl)
  const promises :  Promise<GetResources>[]  = []

  const arrayPages = Array.from(Array(firstResponse.info.pages).keys())

  arrayPages.forEach(async (i) => {
    promises.push(getResources(endpointBuilder(baseUrl, i)))
  })

  const secondResponse = await Promise.all(promises)

  return [ firstResponse, ...secondResponse]
}
 /**
  * @param { String} string
  * @param { String } regExp
  * @returns { Number } concurrency number
  */
export const charCounter = (string :string, expresion :any) :number => {
  const concurrences = string.match(expresion)
  return concurrences.length
}
 /**
  * @param { String } resource
  * @returns { String } String with all names of pages
  */
export const stringNames = (resource :GetResources[]) :string => {
  return resource
    .flatMap((item:any) => item.results)
    .map((result) => result.name)
    .toString()
}
/**
 * @param { Number } time
 * @returns { String } time formated example 2s 34ms
 */
export const formatTime = (time :any) :string => {
  time = time.toString()
  return `${time.charAt()}s ${time.charAt([1])}${time.charAt([2])}ms`
}

/**
 * @param {Object[]} episodes
 * @param {Object[]} characters
 * @returns {Object[]} array with name, episode and character fields
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

  return episodes.map((item) => {
    return { name: item.name, episode: item.episode, characters: item.characters }
  })
}
