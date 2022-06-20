'use strict'

import { GetResources } from '../interfaces/commonApi'
import customAxios from '../services/customAxios'

const endpointBuilder = (baseUrl:string, numPage:number) => {
  return `${baseUrl}?page=${numPage}`
}
const getResources = async (url:string) : Promise<GetResources> => {
  const { info, results } = await customAxios(url)
  return { info, results }
}
export const getAllData = async (query:string):Promise<GetResources[]>=> {
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
export const charCounter = (string :string, expresion:any):number => {
  const concurrences = string.match(expresion)
  return concurrences.length
}
 /**
  * @param { String } resource
  * @returns { String } String with all names of pages
  */
export const stringNames = (resource:GetResources[]) : string => {
  return resource
    .flatMap((item) => item.results)
    .map((result) => result.name)
    .toString()
}
/**
 * @param { Number } time
 * @returns { String } time formated example 2s 34ms
 */
export const formatTime = (time:any):string => {
  time = time.toString()
  return `${time.charAt()}s ${time.charAt([1])}${time.charAt([2])}ms`
}
