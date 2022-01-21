import { CustomContent } from "@interfaces/types";
import Mailgen, { Content } from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "MarocShip",
        link: "https://www.poste.ma/",
        logo: "https://scontent.frak2-1.fna.fbcdn.net/v/t1.6435-9/71109044_111912573544538_6503015179784028160_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFDpDwWoc0M8jdhlaBsX_bhV4gKeqSFIi5XiAp6pIUiLvqu3OEAilfrv3WPQC0stnK_UFBfpQokssLLP7E3--mz&_nc_ohc=rFYwukko2WgAX-N-HfJ&tn=hHHhe0sQOeEZxIJM&_nc_ht=scontent.frak2-1.fna&oh=00_AT8s9YvmzPH5v2lNwNBjoKPhWWNPossFRyYv39S1wd4QwQ&oe=620E82ED",
        logoHeight: '100px'
    },
});


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

// generate template for each user created
export const createLoginInfoTemplate = (data: any) => {
    const template: Content = {
        body: {
            name: data.name,
            intro: "Welcome to MarocShip! We're very excited to have you on board.",
            action: {
                instructions: 'To get started with using ur account , please click here:',
                button: {
                    color: '#22BC66',
                    text: 'Login to Your Account',
                    link: data.link
                }
            },
            dictionary: {
                email: data.email,
                password: data.password,
            },
            outro:
                "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
    return template
}

// generate template for each delivery
export const createDeliveryInfoTemplate = (data: any) => {
    const template: Content = {
        body: {
            name: "Driver",
            intro: "Welcome to MarocShip! new Delivery is available.",
            action: {
                instructions: 'To get this Dilevry , please click here:',
                button: {
                    color: '#22BC66',
                    text: 'Get This Dilevry',
                    link: data.link
                }
            },
            dictionary: {
                from: data.from,
                to: data.to,
                weight: data.weight,
            },
            outro:
                "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
    return template;
}

// send mail using mailgen generated template
const mail = async (EmailsArray: [string], template: CustomContent) => {

    const html: any = template.type === 'delivery' ? createDeliveryInfoTemplate(template.data) : createLoginInfoTemplate(template.data);

    console.log('sending 🚀🚀');
    const info = await transporter.sendMail({
        from: '"MarocShip" <safiairline123@gmail.com>',
        to: EmailsArray,
        subject: "MarocShip Delivery",
        text: "MarocShip",
        html: mailGenerator.generate(html),
    });
    console.log('done 😎😎');

    return info;
};

export { mail };