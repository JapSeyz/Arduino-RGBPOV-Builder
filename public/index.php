<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Arduino - JapSeyz</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="/css/app.css" rel="stylesheet">
</head>
<body>
<div id="app">
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand logo-text" href="/">
                    JapSeyz
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
            </div>
        </div>
    </nav>

    <div class="container-fluid text-center">
        <div class="column-container">
            <?php
            // Set the amount of columns to generate
            $columns = (array_key_exists('columns', $_GET) ? $_GET['columns'] : 25);

            // Set the amount of LEDs in the array
            $leds = (array_key_exists('leds', $_GET) ? $_GET['leds'] : 8);

            // Generate a fluid layout with x leds in every column
            for ($i = $columns; $i > 0; $i--) {
                echo "<div class='column'>";
                for ($j = $leds; $j > 0; $j--) {
                    echo "<div class='led'></div>";
                }
                echo "</div>";
            }
            ?>
        </div>
        <br />
        <button class="btn btn-primary generate">Generate</button>
        <button class="btn btn-primary load">Load</button>

        <div class="row">
            <div class="half">
                <pre class="output"></pre>
            </div>

            <div class="half">
                <textarea class="load-area"></textarea>
            </div>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script src="/js/app.js"></script>
</body>
</html>