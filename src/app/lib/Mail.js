// colocar todas as configuração de envio de email
import nodemailer from 'nodemailer';
import mailConfig from '../../config/mail';


export default nodemailer.createTransport(mailConfig)