"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = exports.createDeliveryInfoTemplate = exports.createLoginInfoTemplate = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailGenerator = new mailgen_1.default({
    theme: "default",
    product: {
        name: "MarocShip",
        link: "https://www.poste.ma/",
        logo: "https://scontent.frak2-1.fna.fbcdn.net/v/t1.6435-9/71109044_111912573544538_6503015179784028160_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFDpDwWoc0M8jdhlaBsX_bhV4gKeqSFIi5XiAp6pIUiLvqu3OEAilfrv3WPQC0stnK_UFBfpQokssLLP7E3--mz&_nc_ohc=rFYwukko2WgAX-N-HfJ&tn=hHHhe0sQOeEZxIJM&_nc_ht=scontent.frak2-1.fna&oh=00_AT8s9YvmzPH5v2lNwNBjoKPhWWNPossFRyYv39S1wd4QwQ&oe=620E82ED",
        logoHeight: '100px'
    },
});
const transporter = nodemailer_1.default.createTransport({
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
const createLoginInfoTemplate = (data) => {
    const template = {
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
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    return template;
};
exports.createLoginInfoTemplate = createLoginInfoTemplate;
// generate template for each delivery
const createDeliveryInfoTemplate = (data) => {
    const template = {
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
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    return template;
};
exports.createDeliveryInfoTemplate = createDeliveryInfoTemplate;
// send mail using mailgen generated template
const mail = async (EmailsArray, template) => {
    const html = template.type === 'delivery' ? (0, exports.createDeliveryInfoTemplate)(template.data) : (0, exports.createLoginInfoTemplate)(template.data);
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
exports.mail = mail;
//# sourceMappingURL=mail.js.map