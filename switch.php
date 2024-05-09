<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cor favorita definida</title>
</head>
    <style>
        body{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p{
            font-size: 100px;
            color: #f5f5f5;
        }
    </style>
<body>
    <?php 
        $favcolor = $_POST["cores"];

        switch ($favcolor) {
            case "vermelho":
                echo "<style>body { background-color: red; }</style>";
                echo "<p>Sua cor favorita é vermelho</p>";
                break;
            case "verde":
                echo "<style>body { background-color: green; }</style>";
                echo "<p>Sua cor favorita é verde</p>";
                break;
            case "azul":
                echo "<style>body { background-color: blue; }</style>";
                echo "<p>Sua cor favorita é azul</p>";
                break;
            case "amarelo":
                echo "<style>body { background-color: yellow; }</style>";
                echo "<p>Sua cor favorita é amarelo</p>";
                break;
            case "roxo":
                echo "<style>body { background-color: purple; }</style>";
                echo "<p>Sua cor favorita é roxo</p>";
                break;
            case "laranja":
                echo "<style>body { background-color: orange; }</style>";
                echo "<p>Sua cor favorita é laranja</p>";
                break;
            case "rosa":
                echo "<style>body { background-color: pink; }</style>";
                echo "<p>Sua cor favorita é rosa</p>";
                break;
            case "preto":
                echo "<style>body { background-color: black; }</style>";
                echo "<p>Sua cor favorita é preto</p>";
                break;
            case "branco":
                echo "<style>body { background-color: white; }</style>";
                echo "<p>Sua cor favorita é branco</p>";
                break;
            default:
                echo 'Cor não reconhecida.';
        }
    ?>
</body>
</html>