function otpTemplate(otp) {
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
                        <a href="#m_-9126921749703876496_"><button style="background:#4a4a4a;color:#fff;padding:5px 10px">VISIT</button></a>
                    </td>
                  </tr>
              </tbody>
          </table>
          <div>
              <h1>Complete your registration</h1>
              <p>Please enter this confirmation code in the window where you started creating your account:</p>
              </br>
              <div style="text-align:center;font-size:50px;font-weight:bold;letter-spacing:10px;background:white;">
                  <p style="margin: 0;">${otp}</p>
              </div>
              </br>
              <p style="margin-bottom:0;font-weight:600">Or click this button to confirm your email:</p>
              <a href="#m_-9126921749703876496_"><button style="padding:15px 20px;color:#fff;background-color:#007bff;border-style:none;border-radius:5px;font-size:16px">Confirm your email</button></a>
              <p style="font-style:italic;color:#555555">If you didn't create an account in Orebi-Ecommmerce, please ignore this message.</p><div class="yj6qo"></div><div class="adL">
          </div>
      </div>
  `;
}

module.exports = otpTemplate;
