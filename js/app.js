
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Yawn',
            imgSrc : 'images/animal-cat-kitten-funny-56857.jpg',
            imgAttribution : 'https://www.pexels.com/photo/animal-kitten-cat-funny-56857/'
        },
        {
            clickCount : 0,
            name : 'Huh?',
            imgSrc : 'images/cat-eyes-view-face-66292.jpg',
            imgAttribution : 'https://www.pexels.com/photo/close-up-photography-of-russian-blue-cat-66292/'
        },
        {
            clickCount : 0,
            name : 'Blacky',
            imgSrc : 'images/pexels-photo-302280.jpg',
            imgAttribution : 'https://www.pexels.com/photo/adorable-animal-cat-cute-302280/'
        },
        {
            clickCount : 0,
            name : 'Duh',
            imgSrc : 'images/pexels-photo-384555.jpg',
            imgAttribution : 'https://www.pexels.com/photo/adorable-animal-cat-cute-384555/'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'images/pexels-photo-416160.jpg',
            imgAttribution : 'https://www.pexels.com/photo/animal-cat-face-close-up-feline-416160/'
        }
    ],
    'adminVisible': null
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];
        model.adminVisible = false;

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

/* ======= View ======= */

var adminView = {
    'init': function() {

        this.adminBtn = document.getElementById("admin");
        this.cancelBtn = document.getElementById("cancel");
        this.saveBtn = document.getElementById("save");
        this.txt_name = document.getElementById("name");
        this.txt_url = document.getElementById('url');
        this.txt_click = document.getElementById('clicks');

        //form initially hides.  will need to show when admin button clicked
        $('#cat-admin').hide();

        // admin form click listener
        this.adminBtn.addEventListener('click', function() {
            $('#cat-admin').show();



        //var elemName = this.txt_name;
        //var currentCatLink = currentCatObj.imgSrc;
        //var currentCatCount = currentCatObj.clickCount;
        var currentCatdetail = octopus.getCurrentCat();
        //model.name.value = getProperties.txt_name;
        document.getElementById('name').value = currentCatdetail.name;
        document.getElementById('url').value = currentCatdetail.imgSrc;
        document.getElementById('clicks').value = currentCatdetail.clickCount;
      });

        // cancel button click listener
        this.cancelBtn.addEventListener('click', function() {
            $('#cat-admin').hide();
      });

        // save button click listener
        var that = this;

        this.saveBtn.addEventListener('click', function() {
            var newCat = document.getElementById('name').value;
            var newUrl = document.getElementById('url').value;
            var newClicks = document.getElementById('clicks').value;
            var currentCatObj = octopus.getCurrentCat();
            currentCatObj.name = newCat;
            if (newUrl != null) {
                currentCatObj.imgSrc = newUrl;
            }
            else {
                currentCatObj.imgSrc = currentCatObj.imgSrc;
            }
            currentCatObj.clickCount = newClicks;
            console.log(currentCatObj);

            //this.txt_name.value = currentCatObj.name;
            //this.txt_url.value = currentCatObj.url;
            //this.txt_click.value = currentCatObj.clicks;
            //

            catView.render();
            // catListView.render();
            // $('admin-form').hide();
        });
    }
};

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('button');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};


// make it go!
octopus.init();


