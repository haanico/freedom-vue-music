<template>
  <transition name="slider">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail, getSongAddr} from 'api/singer'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
         this.songs =  this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if(musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom : 0
  background : $color-background

.slider-enter-active, .slider-leave-active
  transition: all 0.3s
.slider-enter, .slider-leave-to
  transform: translate3d(100%, 0, 0)
</style>
