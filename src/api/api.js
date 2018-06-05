import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://www.studapi.loc/',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const imageUploads = 'http://www.studapi.loc/uploads/'
