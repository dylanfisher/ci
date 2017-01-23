$(function() {
  // Open external links in a new tab
  $(document).on('click', 'a', function(e) {
    var $link = $(this);

    if ( isExternalLink( $link ) ) {
      window.open( this.href );
      return false;
    }
  });

  // Add an link--external class
  $('a').each(function() {
    var $link = $(this);

    if ( isExternalLink( $link ) ) {
      $link.addClass('link--external');
    }
  });

  function isExternalLink($el) {
    var href = $el.attr('href');
    var link = $el.get(0).href;
    var link_host = link.split('/')[2];
    var document_host = document.location.href.split('/')[2];

    return link_host != document_host && !link.indexOf('mailto:').length;
  };

  // Eye code from http://codepen.io/mattah/pen/VjNdPR

  var config = {
    returnSpeed: 0.4
  };

  function r2d(r) {
    return 180 / Math.PI * r;
  }

  function random(min, max) {
    return min + (max - min) * Math.random();
  }

  if ( $('#eye').length ) {
    /**
    * Eye model object
    * -----------------------------
    */
    function Eye(sel) {
      // dom
      this.eye = document.querySelector(sel);
      this.pupil = this.eye.children[0];
      this.lid = this.eye.children[1];

      // widths
      this.ew = this.eye.offsetWidth;
      this.pw = this.pupil.offsetWidth;

      // centered position
      this.cx = this.eye.getBoundingClientRect().right - this.ew/2;
      this.cy = this.eye.getBoundingClientRect().bottom - this.ew/2;

      // state
      this.bLidUp = true;
    }

    Eye.prototype.movePupil = function(r, theta) {
      var x, y;

      if (r > 1) r = 1; // clamp
      r *= (this.ew/2 - this.pw/2); // restrict edge of pupil to edge of eye

      // convert polar to rectangular
      x = r * Math.cos(theta) + (this.ew - this.pw)/2;
      y = r * Math.sin(theta) + (this.ew - this.pw)/2;

      this.pupil.style.transform = 'translateX(' + x + 'px)' +
                                    'translateY(' + y + 'px)';
    }

    /**
    * pupil-mouse tracking and draw
    * -----------------------------
    */
    var eye = new Eye('#eye'),
        eyes = [eye], // array of eyes to move
        eyeCount = eyes.length,
        wrapper = $('body')[0], // boundary container
        R = 0, //todo: capitalized vars typically constants
        THETA = 0,
        wrapperWidth = wrapper.offsetWidth,
        wrapperHeight = wrapper.offsetHeight,
        bMouseOver = false;

    /**
    * update the computed pupil (polar) coordinates given a mouse event
    * treat bbox as circumscribed by a bounding circle for more
    * intuitive pupil movement
    */
    function updateEyes(event) {
      var mx = event.pageX,
          my = event.pageY,
          width = window.innerWidth,
          height = window.innerHeight;

      var x, y, bboxWidth, bboxHeight, bbRadius;

      bMouseOver = true;

      // center x, y
      x = mx - width/2;
      y = my - height/2;

      // get bbox bounds
      bboxWidth = wrapperWidth;
      bboxHeight = wrapperHeight;
      bbRadius = Math.sqrt(Math.pow(bboxWidth,2) + Math.pow(bboxHeight, 2)) /2;

      // computer,  theta
      R = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) / bbRadius;
      THETA = Math.atan2(y,x);

    }

    function returnToNeutral() {
      bMouseOver = false;
    }

    /* draw pupil updates on animation frame */
    function draw() {
      window.requestAnimationFrame(draw);

      // reduce R if mouse isn't on screen
      var dr = config.returnSpeed;
      if (!bMouseOver && R!==0) {
        dr = (Math.abs(R) < 0.01) ? 0.01 : R * dr;
        R -= dr;
        // if ( R < 0 ) return;
        return;
      }

      // move all eyes
      for (var e=0; e<eyes.length; e++) {
        eyes[e].movePupil(R, THETA);
      }

    }
    draw();

    /**
    * add eye
    * -----------------------------
    */
    function addEye() {
      var newEye = document.createElement('div'),
          newPupil = document.createElement('div'),
          newLid = document.createElement('div');

      // set class names of new nodes, and ID of eye
      newPupil.className += ' pupil';
      newLid.className += ' lid';
      newEye.className += ' eye';
      newEye.id = 'eye-' + (++eyeCount);

      // Add new eye to dom
      document.body.appendChild(newEye);
      newEye.appendChild(newPupil);
      newEye.appendChild(newLid);

      // style eye
      var x = random(-0.5, 0.5) * wrapperWidth,
          y = random(-0.5, 0.5) * wrapperHeight,
          scale = random(0.25, 0.9);
      newEye.style.transform = 'translateX(' + x + 'px)' +
                               ' translateY('+ y +'px)' +
                               ' scale(' + scale + ')';

      var eyeObj = new Eye('#' + newEye.id);
      eyes.push(eyeObj);
    }

    /**
    * Event handlers
    *------------------------------------
    */

    document.addEventListener('mousemove', updateEyes, false);

    document.addEventListener('mouseleave', returnToNeutral, false);

    window.addEventListener('resize', function() {
      wrapperWidth = wrapper.offsetWidth;
      wrapperHeight = wrapper.offsetHeight;
    });
  }

});
