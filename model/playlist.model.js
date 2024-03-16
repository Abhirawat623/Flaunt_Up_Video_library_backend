const mongoose= require("mongoose");

const playlistSchema = new mongoose.Schema({
    videoId :{type:String,required:true,unique:true},
    playlistName:{type:String,required:true,unique:true}
},
{
    timestamps: true,
  });

  const Playlist= mongoose.model("Playlist",playlistSchema);

  module.exports= Playlist;