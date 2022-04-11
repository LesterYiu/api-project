const app = {};

app.catKey = '00b2c448-3965-4abc-8e5e-408e6ed3ce11';

app.catUrl = 'https://api.thecatapi.com/v1/images/search';

app.kanyeWestUrl = 'https://api.kanye.rest';

app.giphyKey = 'WJKaKhAQlIzygZxp4XkHTM4vHJO97Z9h';

app.giphyUrl = 'http://api.giphy.com/v1/gifs/search';

app.catUsername = 'https://api.thecatapi.com/v1/breeds/';

app.$catGeneratedImage = $('.catGeneratedImage');

app.$kanyeCaption = $('.kanyeCaption');

app.$profileIcon = $('.profilePicture');

app.$randomizeCat = $('.randomizeCat');

app.$startButton = $('.startButton');

app.$header = $('.header');

app.$catContentSection = $('.catContentSection');

app.$likedPost = $('.likedPost');

app.$heartButton = $('.reactionHeart');

app.$backButton = $('.backButton');

app.$body = $('body');

app.$footer = $('footer');

app.userName = $('.userName');

app.makeCatSearch = () => {
    $.ajax({
        url: app.catUrl,
        type: 'JSON',
        method: 'GET',
        data: {
            api_key: app.catKey
        }
    })
    .then( (res) => {
        const catObject = res[0].url;
        app.putCatImage(catObject);
    })
};

app.putCatImage = (res) => {
    app.$catGeneratedImage.attr('src', res);
};

app.makeKanyeQuote = () => {
    $.ajax({
        url: app.kanyeWestUrl,
        type: 'JSON',
        method: 'GET'
    }).then( (res) => {
        app.putKanyeQuote(res);
    });
};

app.putKanyeQuote = (kanyeArgument) => {
    const kanyeObject = kanyeArgument.quote;
    app.$kanyeCaption.text(`${kanyeObject}`);
};

app.generateNewProfile = () => {
    $.ajax({
        url: app.giphyUrl,
        type: 'JSON',
        method: 'GET',
        data: {
            api_key: app.giphyKey,
            q: 'cat'
        }
    })
    .then( (res) => {
        const giphyObject = res.data;
        const randomGiphyArray = app.randomizerArray(giphyObject);
        app.getNewProfilePicture(randomGiphyArray);
    });
};

app.randomizerArray = (res) => {
    const num = Math.floor(Math.random() * res.length);
    return res[num];
};

app.getNewProfilePicture = (res) => {
    app.$profileIcon.attr('src', res.images.original_still.url);
};

app.$randomizeCat.on('click', () => {
    app.clearPost();
    app.generateNewCatContent();
    app.getNewUsername();
});

app.clearPost = () => {
    app.$catGeneratedImage.empty();
    app.$kanyeCaption.empty();
    app.defaultHeartButton();
};

app.generateNewCatContent = () => {
    app.makeCatSearch();
    app.makeKanyeQuote();
    app.generateNewProfile();
};

app.$startButton.on('click', () => {
    app.makeHomeDisplayNone();
    app.removeBackgroundImage();
    app.removeFooter();
});

app.makeHomeDisplayNone = () => {
    app.$header.addClass('displayNone');
    app.$catContentSection.removeClass('displayNone');
};

app.changeHeartPhotosRed = () => {
    app.$heartButton.attr('src','./images/heartButtonAfterAction.png');
}

app.$heartButton.on('click', () => {
    app.changeHeartPhotosRed();
})

app.defaultHeartButton = () => {
    app.$heartButton.attr('src', './images/heartButton.png');
}

app.$backButton.on('click', () => {
    app.goBackHomePage();
    app.addBackgroundImage();
    app.addFooter();
})

app.goBackHomePage = () => {
    app.$header.removeClass('displayNone');
    app.$catContentSection.addClass('displayNone');
}

app.removeBackgroundImage = () => {
    app.$body.removeClass('bodyWithImage');
}

app.addBackgroundImage = () => {
    app.$body.addClass('bodyWithImage');
}

app.removeFooter = () => {
    app.$footer.addClass('displayNone');
}

app.addFooter = () => {
    app.$footer.removeClass('displayNone');
}

app.generateNewNumberUsername = () => {
    const randomNumber = Math.floor(Math.random()* 1000);
    return randomNumber;
}

app.getNewUsername = () => {
    const newDigits = app.generateNewNumberUsername();
    console.log(newDigits);
    app.userName.text(`saladlover${newDigits}`);
}

app.init = () => {
    app.makeCatSearch();
    app.makeKanyeQuote();
    app.generateNewProfile();
    app.getNewUsername();
};


$(function() {
    app.init();
});


/* PSEUDO CODE
    1.  Create a function that randomly selects something from an array
    2.  Once the cat breed name has been randomly picked, search for the breed name
    3.  Once searched for that breed name, display that cat picture from the search array
    4.  Pull a random Kanye quote and put it in caption section
    5.  Make the button randomize a cat  
    6.  Add classes of display none, once start button is clicked, showing only content*/