const Axios = require('axios');

export const searchForSong = async(trackName, accessToken) => {

  const authOptions = {
    method: 'GET', 
    url:  `https://api.spotify.com/v1/search?type=track&q=${trackName}`, 
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  };

  const httpResponse = await Axios(authOptions);  

  const tracks = httpResponse.data;    
  console.log(tracks);

  return tracks;
};
