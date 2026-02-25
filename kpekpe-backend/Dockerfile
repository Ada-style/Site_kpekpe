# Utiliser une image Python légère
FROM python:3.11-slim

# Empêcher Python de générer des fichiers .pyc et activer le buffering
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Créer le répertoire de travail
WORKDIR /app

# Installer les dépendances Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code
COPY . /app/

# Collecter les fichiers statiques (WhiteNoise s'en chargera en prod)
# RUN python manage.py collectstatic --noinput

# Port par défaut (sera écrasé par Back4App ou Hugging Face)
EXPOSE 8080

# Commande de démarrage avec port dynamique
CMD gunicorn --bind 0.0.0.0:${PORT:-8080} kpekpe_backend.wsgi:application
