(function(){
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    var currentAlbum = Fixtures.getAlbum();

    
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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @desc playSong plays current Buzz object
    * @function playSong
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
    };
      
      
    /**
    * @desc initialize SongPlayer.currentSong var to be null
    */
    SongPlayer.currentSong = null; //sets up SongPlayer.currentSong as a public variable
      
      
      //public method
    SongPlayer.play = function(song) { 
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) { //if currently playing song is not the song that is chosen
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) { //else if we are hovering on song #2 and clicks song#2 (2 possibility: is song#2 playing? is song#2 paused?)
          if (currentBuzzObject.isPaused()) { //if it is paused, then play it
            playSong(song);
          }
        }
    };

    function stopSong () {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
    }
      
      
    //public method
    SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
    }
    
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
        
        if (currentSongIndex < 0) {
         stopSong();
        } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
        }
    };

    SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
        
        if (currentSongIndex >= currentAlbum.songs.length) {
         stopSong();
        } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
        }
    };  
      
      
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();