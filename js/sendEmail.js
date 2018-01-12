//post - try to insert news in the DB
function sendEmail(){
    $('form').submit(false);
    var name = $("#name").val();
    var email = $("#email").val();
    var cellphone = $("#cellphone").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    if (name==="" || email==="" || cellphone==="" || subject==="" || message===""){
        alert("Non hai completato tutti i campi. Ricontrolla con attenzione!");
    }else{
        $.post("https://salone-fido.herokuapp.com/sendEmail",
        {
            name: name,
            email: email,
            cellphone: cellphone,
            subject: subject,
            message: message
        },
        function(data, status){
            console.log(data);
            if (data === "1"){
                alert("Email Inviata! Grazie per averci contattato. Le risponderemo il prima possibile.");
                document.getElementById("contactform").reset();
            }else{
                alert("C'e' stato un errore e l'email non e' stata inviata. Ci scusiamo e la invitiamo a riprovare piu' tardi");   
            }
        });
    }
};
