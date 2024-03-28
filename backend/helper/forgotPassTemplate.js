function forgotPassTemplate(link) {
  // <p>Your OTP is ${otp.otp}</p>

  return `
        <div style="width:360px;padding:20px;background:#e9e9e9;border-radius:5px;margin: 0 auto;">
            <table border="0" cellpadding="0" cellspacing="10px" width="100%">
                <tbody>
                    <tr>
                      <td>
                          <h1 style="color:#4a4a4a;margin: 0;">Orebi</h1>
                          <p style="font-size:9px;margin: 0;">E-Commerce Solution</p>
                      </td>
                      <td style="text-align: right;">
                          <a href="#"><button style="background:#4a4a4a;color:#fff;padding:5px 10px">VISIT</button></a>
                      </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <h1>Reset Your Login Password</h1>
                <p style="margin-bottom:0;font-weight:600">click this button to enter your new Password:</p>
                <a href="${link}"><button style="padding:15px 20px;color:#fff;background-color:#007bff;border-style:none;border-radius:5px;font-size:16px">Confirm your email</button></a>
                <p style="font-style:italic;color:#555555">If you didn't change your login password in Orebi-Ecommmerce, please ignore this message.</p><div class="yj6qo"></div><div class="adL">
            </div>
        </div>
    `;
}

module.exports = forgotPassTemplate;
