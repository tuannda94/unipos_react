getPicture ("36587311@N08", "test");
function getPicture (the_user_id, your_div_id){
    var apiKey = "80882b00609df75b919104b460459462"; // replace this with your API key

    // get an array of random photos
    $.getJSON(
        "http://api.flickr.com/services/rest/",
        {
            //method: 'flickr.interestingness.getList',
            method: 'flickr.people.getPublicPhotos',
            api_key: apiKey,
            user_id: the_user_id,
            format: 'json',
            nojsoncallback: 1,
            extras: "description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o",
            per_page: 100 // you can increase this to get a bigger array
        },
        function(data){

            // if everything went good
            if(data.stat == 'ok'){

                // get a random id from the array
                var photo = data.photos.photo[ Math.floor( Math.random() * data.photos.photo.length ) ];

                // now call the flickr API and get the picture with a nice size
                $.getJSON(
                    "http://api.flickr.com/services/rest/",
                    {
                        method: 'flickr.photos.getSizes',
                        api_key: apiKey,
                        photo_id: photo.id,
                        format: 'json',
                        nojsoncallback: 1
                    },
                    function(response){
                        if(response.stat == 'ok'){
                            var the_url = response.sizes.size[5].source;
                            return the_url;
                        }
                        else{
                            return false;
                        }
                    }
                );

            }
            else{
                return false;
            }
        }
    );
}
