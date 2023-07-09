const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '317861224982-u5i2i5eps7qi41jnsjleefedpeav089b.apps.googleusercontent.com' // this  is a client id of the gmail api ...
const CLIENT_SECRET ='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' //this is a client secrent of the gmail api 
const REDIRECT_URL ='https://developers.google.com/oauthplayground' // this is a client redirect url of the gmail ...
const REFRESH_TOKEN = '1//045Mp51wbMFhwCgYIARAAGAQSNwF-L9IrDB0xrvA3-iyzX81WvyvaVL2Fy4fbfjRr4q6K45MNP4Q0f6ebDELsNiw3KQsWw9P0HMo' // this is a refresh token of the gmai api ....

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})

async function sendMail(){
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:'',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        // send mail to user settings....
        const mailOptions ={
            from: 'Md Shahid Ali <technicalproduct786@gmail.com>',
            to:'alishahidmd127@gmail.com',
            subject : 'Gmail Assesment By OpenInAPP',
            text: 'Hello Md , This is a testing mail project given by openinapp ...',
            html: '<h1>Hello Md , This is a testing mail project given by openinapp ...</h1>'
        }

        const result =await  transport.sendMail(mailOptions)
        return result /// throw error due to technical errr ...
    }catch(error){
        return error
    }
}

sendMail().then((result) => console.log('Email Sent....', result)).catch((error) => console.log(error.message));