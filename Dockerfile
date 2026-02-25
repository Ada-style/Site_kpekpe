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

# Copier les dépendances depuis le sous-dossier
COPY kpekpe-backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le contenu du backend dans /app
COPY kpekpe-backend/ /app/

# Port standard pour Hugging Face Spaces
EXPOSE 7860

# Commande de démarrage (on utilise 7860 car c'est ce que Hugging Face attend)
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "kpekpe_backend.wsgi:application"]
