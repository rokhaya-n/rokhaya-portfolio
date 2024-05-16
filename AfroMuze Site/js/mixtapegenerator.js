$(document).ready(function() {
    function generateMixtape() {
        var albumCovers = [
            "../album_covers/akwaba.png",
            "../album_covers/appartement105.png",
            "../album_covers/ategban.png",
            "../album_covers/awajaree.png",
            "../album_covers/B22.png",
            "../album_covers/bella.png",
            "../album_covers/calypso.png",
            "../album_covers/conquetedutrone.png",
            "../album_covers/control.png",
            "../album_covers/cullinan.png",
            "../album_covers/derniersalopards.png",
            "../album_covers/dose.png",
            "../album_covers/envrai.png",
            "../album_covers/fleurfroide.png",
            "../album_covers/icy.png",
            "../album_covers/melo.png",
            "../album_covers/mhd.png",
            "../album_covers/mobali.png",
            "../album_covers/mood3.png",
            "../album_covers/nakamura.png",
            "../album_covers/premiergaou.png",
            "../album_covers/ronisia.png",
            "../album_covers/room96.png",
            "../album_covers/senegalboy.png",
            "../album_covers/substance.png",
            "../album_covers/tektek.png",
            "../album_covers/vendeursdereves.png"
        ];

        var $albumCoversContainer = $(".albumCovers");
        $albumCoversContainer.empty(); // Clear previous album covers

        //math=shuffle!!
        albumCovers.sort(() => Math.random() - 0.5);

        //choose only 6 covers
        var selectedAlbumCovers = albumCovers.slice(0, 6);

        selectedAlbumCovers.forEach(function(albumCover) {
            var $img = $('<img class="img" src="' + albumCover + '" />');
            $albumCoversContainer.append($img);

            //WAIT SUCCESSFUL GSAP HERE
            TweenMax.from($img, 2, {
                delay: Math.random(), // Delay the animation randomly
                x: randomNumber(-500, 500),
                y: randomNumber(-500, 500),
                rotation: randomNumber(-180, 180),
                opacity: 0,
                ease: Power2.easeOut
            });
        });

        $albumCoversContainer.show();
    }

    //generate on click
    $("#generateMixtapeBut").click(function() {
        generateMixtape(); // Call the generateMixtape function when the button is clicked
    });

    //random math
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
});
