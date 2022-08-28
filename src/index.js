const game = {
    initialize: () => {
        let canvas = document.getElementById('Canvas');
        let context = canvas.getContext('2d');
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        game.area = {
            canvas,
            context,
            center: {
                x: centerX,
                y: centerY
            }
        }

        game.draw();
    },

    draw: () => {
        let area = game.area;
        let circle = breathInterface.circle;

        area.context.beginPath();
        area.context.arc(area.center.x, area.center.y, circle.radius, 0, 2 * Math.PI, false);
        area.context.fillStyle = circle.bgColor; //cor circulo   
        area.context.fill();
        area.context.lineWidth = circle.border;  //borda circulo 
    }
}

const breathInterface = {
    circle: {
        radius: 100,
        bgColor: "#222992",
        border: 0
    }
}

$(document).ready(function(){
    game.initialize();
    
    $("button").click(function(){
      $("canvas").css("animation", "mymove 8s infinite");
    });
  });