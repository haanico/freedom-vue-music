<template>
  <transition name="slide">
    <music-list
        :title="title"
        :bg-image="bgImage"
        :songs="songs"
    ></music-list>
  </transition>


</template>

<script>
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/music-list'
import {getDiscSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  created() {
    this._getDiscSongList()
  },
  data() {
    return {
      songs:[]
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getDiscSongList () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getDiscSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }

      })
    },
    _normalizeSongs(list) {
      let songs = []
      list.forEach((musicData) =>{
        if(musicData.songid && musicData.albumid){
          songs.push(createSong(musicData))
        }
      })
      return songs
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-transition
    transform: translate3d(100%, 0, 0)
</style>

