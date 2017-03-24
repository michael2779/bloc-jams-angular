(function(){
  function SongPlayer() {
    var SongPlayer = {};
    /**
    * @desc initialize currentSong var to be null
    */
    var currentSong = null; //sets up currentSong var
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null; //sets up currentBuzzObject var

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {object} song
    */
    var setSong = function(song) { //private method
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
    * @desc playSong plays current Buzz object
    @function playSong
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    //public method
    SongPlayer.play = function(song) { //object. Question: Can I do this.play = function(song) instead of SongPlayer.play?
        if (currentSong !== song) { //if currently playing song is not the song that is chosen
            setSong(song);
            playSong(song);
        } else if (currentSong === song) { //else if we are hovering on song #2 and clicks song#2 (2 possibility: is song#2 playing? is song#2 paused?)
          if (currentBuzzObject.isPaused()) { //if it is paused, then play it
            playSong(song);
          }
        }
    };

    //public method
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();