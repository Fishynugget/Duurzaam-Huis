<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="hoofdbord.css">
    <title>Document</title>
</head>
<body>
    header met logo en titel
    <table id="bord">
        <?php
        function vakjes() 
        {
            for ($column = 0; $column < 3; $column++) { 
                echo "<tr>";
                for ($row = 0; $row < 3; $row++) { 
                    echo '<td id="include_vakjes"></td>';
                }
                echo "</tr>";
            }
        }
        vakjes();
        ?>
    </table>
    footer met namen groepje
</body>
</html>