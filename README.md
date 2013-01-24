polycrop
========

Very simple tool for text cropping in websites.

For starters - try the [demo](https://dl.dropbox.com/u/46513541/polycrop/test.html).

### How it works? ####

It takes an element, a number (precision) and an array of points (two-element arrays)
which is describing a polygon. Then - it tries to crop the text flow into the given
polygon shape.

The method is simple and brutal - it adds invisible, floating divs to force the flow.
Hence, the shape which can be forced is limited. To be precise - every horizontal
"slice" must be consistent. For example:

    good:                  bad:
    
    xxxxxxxxx              xxx  xx  xx  <- not consistent
      xxxxx                 xx  xx xx   <- not consistent
     xxxxxx                  xxxxxxx
    xxxxx                     xxxxx
    xxxxxxxxx                  xxx

Moreover - the shape should be big enough to contain the whole text. And, since
the text length may vary in different environments - you should left some free
space.


### Disclaimer #####

This tool is in alpha stage and was written primarily as a proof of concept.

In particular:
* Cropping method may be considered as slow and ugly.
* Code is short, but dirty.
* It was tested only on Chrome and may behave strange on other browsers.

But hey - it's working! (well, more or less)
