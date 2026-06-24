import json
import os
from datetime import datetime, timedelta
import requests

def send_email(to_email, subject, body):
    api_key = os.environ.get('RESEND_API_KEY')
    from_email = os.environ.get('USER_EMAIL')
    
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": f"<strong>{body}</strong>"
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print(f"Email sent successfully: {subject}")
    else:
        print(f"Error sending email: {response.text}")

def main():
    partner_email = os.environ.get('PARTNER_EMAIL')
    
    # Leer las fechas desde el JSON
    with open('src/components/dates.json', 'r', encoding='utf-8') as f:
        dates = json.load(f)

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
                "¡Hoy es un día especial!", 
                f"Hola mi vida, hoy es: {event}. ¡Te amo mucho!"
            )
            
        # Recordatorio un día antes
        if date_val == tomorrow_str:
            send_email(
                partner_email, 
                "Un recordatorio especial...", 
                f"¡Hola! Solo paso a decirte que mañana es un día muy especial: {event}. ¡Prepárate!"
            )

if __name__ == "__main__":
    main()
