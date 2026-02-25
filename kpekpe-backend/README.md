# Kpékpé Learnia - Backend (Django)

Application de formation en ligne pour l'Afrique, avec paiement Mobile Money intégré.

## Technologies
- Django & Django REST Framework
- Django Channels (WebSockets)
- PostgreSQL
- JWT Authentication

## Installation Locale

1. Cloner le repo
2. Créer un environnement virtuel : `python -m venv venv`
3. Activer l'environnement : `source venv/bin/activate` (ou `venv\Scripts\activate` sur Windows)
4. Installer les dépendances : `pip install -r requirements.txt`
5. Configurer le fichier `.env` à partir de `.env.example`
6. Appliquer les migrations : `python manage.py migrate`
7. Lancer le serveur : `python manage.py runserver`

## Déploiement Railway

1. Connecter le repo GitHub à Railway.
2. Ajouter les variables d'environnement nécessaires.
3. Railway utilisera automatiquement le `Procfile` pour lancer l'application avec `daphne`.
