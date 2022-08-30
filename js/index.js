const game = {
    initialize: () => {
        game.getCanvasLayers();
        breathExercise.initialize("Teste", 2, 4, 2, 5);
        breathInterface.initialize();
        game.draw();
        game.update()
    },

    getCanvasLayers: () => {
        let canvas = document.getElementById('firstCanvasLayer');
        let context = canvas.getContext('2d');
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        game.firstLayer = {
            canvas,
            context,
            center: {
                x: centerX,
                y: centerY
            }
        }

        canvas = document.getElementById('secondCanvasLayer');
        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        game.secondLayer = {
            canvas,
            context,
            center: {
                x: centerX,
                y: centerY
            }
        }
    },

    draw: () => {
        let firstLayer = game.firstLayer;
        let secondLayer = game.secondLayer;
        let circle = breathInterface.circle;

        firstLayer.context.beginPath();
        firstLayer.context.arc(firstLayer.center.x, firstLayer.center.y, circle.radius, 0, 2 * Math.PI, false);
        firstLayer.context.fillStyle = circle.bgColor; //cor circulo   
        firstLayer.context.fill();

        secondLayer.context.beginPath();
        secondLayer.context.arc(secondLayer.center.x, secondLayer.center.y, circle.radius, 0, 2 * Math.PI, false);
        secondLayer.context.strokeStyle = circle.borderColor;   
        secondLayer.context.lineWidth = circle.border; //borda do círculo
        secondLayer.context.stroke();

        secondLayer.context.fillStyle = breathInterface.text.color;
        secondLayer.context.textAlign = breathInterface.text.align;
        secondLayer.context.font = breathInterface.text.font;
        secondLayer.context.fillText("Pronto?", secondLayer.center.x, secondLayer.canvas.height - breathInterface.text.paddingBottom);
    },

    update: () => {
        if(breathInterface.playState === "PLAYED"){
            breathInterface.controlAnimation();
            breathInterface.showMessage(game.secondLayer);
            game.requestAnimationID = requestAnimationFrame(game.update);
        }else{
            cancelAnimationFrame(game.requestAnimationID);
        }
        
    }
}

const breathInterface = {
    circle: {
        radius: 100,
        bgColor: "#596cb3",
        borderColor: "#3a53af",
        border: 4
    },

    text: {
        color: "#3a53af",
        align: "center",
        font: "600 20px Roboto",
        paddingBottom: 10
    },

    playState: "STOPPED",

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
        $("#firstCanvasLayer").css("animation", `inspire ${breathExercise.inspireDuration}s linear`);
        
        breathInterface.playState = 'PLAYED';
        breathInterface.startAnimationTime = (new Date().getTime())/1000;
        breathInterface.animationDuration = breathExercise.inspireDuration;
        breathInterface.animationPlaying = "INSPIRE";
        
        game.requestAnimationID = requestAnimationFrame(game.update);
    },

    pauseAnimation: () => {
        breathInterface.playState = 'PAUSED';
        $("#firstCanvasLayer").css("animation", "");
    },
    
    cancelAnimation: () => {
        breathInterface.playState = 'STOPPED';
        $("#firstCanvasLayer").css("animation", "");
    },

    controlAnimation: () => {
        let currentTime = (new Date().getTime())/1000;
        let passedTime = currentTime - breathInterface.startAnimationTime;
    
        if(passedTime >= breathInterface.animationDuration){
            switch(breathInterface.animationPlaying){
                case "INSPIRE":
                    breathInterface.animationDuration = breathExercise.delayDuration;
                    breathInterface.animationPlaying = "DELAY";
                    console.log("Aguarde");
                    break;
                case "DELAY":
                    $("#firstCanvasLayer").css("animation", `expire ${breathExercise.expireDuration}s linear`);
                    breathInterface.animationDuration = breathExercise.expireDuration;
                    breathInterface.animationPlaying = "EXPIRE";
                    console.log("Expire");
                    break;
                case "EXPIRE":
                    $("#firstCanvasLayer").css("animation", `inspire ${breathExercise.inspireDuration}s linear`);
                    breathInterface.animationDuration = breathExercise.inspireDuration;
                    breathInterface.animationPlaying = "INSPIRE";
                    console.log("Inspire");
                    break;
            }
            breathInterface.startAnimationTime = (new Date().getTime())/1000;
        }
    },
    
    showMessage: (layer) => {
        let message = "";
        switch(breathInterface.animationPlaying){
            case "INSPIRE":
                message = "Inspire";
                break;
            case "DELAY":
                message = "Segure";
                break;
            case "EXPIRE":
                message = "Expire";
                break;
        }

        layer.context.clearRect(0, layer.canvas.height - 30, layer.canvas.width, layer.canvas.height);
        layer.context.fillText(message, layer.center.x, layer.canvas.height - breathInterface.text.paddingBottom);
    }
}

const breathExercise = {
    initialize: (name, numberOfCycles, inspireDuration, delayDuration, expireDuration) => {
        breathExercise.name = name;
        breathExercise.numberOfCycles = numberOfCycles;
        breathExercise.inspireDuration = inspireDuration;
        breathExercise.delayDuration = delayDuration;
        breathExercise.expireDuration = expireDuration;
    }
}

$(document).ready(function(){
    game.initialize();
});