$(document).ready(() => {
  function sendFirstMail(data) {
    $("#container").empty().append("<h1 id='medium'>Envoi en cours</h1>");
    answer=data;

    Email.send({
      SecureToken : "e7dcdd92-bc49-4c04-a079-d69f733ce285",
      To : "test5secondesmessenger@gmail.com",
      From : "test5secondesmessenger@gmail.com",
      Subject : `Projet - Test des 5 secondes (questions principales) - ID ${result}`,
      Body : data
    }).then(
      message => {
        $("#container").empty().removeClass("full");

      if (message==="OK") {
          $("#container").append(`
          <div id="flex">
            <h1>Vos réponses ont bien été envoyées ! Merci !</h1>
            <h2>Nous allons maintenant vous demander de dessiner ce que vous avez retenu de l'écran.</h2><br/>
            <h3>Quand vous êtes prêt(e), cliquez sur le bouton ci-dessous.</h3>
            <button class="accept" id="startDrawing">Commencer</button>
          </div>`);
        }
        else {
          $("#container").append(`
          <div id="flex">
            <h1>Une erreur s'est produite, vous pouvez envoyer vos réponses par mail à : test5secondesmessenger@gmail.com.</h1>
            <h2>Vous pouvez essayer de réenvoyer les réponses ou continuer l'étude.<br/>
            Dans la suite de l'étude, nous allons maintenant vous demander de dessiner ce que vous avez retenu de l'écran.</h2><br/>
            <h3>Cliquez sur le bouton "Réessayer" pour réenvoyer les réponses ou sur "Continuer" pour commencer le dessin.</h3>
            <div id="options">
              <button class="accept" id="resendFirstMail">Réessayer</button>
              <button class="accept" id="startDrawing">Commencer</button>
            </div>
          </div>`);
        }
      }
    );
  }

  function sendSecondMail(data) {
    $("#drawingApp").empty();
    $("#container").empty();
    $("body").append("<div id='container'><h1 id='medium'>Envoi en cours</h1></div");
    answer=data;

    Email.send({
      SecureToken : "e7dcdd92-bc49-4c04-a079-d69f733ce285",
      To : "test5secondesmessenger@gmail.com",
      From : "test5secondesmessenger@gmail.com",
      Subject : `Projet - Test des 5 secondes (dessin) - ID ${result}`,
      Body : "",
      Attachments:
      [
        {
          name: `drawing${result}.png`,
          data: answer
        }
      ]
    }).then(
      message => {
        $("#container").empty();

       if (message==="OK") {
          $("#container").append(`
          <div id="flex">
            <h1>Votre dessin a bien été envoyé ! Merci !</h1>
            <h2>Vous pouvez désormais répondre à ces questions, il s'agit des dernières questions et vous pourrez ensuite fermer l'onglet.</h2><br/>
            <p>
              Quel est, selon vous, l'objectif de cette application ?
              <p><textarea name="questionOne" id="questionOne"></textarea></p>
            </p>
            <p>
              Quel est le nom de l'entreprise qui a réalisé cette application ?
              <p><textarea name="questionTwo" id="questionTwo"></textarea></p>
            </p>
            <p>
              Quel est l'information la plus importante sur cette page ?
              <p><textarea name="questionThree" id="questionThree"></textarea></p>
            </p>
            <p>
              Qu'avez-vous remarqué en premier sur cette page ? Qu'avez-vous remarqué ensuite ?
              <p><textarea name="questionFour" id="questionFour"></textarea></p>
            </p>
            <p>
              Le site vous a-t-il paru digne de confiance ?
              <p><textarea name="questionFive" id="questionFive"></textarea></p>
            </p>
            <p>
              Le site vous a-t-il paru clair ?
              <p><textarea name="questionSix" id="questionSix"></textarea></p>
            </p>
            <p>
              Que feriez vous pour améliorer l'application ?
              <p><textarea name="questionSeven" id="questionSeven"></textarea></p>
            </p>
            <button class="accept" id="sendThirdMail">Envoyer</button>
          </div>`);
        }
        else {
          $("#container").append(`
          <div id="flex">
            <h1>Une erreur s'est produite, vous pouvez envoyer le dessin à : test5secondesmessenger@gmail.com.</h1>
            <h2>Vous pouvez essayer de réenvoyer les réponses ou continuer l'étude.<br/>
            Dans la suite de l'étude, les dernières questions vont vous être posées et vous pourrez ensuite fermer l'onglet.</h2><br/>
            <h3>Cliquez sur le bouton "Réessayer" pour réenvoyer les réponses ou sur "Continuer" pour répondre aux dernières questions.</h3>
            <div id="options">
              <button class="accept" id="resendSecondMail">Réessayer</button>
              <button class="accept" id="startLastQuestions">Commencer</button>
            </div>
          </div>`);
        }
      }
    );
  }

  function sendThirdMail(data) {

    let concat="";

    $("textarea").each(function() {
      concat+=$(this).val();
    });

    $("#container").empty().append("<h1 id='medium'>Envoi en cours</h1>");
    answer=data;

    if (concat!=="") {
      Email.send({
        SecureToken : "e7dcdd92-bc49-4c04-a079-d69f733ce285",
        To : "test5secondesmessenger@gmail.com",
        From : "test5secondesmessenger@gmail.com",
        Subject : `Projet - Test des 5 secondes (dernières questions) - ID ${result}`,
        Body : answer
      }).then(
        message => {
          $("#container").empty();

          if (message==="OK") {
            $("#container").append("<div id='flex'><h1>Nous vous remercions pour avoir répondu à cette étude. Vous pouvez désormais fermer l'onglet.</h1></div>");
          }
          else {
            $("#container").append(`
            <div id="flex">
              <h1>Une erreur s'est produite, vous pouvez envoyer les dernières réponses à : test5secondesmessenger@gmail.com.</h1>
              <h2>Vous pouvez essayer de réenvoyer les réponses.</h2>
              <button class="accept" id="resendThirdMail">Réessayer</button>
            </div>`);
          }
        }
      );
    }
    else {
        $("#container").empty().append("<div id='flex'><h1>Nous vous remercions pour avoir répondu à cette étude. Vous pouvez désormais fermer l'onglet.</h1></div>");
    }
  }

  let result='', answer;
  let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < characters.length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  $(document).on("click","#start", () => {
    $("#container").empty();
    $("#container").addClass("full");

    let count=3;

    fiveSecondsImage=setInterval(() => {
      if (count!==0) {
        if (!$("#container h1").length) {
          $("#container").empty().append(`<h1 id="big">${count}</h1>`);
        }
        else {
            $("#container h1").text(count);
        }
        count--;
      }
      else {
        $("#container").empty().append("<img src='screenshot.png' id='screenshot' alt='Screenshot de Messenger' />");

        $("#screenshot").one("load", () => {
          setTimeout(() => {
            $("#container").removeClass("full").empty().append(`
              <div id="flex">
                <h2>Les 5 secondes sont terminées. Vous pouvez désormais répondre aux questions.</h2>
                <p><span style="color:red">* = question obligatoire</span></p>
                <p>
                  Quelle est votre impression générale vis-à-vis de cet écran ? <span style="color:red">*</span>
                  <div class="rating">
                    <p>
                      <input type="radio" id="questionOneROne" name="questionOne" value="Très mauvaise">
                      <label for="questionOneROne">Très mauvaise</label>
                    </p>
                    <p>
                      <input type="radio" id="questionOneRTwo" name="questionOne" value="Mauvaise">
                      <label for="questionOneRTwo">Mauvaise</label>
                    </p>
                    <p>
                      <input type="radio" id="questionOneRThree" name="questionOne" value="Moyenne">
                      <label for="questionOneRThree">Moyenne</label>
                    </p>
                    <p>
                      <input type="radio" id="questionOneRFour" name="questionOne" value="Bonne">
                      <label for="questionOneRFour">Bonne</label>
                    </p>
                    <p>
                      <input type="radio" id="questionOneRFive" name="questionOne" value="Très bonne">
                      <label for="questionOneRFive">Très bonne</label>
                    </p>
                  </div>
                </p>
                <p>
                  Comment jugez-vous l'esthétique de cet écran ? <span style="color:red">*</span>
                  <div class="rating">
                    <p>
                      <input type="radio" id="questionTwoROne" name="questionTwo" value="Très laide">
                      <label for="questionTwoROne">Très laide</label>
                    </p>
                      <input type="radio" id="questionTwoRTwo" name="questionTwo" value="Laide">
                      <label for="questionTwoRTwo">Laide</label>
                    </p>
                      <input type="radio" id="questionTwoRThree" name="questionTwo" value="Neutre">
                      <label for="questionTwoRThree">Neutre</label>
                    </p>
                      <input type="radio" id="questionTwoRFour" name="questionTwo" value="Belle">
                      <label for="questionTwoRFour">Belle</label>
                    </p>
                      <input type="radio" id="questionTwoRFive" name="questionTwo" value="Très belle">
                      <label for="questionTwoRFive">Très belle</label>
                    </p>
                  </div>
                </p>
                <p>
                  Quel est selon-vous, l'objectif principal de cette application ? <span style="color:red">*</span>
                  <p>
                    <textarea id="questionThree" name="questionThree"></textarea>
                  </p>
                </p>
                <button class="accept" id="sendFirstAnswers">Envoyer</button>
              </div>`);
          },5000);
          clearInterval(fiveSecondsImage);
        });
      }
    },1000);

  });

  $(document).on("click","#startLastQuestions", () => {
    $("#container").empty().append(`
      <div id="flex">
        <h2>Vous pouvez désormais répondre à ces questions, il s'agit des dernières questions et vous pourrez ensuite fermer l'onglet.</h2><br/>
        <p>
          Quel est, selon vous, l'objectif de cette application ?
          <p><textarea name="questionOne" id="questionOne"></textarea></p>
        </p>
        <p>
          Quel est le nom de l'entreprise qui a réalisé cette application ?
          <p><textarea name="questionTwo" id="questionTwo"></textarea></p>
        </p>
        <p>
          Quel est l'information la plus importante sur cette page ?
          <p><textarea name="questionThree" id="questionThree"></textarea></p>
        </p>
        <p>
          Qu'avez-vous remarqué en premier sur cette page ? Qu'avez-vous remarqué ensuite ?
          <p><textarea name="questionFour" id="questionFour"></textarea></p>
        </p>
        <p>
          Le site vous a-t-il paru digne de confiance ?
          <p><textarea name="questionFive" id="questionFive"></textarea></p>
        </p>
        <p>
          Le site vous a-t-il paru clair ?
          <p><textarea name="questionSix" id="questionSix"></textarea></p>
        </p>
        <p>
          Que feriez vous pour améliorer l'application ?
          <p><textarea name="questionSeven" id="questionSeven"></textarea></p>
        </p>
        <button class="accept" id="sendThirdMail">Envoyer</button>
      </div>`);
  });

  $(document).on("click","#sendFirstAnswers", () => {
    if ($("input:checked").length===2 && $("#questionThree").val()!=="") {
      sendFirstMail(`<p>Quelle est votre impression générale vis-à-vis de cet écran ? : ${$("input[name='questionOne']:checked").val()}</p>
      <p>Comment jugez-vous l'esthétique de cet écran ? : ${$("input[name='questionTwo']:checked").val()}</p>
      <p>Quel est selon-vous, l'objectif principal de cette application ? : ${$("#questionThree").val()}</p>`);
    }
    else if (!$("#error").length) {
      $("#container").append("<div id='error'>Les réponses aux trois questions doivent être renseignées</div>");
    }
  });

  $(document).on("click","#resendFirstMail", () => {
      sendFirstMail(answer);
  });

  $(document).on("click","#sendDrawing", () => {
    let canvas=document.getElementById("canvas");

    if (canvas!==null) {
      sendSecondMail(canvas.toDataURL("image/png"));
    }
  });

  $(document).on("click","#resendSecondMail", () => {
      sendSecondMail(answer);
  });

  $(document).on("click","#sendThirdMail", () => {
    sendThirdMail(`
    <p>Quel est, selon vous, l'objectif de cette application ? : ${$("#questionOne").val()}</p>
    <p>Quel est le nom de l'entreprise qui a réalisé cette application ? : ${$("#questionTwo").val()}</p>
    <p>Quel est l'information la plus importante sur cette page ? : ${$("#questionThree").val()}</p>
    <p>Qu'avez-vous remarqué en premier sur cette page ? Qu'avez-vous remarqué ensuite ? : ${$("#questionFour").val()}</p>
    <p>Le site vous a-t-il paru digne de confiance ? : ${$("#questionFive").val()}</p>
    <p>Le site vous a-t-il paru clair ? : ${$("#questionSix").val()}</p>
    <p>Que feriez vous pour améliorer l'application ? : ${$("#questionSeven").val()}</p>`);
  });

  $(document).on("click","#resendThirdMail", () => {
    sendThirdMail(answer);
  });

  $(document).on("click","#startDrawing", () => {
    $("#container").remove();
    $("body").append(`
    <div id="drawingApp">
      <div id="page">
          <div class="header">
          <button class="accept" id="sendDrawing">Envoyer</button>
          <a id="new" class="navbtn">New</a>
              <div class="title"><a target="_blank" href="https://github.com/krisrak/html5-canvas-drawing-app" alt="Dépôt GitHub">Sketch Pad (by krisrak (GitHub))</a></div>
          </div>
          <div id="content"><p style="text-align:center">Loading Canvas...</p></div>
          <div class="footer">
          <div class="palette-case">
            <div class="palette-box">
              <div class="palette white"></div>
            </div>
            <div class="palette-box">
              <div class="palette red"></div>
            </div>
            <div class="palette-box">
              <div class="palette blue"></div>
            </div>
            <div class="palette-box">
              <div class="palette green"></div>
            </div>
            <div class="palette-box">
              <div class="palette black"></div>
            </div>
            <div style="clear:both"></div>
          </div>
          </div>
      </div>
    </div>`);

    $.getScript("drawingAppScript.js");
  });
})
