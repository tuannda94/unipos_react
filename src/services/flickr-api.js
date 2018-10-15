import { makeRequestFlickr } from 'Utils/helpers';

export function getRandomPicture() {
    const url = 'https://api.flickr.com/services/rest/';
    const apiKey = '80882b00609df75b919104b460459462';
    const userId = '36587311@N08';
    // const apiKey = 'b96f170e4a1b41aa034986f75a4e5e0e';
    // const userId = '139350927@N08';

    makeRequestFlickr(
        `${url}?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&per_page=10&format=json&nojsoncallback=1`,
        (data) => {
            console.log(data.photos);
            if (data.stat == 'ok') {
                const photo = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
                makeRequestFlickr(
                    `${url}?method=flickr.people.getSizes&photo_id=${photo.id}&api_key=${apiKey}&format=json&nojsoncallback=1`,
                    (data) => {
                        if (data.stat == 'ok') {
                            console.log(data.sizes.size[5].source);
                            return data.sizes.size[5].source;
                        }
                        else{
                            return false;
                        }
                    }
                )
            } else {
                return false;
            }
        }
    )
}

export default { getRandomPicture };
