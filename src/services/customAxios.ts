'use strict'

import  axios from 'axios'
import { GetResources } from '../interfaces/commonApi'

/**
 * @param { String } url
 * @returns { Object || Error } data object by axios or Error
 */
const customAxios  = async (url:string) :  Promise<GetResources> => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw new Error(error)
  }
}


export default customAxios