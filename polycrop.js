/*
 * Copyright (c) 2012 Wojciech Żółtak (http://github.com/wojtekzozlak)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 *  */


Polycrop = {};

Polycrop.Pair = function(x, y) {
  this.x = x;
  this.y = y;
};

Polycrop.Pair.fromArray = function(arr) {
  return new Polycrop.Pair(arr[0], arr[1]);
};

Polycrop.Polygon = function() {
  this.nodes_ = new Array();
};

Polycrop.Polygon.addNode = function(node) {
  this.nodes_.push(node);
};

Polycrop.uncrop = function(element) {
  // Have no idea why, but not working in single iteration...
  // probably something about iterating through set.
  var nodes;
  do {
    nodes = element.getElementsByClassName('polycrop-spacer');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      node.parentNode.removeChild(node);
    }
  } while(nodes.length > 0);
};

Polycrop.crop = function(element, granulation, points) {
  Polycrop.uncrop(element);

  var sections = new Array();
  for (var i = 0; i < points.length; i++) {
    var p1 = points[i];
    var p2 = points[i == points.length - 1 ? 0 : i + 1];
    if (p1[1] == p2[1])
      continue;
    sections.push(new Polycrop.Pair(new Polycrop.Pair.fromArray(p1),
                                    new Polycrop.Pair.fromArray(p2)));
  }
  var offset = 0;
 

var elements = "";

var oldInner = element.innerHTML;

while (offset < element.offsetHeight && offset < 2000) {

for (k = 0; k < 10; k++) {
  var left = element.offsetWidth;
  var right = 0;
  for(i in sections) {
    var section = sections[i];

    var interval = new Polycrop.Pair(offset, offset + granulation);
    interval.x = Math.max(Math.min(section.x.y, section.y.y), interval.x);
    interval.y = Math.min(Math.max(section.x.y, section.y.y), interval.y);

    if (interval.x <= interval.y) {

      var fun = function(y) {
        return section.x.x + (section.y.x - section.x.x) * (y - section.x.y) / (section.y.y - section.x.y); 
      }
      var p = new Polycrop.Pair(fun(interval.x), fun(interval.y));
      left = Math.min(Math.min(p.x, p.y), left);
      right = Math.max(Math.max(p.x, p.y), right);
    }
  }
  right = Math.max(element.offsetWidth - right, 0);

  offset += granulation;

  elements += '<div class="polycrop-spacer" style="background-color: rgba(0, 0, 0, 0.05); clear: left; float: left; height: ' + granulation + 'px; width: ' + left + 'px;"></div>\n';
  elements += '<div class="polycrop-spacer" style="background-color: rgba(0, 0, 0, 0.05); float: right; height: ' + granulation + 'px; width: ' + right + 'px;"></div>\n';
}

  element.innerHTML = elements + oldInner;
}

};


