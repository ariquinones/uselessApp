      var DAMPING = 0.9999;

      function Lazer(x, y) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
      }

      Lazer.prototype.integrate = function() {
        var velocity = this.getVelocity();
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocity.x * DAMPING;
        this.y += velocity.y * DAMPING;
      };
      Lazer.prototype.getVelocity = function() {
        return {
          x: this.x - this.oldX,
          y: this.y - this.oldY
        };
      };
      Lazer.prototype.move = function(x, y) {
        this.x += x;
        this.y += y;

      };
      Lazer.prototype.draw = function() {
        animationObject.strokeStyle = '#0075A2';
        animationObject.lineWidth = 5;
        //beginPath resets the path while it plays
        animationObject.beginPath();
        animationObject.moveTo(this.oldX, this.oldY);
        //lineTo adds a new point and creates a lint To that point from the current point
        animationObject.lineTo(this.x, this.y);
        // Strokes draws the actualy line path
        animationObject.stroke(); 
      };
      var container = document.getElementById('container');
      var animationObject = container.getContext('2d');
      var lazers = [];
      // var width = container.width = window.innerWidth;
      // var height = container.height = window.innerHeight;
      var width = container.width = 700
      var height = container.height = 200
      var startButton = document.querySelector('#start')
      var stopButton = document.querySelector('#stop')
      animationObject.globalCompositeOperation = 'overlay';
      startButton.addEventListener('click', function() {
        console.log("start")
        lazers.length = 0 
        frame()
      });
      // stopButton.addEventListener('click', stopAnimation)
      // function stopAnimation() {
      //   lazers.length = 0 
      // }
      // var requestId; 
      // requestAnimationFrame(frame)

      function frame() {
        animationObject.clearRect(0,0, width, height);
        for (var a = 0; a < 4; a++) {
          if (lazers.length < 5000) {
            var lazer = new Lazer(width * 0.005, height * .5);
            lazer.move(Math.random() * 2, Math.random() * 2 - 2);
            lazers.push(lazer);
            console.log('hi')
          }
         }
        for (var i = 0; i < lazers.length; i++) {
      
          lazers[i].integrate();
          lazers[i].draw();
          lazers[i].move(Math.random() * 2, Math.random() * 2 - 1);
          }
          requestAnimationFrame(frame);

          // requestId = requestAnimationFrame(frame)
      }


