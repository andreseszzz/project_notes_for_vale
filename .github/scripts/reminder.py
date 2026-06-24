import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta

def send_email(to_email, subject, body):
    user_email = os.environ.get('USER_EMAIL')
    app_password = os.environ.get('GMAIL_APP_PASSWORD')
    
    # Configuración del servidor SMTP de Gmail
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    
    # Crear el mensaje
    message = MIMEMultipart()
    message["From"] = user_email
    message["To"] = to_email
    message["Subject"] = subject
    
    # El cuerpo del mensaje en HTML para que se vea lindo
    html_body = f"<div style='font-family: Arial, sans-serif; color: #4a3340; text-align: center; padding: 20px; border: 1px solid #f4fffd; border-radius: 15px; background-color: #fbfcfc;'><strong style='font-size: 18px;'>{body}</strong></div>"
    message.attach(MIMEText(html_body, "html"))
    
    try:
        # Conexión segura con Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls() # Iniciar cifrado TLS
        server.login(user_email, app_password)
        server.send_message(message)
        server.quit()
        print(f"Email sent successfully to {to_email}: {subject}")
    except Exception as e:
        print(f"Error sending email via Gmail: {e}")

def main():
    partner_email = os.environ.get('PARTNER_EMAIL')
    if not partner_email:
        print("Error: PARTNER_EMAIL secret is missing")
        return
    
    # Leer las fechas desde el JSON
    try:
        with open('src/components/dates.json', 'r', encoding='utf-8') as f:
            dates = json.load(f)
    except Exception as e:
        print(f"Error reading dates.json: {e}")
        return

    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)
    
    today_str = today.strftime('%Y-%m-%d')
    tomorrow_str = tomorrow.strftime('%Y-%m-%d')

    for entry in dates:
        date_val = entry['date']
        event = entry['event']
        
        # Recordatorio el mismo día
        if date_val == today_str:
            send_email(
                partner_email, 
                "❤️ ¡Hoy es un día especial!", 
                f"Hola mi vida, hoy es: {event}. ¡Te amo mucho!"
            )
            
        # Recordatorio un día antes
        if date_val == tomorrow_str:
            send_email(
                partner_email, 
                "✨ Un recordatorio especial...", 
                f"¡Hola! Solo paso a decirte que mañana es un día muy especial: {event}. ¡Prepárate! 😉"
            )

if __name__ == "__main__":
    main()
