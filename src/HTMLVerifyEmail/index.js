const HTMLVerifyEmail = () => /*html*/ `<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
    </head>
    <body class="">
        <table border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                    <div class="content">
                        <table class="main">
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tr>
                                            <td>
                                                <h1>Confirm your email</h1>
                                                <h2>
                                                    You are just one step away
                                                </h2>
                                                <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="btn btn-primary"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">
                                                                <table
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <a
                                                                                    href="http://htmlemail.io"
                                                                                    target="_blank"
                                                                                    >confirm
                                                                                    email</a
                                                                                >
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p>
                                                    If you received this email
                                                    by mistake, simply delete
                                                    it. You won't be subscribed
                                                    if you don't click the
                                                    confirmation link above.
                                                </p>
                                                <a href="http://localhost:5173/api/authors/session">Click here to confirm</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- END MAIN CONTENT AREA -->
                        </table>

                        <!-- START FOOTER -->
                        <div class="footer">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-block">
                                        Don't like these emails?
                                        <a href="#">Unsubscribe</a>.
                                    </td>
                                </tr>
                                <tr></tr>
                            </table>
                        </div>
                        <!-- END FOOTER -->

                        <!-- END CENTERED WHITE CONTAINER -->
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </body>
</html>`

export default HTMLVerifyEmail
