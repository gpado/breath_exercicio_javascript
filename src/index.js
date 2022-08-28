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

        breathInterface.initialize();

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
        bgColor: "#596cb3",
        border: 0
    },

    initialize: () => {
        let btnToggle = $("#btnToggle");
        let btnStart = $("#btnStart");
        let btnPause = $("#btnPause");
        let btnResume = $("#btnResume");
        let btnCancel = $("#btnCancel");

        btnToggle.click( () => {
            let symbolOfButton = (btnToggle.html() === "˅") ? "˄" : "˅";
            btnToggle.html(symbolOfButton);
        });

        btnPause.css("display", "none");
        btnResume.css("display", "none");

        btnStart.click( () => {
            breathInterface.playAnimation();
            btnStart.css("display", "none");
            btnPause.css("display", "inline");
        });
        btnResume.click( () => {
            breathInterface.playAnimation();
            btnResume.css("display", "none");
            btnPause.css("display", "inline");
        });
        btnPause.click( () => {
            breathInterface.pauseAnimation();
            btnPause.css("display", "none");
            btnResume.css("display", "inline");
        });
        btnCancel.click( () => {
            breathInterface.cancelAnimation();
            btnStart.css("display", "initial");
            btnPause.css("display", "none");
            btnResume.css("display", "none");
        });
    },

    playAnimation: () => {
        $("canvas").css("animation", "mymove 8s infinite");
    },

    pauseAnimation: () => {
        $("canvas").css("animation", "");
    },

    cancelAnimation: () => {
        $("canvas").css("animation", "");
    }
}

$(document).ready(function(){
    game.initialize();
});