import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList () {
  //let url = '/api/getSingerList'
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: '20',
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
  // return axios.get(url,{params: data}).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}

export function getSingerDetail (id) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order:'lister',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}

export function getSongAddr (songmid) {
  let url = 'http://farm1.2taotu.top/qqmusic.php?mid='+songmid
  let data = {
    format:'jsonp'
  }
  return jsonp(url, data, options)
  // return axios.get(url).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}
