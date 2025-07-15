<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "g30042010@gmail.com"; // <-- Zmień na swój adres!
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $subject = "Nowa wiadomość z formularza kontaktowego";
    $body = "Imię: $name\nEmail: $email\n\nWiadomość:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Wiadomość została wysłana!";
    } else {
        echo "Wystąpił błąd przy wysyłaniu wiadomości.";
    }
}
?>
