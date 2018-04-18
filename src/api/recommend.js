import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
import {ERR_OK} from 'api/config'
import { ftruncate } from 'fs';

export function getRecommend () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export async function getDiscList () {
  const url = '/api/getDiscList'
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({}, commonParams, {
    // picmid: 1,

    // g_tk: 1388658595,
    // jsonpCallback: getPlaylist,
    // loginUin: 99976827,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })
  // return jsonp(url, data, options)
  // return axios.get(url, {params: data}).then((res) => {
  //   return Promise.resolve(res.data)
  // })

  let res = await axios.get(url, {params: data})
  return res.data
}

export function getDiscSongList(dissid) {
  let url = '/api/getDiscSongList'

  let data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: dissid,
    format: 'json',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
