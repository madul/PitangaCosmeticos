    <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "pitangacos";

        $conn = mysqli_connect($servername, $username, $password, $database);
        
        if (!$conn){
            die("A conexão falhou. ".mysqli_connect_error());
        }
        session_start();
        $conn->query("SET NAMES utf8");
        
    ?>