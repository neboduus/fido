jQuery(document).ready(function($){
    'use strict';
    var slides = [

    // slide 1
    {

        src: 'img/galleria/galleria1.jpeg', // path to image
        w: 1024, // image width
        h: 768, // image height

        msrc: 'img/galleria/galleria1.jpeg', // small image placeholder,
                        // main (large) image loads on top of it,
                        // if you skip this parameter - grey rectangle will be displayed,
                        // try to define this property only when small image was loaded before



        title: 'Image Caption'  // used by Default PhotoSwipe UI
                                // if you skip it, there won't be any caption


        // You may add more properties here and use them.
        // For example, demo gallery uses "author" property, which is used in the caption.
        // author: 'John Doe'

    },

    // slide 2
    {
         src: 'img/galleria/galleria1.jpeg', // path to image
        w: 1024, // image width
        h: 768, // image height

        msrc: 'img/galleria/galleria1.jpeg', // small image placeholder,
                        // main (large) image loads on top of it,
                        // if you skip this parameter - grey rectangle will be displayed,
                        // try to define this property only when small image was loaded before



        title: 'Image Caption'  // used by Default PhotoSwipe UI
                                // if you skip it, there won't be any caption


        // You may add more properties here and use them.
        // For example, demo gallery uses "author" property, which is used in the caption.
        // author: 'John Doe'
    }

    // etc.

    ];
})